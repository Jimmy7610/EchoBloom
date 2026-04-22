'use client'

interface TrendDataPoint {
  date: string
  positive: number
  neutral: number
  negative: number
}

export function TrendChart({ data }: { data: TrendDataPoint[] }) {
  const maxVal = Math.max(...data.map(d => d.positive + d.neutral + d.negative), 1)

  return (
    <div className="w-full">
      <div className="flex items-end gap-2 h-[200px]">
        {data.map((d, i) => {
          const total = d.positive + d.neutral + d.negative
          const positiveH = total > 0 ? (d.positive / maxVal) * 180 : 0
          const neutralH = total > 0 ? (d.neutral / maxVal) * 180 : 0
          const negativeH = total > 0 ? (d.negative / maxVal) * 180 : 0

          const dayLabel = new Date(d.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })

          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1" title={`${d.date}: ${total} responses`}>
              <span className="text-xs font-medium text-slate-500 mb-1">{total > 0 ? total : ''}</span>
              <div className="w-full flex flex-col-reverse items-center">
                {negativeH > 0 && (
                  <div
                    className="w-full rounded-t-sm bg-rose-400 transition-all duration-500"
                    style={{ height: `${Math.max(negativeH, 4)}px` }}
                  />
                )}
                {neutralH > 0 && (
                  <div
                    className="w-full bg-slate-300 transition-all duration-500"
                    style={{ height: `${Math.max(neutralH, 4)}px` }}
                  />
                )}
                {positiveH > 0 && (
                  <div
                    className="w-full rounded-t-sm bg-emerald-400 transition-all duration-500"
                    style={{ height: `${Math.max(positiveH, 4)}px` }}
                  />
                )}
                {total === 0 && (
                  <div className="w-full rounded-sm bg-slate-100" style={{ height: '4px' }} />
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{dayLabel}</span>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-emerald-400" />
          <span className="text-xs text-slate-500">Positive</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-slate-300" />
          <span className="text-xs text-slate-500">Neutral</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-rose-400" />
          <span className="text-xs text-slate-500">Negative</span>
        </div>
      </div>
    </div>
  )
}
