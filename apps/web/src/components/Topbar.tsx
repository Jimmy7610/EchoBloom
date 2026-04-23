import { Search, Sprout } from "lucide-react";
import Link from "next/link";
import { TopbarActions } from "./TopbarActions";

export function Topbar({ workspaceId, initialNotifications }: { workspaceId: string, initialNotifications: any[] }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Link href="/" className="md:hidden flex items-center gap-2 text-indigo-600 font-bold text-lg mr-2">
          <Sprout className="w-5 h-5" />
          EchoBloom
        </Link>
        <div className="hidden sm:relative sm:block sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TopbarActions workspaceId={workspaceId} initialNotifications={initialNotifications} />
      </div>
    </header>
  );
}
