import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { classifyResponseSentiment } from '@echobloom/ai'
import type { ResponseData } from '@echobloom/ai'

export default async function ResponsesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()

  if (!workspace) redirect('/workspace/create')

  // Fetch prompts for filter labels
  const { data: prompts } = await supabase
    .from('prompts')
    .select('id, title')
    .eq('workspace_id', workspace.id)

  const promptMap: Record<string, string> = {}
  for (const p of prompts || []) {
    promptMap[p.id] = p.title
  }

  // Fetch responses
  const { data: rawResponses } = await supabase
    .from('responses')
    .select('id, prompt_id, rating_value, emoji_value, text_value, session_id, created_at')
    .eq('workspace_id', workspace.id)
    .order('created_at', { ascending: false })
    .limit(100)

  const responses = (rawResponses || []) as (ResponseData & { session_id: string })[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Responses</h1>
        <p className="text-sm text-slate-500 mt-1">View raw feedback from your users.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {responses.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <p className="text-lg font-medium mb-1">No responses yet</p>
            <p className="text-sm">Activate a prompt and embed the widget to start collecting feedback.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Prompt</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Comment</th>
                <th className="px-6 py-3">Sentiment</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {responses.map((r) => {
                const sentiment = classifyResponseSentiment(r)
                const sentBadge = {
                  positive: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Positive' },
                  neutral: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Neutral' },
                  negative: { bg: 'bg-rose-50', text: 'text-rose-700', label: 'Negative' },
                }[sentiment.sentiment]

                const emojiMap: Record<string, string> = {
                  'love': '😍', 'happy': '😊', 'neutral': '😐', 'sad': '😞', 'angry': '😠',
                }

                let typeLabel = 'text'
                let valueDisplay = '—'
                if (r.rating_value != null) {
                  typeLabel = 'rating'
                  valueDisplay = `⭐ ${r.rating_value}/5`
                } else if (r.emoji_value) {
                  typeLabel = 'emoji'
                  valueDisplay = emojiMap[r.emoji_value] || r.emoji_value
                }

                return (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {promptMap[r.prompt_id] || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-slate-500 capitalize">{typeLabel}</td>
                    <td className="px-6 py-4 text-slate-700">{valueDisplay}</td>
                    <td className="px-6 py-4 text-slate-600 max-w-[250px] truncate">
                      {r.text_value || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sentBadge.bg} ${sentBadge.text}`}>
                        {sentBadge.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
