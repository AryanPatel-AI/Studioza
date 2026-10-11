"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Check } from "lucide-react";
import { STORIES } from "@/lib/data/studioData";

export default function AdminEditStoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const story = STORIES.find((s) => s.slug === id || s.id === id) || STORIES[0];

  const [formData, setFormData] = useState(story);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/stories"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Edit Story: {formData.title}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{isSaving ? "Saving..." : savedSuccess ? "Saved Successfully" : "Save Changes"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          ✓ Story modifications saved to the publication database.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-6">
        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle || ""}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Pull Quote</label>
          <input
            type="text"
            value={formData.quote || ""}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Excerpt</label>
          <textarea
            rows={3}
            value={formData.excerpt || ""}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">First Essay Passage</label>
          <textarea
            rows={5}
            value={formData.editorialText1 || ""}
            onChange={(e) => setFormData({ ...formData, editorialText1: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Second Essay Passage</label>
          <textarea
            rows={5}
            value={formData.editorialText2 || ""}
            onChange={(e) => setFormData({ ...formData, editorialText2: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>
      </form>
    </div>
  );
}
