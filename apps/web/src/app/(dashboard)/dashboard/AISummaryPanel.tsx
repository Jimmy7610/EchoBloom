'use client'

import { useState } from 'react'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react'
import type { AISummary } from '@echobloom/ai'

interface DBInsight {
  id: string
  summary: string
  themes: string[]
  suggested_actions: string[]
  sentiment_distribution: { positive: number; neutral: number; negative: number }
  risk_level: string | null
  updated_at: string
}

interface AISummaryPanelProps {
  workspaceId: string
  fallbackSummary: AISummary
  initialInsight: DBInsight | null
  responseCount: number
}

export function AISummaryPanel({ workspaceId, fallbackSummary, initialInsight, responseCount }: AISummaryPanelProps) {
  const [insight, setInsight] = useState<DBInsight | null>(initialInsight)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (responseCount === 0) {
      setError('Cannot generate AI summary without responses.')
      return
    }

    try {
      setIsGenerating(true)
      setError(null)
      
      const res = await fetch('/api/v1/insights/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workspaceId })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate summary')
      }

      setInsight(data.insight)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  // Determine which data to show
  const hasDBInsight = !!insight
  
  // Use DB data if available, otherwise map fallback
  const displaySummary = hasDBInsight ? insight.summary : fallbackSummary.summary
  const displayThemes = hasDBInsight ? insight.themes : fallbackSummary.themes
  const displayActions = hasDBInsight ? insight.suggested_actions : fallbackSummary.suggestedActions
  const displayBreakdown = hasDBInsight ? insight.sentiment_distribution : fallbackSummary.sentimentBreakdown
  const displayRiskLevel = hasDBInsight ? insight.risk_level : null

  return (
    <div className="bg-surface-900 rounded-xl border border-surface-800 shadow-sm p-6 relative overflow-hidden flex flex-col h-full">
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <h2 className="text-lg font-semibold text-surface-50 flex items-center gap-2">
          {hasDBInsight ? (
            <Sparkles className="w-5 h-5 text-brand-400" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          )}
          AI Summary
        </h2>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || responseCount === 0}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          Generate AI Summary
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-start gap-2 relative z-10">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {responseCount === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8 relative z-10">
          <p className="text-sm text-surface-400 mb-2">No responses collected yet.</p>
          <p className="text-xs text-surface-500">Once users start submitting feedback, you can generate an AI summary here.</p>
        </div>
      ) : (
        <div className="space-y-4 relative z-10 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Sentiment Breakdown */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              👍 {displayBreakdown.positive}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-surface-800 text-surface-300 border border-surface-700">
              😐 {displayBreakdown.neutral}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
              👎 {displayBreakdown.negative}
            </span>
            {displayRiskLevel && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                displayRiskLevel.toLowerCase() === 'high' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                displayRiskLevel.toLowerCase() === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                Risk: {displayRiskLevel.charAt(0).toUpperCase() + displayRiskLevel.slice(1)}
              </span>
            )}
          </div>

          <p className="text-sm text-surface-300 leading-relaxed">
            {displaySummary}
          </p>

          {/* Themes */}
          {displayThemes.length > 0 && (
            <div className="pt-4 border-t border-surface-800">
              <h3 className="text-sm font-medium text-surface-50 mb-2">Recurring Themes:</h3>
              <div className="flex flex-wrap gap-2">
                {displayThemes.map((theme, i) => (
                  <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Actions */}
          {displayActions.length > 0 && (
            <div className="pt-4 border-t border-surface-800">
              <h3 className="text-sm font-medium text-surface-50 mb-2">Suggested Actions:</h3>
              <ul className="text-sm text-surface-400 list-disc pl-4 space-y-1">
                {displayActions.map((action, i) => (
                  <li key={i}>{action}</li>
                ))}
              </ul>
            </div>
          )}
          
          {hasDBInsight && (
            <p className="text-[10px] text-surface-500 pt-2 text-right">
              Generated: {new Date(insight.updated_at).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
