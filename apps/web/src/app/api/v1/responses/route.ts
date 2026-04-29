import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { classifyResponseSentiment } from '@echobloom/ai'
import { createNotification } from '@/lib/notifications'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  const supabase = createAdminClient()

  try {
    const body = await request.json()
    
    const { prompt_id, workspace_id, session_id, rating_value, emoji_value, text_value } = body

    if (!prompt_id || !workspace_id) {
      return NextResponse.json({ error: 'prompt_id and workspace_id are required' }, { status: 400, headers: corsHeaders })
    }

    const { error } = await supabase
      .from('responses')
      .insert([{
        prompt_id,
        workspace_id,
        session_id: session_id || 'anonymous',
        rating_value,
        emoji_value,
        text_value
      }])

    if (error) {
      console.error('Error saving response:', error)
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500, headers: corsHeaders })
    }

    // 1. Check for Negative Sentiment Alert
    const sentiment = classifyResponseSentiment({ rating_value, emoji_value, text_value })
    if (sentiment.sentiment === 'negative') {
      await createNotification({
        workspaceId: workspace_id,
        type: 'sentiment_alert',
        title: 'Negative Feedback Detected',
        message: 'A new response was classified as negative. Check your dashboard for details.',
        relatedPromptId: prompt_id
      })
    }

    // 2. Check for Milestones
    // Note: We count all responses for this prompt to trigger milestones
    const { count } = await supabase
      .from('responses')
      .select('*', { count: 'exact', head: true })
      .eq('prompt_id', prompt_id)

    if (count === 1) {
      await createNotification({
        workspaceId: workspace_id,
        type: 'milestone_1',
        title: 'First Response!',
        message: 'Your prompt just received its first response. Insights are starting to bloom!',
        relatedPromptId: prompt_id
      })
    } else if (count === 10) {
      await createNotification({
        workspaceId: workspace_id,
        type: 'milestone_10',
        title: '10 Responses Reached',
        message: 'Great progress! You now have 10 responses to analyze.',
        relatedPromptId: prompt_id
      })
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders })
  }
}
