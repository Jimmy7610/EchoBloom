import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { generateSummary, classifyResponseSentiment } from '@echobloom/ai'
import type { ResponseData } from '@echobloom/ai'
import { TrendChart } from '../TrendChart'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Get workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('owner_user_id', user.id)
    .limit(1)
    .single()

  if (!workspace) redirect('/workspace/create')

  // Fetch active prompts count
  const { count: activePromptsCount } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('workspace_id', workspace.id)
    .eq('status', 'active')

  // Fetch all responses
  const { data: rawResponses } = await supabase
    .from('responses')
    .select('id, prompt_id, rating_value, emoji_value, text_value, created_at')
    .eq('workspace_id', workspace.id)
    .order('created_at', { ascending: false })

  const responses: ResponseData[] = rawResponses || []
  const totalResponses = responses.length

  // Run AI analysis
  const aiSummary = generateSummary(responses)

  // Build daily trend data (last 7 days)
  const trendData = buildDailyTrend(responses)

  // Sentiment badge
  const sentimentLabel = aiSummary.overallSentiment.charAt(0).toUpperCase() + aiSummary.overallSentiment.slice(1)
  const sentimentColor = {
    positive: 'text-emerald-600',
    neutral: 'text-slate-600',
    negative: 'text-rose-600',
  }[aiSummary.overallSentiment]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-50">Dashboard</h1>
        <p className="text-sm text-surface-400 mt-1">Overview of your real-time feedback and onboarding sentiment.</p>
      </div>

      {/* Getting Started Checklist (Onboarding) */}
      {(responses.length === 0 || activePromptsCount === 0) && (
        <div className="bg-brand-500/5 rounded-xl border border-brand-500/20 p-6 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <h2 className="text-lg font-semibold text-brand-300 mb-4 flex items-center gap-2 relative z-10">
            🚀 Getting Started Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className={`p-4 rounded-xl border transition-all ${activePromptsCount! > 0 ? 'bg-surface-800/50 border-emerald-500/30' : 'bg-surface-800 border-surface-700 hover:border-brand-500/50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activePromptsCount! > 0 ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white'}`}>
                  {activePromptsCount! > 0 ? '✓' : '1'}
                </div>
                <h3 className="font-medium text-surface-50">Create a Prompt</h3>
              </div>
              <p className="text-xs text-surface-400 mb-3">Design your first feedback question.</p>
              {activePromptsCount! === 0 && (
                <Link href="/prompts/create" className="text-xs font-semibold text-brand-400 hover:text-brand-300 hover:underline">Create now &rarr;</Link>
              )}
            </div>
            
            <div className={`p-4 rounded-xl border transition-all ${responses.length > 0 ? 'bg-surface-800/50 border-emerald-500/30' : 'bg-surface-800 border-surface-700 hover:border-brand-500/50'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${responses.length > 0 ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white'}`}>
                  {responses.length > 0 ? '✓' : '2'}
                </div>
                <h3 className="font-medium text-surface-50">Embed Widget</h3>
              </div>
              <p className="text-xs text-surface-400 mb-3">Install the snippet in your app.</p>
              {responses.length === 0 && (
                <Link href="/settings" className="text-xs font-semibold text-brand-400 hover:text-brand-300 hover:underline">Get code &rarr;</Link>
              )}
            </div>

            <div className={`p-4 rounded-xl border transition-all ${responses.length > 0 ? 'bg-surface-800/50 border-emerald-500/30' : 'bg-surface-800 border-surface-700'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${responses.length > 0 ? 'bg-emerald-500 text-white' : 'bg-brand-600 text-white'}`}>
                  {responses.length > 0 ? '✓' : '3'}
                </div>
                <h3 className="font-medium text-surface-50">Get Insights</h3>
              </div>
              <p className="text-xs text-surface-400 mb-3">AI will analyze your first response.</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-900 p-6 rounded-xl border border-surface-800 shadow-sm transition-all hover:border-surface-700">
          <h3 className="text-sm font-medium text-surface-400">Total Responses</h3>
          <p className="text-3xl font-bold text-surface-50 mt-2">{totalResponses}</p>
        </div>
        <div className="bg-surface-900 p-6 rounded-xl border border-surface-800 shadow-sm transition-all hover:border-surface-700">
          <h3 className="text-sm font-medium text-surface-400">Active Prompts</h3>
          <p className="text-3xl font-bold text-surface-50 mt-2">{activePromptsCount ?? 0}</p>
        </div>
        <div className="bg-surface-900 p-6 rounded-xl border border-surface-800 shadow-sm transition-all hover:border-surface-700">
          <h3 className="text-sm font-medium text-surface-400">Avg Sentiment</h3>
          <p className={`text-3xl font-bold mt-2 ${sentimentColor}`}>{sentimentLabel}</p>
        </div>
        <div className="bg-surface-900 p-6 rounded-xl border border-surface-800 shadow-sm transition-all hover:border-surface-700">
          <h3 className="text-sm font-medium text-surface-400">Negative Alerts</h3>
          <p className={`text-3xl font-bold mt-2 ${aiSummary.negativeCount > 0 ? 'text-rose-500' : 'text-surface-50'}`}>
            {aiSummary.negativeCount}
          </p>
        </div>
      </div>

      {/* Chart + AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-900 rounded-xl border border-surface-800 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-surface-50 mb-4">Responses Over Time</h2>
          <TrendChart data={trendData} />
        </div>

        <div className="bg-surface-900 rounded-xl border border-surface-800 shadow-sm p-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <h2 className="text-lg font-semibold text-surface-50 mb-4 relative z-10 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            AI Summary
          </h2>
          <div className="space-y-4 relative z-10">
            {/* Sentiment Breakdown */}
            <div className="flex gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                👍 {aiSummary.sentimentBreakdown.positive}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-800 text-surface-300 border border-surface-700">
                😐 {aiSummary.sentimentBreakdown.neutral}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                👎 {aiSummary.sentimentBreakdown.negative}
              </span>
            </div>

            <p className="text-sm text-surface-400 leading-relaxed">
              {aiSummary.summary}
            </p>

            {/* Themes */}
            {aiSummary.themes.length > 0 && (
              <div className="pt-4 border-t border-surface-800">
                <h3 className="text-sm font-medium text-surface-50 mb-2">Recurring Themes:</h3>
                <div className="flex flex-wrap gap-2">
                  {aiSummary.themes.map((theme, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Actions */}
            <div className="pt-4 border-t border-surface-800">
              <h3 className="text-sm font-medium text-surface-50 mb-2">Suggested Actions:</h3>
              <ul className="text-sm text-surface-400 list-disc pl-4 space-y-1">
                {aiSummary.suggestedActions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Responses */}
      <div className="bg-surface-900 rounded-xl border border-surface-800 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-surface-50 mb-4">Recent Responses</h2>
        {responses.length === 0 ? (
          <p className="text-sm text-surface-500 text-center py-8">No responses yet. Activate a prompt and embed the widget to start collecting feedback.</p>
        ) : (
          <div className="divide-y divide-surface-800">
            {responses.slice(0, 5).map((r) => {
              const sentiment = classifyResponseSentiment(r)
              const sentBadge = {
                positive: { bg: 'bg-emerald-500/10 border border-emerald-500/20', text: 'text-emerald-400', label: 'Positive' },
                neutral: { bg: 'bg-surface-800 border border-surface-700', text: 'text-surface-300', label: 'Neutral' },
                negative: { bg: 'bg-rose-500/10 border border-rose-500/20', text: 'text-rose-400', label: 'Negative' },
              }[sentiment.sentiment]

              return (
                <div key={r.id} className="py-3 flex items-start justify-between gap-4 group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {r.emoji_value && <span className="text-lg">{emojiDisplay(r.emoji_value)}</span>}
                      {r.rating_value != null && (
                        <span className="text-sm font-medium text-surface-300">⭐ {r.rating_value}/5</span>
                      )}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sentBadge.bg} ${sentBadge.text}`}>
                        {sentBadge.label}
                      </span>
                    </div>
                    {r.text_value && (
                      <p className="text-sm text-surface-400 truncate">{r.text_value}</p>
                    )}
                  </div>
                  <span className="text-xs text-surface-500 whitespace-nowrap">
                    {new Date(r.created_at).toLocaleDateString()}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function emojiDisplay(value: string): string {
  const map: Record<string, string> = {
    'love': '😍', 'happy': '😊', 'neutral': '😐', 'sad': '😞', 'angry': '😠',
  }
  return map[value] || value
}

function buildDailyTrend(responses: ResponseData[]): { date: string; positive: number; neutral: number; negative: number }[] {
  const days: Record<string, { positive: number; neutral: number; negative: number }> = {}

  // Initialize last 7 days
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]
    days[key] = { positive: 0, neutral: 0, negative: 0 }
  }

  for (const r of responses) {
    const dateKey = r.created_at.split('T')[0]
    if (days[dateKey]) {
      const s = classifyResponseSentiment(r)
      days[dateKey][s.sentiment]++
    }
  }

  return Object.entries(days).map(([date, counts]) => ({
    date,
    ...counts,
  }))
}
