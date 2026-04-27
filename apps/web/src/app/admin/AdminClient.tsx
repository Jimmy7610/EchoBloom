'use client'

import { 
  Database, 
  Trash2, 
  MessageSquare, 
  Bell, 
  Sparkles, 
  Layout, 
  RefreshCcw, 
  PlusCircle, 
  Play, 
  Pause, 
  Eye, 
  EyeOff,
  AlertTriangle
} from 'lucide-react'
import * as actions from './actions'

interface AdminClientProps {
  workspace: { id: string; name: string } | null
  counts: {
    promptCount: number
    responseCount: number
    notificationCount: number
    insightCount: number
  }
}

export function AdminClient({ workspace, counts }: AdminClientProps) {
  const { promptCount, responseCount, notificationCount, insightCount } = counts

  return (
    <div className="space-y-8 pb-20">
      
      {/* 1. System Status */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard title="Prompts" count={promptCount} icon={<MessageSquare className="w-4 h-4" />} />
        <StatusCard title="Responses" count={responseCount} icon={<Database className="w-4 h-4" />} />
        <StatusCard title="Notifications" count={notificationCount} icon={<Bell className="w-4 h-4" />} />
        <StatusCard title="Insights" count={insightCount} icon={<Sparkles className="w-4 h-4" />} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. Demo Data Tools */}
        <ToolSection 
          title="Demo Data Tools" 
          description="Manage feedback responses and dataset simulation."
          icon={<Database className="w-5 h-5 text-brand-400" />}
        >
          <div className="grid grid-cols-2 gap-3">
            <AdminButton action={() => actions.generateDemoResponsesAction(20)} label="Generate 20" />
            <AdminButton action={() => actions.generateDemoResponsesAction(100)} label="Generate 100" />
            <AdminButton action={() => actions.generateDemoResponsesAction(50, 'random')} label="Mixed Responses" />
            <AdminButton action={() => actions.generateDemoResponsesAction(15, 'negative-spike')} label="Negative Spike" variant="warning" />
            <AdminButton action={() => actions.generateDemoResponsesAction(10, 'onboarding')} label="Onboarding Feedback" />
            <AdminButton action={() => actions.clearDemoResponsesAction()} label="Clear Demo Data" variant="danger" icon={<Trash2 className="w-3.5 h-3.5" />} confirm />
            <AdminButton action={() => actions.resetDemoWorkspaceAction()} label="Reset Workspace" variant="danger" icon={<RefreshCcw className="w-3.5 h-3.5" />} className="col-span-2" confirm />
          </div>
        </ToolSection>

        {/* 3. Prompt Testing Tools */}
        <ToolSection 
          title="Prompt Testing" 
          description="Create and toggle various feedback prompt types."
          icon={<MessageSquare className="w-5 h-5 text-emerald-400" />}
        >
          <div className="grid grid-cols-2 gap-3">
            <AdminButton action={() => actions.createDemoPromptAction('text')} label="Text Prompt" icon={<PlusCircle className="w-3.5 h-3.5" />} />
            <AdminButton action={() => actions.createDemoPromptAction('emoji')} label="Emoji Prompt" icon={<PlusCircle className="w-3.5 h-3.5" />} />
            <AdminButton action={() => actions.createDemoPromptAction('rating')} label="Rating Prompt" icon={<PlusCircle className="w-3.5 h-3.5" />} />
            <div className="flex gap-2 col-span-2">
              <AdminButton action={() => actions.toggleAllDemoPromptsAction('active')} label="Activate All" icon={<Play className="w-3.5 h-3.5" />} className="flex-1" />
              <AdminButton action={() => actions.toggleAllDemoPromptsAction('paused')} label="Pause All" icon={<Pause className="w-3.5 h-3.5" />} className="flex-1" variant="secondary" />
            </div>
          </div>
        </ToolSection>

        {/* 4. Notification Testing Tools */}
        <ToolSection 
          title="Notifications" 
          description="Simulate system alerts and user milestones."
          icon={<Bell className="w-5 h-5 text-amber-400" />}
        >
          <div className="grid grid-cols-2 gap-3">
            <AdminButton action={() => actions.createDemoNotificationAction('general')} label="Test Notif" />
            <AdminButton action={() => actions.createDemoNotificationAction('negative-alert')} label="Sentiment Alert" variant="warning" />
            <AdminButton action={() => actions.createDemoNotificationAction('milestone')} label="Milestone Notif" />
            <div className="flex gap-2 col-span-2 mt-2">
              <AdminButton action={() => actions.markAllDemoNotificationsAction(false)} label="Mark Unread" icon={<EyeOff className="w-3.5 h-3.5" />} className="flex-1" variant="secondary" />
              <AdminButton action={() => actions.markAllDemoNotificationsAction(true)} label="Mark Read" icon={<Eye className="w-3.5 h-3.5" />} className="flex-1" variant="secondary" />
            </div>
          </div>
        </ToolSection>

        {/* 5. AI Testing Tools */}
        <ToolSection 
          title="AI Insights" 
          description="Verify LLM summary generation and fallback logic."
          icon={<Sparkles className="w-5 h-5 text-brand-400" />}
        >
          <div className="space-y-3">
            <AdminButton action={() => actions.triggerDemoAISummaryAction()} label="Generate Demo AI Summary" className="w-full" icon={<Sparkles className="w-3.5 h-3.5" />} />
            <div className="p-3 bg-surface-900/50 rounded-lg border border-surface-800 text-xs text-surface-400 flex items-start gap-2">
              <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <p>Manual verification: Click "Generate AI Summary" on the dashboard to test real OpenAI integration.</p>
            </div>
          </div>
        </ToolSection>

        {/* 6. Widget Testing Tools */}
        <ToolSection 
          title="Widget Testing" 
          description="Preview and embed the feedback collector."
          icon={<Layout className="w-5 h-5 text-indigo-400" />}
        >
          <div className="flex flex-col gap-2">
            <a 
              href="/responses" 
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              View Responses Page
            </a>
            <button 
              className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-surface-800 text-surface-300 border border-surface-700 hover:bg-surface-700 transition-all"
              onClick={() => {
                alert('Widget snippet copied to clipboard (Mocked)')
              }}
            >
              Copy Embed Snippet
            </button>
          </div>
        </ToolSection>
      </div>

      <div className="bg-rose-500/10 border border-rose-500/20 p-6 rounded-xl flex items-start gap-4">
        <div className="p-2 bg-rose-500/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-rose-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-rose-400">Critical Warning</h3>
          <p className="text-surface-400 mt-1">
            Actions performed here directly affect the database for the workspace **{workspace?.name || 'Loading...'}**. 
            Demo data tools are safe, but "Reset Workspace" will remove all demo prefixed content. 
            **Never** use destructive tools on real customer data.
          </p>
        </div>
      </div>
    </div>
  )
}

