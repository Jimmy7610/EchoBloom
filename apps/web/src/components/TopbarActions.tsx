'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'
import { NotificationBell } from './NotificationBell'
import { HelpModal } from './HelpModal'

export function TopbarActions({ workspaceId, initialNotifications }: { workspaceId: string, initialNotifications: any[] }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => setIsHelpOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all group"
      >
        <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm font-medium hidden sm:inline">What is EchoBloom?</span>
      </button>

      <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

      <NotificationBell workspaceId={workspaceId} initialNotifications={initialNotifications} />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  )
}
