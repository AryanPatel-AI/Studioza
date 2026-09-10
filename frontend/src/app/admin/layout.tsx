import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Briefcase, Image as ImageIcon, MessageSquare, LogOut } from "lucide-react";

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

  // Basic JWT decode without verification (verification happens on backend APIs)
  let user = { name: "Admin User", email: "admin@example.com" };
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    user = { name: payload.name || "Admin", email: payload.email || "admin@example.com" };
  } catch (e) {
    // Fallback if token is malformed
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex text-neutral-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-xl font-bold text-white tracking-tight">Studio Admin</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage your business</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <Briefcase className="w-5 h-5" />
            Services
          </Link>
          <Link
            href="/admin/portfolio"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <ImageIcon className="w-5 h-5" />
            Portfolio
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Inquiries
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              {user.name[0]}
            </div>
            <div className="text-sm">
              <p className="text-white font-medium">{user.name}</p>
              <p className="text-neutral-400 text-xs truncate max-w-[120px]">{user.email}</p>
            </div>
          </div>
          <form action={async () => {
            "use server";
            const { logoutAction } = await import("../actions");
            await logoutAction();
          }}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
