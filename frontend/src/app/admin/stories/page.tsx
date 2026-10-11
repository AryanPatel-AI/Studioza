"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Edit, ExternalLink, Trash2 } from "lucide-react";
import { STORIES, StoryData } from "@/lib/data/studioData";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<StoryData[]>(STORIES);

  const handleDelete = (id: string) => {
    if (confirm("Delete this editorial story?")) {
      setStories((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">MAGAZINE EDITORIAL CMS</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Stories &amp; Essays
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Publish field essays, darkroom musings, and technical camera monographs.
          </p>
        </div>

        <div>
          <Link
            href="/admin/stories/new"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Story</span>
          </Link>
        </div>
      </div>

      {/* Stories Table */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#F4F1EB]/30 transition-colors"
          >
            <div className="flex items-center gap-5">
              <div className="w-24 h-16 relative bg-[#EAE6DE] overflow-hidden shrink-0 border border-[#D9D5CE]">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  quality={100}
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl text-[#151515]">{story.title}</h3>
                  <span className="type-micro bg-[#151515] text-[#F4F1EB] px-2 py-0.5">
                    {story.category}
                  </span>
                </div>
                <p className="type-small text-[#77736D]">
                  By {story.author} • {story.date} • {story.readTime}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <Link
                href={`/stories/${story.slug}`}
                target="_blank"
                className="px-3 py-2 border border-[#D9D5CE] text-[#77736D] hover:text-[#151515] hover:border-[#151515] type-meta text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <span>Read Live</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <Link
                href={`/admin/stories/${story.slug}`}
                className="px-3 py-2 bg-[#F4F1EB] text-[#151515] border border-[#D9D5CE] hover:border-[#151515] type-meta text-[11px] flex items-center gap-1.5 transition-colors"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Story</span>
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(story.id)}
                className="p-2 text-rose-700 hover:bg-rose-50"
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
