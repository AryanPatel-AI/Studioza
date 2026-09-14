import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import {
  Layers,
  LayoutDashboard,
  Users,
  FolderKanban,
  FileBox,
  Activity,
  LogOut,
  ChevronLeft,
  ShieldCheck,
} from "lucide-react";
import { logoutUser } from "@/app/actions/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  // Strict server-side authorization check
  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#08080a] flex text-zinc-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-[#0d0d11] border-r border-white/[0.08] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center gap-3 border-b border-white/[0.08]">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md shadow-amber-500/20">
              <div className="w-full h-full bg-[#0d0d11] rounded-[10px] flex items-center justify-center text-amber-400">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-semibold text-sm text-white tracking-tight block">
                Studio Admin
              </span>
              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-mono block -mt-0.5">
                System Oversight
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/[0.08] text-amber-400 border border-amber-500/20 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>Platform Overview</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Workspace</span>
            </Link>
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              {user.name ? user.name[0].toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] text-amber-400 font-mono uppercase">Admin Authority</p>
            </div>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
