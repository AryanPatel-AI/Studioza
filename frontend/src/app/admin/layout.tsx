import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Camera,
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  ChevronLeft,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user = { name: "Studio Director", email: "director@studioza.com" };
  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    user = {
      name: payload.name || "Studio Director",
      email: payload.email || "director@studioza.com",
    };
  } catch (e) {
    // Fallback if token is malformed
  }

  return (
    <div className="min-h-screen bg-[#070b16] flex text-neutral-100 font-sans selection:bg-amber-500 selection:text-black">
      {/* Sidebar: TONE 1 Twilight Blue Hour */}
      <aside className="w-64 bg-[#09132b]/95 border-r border-blue-500/20 flex flex-col justify-between backdrop-blur-xl">
        <div>
          {/* Studio Brand Header */}
          <div className="p-6 border-b border-blue-500/20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-500 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#08080a] rounded-[10px] flex items-center justify-center text-amber-400">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-tight block">
                  Studioza
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-sky-300/80 font-mono -mt-1 block">
                  Atelier Control
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/40 border border-transparent hover:border-blue-400/20 transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              Dashboard Overview
            </Link>
            <Link
              href="/admin/services"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/40 border border-transparent hover:border-blue-400/20 transition-all"
            >
              <Briefcase className="w-4 h-4 text-amber-400" />
              Session Tiers &amp; Pricing
            </Link>
            <Link
              href="/admin/portfolio"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/40 border border-transparent hover:border-blue-400/20 transition-all"
            >
              <ImageIcon className="w-4 h-4 text-amber-400" />
              Portfolio &amp; Archive Plates
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/40 border border-transparent hover:border-blue-400/20 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              Client Inquiries
            </Link>

            <div className="pt-4 border-t border-blue-500/20">
              <Link
                href="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sky-300 hover:text-white text-[11px] font-mono transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Return to Live Atelier
              </Link>
            </div>
          </nav>
        </div>

        {/* User Footer */}
        <div className="p-4 border-t border-blue-500/20 bg-[#070e20]/60">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-xs">
              {user.name[0]}
            </div>
            <div className="text-xs truncate">
              <p className="text-white font-medium truncate">{user.name}</p>
              <p className="text-neutral-400 text-[10px] truncate">{user.email}</p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              const { logoutAction } = await import("../actions");
              await logoutAction();
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 border border-rose-500/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Subtle dual tone ambient flares */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex-1 overflow-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}
