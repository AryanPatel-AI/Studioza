"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Filter, ExternalLink, Edit, Trash2 } from "lucide-react";
import { PROJECTS, ProjectData } from "@/lib/data/studioData";

export default function AdminProjectsListPage() {
  const [projects, setProjects] = useState<ProjectData[]>(PROJECTS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = projects.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this monograph from the archive?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">ARCHIVAL CMS</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Projects &amp; Monographs
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Curate, organize, and publish fine art monographs across wedding, portrait, and architectural collections.
          </p>
        </div>

        <div>
          <Link
            href="/admin/projects/new"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Monograph</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-[#D9D5CE]">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#77736D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, venue, or location..."
            className="w-full pl-9 pr-4 py-2 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-[#77736D]" />
          {["all", "weddings", "portraits", "fashion", "commercial"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`type-meta text-xs px-3 py-1.5 capitalize transition-colors ${
                selectedCategory === cat
                  ? "bg-[#151515] text-[#F4F1EB]"
                  : "bg-[#F4F1EB] text-[#77736D] hover:text-[#151515]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project Table / Grid */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#F4F1EB]/30 transition-colors"
          >
            {/* Left: Thumbnail & Metadata */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-16 relative bg-[#EAE6DE] overflow-hidden shrink-0 border border-[#D9D5CE]">
                <Image
                  src={p.coverImage}
                  alt={p.name}
                  fill
                  quality={100}
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl text-[#151515]">{p.name}</h3>
                  <span className="type-micro bg-[#151515] text-[#F4F1EB] px-2 py-0.5">
                    {p.category}
                  </span>
                </div>
                <p className="type-small text-[#77736D]">
                  {p.location} • {p.year} • {p.gallery.length} Plates
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 self-end md:self-auto">
              <Link
                href={`/project/${p.slug}`}
                target="_blank"
                className="px-3 py-2 border border-[#D9D5CE] text-[#77736D] hover:text-[#151515] hover:border-[#151515] type-meta text-[11px] flex items-center gap-1.5 transition-colors"
                title="View Public Monograph"
              >
                <span>Live View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/admin/projects/${p.slug}/edit`}
                className="px-3 py-2 bg-[#F4F1EB] text-[#151515] border border-[#D9D5CE] hover:border-[#151515] type-meta text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Plates</span>
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="p-2 text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                title="Delete Monograph"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
