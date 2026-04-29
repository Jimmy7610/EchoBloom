import { createAdminClient } from '@/lib/supabase/admin'

export type NotificationType = 'sentiment_alert' | 'milestone_1' | 'milestone_10' | 'prompt_activated' | 'prompt_paused'

export async function createNotification(params: {
  workspaceId: string
  type: NotificationType
  title: string
  message: string
  relatedPromptId?: string
}) {
  const supabase = createAdminClient()
  
  // Basic de-duplication for milestones to avoid spam
  if (params.type.startsWith('milestone')) {
    const { data: existing } = await supabase
      .from('notifications')
      .select('id')
      .eq('workspace_id', params.workspaceId)
      .eq('type', params.type)
      .eq('related_prompt_id', params.relatedPromptId)
      .limit(1)

    if (existing && existing.length > 0) return
  }

  await supabase.from('notifications').insert({
    workspace_id: params.workspaceId,
    type: params.type,
    title: params.title,
    message: params.message,
    related_prompt_id: params.relatedPromptId,
    is_read: false
  })
}
