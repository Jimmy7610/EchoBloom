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
        <h1 className="text-2xl font-bold text-surface-50">Responses</h1>
        <p className="text-sm text-surface-400 mt-1">View raw feedback from your users.</p>
      </div>

      <div className="bg-surface-900 rounded-xl border border-surface-800 shadow-xl overflow-hidden">
        {responses.length === 0 ? (
          <div className="p-12 text-center text-surface-500">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-surface-800 flex items-center justify-center mb-2 text-2xl">
                📥
              </div>
              <p className="font-medium text-surface-300">No responses yet</p>
              <p className="text-xs">Activate a prompt and embed the widget to start collecting feedback.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-800/50 border-b border-surface-800 text-surface-400 font-medium">
                <tr>
                  <th className="px-6 py-4">Prompt</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Comment</th>
                  <th className="px-6 py-4">Sentiment</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800">
                {responses.map((r) => {
                  const sentiment = classifyResponseSentiment(r)
                  const sentBadge = {
                    positive: { bg: 'bg-emerald-500/10 border border-emerald-500/20', text: 'text-emerald-400', label: 'Positive' },
                    neutral: { bg: 'bg-surface-800 border border-surface-700', text: 'text-surface-300', label: 'Neutral' },
                    negative: { bg: 'bg-rose-500/10 border border-rose-500/20', text: 'text-rose-400', label: 'Negative' },
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
                    <tr key={r.id} className="hover:bg-surface-800/40 transition-colors group">
                      <td className="px-6 py-4 font-medium text-surface-50 group-hover:text-brand-400 transition-colors">
                        {promptMap[r.prompt_id] || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-surface-400">
                        <span className="px-2 py-1 rounded bg-surface-800 text-[10px] font-bold uppercase tracking-wider border border-surface-700">
                          {typeLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-surface-200">{valueDisplay}</td>
                      <td className="px-6 py-4 text-surface-400 max-w-[250px] truncate italic">
                        {r.text_value ? `"${r.text_value}"` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${sentBadge.bg} ${sentBadge.text}`}>
                          {sentBadge.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-surface-500 text-xs whitespace-nowrap text-right">
                        {new Date(r.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
