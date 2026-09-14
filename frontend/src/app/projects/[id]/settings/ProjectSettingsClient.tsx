"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Globe,
  Archive,
  RotateCcw,
  Trash2,
  ShieldAlert,
  ExternalLink,
  Check,
} from "lucide-react";
import {
  updateProjectDetails,
  archiveProject,
  restoreProject,
  deleteProject,
} from "@/app/actions/projects";

interface ProjectSettingsClientProps {
  project: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    status: string;
    settings: string | null;
  };
}

export default function ProjectSettingsClient({ project }: ProjectSettingsClientProps) {
  const router = useRouter();
  const settings = project.settings ? JSON.parse(project.settings) : {};

  const [name, setName] = useState(project.name);
  const [slug, setSlug] = useState(project.slug);
  const [description, setDescription] = useState(project.description || "");
  const [seoTitle, setSeoTitle] = useState(settings.seoTitle || project.name);
  const [seoDescription, setSeoDescription] = useState(
    settings.seoDescription || project.description || ""
  );

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(
    null
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("id", project.id);
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("description", description);
      formData.append("seoTitle", seoTitle);
      formData.append("seoDescription", seoDescription);

      const res = await updateProjectDetails(formData);
      if (res.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: "Project settings saved successfully.", type: "success" });
        router.refresh();
      }
    } catch {
      setMessage({ text: "Failed to save settings.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleArchiveToggle = async () => {
    if (project.status === "archived") {
      await restoreProject(project.id);
    } else {
      await archiveProject(project.id);
    }
    router.refresh();
  };

  const handleDelete = async () => {
    if (
      confirm(
        `Are you sure you want to permanently delete "${project.name}"? This action cannot be undone.`
      )
    ) {
      await deleteProject(project.id);
      router.push("/projects");
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Back link & header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Workspace</span>
        </Link>

        {project.status === "published" && (
          <Link
            href={`/p/${project.slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <span>View Public Page</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
          <span>Project Settings: {project.name}</span>
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Configure project identity, slug, SEO tags, and lifecycle states.
        </p>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/40 text-rose-300"
          }`}
        >
          {message.type === "success" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* General Settings Form */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-5">
        <h2 className="text-sm font-semibold text-white">General Information</h2>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Project Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              URL Slug * (Used for public route `/p/[slug]`)
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 rounded-l-xl border border-r-0 border-white/[0.1] bg-white/[0.02] text-xs text-zinc-500 font-mono">
                /p/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-r-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of this project..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-xs"
            />
          </div>

          <div className="pt-4 border-t border-white/[0.06] space-y-4">
            <h3 className="text-xs font-semibold text-white">SEO &amp; Social Metadata</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Meta Description
                </label>
                <input
                  type="text"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-5">
        <div className="flex items-center gap-2 text-rose-400">
          <ShieldAlert className="w-4 h-4" />
          <h2 className="text-sm font-semibold">Danger Zone</h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-white/[0.06] bg-[#101014]">
            <div>
              <p className="text-xs font-semibold text-white">
                {project.status === "archived" ? "Restore Project" : "Archive Project"}
              </p>
              <p className="text-[11px] text-zinc-400">
                {project.status === "archived"
                  ? "Restore this project back to active workspace drafts."
                  : "Archiving hides the project from active views without deleting your data."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleArchiveToggle}
              className="py-2 px-3.5 rounded-xl text-xs font-medium text-amber-400 border border-amber-500/30 hover:bg-amber-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {project.status === "archived" ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore</span>
                </>
              ) : (
                <>
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/20 bg-[#101014]">
            <div>
              <p className="text-xs font-semibold text-rose-400">Delete Project</p>
              <p className="text-[11px] text-zinc-400">
                Permanently delete this project and all of its content. This action is irreversible.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              className="py-2 px-3.5 rounded-xl text-xs font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
