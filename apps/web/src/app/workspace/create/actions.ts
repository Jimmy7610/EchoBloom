'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createWorkspace(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (!user || userError) {
    redirect(`/login?message=${encodeURIComponent(userError?.message || 'Not authenticated')}`)
  }

  // Insert workspace
  const { data: workspace, error: workspaceError } = await supabase
    .from('workspaces')
    .insert([{ name, owner_user_id: user.id }])
    .select()
    .single()

  if (workspaceError || !workspace) {
    const msg = workspaceError?.message || 'Unknown error creating workspace'
    const detail = workspaceError?.details || ''
    const hint = workspaceError?.hint || ''
    redirect(`/workspace/create?message=${encodeURIComponent(`${msg}. ${detail} ${hint}`.trim())}`)
  }

  // Insert membership
  const { error: membershipError } = await supabase
    .from('memberships')
    .insert([{ workspace_id: workspace.id, user_id: user.id, role: 'owner' }])

  if (membershipError) {
    const msg = membershipError?.message || 'Unknown error'
    redirect(`/workspace/create?message=${encodeURIComponent(msg)}`)
  }

  redirect('/')
}
