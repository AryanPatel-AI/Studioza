import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Images,
  BookOpen,
  Layers,
  MessageSquareQuote,
  Inbox,
  CalendarDays,
  FileImage,
  Users,
  BarChart3,
  Settings,
  ArrowUpRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "AI Curation", href: "/admin/curation", icon: Images, badge: "Multi-Agent" },
    { label: "Projects", href: "/admin/projects", icon: FolderKanban },
    { label: "Galleries", href: "/admin/galleries", icon: Images },
    { label: "Stories", href: "/admin/stories", icon: BookOpen },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "Inquiries CRM", href: "/admin/inquiries", icon: Inbox, badge: "3 New" },
    { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
    { label: "Clients & Vault", href: "/admin/clients", icon: Users, badge: "Active" },
    { label: "Media Library", href: "/admin/media", icon: FileImage },
    { label: "Users & Team", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] flex">
      {/* Editorial Admin Sidebar */}
      <aside className="w-64 bg-[#171717] text-[#F4F1EB] flex flex-col justify-between shrink-0 border-r border-white/10">
        <div>
          {/* Masthead */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
            <div>
              <Link href="/admin/dashboard" className="font-serif text-2xl text-white tracking-tight">
                STUDIOZA
              </Link>
              <span className="type-micro text-[#A39E96] block -mt-1 text-[9px]">
                STUDIO CMS &amp; CRM
              </span>
            </div>
            <Link
              href="/"
              target="_blank"
              title="View Public Site"
              className="text-[#A39E96] hover:text-white transition-colors p-1"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 text-xs type-meta rounded-xs text-[#A39E96] hover:text-white hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#A39E96] group-hover:text-[#CC5500] transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#CC5500] text-white px-1.5 py-0.5 rounded-xs text-[9px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Profile Status */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-2 bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-[#CC5500] text-white font-bold flex items-center justify-center text-xs">
              AP
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-white truncate">Aryan Patel</p>
              <p className="type-micro text-[#A39E96] text-[9px]">Studio Owner / Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
