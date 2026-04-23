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
          <h1 className="text-2xl font-bold text-surface-50">Prompts</h1>
          <p className="text-sm text-surface-400 mt-1">Manage your onboarding feedback prompts.</p>
        </div>
        <Link 
          href="/prompts/create"
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-brand-500/10 active:scale-95"
        >
          + Create Prompt
        </Link>
      </div>

      <div className="bg-surface-900 rounded-xl border border-surface-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface-800/50 border-b border-surface-800 text-surface-400 font-medium">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Trigger</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800">
              {prompts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-surface-500">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-surface-800 flex items-center justify-center mb-2">
                        <span className="text-2xl">🌱</span>
                      </div>
                      <p className="font-medium text-surface-300">No prompts found</p>
                      <p className="text-xs">Create your first prompt to get started!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                prompts.map((prompt) => (
                  <tr key={prompt.id} className="hover:bg-surface-800/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-surface-50 group-hover:text-brand-400 transition-colors">{prompt.title}</div>
                      <div className="text-xs text-surface-500 truncate max-w-[200px]">{prompt.question_text}</div>
                    </td>
                    <td className="px-6 py-4 text-surface-400">
                      <span className="px-2 py-1 rounded bg-surface-800 text-[10px] font-bold uppercase tracking-wider border border-surface-700">
                        {prompt.trigger_type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-surface-400 capitalize">{prompt.type}</td>
                    <td className="px-6 py-4">
                      <ToggleStatusButton promptId={prompt.id} currentStatus={prompt.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/prompts/${prompt.id}`}
                        className="text-brand-400 font-semibold hover:text-brand-300 transition-colors"
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
    </div>
  );
}
