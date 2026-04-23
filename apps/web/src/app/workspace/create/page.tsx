import { createWorkspace } from './actions'

export default async function CreateWorkspacePage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams

  return (
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
