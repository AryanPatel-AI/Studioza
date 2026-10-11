"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { getCuratedCollections } from "@/lib/curation/curationRegistry";
import { getImagePlateInfo } from "@/lib/data/studioData";

export default function CollectionsArchivePage() {
  const collections = getCuratedCollections();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orientationFilter, setOrientationFilter] = useState<"all" | "landscape" | "portrait">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { label: "All Destinations", value: "all" },
    { label: "Architecture", value: "architecture" },
    { label: "Landscape", value: "landscape" },
    { label: "Portraits", value: "portraits" },
    { label: "Weddings", value: "weddings" },
    { label: "Commercial", value: "commercial" },
  ];

  const filtered = collections.filter((c) => {
    const matchesCategory = activeCategory === "all" || c.category === activeCategory;
    const coverInfo = getImagePlateInfo(c.coverImage);
    const matchesOrientation =
      orientationFilter === "all" ||
      (orientationFilter === "landscape" && !coverInfo.hasHuman) ||
      (orientationFilter === "portrait" && coverInfo.hasHuman);
    const matchesSearch =
      searchQuery.trim() === "" ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesOrientation && matchesSearch;
  });

  // User Rule: If no human is in image, keep them in landscape section in original aspect ratio
  const landscapeCollections = filtered.filter((c) => !getImagePlateInfo(c.coverImage).hasHuman);
  const portraitCollections = filtered.filter((c) => getImagePlateInfo(c.coverImage).hasHuman);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans selection:bg-[#CFA570] selection:text-white">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-36">
        {/* Editorial Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] block">
              Curated Photographic Archive · {collections.length} Locations
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515] tracking-tight">
              Collections
            </h1>
            <p className="font-serif italic text-2xl text-[#66625B] max-w-3xl leading-relaxed">
              Geographic monographs, architectural fieldwork, and analog plate portfolios organized by destination.
            </p>
          </div>
        </section>

        {/* Filter and Search Utility Bar */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-[#D9D5CE] pb-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border ${
                    activeCategory === cat.value
                      ? "bg-[#151515] text-white border-[#151515]"
                      : "bg-white text-[#66625B] border-[#D9D5CE] hover:text-[#151515] hover:border-[#151515]"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#77736D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search location or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#D9D5CE] pl-9 pr-4 py-2 text-xs font-mono focus:outline-none focus:border-[#151515]"
              />
            </div>
          </div>

            {/* Format Framing Segment */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 p-1 bg-white border border-[#D9D5CE] text-xs font-mono">
                <span className="text-[10px] text-[#A39E96] uppercase px-2 tracking-wider font-semibold">Curation Type:</span>
                <button
                  onClick={() => setOrientationFilter("all")}
                  className={`px-3 py-1 uppercase tracking-wider transition-colors ${
                    orientationFilter === "all" ? "bg-[#151515] text-white" : "text-[#66625B] hover:text-[#151515]"
                  }`}
                >
                  All Folios ({collections.length})
                </button>
                <button
                  onClick={() => setOrientationFilter("landscape")}
                  className={`px-3 py-1 uppercase tracking-wider transition-colors flex items-center gap-1 ${
                    orientationFilter === "landscape" ? "bg-[#151515] text-white" : "text-[#66625B] hover:text-[#151515]"
                  }`}
                >
                  <span>Landscape &amp; Architecture</span>
                  <span className="opacity-75">· {collections.filter(c => !getImagePlateInfo(c.coverImage).hasHuman).length}</span>
                </button>
                <button
                  onClick={() => setOrientationFilter("portrait")}
                  className={`px-3 py-1 uppercase tracking-wider transition-colors flex items-center gap-1 ${
                    orientationFilter === "portrait" ? "bg-[#151515] text-white" : "text-[#66625B] hover:text-[#151515]"
                  }`}
                >
                  <span>Portraits (Humans)</span>
                  <span className="opacity-75">· {collections.filter(c => getImagePlateInfo(c.coverImage).hasHuman).length}</span>
                </button>
              </div>

              <span className="text-xs font-mono uppercase tracking-widest text-[#77736D]">
                Showing {filtered.length} Archive {filtered.length === 1 ? "Folio" : "Folios"}
              </span>
            </div>
          </section>

          {/* Collections Grid */}
          <section className="px-6 lg:px-12 max-w-7xl mx-auto">
            {filtered.length === 0 ? (
              <div className="py-24 text-center border border-dashed border-[#D9D5CE] bg-white">
                <p className="font-serif italic text-2xl text-[#77736D]">
                  No photographic collections found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="space-y-24">
                {/* LANDSCAPE COLLECTIONS SECTION */}
                {(orientationFilter === "all" || orientationFilter === "landscape") && landscapeCollections.length > 0 && (
                  <div className="space-y-8">
                    {orientationFilter === "all" && portraitCollections.length > 0 && (
                      <div className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                            Group 01 // Horizons &amp; Architecture
                          </span>
                          <h2 className="font-serif text-3xl text-[#151515]">Landscape &amp; Architectural Archives</h2>
                        </div>
                        <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                          {landscapeCollections.length} Regional Archives · Original Framing
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
                      {landscapeCollections.map((collection) => {
                        const coverInfo = getImagePlateInfo(collection.coverImage);
                        const aspectClass = coverInfo.aspectClass || (coverInfo.isLandscape ? "aspect-[3/2]" : "aspect-[2/3]");

                        return (
                          <Link
                            key={collection.slug}
                            href={`/collections/${collection.slug}`}
                            className="group block space-y-4"
                          >
                            <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center`}>
                              <Image
                                src={collection.coverImage}
                                alt={collection.title}
                                fill
                                unoptimized
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute top-3 right-3 bg-black/70 text-white font-mono text-[10px] tracking-widest uppercase px-2.5 py-1">
                                {collection.totalPhotos} Plates
                              </div>
                              <div className="absolute bottom-3 left-3 text-white">
                                <span className="font-mono text-[10px] tracking-widest uppercase text-[#CFA570] block">
                                  {collection.year} · {collection.category.toUpperCase()} · {coverInfo.aspectRatio} Original
                                </span>
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#77736D]">
                                <MapPin className="w-3 h-3 text-[#CFA570]" />
                                <span>{collection.location}</span>
                              </div>
                              <h3 className="font-serif text-2xl sm:text-3xl text-[#151515] group-hover:text-[#CFA570] transition-colors leading-tight">
                                {collection.title}
                              </h3>
                              <p className="text-sm font-sans text-[#66625B] line-clamp-2 leading-relaxed">
                                {collection.subtitle}
                              </p>
                              <div className="pt-2 flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#151515] group-hover:translate-x-1 transition-transform">
                                <span>Explore Collection</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* PORTRAIT COLLECTIONS SECTION */}
                {(orientationFilter === "all" || orientationFilter === "portrait") && portraitCollections.length > 0 && (
                  <div className="space-y-8">
                    {orientationFilter === "all" && landscapeCollections.length > 0 && (
                      <div className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                            Group 02 // Character Studies
                          </span>
                          <h2 className="font-serif text-3xl text-[#151515]">Portraits &amp; Character Sittings</h2>
                        </div>
                        <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                          {portraitCollections.length} Human Portrait Archives
                        </span>
                      </div>
                    )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
                    {portraitCollections.map((collection) => {
                      const coverInfo = getImagePlateInfo(collection.coverImage);
                      const aspectClass = coverInfo.aspectClass || "aspect-[2/3]";

                      return (
                        <Link
                          key={collection.slug}
                          href={`/collections/${collection.slug}`}
                          className="group block space-y-4"
                        >
                          <div className={`relative ${aspectClass} w-full overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center`}>
                            <Image
                              src={collection.coverImage}
                              alt={collection.title}
                              fill
                              unoptimized
                              quality={100}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute top-3 right-3 bg-black/70 text-white font-mono text-[10px] tracking-widest uppercase px-2.5 py-1">
                              {collection.totalPhotos} Plates
                            </div>
                            <div className="absolute bottom-3 left-3 text-white">
                              <span className="font-mono text-[10px] tracking-widest uppercase text-[#CFA570] block">
                                {collection.year} · {collection.category.toUpperCase()} · {coverInfo.aspectRatio} Portrait
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#77736D]">
                              <MapPin className="w-3 h-3 text-[#CFA570]" />
                              <span>{collection.location}</span>
                            </div>
                            <h3 className="font-serif text-2xl sm:text-3xl text-[#151515] group-hover:text-[#CFA570] transition-colors leading-tight">
                              {collection.title}
                            </h3>
                            <p className="text-sm font-sans text-[#66625B] line-clamp-2 leading-relaxed">
                              {collection.subtitle}
                            </p>
                            <div className="pt-2 flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[#151515] group-hover:translate-x-1 transition-transform">
                              <span>Explore Collection</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
