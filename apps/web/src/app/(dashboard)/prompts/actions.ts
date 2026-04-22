'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPrompt(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Get user's workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()

  if (!workspace) {
    redirect('/workspace/create')
  }

  const title = formData.get('title') as string
  const question_text = formData.get('question_text') as string
  const type = formData.get('type') as string
  const trigger_type = formData.get('trigger_type') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('prompts')
    .insert([{
      workspace_id: workspace.id,
      title,
      question_text,
      type,
      trigger_type,
      status
    }])

  if (error) {
    console.error('Error creating prompt:', error)
    redirect('/prompts/create?message=Failed to create prompt')
  }

  revalidatePath('/prompts')
  redirect('/prompts')
}

export async function togglePromptStatus(promptId: string, currentStatus: string) {
  const supabase = await createClient()
  
  const newStatus = currentStatus === 'active' ? 'paused' : 'active'
  
  const { error } = await supabase
    .from('prompts')
    .update({ status: newStatus })
    .eq('id', promptId)

  if (error) {
    console.error('Error updating prompt status:', error)
    return { success: false }
  }

  revalidatePath('/prompts')
  return { success: true }
}

export async function updatePrompt(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const question_text = formData.get('question_text') as string
  const type = formData.get('type') as string
  const trigger_type = formData.get('trigger_type') as string
  const status = formData.get('status') as string

  const { error } = await supabase
    .from('prompts')
    .update({
      title,
      question_text,
      type,
      trigger_type,
      status
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating prompt:', error)
    redirect(`/prompts/${id}?message=Failed to update prompt`)
  }

  revalidatePath('/prompts')
  redirect('/prompts')
}

