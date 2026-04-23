'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Inbox, Circle, CheckCircle2 } from 'lucide-react'
import { markAsRead, markAllAsRead } from '@/app/(dashboard)/notifications/actions'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  is_read: boolean
  created_at: string
}

interface NotificationBellProps {
  workspaceId: string
  initialNotifications: Notification[]
}

export function NotificationBell({ workspaceId, initialNotifications }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.is_read).length

  useEffect(() => {
    setNotifications(initialNotifications)
  }, [initialNotifications])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMarkAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
    await markAsRead(id)
  }

  const handleMarkAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    await markAllAsRead(workspaceId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-full transition-colors relative ${
          isOpen ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-slate-50 rounded-full">
                  <Inbox className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">No notifications yet</p>
                  <p className="text-xs text-slate-500 mt-1">We'll notify you here when you receive new significant feedback.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 group relative ${!n.is_read ? 'bg-indigo-50/30' : ''}`}
                  >
                    {!n.is_read && (
                      <Circle className="w-2 h-2 text-indigo-600 fill-indigo-600 shrink-0 mt-1.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium text-slate-900 leading-tight ${!n.is_read ? 'pr-6' : ''}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!n.is_read && (
                      <button 
                        onClick={() => handleMarkAsRead(n.id)}
                        className="absolute top-4 right-4 p-1 text-slate-300 hover:text-indigo-600 transition-colors"
                        title="Mark as read"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
