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
    <div className="min-h-screen bg-background flex text-foreground selection:bg-copper-500 selection:text-sage-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-sage-50 border-r border-sage-300/40 flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center gap-3 border-b border-sage-300/40">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-copper-500 to-copper-300 p-0.5 shadow-md shadow-copper-500/20">
              <div className="w-full h-full bg-sage-50 rounded-[10px] flex items-center justify-center text-copper-600">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="font-semibold text-sm text-foreground block">
                Studio Admin
              </span>
              <span className="type-body-base text-copper-600 block -mt-0.5">
                System Oversight
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-3 space-y-1 type-body-base">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-sage-50/50 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Platform Overview</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-sage-50/50 transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Inquiries</span>
            </Link>
            <Link
              href="/admin/portfolio"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-sage-50/50 transition-all"
            >
              <FolderKanban className="w-4 h-4" />
              <span>Portfolio</span>
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-sage-50/50 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Services</span>
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 mt-4 rounded-xl text-foreground-muted hover:text-foreground hover:bg-sage-50/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Return to Workspace</span>
            </Link>
          </nav>
        </div>

        {/* User Footer Profile & Sign Out */}
        <div className="p-3 border-t border-sage-300/40">
          <div className="p-2.5 rounded-xl bg-sage-50/50 border border-sage-300/40 mb-2 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-copper-500/20 border border-copper-500/40 text-copper-600 flex items-center justify-center font-bold type-body-base shrink-0">
              {user.name ? user.name[0].toUpperCase() : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="type-body-base text-foreground truncate">{user.name}</p>
              <p className="type-body-base text-copper-600">Admin Authority</p>
            </div>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl type-body-base text-copper-300 hover:text-copper-100 hover:bg-copper-950/40 border border-copper-500/20 transition-colors cursor-pointer"
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
