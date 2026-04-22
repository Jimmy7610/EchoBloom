'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createWorkspace(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Insert workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert([{ name, owner_user_id: user.id }])
    .select()
    .single()

  if (workspaceError || !workspace) {
    redirect('/workspace/create?message=Could not create workspace')
  }

  // Insert membership
  const { error: membershipError } = await supabase
    .from('memberships')
    .insert([{ workspace_id: workspace.id, user_id: user.id, role: 'owner' }])

  if (membershipError) {
    redirect('/workspace/create?message=Could not attach user to workspace')
  }

  redirect('/')
}
