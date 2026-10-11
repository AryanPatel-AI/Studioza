"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Eye, Edit, Images } from "lucide-react";
import { PROJECTS } from "@/lib/data/studioData";

export default function AdminGalleriesPage() {
  const [galleries] = useState(PROJECTS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">VISUAL ASSET CURATION</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Galleries &amp; Plates
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Organize image sequencing, aspect ratios, chiaroscuro exposures, and plate captions across all monographs.
          </p>
        </div>

        <div>
          <Link
            href="/admin/media"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Plate Negative</span>
          </Link>
        </div>
      </div>

      {/* Galleries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleries.map((g) => (
          <div key={g.id} className="bg-white border border-[#D9D5CE] p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="aspect-[16/10] bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE]">
                <Image
                  src={g.coverImage}
                  alt={g.name}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain"
                />
                <div className="absolute top-3 right-3 bg-[#151515]/90 text-[#F4F1EB] px-2 py-1 type-micro text-[10px] flex items-center gap-1">
                  <Images className="w-3 h-3" />
                  <span>{g.gallery.length} Plates</span>
                </div>
              </div>

              <div>
                <span className="type-meta text-[#77736D] text-[10px] uppercase">
                  {g.category} • {g.year}
                </span>
                <h3 className="font-serif text-2xl text-[#151515] mt-0.5">
                  {g.name}
                </h3>
                <p className="type-small text-[#77736D] line-clamp-1 mt-1">
                  {g.location}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9D5CE] flex items-center justify-between">
              <Link
                href={`/admin/galleries/${g.slug}`}
                className="type-meta text-xs text-[#151515] hover:underline flex items-center gap-1 font-semibold"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Curate Plates</span>
              </Link>
              <Link
                href={`/project/${g.slug}`}
                target="_blank"
                className="type-meta text-xs text-[#77736D] hover:text-[#151515] flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
