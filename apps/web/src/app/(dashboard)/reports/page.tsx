import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ExportButton } from './ExportButton'

export default async function ReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id, name')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()

  if (!workspace) redirect('/workspace/create')

  // Fetch responses for export
  const { data: responses } = await supabase
    .from('responses')
    .select('id, prompt_id, rating_value, emoji_value, text_value, created_at')
    .eq('workspace_id', workspace.id)
    .order('created_at', { ascending: false })

  // Fetch prompts for mapping
  const { data: prompts } = await supabase
    .from('prompts')
    .select('id, title')
    .eq('workspace_id', workspace.id)

  const promptMap: Record<string, string> = {}
  prompts?.forEach(p => promptMap[p.id] = p.title)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-50">Reports</h1>
          <p className="text-sm text-surface-400 mt-1">Export your data and analyze performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-900 p-8 rounded-2xl border border-surface-800 shadow-xl relative overflow-hidden group hover:border-brand-500/30 transition-all">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors"></div>
          <h2 className="text-xl font-bold text-surface-50 mb-3 flex items-center gap-2">
            📊 Export Data
          </h2>
          <p className="text-sm text-surface-400 mb-8 leading-relaxed">Download all response data in CSV format for deep-dive analysis in your favorite tools.</p>
          
          <ExportButton 
            data={responses || []} 
            promptMap={promptMap} 
            filename={`echobloom-export-${workspace.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`} 
          />
        </div>

        <div className="bg-surface-900 p-8 rounded-2xl border border-surface-800 shadow-xl opacity-60">
          <h2 className="text-xl font-bold text-surface-300 mb-3 flex items-center gap-2">
            📄 Monthly Insights
          </h2>
          <p className="text-sm text-surface-500 mb-8 leading-relaxed">Automated PDF reports with AI trend analysis are coming soon in the production release.</p>
          <button disabled className="px-6 py-2.5 bg-surface-800 text-surface-500 rounded-xl text-sm font-bold border border-surface-700 cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>

      <div className="bg-surface-900 rounded-2xl border border-surface-800 shadow-xl p-8">
        <h2 className="text-lg font-bold text-surface-50 mb-6">Export Summary</h2>
        <div className="space-y-1">
          <div className="flex justify-between py-3 border-b border-surface-800 text-sm">
            <span className="text-surface-400 font-medium">Workspace</span>
            <span className="font-bold text-surface-50">{workspace.name}</span>
          </div>
          <div className="flex justify-between py-3 border-b border-surface-800 text-sm">
            <span className="text-surface-400 font-medium">Total Responses</span>
            <span className="font-bold text-surface-50">{responses?.length || 0}</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span className="text-surface-400 font-medium">File Format</span>
            <span className="font-bold text-surface-50">CSV (.csv)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
