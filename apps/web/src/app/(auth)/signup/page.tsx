import { signup } from '../actions'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <h1 className="text-3xl font-bold mb-6 text-center text-slate-900">Create an Account</h1>
        
        {params?.message && (
          <p className="mt-4 p-4 bg-rose-50 text-rose-700 text-center rounded-md mb-4 text-sm">
            {params.message}
          </p>
        )}

        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button
          formAction={signup}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 font-medium transition-colors mb-2"
        >
          Sign Up
        </button>

        <div className="text-center mt-4 text-sm text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">
            Sign in
          </a>
        </div>
      </form>
    </div>
  )
}
