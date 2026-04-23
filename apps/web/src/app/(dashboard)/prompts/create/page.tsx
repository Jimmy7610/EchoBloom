import { createPrompt } from '../actions'

export default async function CreatePromptPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-surface-50">Create Prompt</h1>
        <p className="text-sm text-surface-400 mt-1">Design a new in-app feedback prompt.</p>
      </div>

      <div className="bg-surface-900 rounded-2xl border border-surface-800 shadow-xl p-8">
        <form action={createPrompt} className="space-y-6">
          {params?.message && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              {params.message}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-surface-300" htmlFor="title">
              Internal Title
            </label>
            <input
              className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              name="title"
              placeholder="e.g., Setup Drop-off Pulse"
              required
            />
            <p className="text-[10px] text-surface-500 uppercase tracking-wider font-bold">Visible only to your team</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-surface-300" htmlFor="question_text">
              Question Text
            </label>
            <input
              className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
              name="question_text"
              placeholder="e.g., How easy was setup today?"
              required
            />
            <p className="text-[10px] text-surface-500 uppercase tracking-wider font-bold">This is what your users will see</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-surface-300" htmlFor="type">
                Prompt Type
              </label>
              <select
                name="type"
                className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394A3B8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                required
              >
                <option value="emoji">Emoji Selection</option>
                <option value="rating">1-5 Rating</option>
                <option value="text">Free Text</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-surface-300" htmlFor="trigger_type">
                Trigger Timing
              </label>
              <select
                name="trigger_type"
                className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394A3B8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
                required
              >
                <option value="after_signup">After Signup</option>
                <option value="first_login">First Login</option>
                <option value="step_completed">Step Completed</option>
                <option value="time_active">Time Active (5 mins)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-surface-300" htmlFor="status">
              Initial Status
            </label>
            <select
              name="status"
              className="w-full rounded-xl px-4 py-2.5 bg-surface-800 border border-surface-700 text-surface-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all appearance-none"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394A3B8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25rem' }}
            >
              <option value="active">Active (Publish Immediately)</option>
              <option value="paused">Paused (Draft)</option>
            </select>
          </div>

          <div className="pt-6 border-t border-surface-800 flex justify-end gap-4">
            <a href="/prompts" className="px-4 py-2.5 text-sm font-semibold text-surface-400 hover:text-surface-50 transition-colors">
              Cancel
            </a>
            <button
              type="submit"
              className="bg-brand-600 hover:bg-brand-500 text-white rounded-xl px-8 py-2.5 text-sm font-bold transition-all shadow-lg shadow-brand-500/10 active:scale-95"
            >
              Save Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
