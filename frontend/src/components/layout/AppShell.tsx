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
    { name: "Archive", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Plates", href: "/assets", icon: FileBox },
    { name: "Activity", href: "/activity", icon: Activity },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  if (user.role === "admin") {
    navigation.push({ name: "Studio Director", href: "/admin", icon: ShieldAlert });
  }

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-background border-r border-hairline flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-hairline">
            <Link
              href="/dashboard"
              className="flex flex-col group select-none"
              onClick={() => setMobileOpen(false)}
            >
              <span className="font-serif text-lg leading-none tracking-normal text-ink-primary">
                Studioza
              </span>
              <span className="type-mono-micro mt-1 text-ink-muted uppercase">
                Workspace
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="text-ink-muted hover:text-ink-primary md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" strokeWidth={1} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="px-4 py-8 space-y-2">
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
                  className={`flex items-center gap-3 px-3 py-2 type-ui-nav uppercase tracking-widest text-[11px] transition-colors ${
                    isActive
                      ? "text-ink-primary font-medium"
                      : "text-ink-muted hover:text-ink-primary"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-ink-primary" : "text-ink-muted"}`} strokeWidth={1.5} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-6 border-t border-hairline">
          <div className="flex items-center justify-between">
            <Link
              href="/settings"
              className="flex items-center gap-3 overflow-hidden group"
              onClick={() => setMobileOpen(false)}
            >
              <div className="w-8 h-8 rounded-none border border-hairline bg-stone-100 flex items-center justify-center font-serif text-ink-primary shrink-0 transition-colors group-hover:border-medium">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div className="overflow-hidden">
                <p className="type-mono-micro text-ink-primary truncate">
                  {user.name || "Studio Creator"}
                </p>
                <p className="type-mono-micro text-ink-muted truncate opacity-70 mt-0.5">{user.email}</p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="text-ink-muted hover:text-copper-600 transition-colors shrink-0"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar on Mobile */}
        <header className="h-16 px-6 border-b border-hairline bg-background flex items-center justify-between md:hidden sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-ink-muted hover:text-ink-primary"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1} />
            </button>
            <span className="font-serif text-base text-ink-primary">Studioza</span>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-6 sm:p-12 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
