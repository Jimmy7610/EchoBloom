import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

    return NextResponse.json({ success: true }, { headers: corsHeaders })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: corsHeaders })
  }
}
