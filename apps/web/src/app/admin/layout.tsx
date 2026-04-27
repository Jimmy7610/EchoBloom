import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const adminEmails = [
    'eliassonjimmy76@gmail.com',
    'eliassonjimmy76+admin@gmail.com',
    process.env.ADMIN_EMAIL
  ].filter(Boolean)

  // Requirement A.1 & A.3: Only allow authenticated admin email
  if (!adminEmails.includes(user.email)) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-surface-950 text-surface-50 font-sans antialiased selection:bg-brand-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Admin Control Center
            </h1>
            <p className="text-surface-400 mt-2">Secure system testing and data management tools.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono bg-brand-500/10 text-brand-400 px-3 py-1 rounded-full border border-brand-500/20">
              Admin: {user.email}
            </span>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
