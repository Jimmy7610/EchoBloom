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
        <h1 className="text-2xl font-bold text-slate-900">Create Prompt</h1>
        <p className="text-sm text-slate-500 mt-1">Design a new in-app feedback prompt.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form action={createPrompt} className="space-y-6">
          {params?.message && (
            <p className="p-4 bg-rose-50 text-rose-700 rounded-md text-sm">
              {params.message}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="title">
              Internal Title
            </label>
            <input
              className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="title"
              placeholder="e.g., Setup Drop-off Pulse"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="question_text">
              Question Text
            </label>
            <input
              className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              name="question_text"
              placeholder="e.g., How easy was setup today?"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="type">
                Prompt Type
              </label>
              <select
                name="type"
                className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="emoji">Emoji Selection</option>
                <option value="rating">1-5 Rating</option>
                <option value="text">Free Text</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="trigger_type">
                Trigger Timing
              </label>
              <select
                name="trigger_type"
                className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="after_signup">After Signup</option>
                <option value="first_login">First Login</option>
                <option value="step_completed">Step Completed</option>
                <option value="time_active">Time Active (5 mins)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="status">
              Initial Status
            </label>
            <select
              name="status"
              className="w-full rounded-md px-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="active">Active (Publish Immediately)</option>
              <option value="paused">Paused (Draft)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <a href="/prompts" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              Cancel
            </a>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 text-sm font-medium transition-colors"
            >
              Save Prompt
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
