export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Generate and export insights.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Created</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3 text-right">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">Weekly Onboarding Summary</td>
              <td className="px-6 py-4 text-slate-500">Oct 12, 2026</td>
              <td className="px-6 py-4 text-slate-500">PDF</td>
              <td className="px-6 py-4 text-right text-indigo-600 font-medium hover:text-indigo-800 cursor-pointer">Download</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
