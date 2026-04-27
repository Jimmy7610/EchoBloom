'use server'

/**
 * ADMIN SERVER ACTIONS
 * Strictly restricted to eliassonjimmy76@gmail.com
 */

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { classifyResponseSentiment } from '@echobloom/ai'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'eliassonjimmy76@gmail.com'
const DEMO_PREFIX = '[DEMO]'

async function verifyAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.email !== ADMIN_EMAIL) {
    throw new Error('Unauthorized')
  }

  // Get workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('owner_user_id', user.id)
    .single()

  if (!workspace) {
    throw new Error('No workspace found for admin')
  }

  return { supabase, user, workspaceId: workspace.id }
}

// -- Demo Data Tools --

export async function generateDemoResponsesAction(count: number, mode: 'random' | 'negative-spike' | 'onboarding' = 'random') {
  const { supabase, workspaceId } = await verifyAdmin()

  // Get an active prompt to attach responses to
  const { data: prompt } = await supabase
    .from('prompts')
    .select('id')
    .eq('workspace_id', workspaceId)
    .limit(1)
    .single()

  if (!prompt) {
    throw new Error('No prompts found. Create a demo prompt first.')
  }

  const responses = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    let rating = Math.floor(Math.random() * 5) + 1
    let emoji = ['love', 'happy', 'neutral', 'sad', 'angry'][Math.floor(Math.random() * 5)]
    let text = `${DEMO_PREFIX} This is a ${mode} test response ${i + 1}.`

    if (mode === 'negative-spike') {
      rating = Math.floor(Math.random() * 2) + 1
      emoji = Math.random() > 0.5 ? 'sad' : 'angry'
      text = `${DEMO_PREFIX} I'm frustrated with the current experience. Component ${i} is failing.`
    } else if (mode === 'onboarding') {
      const issues = ['setup is confusing', 'too many steps', 'documentation is missing', 'installation failed']
      rating = Math.random() > 0.7 ? 5 : 2
      text = `${DEMO_PREFIX} Onboarding feedback: ${issues[Math.floor(Math.random() * issues.length)]}`
    }

    const sentimentData = classifyResponseSentiment({ rating_value: rating, emoji_value: emoji, text_value: text })

    responses.push({
      workspace_id: workspaceId,
      prompt_id: prompt.id,
      session_id: `demo-${Math.random().toString(36).substring(7)}`,
      rating_value: rating,
      emoji_value: emoji,
      text_value: text,
      sentiment: sentimentData.sentiment,
      created_at: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  console.log(`[ADMIN] Inserting ${responses.length} responses for workspace ${workspaceId}`)
  const { error } = await supabase.from('responses').insert(responses)
  if (error) {
    console.error('[ADMIN] Failed to insert responses:', error)
    throw error
  }

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true, count }
}

export async function clearDemoResponsesAction() {
  const { supabase, workspaceId } = await verifyAdmin()

  const { error } = await supabase
    .from('responses')
    .delete()
    .eq('workspace_id', workspaceId)
    .like('text_value', `${DEMO_PREFIX}%`)

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

export async function resetDemoWorkspaceAction() {
  const { supabase, workspaceId } = await verifyAdmin()

  // Delete all demo data
  await supabase.from('responses').delete().eq('workspace_id', workspaceId).like('text_value', `${DEMO_PREFIX}%`)
  await supabase.from('prompts').delete().eq('workspace_id', workspaceId).like('title', `${DEMO_PREFIX}%`)
  await supabase.from('notifications').delete().eq('workspace_id', workspaceId).like('title', `${DEMO_PREFIX}%`)
  await supabase.from('insights').delete().eq('workspace_id', workspaceId).like('summary', `${DEMO_PREFIX}%`)

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

// -- Prompt Testing Tools --

export async function createDemoPromptAction(type: 'text' | 'emoji' | 'rating') {
  const { supabase, workspaceId } = await verifyAdmin()

  const { error } = await supabase.from('prompts').insert({
    workspace_id: workspaceId,
    title: `${DEMO_PREFIX} ${type.toUpperCase()} Feedback`,
    question_text: `How do you like the new ${type} feature?`,
    type: type,
    trigger_type: 'on_page_load',
    status: 'active'
  })

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

export async function toggleAllDemoPromptsAction(status: 'active' | 'paused') {
  const { supabase, workspaceId } = await verifyAdmin()

  const { error } = await supabase
    .from('prompts')
    .update({ status })
    .eq('workspace_id', workspaceId)
    .like('title', `${DEMO_PREFIX}%`)

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

// -- Notification Testing Tools --

export async function createDemoNotificationAction(type: 'general' | 'negative-alert' | 'milestone') {
  const { supabase, workspaceId } = await verifyAdmin()

  const data = {
    workspace_id: workspaceId,
    is_read: false,
    type: type === 'negative-alert' ? 'sentiment_alert' : 'milestone',
    title: `${DEMO_PREFIX} ${type.replace('-', ' ').toUpperCase()}`,
    message: type === 'negative-alert' 
      ? 'Alert: Multiple users have reported critical issues in the last 15 minutes.'
      : 'Congratulations! You have reached a new feedback milestone.'
  }

  const { error } = await supabase.from('notifications').insert(data)
  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

export async function markAllDemoNotificationsAction(read: boolean) {
  const { supabase, workspaceId } = await verifyAdmin()

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: read })
    .eq('workspace_id', workspaceId)
    .like('title', `${DEMO_PREFIX}%`)

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}

// -- AI Testing Tools --

export async function triggerDemoAISummaryAction() {
  const { supabase, workspaceId } = await verifyAdmin()

  // Simply call the existing internal logic or trigger a refresh if possible
  // For now, we'll just insert a demo insight
  const { error } = await supabase.from('insights').insert({
    workspace_id: workspaceId,
    summary: `${DEMO_PREFIX} This is a generated AI summary for testing. Overall sentiment is stable with a slight positive trend in onboarding.`,
    themes: ['Documentation', 'Setup Flow', 'UI Consistency'],
    suggested_actions: ['Improve tooltip clarity', 'Reduce steps in wizard'],
    sentiment_distribution: { positive: 60, neutral: 30, negative: 10 },
    risk_level: 'low'
  })

  if (error) throw error

  revalidatePath('/dashboard')
  revalidatePath('/admin')
  return { success: true }
}
