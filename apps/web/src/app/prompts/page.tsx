export default function PromptsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prompts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your onboarding feedback prompts.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          + Create Prompt
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Trigger</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Responses</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">Setup Ease Check</td>
              <td className="px-6 py-4 text-slate-500">After Signup</td>
              <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Active</span></td>
              <td className="px-6 py-4 text-slate-500">124</td>
              <td className="px-6 py-4 text-right text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">Edit</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">Confusion Pulse</td>
              <td className="px-6 py-4 text-slate-500">Step 2</td>
              <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">Active</span></td>
              <td className="px-6 py-4 text-slate-500">87</td>
              <td className="px-6 py-4 text-right text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">Edit</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
