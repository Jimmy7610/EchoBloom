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
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-sm text-slate-500 mt-1">Export your data and analyze performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Export Data</h2>
          <p className="text-sm text-slate-500 mb-6">Download all response data in CSV format for external analysis.</p>
          
          <ExportButton 
            data={responses || []} 
            promptMap={promptMap} 
            filename={`echobloom-export-${workspace.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.csv`} 
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Monthly Insights</h2>
          <p className="text-sm text-slate-500 mb-6">Automated PDF reports are coming soon in the production release.</p>
          <button disabled className="px-4 py-2 bg-slate-100 text-slate-400 rounded-md text-sm font-medium cursor-not-allowed">
            Generate PDF Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Export Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
            <span className="text-slate-500">Workspace</span>
            <span className="font-medium text-slate-900">{workspace.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
            <span className="text-slate-500">Total Responses</span>
            <span className="font-medium text-slate-900">{responses?.length || 0}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-50 text-sm">
            <span className="text-slate-500">File Format</span>
            <span className="font-medium text-slate-900">CSV (.csv)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
