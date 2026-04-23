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
          isOpen ? 'bg-surface-800 text-surface-50' : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800/50'
        }`}
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-surface-950"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-900 rounded-xl shadow-2xl border border-surface-800 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="p-4 border-b border-surface-800 flex items-center justify-between">
            <h3 className="font-semibold text-surface-50">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllAsRead}
                className="text-xs font-medium text-brand-400 hover:text-brand-300"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="p-3 bg-surface-800 rounded-full">
                  <Inbox className="w-6 h-6 text-surface-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-surface-50">No notifications yet</p>
                  <p className="text-xs text-surface-400 mt-1">We'll notify you here when you receive new significant feedback.</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-surface-800">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-4 hover:bg-surface-800/50 transition-colors flex gap-3 group relative ${!n.is_read ? 'bg-brand-500/5' : ''}`}
                  >
                    {!n.is_read && (
                      <Circle className="w-2 h-2 text-brand-500 fill-brand-500 shrink-0 mt-1.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium text-surface-50 leading-tight ${!n.is_read ? 'pr-6' : ''}`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-surface-400 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-surface-500 mt-2">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                    </div>
                    {!n.is_read && (
                      <button 
                        onClick={() => handleMarkAsRead(n.id)}
                        className="absolute top-4 right-4 p-1 text-surface-500 hover:text-brand-400 transition-colors"
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
