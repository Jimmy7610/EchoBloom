export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of your real-time feedback and onboarding sentiment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Response Rate</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">32%</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Avg Sentiment</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">Positive</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Negative Alerts</h3>
          <p className="text-3xl font-bold text-rose-600 mt-2">2</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500">Active Prompts</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">4</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 min-h-[400px]">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Sentiment Over Time</h2>
          <div className="h-full w-full flex items-center justify-center text-slate-400">
            [Chart Placeholder]
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">AI Summary</h2>
          <div className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              Users are generally positive, but frustration spikes after setup step 2. Most common complaint is unclear instructions.
            </p>
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-medium text-slate-900 mb-2">Suggested Actions:</h3>
              <ul className="text-sm text-slate-600 list-disc pl-4 space-y-1">
                <li>Simplify Step 2 copy</li>
                <li>Add progress indicator</li>
                <li>Improve integrations messaging</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
