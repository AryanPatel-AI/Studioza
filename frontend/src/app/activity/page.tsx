import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/layout/AppShell";
import { formatTimeAgo, formatDate } from "@/lib/utils";
import {
  Activity as ActivityIcon,
  FolderKanban,
  FileCheck2,
  FileBox,
  Globe,
  Archive,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from "lucide-react";

export default async function ActivityPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      project: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "PROJECT_PUBLISHED":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "PROJECT_CREATED":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "PROJECT_UPDATED":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "PROJECT_ARCHIVED":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/30";
      case "PROJECT_RESTORED":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "ASSET_UPLOADED":
        return "bg-amber-500/10 text-amber-300 border-amber-500/20";
      case "ASSET_DELETED":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-white/[0.05] text-zinc-400 border-white/[0.08]";
    }
  };

  return (
    <AppShell user={user}>
      <div className="max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-amber-400" />
            <span>Workspace Activity Log</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Chronological audit trail of all project modifications, asset uploads, and publishing events.
          </p>
        </div>

        {activities.length === 0 ? (
          <div className="p-12 rounded-2xl border border-dashed border-white/[0.1] bg-[#101014]/40 text-center space-y-3">
            <ActivityIcon className="w-8 h-8 text-zinc-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No activity recorded yet</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Actions you take in Studio will be automatically audited and displayed here.
            </p>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] divide-y divide-white/[0.06]">
            {activities.map((act) => {
              let parsedMeta: any = {};
              try {
                parsedMeta = act.metadata ? JSON.parse(act.metadata) : {};
              } catch {
                parsedMeta = {};
              }

              return (
                <div
                  key={act.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${getBadgeStyle(
                          act.type
                        )}`}
                      >
                        {act.type.replace(/_/g, " ")}
                      </span>

                      {act.project && (
                        <Link
                          href={`/projects/${act.project.id}`}
                          className="font-medium text-white hover:text-amber-400 transition-colors"
                        >
                          {act.project.name}
                        </Link>
                      )}
                    </div>

                    {parsedMeta.name && !act.project && (
                      <p className="text-zinc-400 text-[11px]">
                        Target: <span className="font-mono text-zinc-300">{parsedMeta.name}</span>
                      </p>
                    )}

                    {parsedMeta.slug && (
                      <p className="text-zinc-400 text-[11px] font-mono">
                        Slug: /p/{parsedMeta.slug}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-zinc-400 font-mono text-[11px]">
                      {formatTimeAgo(act.createdAt)}
                    </span>
                    <p className="text-zinc-400 text-[10px]">{formatDate(act.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
