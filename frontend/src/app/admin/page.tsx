import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import Link from "next/link";
import {
  Users,
  FolderKanban,
  Globe,
  FileBox,
  Shield,
  Clock,
  ExternalLink,
  ShieldAlert,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { formatDate, formatTimeAgo } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalProjects,
    publishedProjects,
    totalAssets,
    usersList,
    projectsList,
    recentActivities,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),
    prisma.asset.count(),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        _count: {
          select: { projects: true, assets: true },
        },
      },
    }),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10,
      include: {
        owner: {
          select: { name: true, email: true },
        },
      },
    }),
    prisma.activity.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: { select: { name: true, email: true } },
        project: { select: { name: true, slug: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-400 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Server-Protected Admin Suite</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Platform Telemetry</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Cross-platform user accounts, digital projects, and storage assets recorded in PostgreSQL.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Registered Creators</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2 font-mono">{totalUsers}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Authenticated accounts</p>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Platform Projects</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2 font-mono">{totalProjects}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Across all users</p>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Live Published</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2 font-mono">{publishedProjects}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Publicly routed</p>
        </div>

        <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014]">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-medium">Stored Assets</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <FileBox className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-2 font-mono">{totalAssets}</p>
          <p className="text-[11px] text-zinc-500 mt-1">Images and media files</p>
        </div>
      </div>

      {/* Two Column Layout: Users & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Directory */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>User Directory</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">{usersList.length} users</span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {usersList.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-white">{u.name || "Unnamed User"}</p>
                  <p className="text-[11px] text-zinc-400">{u.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.08]">
                    {u._count.projects} projects
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      u.role === "admin"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-zinc-500/10 text-zinc-400 border-zinc-500/30"
                    }`}
                  >
                    {u.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Projects Overview */}
        <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-amber-400" />
              <span>Platform Projects</span>
            </h2>
            <span className="text-xs text-zinc-500 font-mono">{projectsList.length} recent</span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {projectsList.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <Link
                    href={`/projects/${p.id}`}
                    className="font-medium text-white hover:text-amber-400 transition-colors"
                  >
                    {p.name}
                  </Link>
                  <p className="text-[11px] text-zinc-400">
                    By {p.owner.name || p.owner.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                      p.status === "published"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {p.status}
                  </span>

                  {p.status === "published" && (
                    <Link
                      href={`/p/${p.slug}`}
                      target="_blank"
                      className="p-1 rounded text-zinc-400 hover:text-white"
                      title="View live"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Activity Stream */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-4">
        <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
          <Activity className="w-4 h-4 text-amber-400" />
          <span>Global Activity Audit Stream</span>
        </h2>

        <div className="divide-y divide-white/[0.06]">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="py-3 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="font-mono text-[11px] text-zinc-300">
                  {act.type.replace(/_/g, " ")}
                </span>
                {act.user && (
                  <span className="text-zinc-400 text-[11px]">
                    by {act.user.name || act.user.email}
                  </span>
                )}
                {act.project && (
                  <span className="text-amber-400 text-[11px] font-mono">
                    [{act.project.name}]
                  </span>
                )}
              </div>

              <span className="text-zinc-500 font-mono text-[11px]">
                {formatTimeAgo(act.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
