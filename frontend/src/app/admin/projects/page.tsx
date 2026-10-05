"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderPlus, RefreshCw, Edit, Trash2 } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", slug: "", category: "" });

  const loadProjects = () => {
    setIsLoading(true);
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setNewProject({ name: "", slug: "", category: "" });
        loadProjects();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        loadProjects();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-sm text-stone-200/80 mt-1">
            Manage your project portfolio.
          </p>
        </div>
        <button
          onClick={loadProjects}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none type-body-base font-semibold text-copper-50 bg-stone-800 hover:bg-stone-700 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      <div className="rounded-none border border-copper-500/30 bg-gradient-to-br from-[#0c162e]/90 via-[#181926]/90 to-[#2b170a]/90 p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-copper-600" />
          Create New Project
        </h3>
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            required
            placeholder="Project Name"
            className="flex-1 px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white placeholder-stone-500 focus:outline-none"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
          />
          <input
            type="text"
            required
            placeholder="Slug"
            className="flex-1 px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white placeholder-stone-500 focus:outline-none"
            value={newProject.slug}
            onChange={(e) => setNewProject({ ...newProject, slug: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            className="flex-1 px-4 py-3 rounded-none border border-stone-800 bg-stone-900 text-white placeholder-stone-500 focus:outline-none"
            value={newProject.category}
            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
          />
          <button
            type="submit"
            disabled={isCreating}
            className="px-6 py-3 rounded-none type-body-base font-semibold text-copper-50 bg-gradient-to-r from-copper-300 to-copper-500 hover:from-copper-400 hover:to-copper-600 shadow-md shadow-copper-500/20 transition-all whitespace-nowrap cursor-pointer disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>

      <div className="bg-black border border-stone-800 rounded-none overflow-hidden shadow-2xl shadow-stone-950/40">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-500/20 text-left">
            <thead className="bg-black type-body-base font-semibold text-[var(--accent-muted-gold)]">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-500/10 text-sm">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-500">
                    {isLoading ? "Loading..." : "No projects found."}
                  </td>
                </tr>
              ) : (
                projects.map((proj) => (
                  <tr key={proj.id} className="hover:bg-stone-900/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-white font-medium">
                      {proj.name}
                      <div className="text-stone-500 text-xs">/{proj.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${proj.status === 'published' ? 'bg-green-950 text-green-500' : 'bg-stone-800 text-stone-400'}`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-stone-400">
                      {proj.category || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-400 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 border border-blue-900/30 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-400 hover:text-white bg-red-950/60 hover:bg-red-900/60 border border-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
