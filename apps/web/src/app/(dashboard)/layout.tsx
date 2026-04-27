import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  let workspaceId = ""
  let workspaceName = "Acme Corp"
  
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id, name')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()
    
  if (workspace) {
    workspaceId = workspace.id
    workspaceName = workspace.name
  } else {
    redirect('/workspace/create')
  }

  // Fetch recent notifications
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('workspace_id', workspaceId)
    .order('created_at', { ascending: false })
    .limit(10)

  const adminEmail = process.env.ADMIN_EMAIL
  const isAdmin = adminEmail && user.email === adminEmail

  return (
    <>
      <Sidebar userEmail={user.email} workspaceName={workspaceName} isAdmin={isAdmin} />
      <div className="pl-0 md:pl-64 flex flex-col min-h-screen">
        <Topbar workspaceId={workspaceId} initialNotifications={notifications || []} />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  )
}
