"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { RECENT_WORK_PLATES, RecentWorkPlate } from "@/lib/data/recentWorkPlates";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Camera, Sparkles } from "lucide-react";

interface CategoryTab {
  id: string;
  label: string;
  countKey: string;
}

const CATEGORIES: CategoryTab[] = [
  { id: "all", label: "All Monographs", countKey: "all" },
  { id: "architecture", label: "Architecture & Forts", countKey: "architecture" },
  { id: "portraits", label: "Portraits", countKey: "portraits" },
  { id: "weddings", label: "Weddings", countKey: "weddings" },
  { id: "fashion", label: "Fashion", countKey: "fashion" },
  { id: "commercial", label: "Commercial", countKey: "commercial" },
];

export default function RecentWorkGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPlateIndex, setSelectedPlateIndex] = useState<number | null>(null);

  // Filter plates based on active category
  const filteredPlates = useMemo(() => {
    if (activeCategory === "all") return RECENT_WORK_PLATES;
    return RECENT_WORK_PLATES.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      if (cat.id === "all") {
        counts[cat.id] = RECENT_WORK_PLATES.length;
      } else {
        counts[cat.id] = RECENT_WORK_PLATES.filter((p) =>
          p.categories.includes(cat.id)
        ).length;
      }
    }
    return counts;
  }, []);

  const selectedPlate = selectedPlateIndex !== null ? filteredPlates[selectedPlateIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedPlateIndex === null) return;
    setSelectedPlateIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredPlates.length - 1
    );
  }, [selectedPlateIndex, filteredPlates.length]);

  const handleNext = useCallback(() => {
    if (selectedPlateIndex === null) return;
    setSelectedPlateIndex((prev) =>
      prev !== null && prev < filteredPlates.length - 1 ? prev + 1 : 0
    );
  }, [selectedPlateIndex, filteredPlates.length]);

  const handleClose = useCallback(() => {
    setSelectedPlateIndex(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPlateIndex === null) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlateIndex, handleClose, handlePrev, handleNext]);

  return (
    <section className="relative w-full bg-[#121212] text-[#F4F1EB] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      <div className="max-w-[1920px] mx-auto space-y-10 sm:space-y-12">
        {/* ========================================================================= */}
        {/* HEADER: Studio63 Style "Recent Work" with Ghost Outline Typography       */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-baseline gap-3 sm:gap-6 flex-wrap">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-white flex items-center">
                <span>Recent&nbsp;</span>
                <span className="text-[#E05A2B] sm:text-[#E85D04]">Work</span>
              </h2>
              {/* Layered Ghost Outline Text */}
              <span
                aria-hidden="true"
                className="select-none font-sans font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-transparent transition-opacity opacity-20 pointer-events-none hidden sm:inline-block"
                style={{
                  WebkitTextStroke: "1.5px rgba(255, 255, 255, 0.28)",
                }}
              >
                Work
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#9A9A9A] uppercase">
              Curated Archival Catalog // Authentic Optical Formats • 61 Master Plates
            </p>
          </div>

          {/* Category Navigation Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono uppercase tracking-wider">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setSelectedPlateIndex(null);
                  }}
                  className={`px-3.5 py-2 rounded-sm border transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "bg-[#E05A2B] text-white border-[#E05A2B] font-semibold shadow-[0_2px_12px_rgba(224,90,43,0.35)]"
                      : "bg-[#1E1E1E] text-[#B0B0B0] border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1 py-0.2 rounded ${
                      isActive ? "bg-black/25 text-white" : "text-[#777777]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5-COLUMN EDGE-TO-EDGE GRID WITH NATIVE OPTICAL RATIOS                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
          {filteredPlates.map((plate, idx) => {
            // Determine grid column span & container aspect ratio
            // Landscape plates (3:2) in mixed collections span 2 columns on tablet/desktop to maintain optical ratio gracefully
            const isLandscape = plate.isLandscape;
            const colSpanClass =
              isLandscape && activeCategory !== "portraits"
                ? "col-span-1 sm:col-span-2"
                : "col-span-1";

            const aspectClass = isLandscape
              ? "aspect-[3/2]"
              : plate.aspectRatio === "4/5"
              ? "aspect-[4/5]"
              : "aspect-[2/3]";

            return (
              <div
                key={plate.id}
                onClick={() => setSelectedPlateIndex(idx)}
                className={`group relative overflow-hidden bg-[#181818] cursor-pointer ${colSpanClass}`}
              >
                {/* Fixed Container with exact native aspect ratio — zero cropping */}
                <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                  <Image
                    src={`/images/${plate.filename}`}
                    alt={plate.title}
                    fill
                    unoptimized
                    quality={100}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Darkroom Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Hover Meta Card */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#E05A2B] tracking-widest uppercase mb-1">
                      <span>{plate.isLandscape ? "3:2 LANDSCAPE" : "2:3 PORTRAIT"}</span>
                      {plate.hasHuman && (
                        <>
                          <span>•</span>
                          <span className="text-[#CFA570]">HUMAN SITTING</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-sm sm:text-base font-normal leading-snug drop-shadow-md">
                      {plate.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-white/75 mt-1 font-sans">
                      <MapPin className="w-3 h-3 text-[#E05A2B] shrink-0" />
                      <span className="truncate">{plate.location}</span>
                    </div>
                  </div>

                  {/* Top-Right Quick Expand Icon */}
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL — UNCOMPRESSED ORIGINAL QUALITY DISPLAY                    */}
        {/* ========================================================================= */}
        {selectedPlate && selectedPlateIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={handleClose}
          >
            {/* Top Lightbox Telemetry Bar */}
            <div
              className="flex items-center justify-between text-white/80 text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#E05A2B]">
                  PLATE {selectedPlateIndex + 1} OF {filteredPlates.length}
                </span>
                <span>•</span>
                <span>{selectedPlate.isLandscape ? "3:2 LANDSCAPE" : "2:3 PORTRAIT"}</span>
                <span>•</span>
                <span className="text-white/60">{selectedPlate.camera}</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 hover:text-white hover:bg-white/10 rounded transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Center Stage: Authentic Ratio Preserved Photograph */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#E05A2B] text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Previous plate"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Main Image Frame */}
              <div
                className="relative max-h-[78vh] max-w-[90vw] overflow-hidden rounded border border-white/10 shadow-2xl"
                style={{
                  aspectRatio: selectedPlate.isLandscape ? "3/2" : selectedPlate.aspectRatio === "4/5" ? "4/5" : "2/3",
                  height: selectedPlate.isLandscape ? "auto" : "75vh",
                  width: selectedPlate.isLandscape ? "80vw" : "auto",
                  maxWidth: "1200px",
                }}
              >
                <Image
                  src={`/images/${selectedPlate.filename}`}
                  alt={selectedPlate.title}
                  fill
                  unoptimized
                  priority
                  quality={100}
                  className="object-contain"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#E05A2B] text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Next plate"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Archival Notes */}
            <div
              className="max-w-4xl mx-auto w-full text-center space-y-1.5 border-t border-white/10 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                {selectedPlate.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-sans max-w-2xl mx-auto line-clamp-2">
                {selectedPlate.caption}
              </p>
              <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-[#E05A2B] tracking-wider uppercase pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedPlate.location}
                </span>
                <span>//</span>
                <span>{selectedPlate.region}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
