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

  let workspaceName = "Acme Corp"
  
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('name')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()
    
  if (workspace) {
    workspaceName = workspace.name
  } else {
    redirect('/workspace/create')
  }

  return (
    <>
      <Sidebar userEmail={user.email} workspaceName={workspaceName} />
      <div className="pl-64 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </>
  )
}