function StatusCard({ title, count, icon }: { title: string; count: number; icon: React.ReactNode }) {
  return (
    <div className="bg-surface-900 border border-surface-800 rounded-xl p-5 hover:border-surface-700 transition-colors shadow-sm">
      <div className="flex items-center gap-3 text-surface-400 mb-3">
        {icon}
        <span className="text-xs font-medium uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-bold text-surface-50">{count}</div>
    </div>
  )
}

function ToolSection({ title, description, icon, children }: { title: string; description: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-surface-900/50 border border-surface-800 rounded-2xl p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-1">
        {icon}
        <h2 className="text-lg font-semibold text-surface-100">{title}</h2>
      </div>
      <p className="text-sm text-surface-400 mb-6">{description}</p>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

function AdminButton({ 
  action, 
  label, 
  variant = 'primary', 
  icon, 
  className = '',
  confirm = false
}: { 
  action: () => Promise<any>, 
  label: string, 
  variant?: 'primary' | 'secondary' | 'danger' | 'warning',
  icon?: React.ReactNode,
  className?: string,
  confirm?: boolean
}) {
  const styles = {
    primary: 'bg-brand-500/10 text-brand-400 border-brand-500/20 hover:bg-brand-500/20',
    secondary: 'bg-surface-800 text-surface-300 border-surface-700 hover:bg-surface-700',
    danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
  }

  const handleClick = async () => {
    if (confirm && !window.confirm(`Are you sure you want to perform: ${label}?`)) return
    
    try {
      const res = await action()
      if (res.success) {
        // Success feedback would go here (e.g. toast)
        console.log('Action success:', label)
      }
    } catch (err) {
      console.error('Action failed:', err)
      alert('Action failed. Check console.')
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all active:scale-95 ${styles[variant]} ${className}`}
    >
      {icon}
      {label}
    </button>
  )
}
