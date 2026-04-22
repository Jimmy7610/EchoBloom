import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
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

  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/echobloom-widget.iife.js" 
  data-workspace-id="${workspace.id}"
  data-api-url="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}"
></script>`

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your workspace and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Widget Embed Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">Widget Installation</h2>
            <p className="text-sm text-slate-500 mt-1">Copy and paste this snippet before the closing &lt;/body&gt; tag of your website.</p>
          </div>
          <div className="p-6 bg-slate-900">
            <pre className="text-indigo-300 text-xs md:text-sm font-mono overflow-x-auto p-4 bg-slate-800 rounded-lg border border-slate-700">
              {embedCode}
            </pre>
            <button 
              className="mt-4 text-xs font-medium text-white hover:text-indigo-300 transition-colors flex items-center gap-2"
            >
              Copy to Clipboard
            </button>
          </div>
        </div>

        {/* Workspace Settings */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Workspace Details</h2>
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Workspace Name</label>
              <input
                type="text"
                defaultValue={workspace.name}
                className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Workspace ID</label>
              <input
                type="text"
                value={workspace.id}
                readOnly
                className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-500 font-mono text-xs cursor-not-allowed"
              />
            </div>
            <div className="pt-2">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 text-sm font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
