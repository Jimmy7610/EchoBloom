'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Settings as SettingsIcon, Terminal } from 'lucide-react'

interface Workspace {
  id: string
  name: string
}

export function SettingsContent({ 
  workspace 
}: { 
  workspace: Workspace 
}) {
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const embedCode = `<script 
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/echobloom-widget.iife.js" 
  data-workspace-id="${workspace.id}"
  data-api-url="${typeof window !== 'undefined' ? window.location.origin : ''}"
></script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-50">Settings</h1>
        <p className="text-sm text-surface-400 mt-1">Manage your workspace and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Widget Embed Section */}
        <div className="bg-surface-900 rounded-2xl border border-surface-800 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-surface-800">
            <h2 className="text-lg font-bold text-surface-50 flex items-center gap-2">
              <span className="p-1.5 bg-brand-500/10 rounded-lg">
                <Terminal className="w-5 h-5 text-brand-400" />
              </span>
              Widget Installation
            </h2>
            <p className="text-sm text-surface-400 mt-1">Copy and paste this snippet before the closing &lt;/body&gt; tag of your website.</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="relative group">
              <pre className="text-brand-300 text-xs md:text-sm font-mono overflow-x-auto p-6 bg-surface-950 rounded-xl border border-surface-800 leading-relaxed shadow-inner">
                {embedCode}
              </pre>
              <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 bg-surface-800 hover:bg-surface-700 text-surface-300 rounded-lg border border-surface-700 transition-all active:scale-95 group-hover:border-brand-500/50 shadow-lg"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-surface-500 bg-surface-800/30 w-fit px-3 py-1 rounded-full border border-surface-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live URL detected automatically
            </div>
          </div>
        </div>

        {/* Workspace Settings */}
        <div className="bg-surface-900 rounded-2xl border border-surface-800 shadow-xl p-8 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-brand-500/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <h2 className="text-lg font-bold text-surface-50 mb-6 flex items-center gap-2 relative z-10">
            <span className="p-1.5 bg-brand-500/10 rounded-lg">
              <SettingsIcon className="w-5 h-5 text-brand-400" />
            </span>
            Workspace Details
          </h2>
          
          <div className="max-w-md space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-surface-300">Workspace Name</label>
              <input
                type="text"
                defaultValue={workspace.name}
                className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-surface-300">Workspace ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={workspace.id}
                  readOnly
                  className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-800 text-surface-500 font-mono text-xs cursor-not-allowed pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                   <SettingsIcon className="w-3 h-3 text-surface-700" />
                </div>
              </div>
              <p className="text-[10px] text-surface-600 uppercase tracking-wider font-bold">Unique identifier for your API requests</p>
            </div>
            <div className="pt-2">
              <button className="bg-brand-600 hover:bg-brand-500 text-white rounded-xl px-8 py-2.5 text-sm font-bold transition-all shadow-lg shadow-brand-500/10 active:scale-95">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
