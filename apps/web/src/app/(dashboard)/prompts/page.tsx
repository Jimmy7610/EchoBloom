import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ToggleStatusButton } from './ToggleStatusButton'

export default async function PromptsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  let prompts: any[] = []
  if (user) {
    const { data: workspace } = await supabase
      .from('workspaces')
      .select('id')
      .eq('owner_user_id', user.id)
      .limit(1)
      .single()

    if (workspace) {
      const { data } = await supabase
        .from('prompts')
        .select('*')
        .eq('workspace_id', workspace.id)
        .order('created_at', { ascending: false })
      
      prompts = data || []
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prompts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your onboarding feedback prompts.</p>
        </div>
        <Link 
          href="/prompts/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          + Create Prompt
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Trigger</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {prompts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No prompts found. Create your first prompt to get started!
                </td>
              </tr>
            ) : (
              prompts.map((prompt) => (
                <tr key={prompt.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{prompt.title}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{prompt.question_text}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{prompt.trigger_type.replace('_', ' ')}</td>
                  <td className="px-6 py-4 text-slate-500 capitalize">{prompt.type}</td>
                  <td className="px-6 py-4">
                    <ToggleStatusButton promptId={prompt.id} currentStatus={prompt.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/prompts/${prompt.id}`}
                      className="text-indigo-600 font-medium hover:text-indigo-800"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
