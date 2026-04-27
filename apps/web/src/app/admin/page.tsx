import { createClient } from '@/lib/supabase/server'
import { AdminClient } from './AdminClient'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id, name')
    .eq('owner_user_id', user?.id)
    .single()

  // Fetch counts for system status
  const [
    { count: promptCount },
    { count: responseCount },
    { count: notificationCount },
    { count: insightCount }
  ] = await Promise.all([
    supabase.from('prompts').select('*', { count: 'exact', head: true }).eq('workspace_id', workspace?.id),
    supabase.from('responses').select('*', { count: 'exact', head: true }).eq('workspace_id', workspace?.id),
    supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('workspace_id', workspace?.id),
    supabase.from('insights').select('*', { count: 'exact', head: true }).eq('workspace_id', workspace?.id)
  ])

  return (
    <AdminClient 
      workspace={workspace} 
      counts={{
        promptCount: promptCount || 0,
        responseCount: responseCount || 0,
        notificationCount: notificationCount || 0,
        insightCount: insightCount || 0
      }} 
    />
  )
}
