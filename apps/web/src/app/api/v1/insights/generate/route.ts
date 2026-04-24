import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY is not configured.' }, { status: 500 })
    }

    const { workspaceId } = await req.json()
    if (!workspaceId) {
      return NextResponse.json({ error: 'Missing workspaceId' }, { status: 400 })
    }

    // Verify workspace ownership
    const { data: member } = await supabase
      .from('memberships')
      .select('id')
      .eq('workspace_id', workspaceId)
      .eq('user_id', user.id)
      .single()

    if (!member) {
      return NextResponse.json({ error: 'Unauthorized for this workspace' }, { status: 403 })
    }

    // Cooldown check (5 minutes)
    // We try to fetch the latest insight. If it fails (e.g. migration not run), we ignore.
    const { data: latestInsight, error: insightError } = await supabase
      .from('insights')
      .select('updated_at')
      .eq('workspace_id', workspaceId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!insightError && latestInsight?.updated_at) {
      const lastUpdate = new Date(latestInsight.updated_at).getTime()
      const now = Date.now()
      if (now - lastUpdate < 5 * 60 * 1000) {
        return NextResponse.json({ 
          error: 'Please wait 5 minutes between generating AI summaries.' 
        }, { status: 429 })
      }
    }

    // Fetch last 50 responses
    const { data: responses } = await supabase
      .from('responses')
      .select('rating_value, emoji_value, text_value, created_at')
      .eq('workspace_id', workspaceId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (!responses || responses.length === 0) {
      return NextResponse.json({ error: 'No responses to summarize.' }, { status: 400 })
    }

    // Format for OpenAI
    const formattedResponses = responses.map(r => ({
      rating: r.rating_value,
      emoji: r.emoji_value,
      text: r.text_value
    }))

    const prompt = `
You are an expert product manager analyzing user onboarding feedback.
Analyze the following user responses (up to 50 recent ones).
Return a strict JSON object with exactly this schema:
{
  "summary": "A 2-3 sentence executive summary of the overall sentiment and main takeaways.",
  "themes": ["theme 1", "theme 2", "theme 3"],
  "suggested_actions": ["action 1", "action 2"],
  "risk_level": "low" | "medium" | "high",
  "sentiment_distribution": {
    "positive": number,
    "neutral": number,
    "negative": number
  }
}

Keep themes and actions concise. Do not include markdown formatting like \`\`\`json.
Responses:
${JSON.stringify(formattedResponses)}
`

    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    })

    const aiData = await aiRes.json()

    if (!aiRes.ok) {
      console.error('OpenAI Error:', aiData)
      return NextResponse.json({ error: 'Failed to generate summary from AI provider.' }, { status: 500 })
    }

    const content = aiData.choices[0].message.content
    let parsed: any
    try {
      parsed = JSON.parse(content)
    } catch (e) {
      console.error('JSON Parse Error:', e)
      return NextResponse.json({ error: 'AI returned invalid format.' }, { status: 500 })
    }

    const newInsight = {
      workspace_id: workspaceId,
      summary: parsed.summary || 'No summary generated.',
      themes: parsed.themes || [],
      suggested_actions: parsed.suggested_actions || [],
      sentiment_distribution: parsed.sentiment_distribution || { positive: 0, neutral: 0, negative: 0 },
      risk_level: parsed.risk_level || 'medium',
      updated_at: new Date().toISOString()
    }

    // Attempt to save to DB. 
    // If migration hasn't run, this might fail on sentiment_distribution, risk_level, or updated_at.
    const { data: savedInsight, error: saveError } = await supabase
      .from('insights')
      .insert([newInsight])
      .select()
      .single()

    if (saveError) {
      console.warn('Failed to persist insight to database (migration might be missing):', saveError)
      // Return the generated insight ephemerally
      return NextResponse.json({ insight: { id: 'temp', ...newInsight } })
    }

    return NextResponse.json({ insight: savedInsight })
  } catch (err: any) {
    console.error('Insight API Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
