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
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
        isActive 
          ? 'bg-green-50 text-green-700 hover:bg-green-100' 
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {isPending ? 'Updating...' : isActive ? 'Active' : 'Paused'}
    </button>
  )
}
