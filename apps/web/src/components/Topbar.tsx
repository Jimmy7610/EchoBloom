import { Search, Sprout } from "lucide-react";
import Link from "next/link";
import { TopbarActions } from "./TopbarActions";

export function Topbar({ workspaceId, initialNotifications }: { workspaceId: string, initialNotifications: any[] }) {
  return (
    <header className="h-16 bg-surface-950/80 backdrop-blur-md border-b border-surface-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Link href="/dashboard" className="md:hidden flex items-center gap-2 text-brand-500 font-bold text-lg mr-2">
          <Sprout className="w-5 h-5" />
          EchoBloom
        </Link>
        <div className="hidden sm:relative sm:block sm:w-64 group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-500 group-focus-within:text-brand-500 transition-colors" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-surface-900 border border-surface-800 rounded-lg text-sm text-surface-50 placeholder-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TopbarActions workspaceId={workspaceId} initialNotifications={initialNotifications} />
      </div>
    </header>
  );
}
