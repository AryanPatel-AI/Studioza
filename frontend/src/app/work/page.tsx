"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { PROJECTS, ProjectData, getImagePlateInfo } from "@/lib/data/studioData";

const ARCHIVE_CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "architecture", label: "ARCHITECTURE" },
  { id: "portraiture", label: "PORTRAITURE" },
  { id: "editorial", label: "EDITORIAL" },
  { id: "commercial", label: "COMMERCIAL" },
  { id: "landscape", label: "LANDSCAPE" },
  { id: "weddings", label: "WEDDINGS" },
  { id: "personal", label: "PERSONAL" },
];

// Helper to map project categories to archive filter tags
function matchesCategory(project: ProjectData, categoryId: string): boolean {
  if (categoryId === "all") return true;
  if (categoryId === "architecture") {
    return project.slug.includes("citadel") || project.slug.includes("resort") || project.category === "commercial";
  }
  if (categoryId === "portraiture") {
    return project.category === "portraits";
  }
  if (categoryId === "editorial") {
    return project.category === "fashion" || Boolean(project.client?.toLowerCase().includes("vogue"));
  }
  if (categoryId === "commercial") {
    return project.category === "commercial";
  }
  if (categoryId === "landscape") {
    return project.slug.includes("citadel") || project.slug.includes("estate");
  }
  if (categoryId === "weddings") {
    return project.category === "weddings";
  }
  if (categoryId === "personal") {
    return project.slug.includes("sheesh") || project.slug.includes("estate");
  }
  return false;
}

function WorkArchiveContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"featured" | "year" | "title">("featured");

  const filteredProjects = useMemo(() => {
    let list = PROJECTS.filter((p) => matchesCategory(p, activeCategory));

    if (sortBy === "year") {
      list = [...list].sort((a, b) => Number(b.year) - Number(a.year));
    } else if (sortBy === "title") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured first
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [activeCategory, sortBy]);

  // Alternate layout between full-width heroes and side-by-side pairs
  const layoutChunks = useMemo(() => {
    const chunks: Array<{ type: "large" | "dual"; items: ProjectData[] }> = [];
    let i = 0;
    let toggleLarge = true;

    while (i < filteredProjects.length) {
      if (toggleLarge) {
        chunks.push({ type: "large", items: [filteredProjects[i]] });
        i += 1;
        toggleLarge = false;
      } else {
        const dualItems = filteredProjects.slice(i, i + 2);
        chunks.push({ type: "dual", items: dualItems });
        i += dualItems.length;
        toggleLarge = true;
      }
    }
    return chunks;
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative selection:bg-[#151515] selection:text-[#F4F1EB]">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-36">
        {/* Archive Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-14">
          <div className="border-b border-[#D9D5CE] pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="type-meta text-[#77736D] block mb-2">
                  ARCHIVE // MEDIUM FORMAT MONOGRAPHS
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#151515]">
                  Visual Archive
                </h1>
              </div>
              <p className="type-body-l text-[#77736D] max-w-md md:text-right">
                A permanent catalog of architectural, human, and sartorial studies preserved in medium format.
              </p>
            </div>

            {/* Filter Navigation & Sorter */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-10 border-t border-[#D9D5CE]/60 mt-8">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 type-meta text-[11px] tracking-widest">
                {ARCHIVE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 transition-all border ${
                      activeCategory === cat.id
                        ? "bg-[#151515] text-[#F4F1EB] border-[#151515]"
                        : "bg-transparent text-[#77736D] border-transparent hover:border-[#D9D5CE] hover:text-[#151515]"
                    }`}
                  >
                    [{cat.label}]
                  </button>
                ))}
              </div>

              {/* Sorting Controls */}
              <div className="flex items-center gap-3 text-xs type-meta text-[#77736D] self-start lg:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>SORT:</span>
                <button
                  onClick={() => setSortBy("featured")}
                  className={`hover:text-[#151515] transition-colors ${
                    sortBy === "featured" ? "text-[#151515] font-semibold underline" : ""
                  }`}
                >
                  Curated
                </button>
                <span>/</span>
                <button
                  onClick={() => setSortBy("year")}
                  className={`hover:text-[#151515] transition-colors ${
                    sortBy === "year" ? "text-[#151515] font-semibold underline" : ""
                  }`}
                >
                  Year
                </button>
                <span>/</span>
                <button
                  onClick={() => setSortBy("title")}
                  className={`hover:text-[#151515] transition-colors ${
                    sortBy === "title" ? "text-[#151515] font-semibold underline" : ""
                  }`}
                >
                  Title
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Layout: Large -> Dual -> Large -> Dual */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-24">
          {layoutChunks.map((chunk, chunkIdx) => {
            if (chunk.type === "large") {
              const project = chunk.items[0];
              if (!project) return null;
              const plateInfo = getImagePlateInfo(project.coverImage);

              return (
                <article key={`chunk-${chunkIdx}-${project.id}`} className="space-y-6 group">
                  <Link href={`/work/${project.slug}`} className="block relative overflow-hidden">
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plateInfo.aspectClass} ${plateInfo.isLandscape ? (plateInfo.aspectClass === "aspect-[4/3]" ? "max-w-5xl mx-auto" : "max-w-6xl mx-auto") : "max-w-2xl mx-auto"}`}>
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        unoptimized
                        sizes="100vw"
                        priority={chunkIdx === 0}
                        quality={100}
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-6 left-6 lg:left-10 right-6 flex items-end justify-between text-white z-10">
                        <div>
                          <span className="type-meta text-white/80 text-[10px] tracking-widest block mb-1">
                            PLATE 0{chunkIdx + 1} // {project.location.toUpperCase()}
                          </span>
                          <h2 className="font-serif text-3xl sm:text-5xl text-white">
                            {project.name}
                          </h2>
                        </div>
                        <div className="hidden sm:flex items-center gap-1 text-xs type-meta bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-white">
                          <span>Inspect Plate</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-3 border-t border-[#D9D5CE]">
                    <div className="space-y-1">
                      <p className="type-body text-[#77736D] max-w-2xl">
                        {project.subtitle}
                      </p>
                      <div className="flex items-center gap-4 type-meta text-[11px] text-[#77736D]">
                        <span>YEAR: {project.year}</span>
                        <span>•</span>
                        <span>CLIENT: {project.client || "Studio Monograph"}</span>
                        <span>•</span>
                        <span className="capitalize">DISCIPLINE: {project.category}</span>
                      </div>
                    </div>
                    <Link
                      href={`/work/${project.slug}`}
                      className="type-meta text-xs text-[#151515] hover:text-[#CC5500] transition-colors flex items-center gap-1.5 shrink-0"
                    >
                      <span>VIEW MONOGRAPH</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              );
            }

            // Dual Grid (IMAGE IMAGE)
            return (
              <div key={`chunk-dual-${chunkIdx}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
                {chunk.items.map((project, itemIdx) => {
                  const plateInfo = getImagePlateInfo(project.coverImage);

                  return (
                    <article key={project.id} className="space-y-5 group">
                      <Link href={`/work/${project.slug}`} className="block relative overflow-hidden">
                        <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plateInfo.aspectClass}`}>
                          <Image
                            src={project.coverImage}
                            alt={project.name}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 100vw, 50vw"
                            quality={100}
                            className="object-contain"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                            <span className="type-meta text-white/80 text-[10px] tracking-widest block mb-1">
                              {project.location.toUpperCase()} · {project.year}
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl text-white">
                              {project.name}
                            </h2>
                          </div>
                        </div>
                      </Link>

                    <div className="space-y-2 pt-2 border-t border-[#D9D5CE]">
                      <div className="flex items-center justify-between type-meta text-[11px] text-[#77736D]">
                        <span className="uppercase">{project.category}</span>
                        <span>PLATE // 0{chunkIdx + itemIdx + 2}</span>
                      </div>
                      <p className="type-small text-[#77736D] line-clamp-2">
                        {project.subtitle}
                      </p>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1 type-meta text-xs text-[#151515] hover:text-[#CC5500] transition-colors pt-1"
                      >
                        <span>Examine Study</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                  );
                })}
              </div>
            );
          })}
        </section>

        {/* Bottom Editorial Commission Callout */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mt-32">
          <div className="bg-[#171717] text-[#F4F1EB] p-12 lg:p-20 relative overflow-hidden">
            <div className="max-w-2xl space-y-6 relative z-10">
              <span className="type-meta text-[#A39E96] block">
                COMMISSION AN ARCHIVE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
                Have a celebration, architectural space, or monograph in mind?
              </h2>
              <p className="type-body text-[#A39E96]">
                We accept twelve select commissions annually worldwide. Inquiries for 2026/2027 are currently under review.
              </p>
              <div className="pt-4 flex flex-wrap items-center gap-5">
                <Link
                  href="/contact"
                  className="bg-[#F4F1EB] text-[#171717] px-8 py-4 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors"
                >
                  START AN INQUIRY →
                </Link>
                <Link
                  href="/booking"
                  className="border border-white/20 text-white px-8 py-4 type-meta text-xs hover:border-white transition-colors"
                >
                  RESERVE COMMISSION DATE
                </Link>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden lg:block">
              <Image
                src="/images/sandstone-palace-domes.jpg"
                alt="Background Monograph"
                fill
                quality={100}
                sizes="33vw"
                className="object-contain"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F1EB]" />}>
      <WorkArchiveContent />
    </Suspense>
  );
}
