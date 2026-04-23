'use client'

import { X, Sprout, MessageSquarePlus, Activity, Download, Info } from 'lucide-react'
import Link from 'next/link'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
            <Sprout className="w-6 h-6" />
            What is EchoBloom?
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">The Platform</h2>
            <p className="text-slate-600 leading-relaxed">
              EchoBloom is an <strong>AI-powered onboarding feedback platform</strong> designed for SaaS teams. 
              We help you understand exactly how users feel at critical friction points in your application.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <MessageSquarePlus className="w-4 h-4" />
                  1. Create a Prompt
                </div>
                <p className="text-sm text-slate-500">Design questions using ratings, emojis, or text fields.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <Activity className="w-4 h-4" />
                  2. Activate & Embed
                </div>
                <p className="text-sm text-slate-500">Enable your prompt and add our <span className="font-mono text-xs bg-slate-100 px-1 rounded">15KB</span> script to your app.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <Info className="w-4 h-4" />
                  3. Collect Responses
                </div>
                <p className="text-sm text-slate-500">Users interact with the widget. Responses are captured in real-time.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-600 font-medium">
                  <Download className="w-4 h-4" />
                  4. Review Insights
                </div>
                <p className="text-sm text-slate-500">AI summarizes sentiment and extracts recurring themes automatically.</p>
              </div>
            </div>
          </section>

          <section className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
            <h2 className="text-indigo-900 font-semibold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
              Example Use Case
            </h2>
            <p className="text-indigo-800 text-sm italic">
              "Ask users how easy setup was immediately after they reach the dashboard. Review negative sentiment alerts to fix onboarding friction before they churn."
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-3 text-center">Ready to bloom?</h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/prompts/create" 
                onClick={onClose}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Your First Prompt
              </Link>
              <Link 
                href="/settings" 
                onClick={onClose}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors"
              >
                View Setup Instructions
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
