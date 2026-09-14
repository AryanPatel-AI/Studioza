import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/layout/AppShell";
import { formatDate, formatTimeAgo } from "@/lib/utils";
import {
  FolderKanban,
  FileCheck2,
  FileEdit,
  Layers,
  Plus,
  ArrowRight,
  ExternalLink,
  Clock,
  Sparkles,
  Activity as ActivityIcon,
  Globe,
  Settings,
} from "lucide-react";

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  // Fetch telemetry & projects for this user
  const [totalProjects, publishedCount, draftCount, recentProjects, recentActivities] =
    await Promise.all([
      prisma.project.count({ where: { ownerId: user.id } }),
      prisma.project.count({ where: { ownerId: user.id, status: "published" } }),
      prisma.project.count({ where: { ownerId: user.id, status: "draft" } }),
      prisma.project.findMany({
        where: { ownerId: user.id },
        orderBy: { updatedAt: "desc" },
        take: 6,
      }),
      prisma.activity.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { project: { select: { name: true, slug: true } } },
      }),
    ]);

  return (
    <AppShell user={user}>
      <div className="space-y-8">
        {/* Top Welcome Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Welcome, {user.name || "Creator"}</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Here is your Studio workspace overview and current digital projects.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/projects?create=true"
              className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl font-medium text-xs text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Project</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">Total Projects</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <FolderKanban className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{totalProjects}</p>
            <p className="text-[11px] text-zinc-500 mt-1">Across all workspaces</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">Published Live</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{publishedCount}</p>
            <p className="text-[11px] text-zinc-500 mt-1">Publicly accessible</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">Drafts in Progress</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <FileEdit className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mt-2">{draftCount}</p>
            <p className="text-[11px] text-zinc-500 mt-1">In active development</p>
          </div>

          <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-medium">System Status</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <p className="text-sm font-semibold text-emerald-400 mt-2.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </p>
            <p className="text-[11px] text-zinc-500 mt-1">Edge publishing ready</p>
          </div>
        </div>

        {/* Recent Projects Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-amber-400" />
              <span>Recent Projects</span>
            </h2>

            {totalProjects > 0 && (
              <Link
                href="/projects"
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 transition-colors"
              >
                <span>View all projects ({totalProjects})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {recentProjects.length === 0 ? (
            /* Clean Empty State as per PRD FR-14 & design.md */
            <div className="p-10 sm:p-14 rounded-2xl border border-dashed border-white/[0.12] bg-[#101014]/50 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
                <FolderKanban className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h3 className="text-base font-semibold text-white">
                  You don&apos;t have any projects yet
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                  Create your first project to begin shaping digital work from idea to live publication.
                </p>
              </div>
              <div>
                <Link
                  href="/projects?create=true"
                  className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Your First Project</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] hover:border-amber-500/30 transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-white text-sm tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                        {project.name}
                      </h3>
                      <span
                        className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                          project.status === "published"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : project.status === "archived"
                            ? "bg-zinc-500/10 text-zinc-400 border-zinc-500/30"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 min-h-[32px]">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(project.updatedAt)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {project.status === "published" && (
                        <Link
                          href={`/p/${project.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                          title="View Live"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                      <Link
                        href={`/projects/${project.id}/settings`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                        title="Project Settings"
                      >
                        <Settings className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/projects/${project.id}`}
                        className="py-1 px-2.5 rounded-lg text-xs font-medium text-black bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-1"
                      >
                        <span>Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity Mini-Feed */}
        {recentActivities.length > 0 && (
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                <ActivityIcon className="w-4 h-4 text-amber-400" />
                <span>Recent Workspace Activity</span>
              </h2>
              <Link
                href="/activity"
                className="text-xs text-zinc-400 hover:text-white transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.04] last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="text-zinc-300 font-medium">
                      {act.type.replace(/_/g, " ").toLowerCase()}
                    </span>
                    {act.project && (
                      <span className="text-zinc-400 font-mono text-[11px]">
                        in &ldquo;{act.project.name}&rdquo;
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    {formatTimeAgo(act.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
