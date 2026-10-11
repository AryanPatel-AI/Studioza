"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus } from "lucide-react";

export default function AdminNewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    subtitle: "",
    category: "weddings",
    year: "2026",
    location: "Jaipur, Rajasthan",
    client: "",
    coverImage: "/images/palace-arch-courtyard.jpg",
    intro: "",
    story: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      router.push("/admin/projects");
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Create New Monograph
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Saving Monograph..." : "Publish Monograph"}</span>
        </button>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Project Title *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                const name = e.target.value;
                const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                setFormData({ ...formData, name, slug });
              }}
              placeholder="e.g. Royal Lake Pavilion Monograph"
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Slug Identifier</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. royal-lake-pavilion"
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30 font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-white"
            >
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="fashion">Fashion</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Subtitle / Summary</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="A single poetic sentence capturing the spatial or emotional scale..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Cover Image URL / Path</label>
          <input
            type="text"
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] font-mono text-xs"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Introductory Quote / Thesis</label>
          <textarea
            rows={2}
            value={formData.intro}
            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
            placeholder="Short introductory statement before the gallery..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Full Monograph Narrative</label>
          <textarea
            rows={5}
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
            placeholder="Write the in-depth editorial prose detailing light, optics, chemistry, and history..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>
      </form>
    </div>
  );
}
