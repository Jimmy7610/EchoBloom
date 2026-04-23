"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquarePlus, Inbox, BarChart3, Settings, Sprout, LogOut } from "lucide-react";
import { signout } from "@/app/(auth)/actions";

export function Sidebar({ userEmail, workspaceName }: { userEmail?: string, workspaceName?: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Prompts", href: "/prompts", icon: MessageSquarePlus },
    { name: "Responses", href: "/responses", icon: Inbox },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-64 bg-surface-900 border-r border-surface-800 h-screen flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-surface-800">
        <Link href="/dashboard" className="flex items-center gap-2 text-brand-500 font-bold text-xl">
          <Sprout className="w-6 h-6" />
          EchoBloom
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-brand-500/10 text-brand-400"
                  : "text-surface-400 hover:bg-surface-800 hover:text-surface-50"
              }`}
            >
              <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-brand-500" : "text-surface-500 group-hover:text-surface-300"}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-surface-800 border border-surface-700 flex items-center justify-center text-brand-400 font-bold text-xs shrink-0">
              {userEmail ? userEmail[0].toUpperCase() : "U"}
            </div>
            <div className="flex flex-col truncate pr-2">
              <span className="text-sm font-medium text-surface-50 truncate">{userEmail || "User"}</span>
              <span className="text-xs text-surface-400 truncate">{workspaceName || "Workspace"}</span>
            </div>
          </div>
          <button 
            onClick={() => signout()} 
            className="text-surface-500 hover:text-surface-300 transition-colors shrink-0"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
