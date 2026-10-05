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
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-copper-500/10 border border-copper-500/30 type-body-base text-copper-600 mb-3">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Server-Protected Admin Suite</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Platform Telemetry</h1>
        <p className="type-body-base text-foreground-muted mt-1">
          Cross-platform user accounts, digital projects, and storage assets recorded in PostgreSQL.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-sage-300/40 bg-sage-50">
          <div className="flex items-center justify-between">
            <span className="type-body-base text-foreground-muted">Registered Creators</span>
            <div className="w-8 h-8 rounded-lg bg-copper-500/10 text-copper-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">{totalUsers}</p>
          <p className="type-body-base text-foreground-muted mt-1">Authenticated accounts</p>
        </div>

        <div className="p-5 rounded-2xl border border-sage-300/40 bg-sage-50">
          <div className="flex items-center justify-between">
            <span className="type-body-base text-foreground-muted">Platform Projects</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">{totalProjects}</p>
          <p className="type-body-base text-foreground-muted mt-1">Across all users</p>
        </div>

        <div className="p-5 rounded-2xl border border-sage-300/40 bg-sage-50">
          <div className="flex items-center justify-between">
            <span className="type-body-base text-foreground-muted">Live Published</span>
            <div className="w-8 h-8 rounded-lg bg-sage-500/10 text-sage-400 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">{publishedProjects}</p>
          <p className="type-body-base text-foreground-muted mt-1">Publicly routed</p>
        </div>

        <div className="p-5 rounded-2xl border border-sage-300/40 bg-sage-50">
          <div className="flex items-center justify-between">
            <span className="type-body-base text-foreground-muted">Stored Assets</span>
            <div className="w-8 h-8 rounded-lg bg-stone-500/10 text-stone-400 flex items-center justify-center">
              <FileBox className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground mt-2">{totalAssets}</p>
          <p className="type-body-base text-foreground-muted mt-1">Images and media files</p>
        </div>
      </div>

      {/* Two Column Layout: Users & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Directory */}
        <div className="p-6 rounded-2xl border border-sage-300/40 bg-sage-50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Users className="w-4 h-4 text-copper-600" />
              <span>User Directory</span>
            </h2>
            <span className="type-body-base text-foreground-muted">{usersList.length} users</span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {usersList.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between type-body-base">
                <div>
                  <p className="text-foreground">{u.name || "Unnamed User"}</p>
                  <p className="type-body-base text-foreground-muted">{u.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="type-body-base px-2 py-0.5 rounded-full bg-sage-50/50 text-foreground border border-sage-300/40">
                    {u._count.projects} projects
                  </span>
                  <span
                    className={`type-body-base  uppercase px-2 py-0.5 rounded-full border ${
                      u.role === "admin"
                        ? "bg-copper-500/10 text-copper-600 border-copper-500/30"
                        : "bg-stone-500/10 text-foreground-muted border-stone-500/30"
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
        <div className="p-6 rounded-2xl border border-sage-300/40 bg-sage-50 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-copper-600" />
              <span>Platform Projects</span>
            </h2>
            <span className="type-body-base text-foreground-muted">{projectsList.length} recent</span>
          </div>

          <div className="divide-y divide-white/[0.06]">
            {projectsList.map((p) => (
              <div key={p.id} className="py-3 flex items-center justify-between type-body-base">
                <div>
                  <Link
                    href={`/projects/${p.id}`}
                    className="text-foreground hover:text-copper-600 transition-colors"
                  >
                    {p.name}
                  </Link>
                  <p className="type-body-base text-foreground-muted">
                    By {p.owner.name || p.owner.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`type-body-base  uppercase px-2 py-0.5 rounded-full border ${
                      p.status === "published"
                        ? "bg-sage-500/10 text-sage-400 border-sage-500/30"
                        : "bg-copper-500/10 text-copper-600 border-copper-500/30"
                    }`}
                  >
                    {p.status}
                  </span>

                  {p.status === "published" && (
                    <Link
                      href={`/p/${p.slug}`}
                      target="_blank"
                      className="p-1 rounded text-foreground-muted hover:text-foreground"
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
      <div className="p-6 rounded-2xl border border-sage-300/40 bg-sage-50 space-y-4">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-4 h-4 text-copper-600" />
          <span>Global Activity Audit Stream</span>
        </h2>

        <div className="divide-y divide-white/[0.06]">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="py-3 flex items-center justify-between type-body-base"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
                <span className="type-body-base text-foreground">
                  {act.type.replace(/_/g, " ")}
                </span>
                {act.user && (
                  <span className="text-foreground-muted type-body-base">
                    by {act.user.name || act.user.email}
                  </span>
                )}
                {act.project && (
                  <span className="text-copper-600 type-body-base">
                    [{act.project.name}]
                  </span>
                )}
              </div>

              <span className="text-foreground-muted type-body-base">
                {formatTimeAgo(act.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
