"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminNewStoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    category: "Essays & Fieldwork",
    author: "Aryan Patel",
    readTime: "4 min read",
    coverImage: "/images/Dal_Lake.jpeg",
    excerpt: "",
    quote: "",
    content: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      router.push("/admin/stories");
    }, 500);
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
            Write Editorial Story
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSaving}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Publishing..." : "Publish to Magazine"}</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Story Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
                setFormData({ ...formData, title, slug });
              }}
              placeholder="e.g. Twilight Reflections in Amer"
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Slug</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] font-mono text-xs"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="A single poetic thesis..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Read Time</label>
            <input
              type="text"
              value={formData.readTime}
              onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Pull Quote</label>
          <input
            type="text"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="Signature highlight sentence featured in larger typography..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Excerpt / Lead Paragraph</label>
          <textarea
            rows={2}
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Editorial Essay Body</label>
          <textarea
            rows={8}
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write the full prose..."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>
      </form>
    </div>
  );
}
