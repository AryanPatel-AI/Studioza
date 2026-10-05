"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminProjectEditPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const id = params.id as string;

  useEffect(() => {
    fetch(`/api/admin/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setProject(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");
    
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: project.name,
          slug: project.slug,
          description: project.description,
          status: project.status,
          category: project.category,
          gallery: project.gallery,
          credits: project.credits,
        }),
      });
      
      if (res.ok) {
        setMessage("Project updated successfully.");
      } else {
        setMessage("Failed to update project.");
      }
    } catch (err) {
      console.error(err);
      setMessage("An error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-stone-400 flex items-center gap-2"><Loader2 className="animate-spin w-4 h-4" /> Loading project...</div>;
  }

  if (!project) {
    return <div className="text-red-400">Project not found.</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects" className="text-stone-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Edit Project</h1>
          <p className="text-sm text-stone-200/80 mt-1">
            Update {project.name} details, gallery, and credits.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 bg-black border border-stone-800 p-8 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-stone-400">Project Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white focus:outline-none"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-stone-400">Slug (URL)</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white focus:outline-none"
              value={project.slug}
              onChange={(e) => setProject({ ...project, slug: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-stone-400">Category</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white focus:outline-none"
              value={project.category || ""}
              onChange={(e) => setProject({ ...project, category: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-stone-400">Status</label>
            <select
              className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white focus:outline-none"
              value={project.status}
              onChange={(e) => setProject({ ...project, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-stone-400">Description</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white focus:outline-none"
            value={project.description || ""}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-stone-400">Gallery (JSON Array of URLs/IDs)</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white font-mono text-sm focus:outline-none"
            value={project.gallery || "[]"}
            onChange={(e) => setProject({ ...project, gallery: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-stone-400">Credits (JSON Array of Objects)</label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white font-mono text-sm focus:outline-none"
            value={project.credits || "[]"}
            onChange={(e) => setProject({ ...project, credits: e.target.value })}
          />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-stone-800">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-none type-body-base font-semibold text-copper-50 bg-gradient-to-r from-copper-300 to-copper-500 hover:from-copper-400 hover:to-copper-600 shadow-md shadow-copper-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
          
          {message && (
            <span className={`text-sm ${message.includes("success") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
