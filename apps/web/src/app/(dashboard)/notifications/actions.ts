'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAsRead(notificationId: string) {
  const supabase = await createClient()
  
  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId)

  revalidatePath('/')
}

export async function markAllAsRead(workspaceId: string) {
  const supabase = await createClient()
  
  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('workspace_id', workspaceId)
    .eq('is_read', false)

  revalidatePath('/')
}
