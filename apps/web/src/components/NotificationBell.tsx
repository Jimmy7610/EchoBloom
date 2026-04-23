'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Inbox } from 'lucide-react'

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors ${
          isOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {/* We remove the red dot for now as there are no active notifications */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 border-b border-slate-100 font-semibold text-slate-900">
            Notifications
          </div>
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
            <div className="p-3 bg-slate-50 rounded-full">
              <Inbox className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">No notifications yet</p>
              <p className="text-xs text-slate-500 mt-1">We'll notify you here when you receive new significant feedback.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
