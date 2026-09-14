"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FolderKanban,
  Plus,
  Search,
  ExternalLink,
  Settings,
  ArrowRight,
  Clock,
  Copy,
  Archive,
  RotateCcw,
  Trash2,
  Layers,
  Sparkles,
  Layout,
  FileText,
  FileCode,
} from "lucide-react";
import {
  createProject,
  archiveProject,
  restoreProject,
  duplicateProject,
  deleteProject,
} from "@/app/actions/projects";
import { formatTimeAgo } from "@/lib/utils";

interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
}

interface ProjectListClientProps {
  initialProjects: ProjectItem[];
}

export default function ProjectListClient({ initialProjects }: ProjectListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldOpenCreate = searchParams.get("create") === "true";

  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(shouldOpenCreate);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState("");

  // Create Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState<"portfolio" | "landing" | "brief" | "blank">("portfolio");

  // Filtering
  const filteredProjects = initialProjects.filter((p) => {
    if (activeTab !== "all" && p.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCreateError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("template", template);

      const res = await createProject(formData);
      if (res.error) {
        setCreateError(res.error);
        return;
      }

      setIsCreateOpen(false);
      setName("");
      setDescription("");
      router.push(`/projects/${res.projectId}`);
      router.refresh();
    } catch (err: any) {
      setCreateError("Failed to create project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    await duplicateProject(id);
    router.refresh();
  };

  const handleArchive = async (id: string) => {
    await archiveProject(id);
    router.refresh();
  };

  const handleRestore = async (id: string) => {
    await restoreProject(id);
    router.refresh();
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"? This action cannot be undone.`)) {
      await deleteProject(id);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Organize, edit, and publish your digital workspace creations.
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl font-medium text-xs text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer w-fit"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#101014] border border-white/[0.08] rounded-xl text-xs w-fit">
          {(["all", "published", "draft", "archived"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                activeTab === tab
                  ? "bg-white/[0.1] text-amber-400 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-white/[0.08] bg-[#101014] text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 rounded-2xl border border-dashed border-white/[0.1] bg-[#101014]/40 text-center space-y-3">
          <FolderKanban className="w-8 h-8 text-zinc-500 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No projects found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            {searchQuery
              ? "No projects match your search query."
              : `No projects currently in the ${activeTab} category.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-5 rounded-2xl border border-white/[0.08] bg-[#101014] hover:border-amber-500/30 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    className="font-semibold text-white text-sm tracking-tight group-hover:text-amber-400 transition-colors line-clamp-1"
                  >
                    {project.name}
                  </Link>
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

              {/* Action Toolbar */}
              <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {formatTimeAgo(project.updatedAt)}
                </span>

                <div className="flex items-center gap-1">
                  {project.status === "published" && (
                    <Link
                      href={`/p/${project.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                      title="View Published Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  <button
                    onClick={() => handleDuplicate(project.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    title="Duplicate Project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {project.status === "archived" ? (
                    <button
                      onClick={() => handleRestore(project.id)}
                      className="p-1.5 rounded-lg text-amber-400 hover:bg-amber-500/10"
                      title="Restore Project"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleArchive(project.id)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10"
                      title="Archive Project"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <Link
                    href={`/projects/${project.id}/settings`}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                    title="Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleDelete(project.id, project.name)}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/projects/${project.id}`}
                    className="ml-1 py-1 px-2.5 rounded-lg text-xs font-medium text-black bg-amber-400 hover:bg-amber-300 transition-all flex items-center gap-1"
                  >
                    <span>Edit</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.1] bg-[#101014] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Create New Project</span>
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Configure your project details and pick a starting template.
              </p>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Project Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Modern Atelier Anthology"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of this project..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-2">
                  Starter Template Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "portfolio",
                      name: "Digital Portfolio",
                      desc: "Hero, about, gallery, CTA",
                      icon: Layout,
                    },
                    {
                      id: "landing",
                      name: "Product Launch",
                      desc: "Hero, feature cards, CTA",
                      icon: Sparkles,
                    },
                    {
                      id: "brief",
                      name: "Creative Brief",
                      desc: "Summary, milestones, goals",
                      icon: FileText,
                    },
                    {
                      id: "blank",
                      name: "Blank Canvas",
                      desc: "Clean empty canvas",
                      icon: FileCode,
                    },
                  ].map((t) => {
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTemplate(t.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          template === t.id
                            ? "bg-amber-500/10 border-amber-500/50 text-white"
                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon
                            className={`w-4 h-4 ${
                              template === t.id ? "text-amber-400" : "text-zinc-400"
                            }`}
                          />
                          <span className="text-xs font-medium text-white">{t.name}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1">{t.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="py-2 px-3 rounded-xl text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !name.trim()}
                  className="py-2 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Create & Open Workspace"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
