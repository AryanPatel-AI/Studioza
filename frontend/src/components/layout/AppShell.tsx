"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileBox,
  Activity,
  Settings,
  ShieldAlert,
  LogOut,
  Menu,
  X,
  Plus,
  Layers,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

interface AppShellProps {
  children: React.ReactNode;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    avatarUrl?: string | null;
    role: string;
  };
}

export default function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Assets", href: "/assets", icon: FileBox },
    { name: "Activity", href: "/activity", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  if (user.role === "admin") {
    navigation.push({ name: "Admin Portal", href: "/admin", icon: ShieldAlert });
  }

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col md:flex-row">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d0d11] border-r border-white/[0.08] flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-white/[0.08]">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0d0d11] rounded-[10px] flex items-center justify-center text-amber-400">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-semibold text-base tracking-tight text-white block">
                  Studio
                </span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono block -mt-0.5">
                  Workspace
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Create Button */}
          <div className="p-3">
            <Link
              href="/projects?create=true"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-medium text-xs text-black bg-amber-400 hover:bg-amber-300 shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Project</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="px-3 py-2 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white/[0.08] text-amber-400 border border-amber-500/20 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-zinc-400"}`} />
                  <span>{item.name}</span>
                  {item.name === "Admin Portal" && (
                    <span className="ml-auto text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Admin
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between">
            <Link
              href="/settings"
              className="flex items-center gap-2.5 overflow-hidden"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-medium text-white truncate">
                  {user.name || "Studio Creator"}
                </p>
                <p className="text-[10px] text-zinc-400 truncate">{user.email}</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar on Mobile */}
        <header className="h-14 px-4 border-b border-white/[0.08] bg-[#0d0d11]/80 backdrop-blur-md flex items-center justify-between md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-semibold text-sm text-white">Studio</span>
          </div>

          <Link
            href="/projects?create=true"
            className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-medium text-black bg-amber-400"
          >
            <Plus className="w-3 h-3" />
            <span>New</span>
          </Link>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
