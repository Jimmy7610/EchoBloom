import { createWorkspace } from './actions'

export default async function CreateWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams

  return (
    <div className="bg-surface-900 border border-surface-800 rounded-3xl p-8 shadow-2xl">
      <form className="flex flex-col gap-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-surface-50 tracking-tight">Create Workspace</h1>
          <p className="text-sm text-surface-400 mt-2">Let's set up your first workspace.</p>
        </div>
        
        {params?.message && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-center rounded-xl text-sm mb-2">
            {params.message}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-surface-300" htmlFor="name">
            Workspace Name
          </label>
          <input
            className="w-full rounded-xl px-4 py-3 bg-surface-800 border border-surface-700 text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
            name="name"
            placeholder="Acme Corp"
            required
          />
        </div>
        
        <button
          formAction={createWorkspace}
          className="w-full bg-brand-600 hover:bg-brand-500 text-white rounded-xl px-4 py-3 font-bold transition-all shadow-lg shadow-brand-500/10 active:scale-95 mt-2"
        >
          Create Workspace
        </button>
      </form>
    </div>
  )
}
