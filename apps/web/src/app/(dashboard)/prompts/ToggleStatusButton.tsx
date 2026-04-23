'use client'

import { useTransition } from 'react'
import { togglePromptStatus } from './actions'

export function ToggleStatusButton({ promptId, currentStatus }: { promptId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  
  const isActive = currentStatus === 'active'

  return (
    <button
      onClick={() => {
        startTransition(() => {
          togglePromptStatus(promptId, currentStatus)
        })
      }}
      disabled={isPending}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold transition-all border ${
        isActive 
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
          : 'bg-surface-800 text-surface-400 border-surface-700 hover:bg-surface-700'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}`}
    >
      {isPending ? 'Updating...' : isActive ? 'Active' : 'Paused'}
    </button>
  )
}
