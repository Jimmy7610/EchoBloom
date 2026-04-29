import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

export async function GET(request: Request) {
  const supabase = createAdminClient()

  const { searchParams } = new URL(request.url)
  const workspaceId = searchParams.get('workspaceId')

  if (!workspaceId) {
    return NextResponse.json({ error: 'workspaceId is required' }, { status: 400, headers: corsHeaders })
  }

  // Fetch one active prompt for the given workspace
  const { data: prompt, error } = await supabase
    .from('prompts')
    .select('id, workspace_id, title, question_text, type, trigger_type')
    .eq('workspace_id', workspaceId)
    .eq('status', 'active')
    .limit(1)
    .single()

  if (error || !prompt) {
    return NextResponse.json({ prompt: null }, { headers: corsHeaders })
  }

  return NextResponse.json({ prompt }, { headers: corsHeaders })
}
