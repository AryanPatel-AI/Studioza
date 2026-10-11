"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { RECENT_WORK_PLATES, RecentWorkPlate } from "@/lib/data/recentWorkPlates";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin, Grid, SlidersHorizontal, Image as ImageIcon } from "lucide-react";

interface CategoryTab {
  id: string;
  label: string;
}

const CATEGORIES: CategoryTab[] = [
  { id: "all", label: "All Monographs" },
  { id: "architecture", label: "Architecture & Forts" },
  { id: "portraits", label: "Portraits" },
  { id: "weddings", label: "Weddings" },
  { id: "fashion", label: "Fashion" },
  { id: "commercial", label: "Commercial" },
];

type OrientationFilter = "all" | "portrait" | "landscape";

export default function RecentWorkGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [orientationFilter, setOrientationFilter] = useState<OrientationFilter>("all");
  const [selectedPlate, setSelectedPlate] = useState<RecentWorkPlate | null>(null);

  // Filter plates by category first
  const categoryFilteredPlates = useMemo(() => {
    if (activeCategory === "all") return RECENT_WORK_PLATES;
    return RECENT_WORK_PLATES.filter((p) => p.categories.includes(activeCategory));
  }, [activeCategory]);

  // Separate into portrait and landscape plates
  const portraitPlates = useMemo(() => {
    return categoryFilteredPlates.filter((p) => !p.isLandscape);
  }, [categoryFilteredPlates]);

  const landscapePlates = useMemo(() => {
    return categoryFilteredPlates.filter((p) => p.isLandscape);
  }, [categoryFilteredPlates]);

  // Plates to display based on orientation filter
  const displayedPlates = useMemo(() => {
    if (orientationFilter === "portrait") return portraitPlates;
    if (orientationFilter === "landscape") return landscapePlates;
    return categoryFilteredPlates;
  }, [orientationFilter, portraitPlates, landscapePlates, categoryFilteredPlates]);

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

  // Lightbox navigation
  const activeList = useMemo(() => {
    return displayedPlates;
  }, [displayedPlates]);

  const selectedIndex = selectedPlate ? activeList.findIndex((p) => p.id === selectedPlate.id) : -1;

  const handlePrev = useCallback(() => {
    if (selectedIndex < 0) return;
    const nextIdx = selectedIndex > 0 ? selectedIndex - 1 : activeList.length - 1;
    setSelectedPlate(activeList[nextIdx]);
  }, [selectedIndex, activeList]);

  const handleNext = useCallback(() => {
    if (selectedIndex < 0) return;
    const nextIdx = selectedIndex < activeList.length - 1 ? selectedIndex + 1 : 0;
    setSelectedPlate(activeList[nextIdx]);
  }, [selectedIndex, activeList]);

  const handleClose = useCallback(() => {
    setSelectedPlate(null);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPlate) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPlate, handleClose, handlePrev, handleNext]);

  return (
    <section className="relative w-full bg-[#171717] text-[#F4F1EB] py-24 sm:py-32 px-4 sm:px-6 lg:px-10 overflow-hidden select-none border-t border-b border-white/10">
      <div className="max-w-[1920px] mx-auto space-y-12">
        {/* ========================================================================= */}
        {/* HEADER: Studioza Palette "Recent Work" with Ghost Outline Typography      */}
        {/* ========================================================================= */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap relative">
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold tracking-tight text-[#F4F1EB] flex items-center">
                <span>Recent&nbsp;</span>
                <span className="text-[#CFA570]">Work</span>
              </h2>
              {/* Layered Ghost Outline Text in Studioza Gold Hairline */}
              <span
                aria-hidden="true"
                className="select-none font-sans font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-transparent transition-opacity opacity-20 pointer-events-none hidden sm:inline-block"
                style={{
                  WebkitTextStroke: "1.5px #CFA570",
                }}
              >
                Work
              </span>
            </div>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#A7A7A7] uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#CFA570]" />
              Archival Catalog // 61 Medium Format Plates • Strict Aspect Ratios Preserved
            </p>
          </div>

          {/* Controls Cluster: Category Tabs & Orientation Segmented Control */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
            {/* Orientation Filter Switch: All vs Portraits vs Landscapes */}
            <div className="inline-flex items-center p-1 bg-[#1F1E1B] rounded border border-white/10 text-xs font-mono uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setOrientationFilter("all")}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  orientationFilter === "all"
                    ? "bg-[#CFA570] text-[#151515] font-semibold shadow-sm"
                    : "text-[#A7A7A7] hover:text-white"
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>All Formats ({categoryFilteredPlates.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setOrientationFilter("portrait")}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  orientationFilter === "portrait"
                    ? "bg-[#CFA570] text-[#151515] font-semibold shadow-sm"
                    : "text-[#A7A7A7] hover:text-white"
                }`}
              >
                <span>2:3 Portraits ({portraitPlates.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setOrientationFilter("landscape")}
                className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
                  orientationFilter === "landscape"
                    ? "bg-[#CFA570] text-[#151515] font-semibold shadow-sm"
                    : "text-[#A7A7A7] hover:text-white"
                }`}
              >
                <span>3:2 Landscapes ({landscapePlates.length})</span>
              </button>
            </div>

            {/* Category Navigation Pills in Studioza Palette */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded border transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#CFA570] text-[#151515] border-[#CFA570] font-semibold shadow-[0_2px_12px_rgba(207,165,112,0.25)]"
                        : "bg-[#1F1E1B] text-[#A7A7A7] border-white/10 hover:border-[#CFA570]/40 hover:text-white"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded ${
                        isActive ? "bg-[#151515]/20 text-[#151515]" : "text-[#77736D]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* GALLERIES: SEGREGATED PORTRAITS (5-COL) & LANDSCAPES (3-COL)              */}
        {/* ========================================================================= */}
        <div className="space-y-16">
          {/* SECTION 1: 2:3 VERTICAL PORTRAIT STUDIES (5 COLUMNS ACROSS) */}
          {(orientationFilter === "all" || orientationFilter === "portrait") && portraitPlates.length > 0 && (
            <div className="space-y-4">
              {orientationFilter === "all" && landscapePlates.length > 0 && (
                <div className="flex items-center justify-between border-b border-white/10 pb-3 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CFA570]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFA570]" />
                    <span>Folio Part I // Portrait &amp; Temple Studies (2:3 Vertical Form • {portraitPlates.length} Plates)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A7A7A7] hidden sm:inline">
                    5-Column Seamless Edge-to-Edge Grid
                  </span>
                </div>
              )}

              {/* 5-Column Grid: pure 2:3 aspect ratio, identical heights in every row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 sm:gap-2">
                {portraitPlates.map((plate) => {
                  const aspectClass = plate.aspectRatio === "4/5" ? "aspect-[4/5]" : "aspect-[2/3]";

                  return (
                    <div
                      key={plate.id}
                      onClick={() => setSelectedPlate(plate)}
                      className="group relative overflow-hidden bg-[#1F1E1B] cursor-pointer"
                    >
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

                        {/* Darkroom Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Hover Caption Card */}
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#CFA570] tracking-widest uppercase mb-1">
                            <span>2:3 PORTRAIT</span>
                            {plate.hasHuman && (
                              <>
                                <span>•</span>
                                <span className="text-white/80">HUMAN SITTING</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-serif text-sm sm:text-base font-normal leading-snug drop-shadow-md text-[#F4F1EB]">
                            {plate.title}
                          </h3>
                          <div className="flex items-center gap-1 text-[11px] text-[#A7A7A7] mt-1 font-sans">
                            <MapPin className="w-3 h-3 text-[#CFA570] shrink-0" />
                            <span className="truncate">{plate.location}</span>
                          </div>
                        </div>

                        {/* Quick Expand Icon */}
                        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[#CFA570] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 2: 3:2 WIDESCREEN LANDSCAPE PANORAMAS (3 COLUMNS ACROSS) */}
          {(orientationFilter === "all" || orientationFilter === "landscape") && landscapePlates.length > 0 && (
            <div className="space-y-4 pt-4">
              {orientationFilter === "all" && portraitPlates.length > 0 && (
                <div className="flex items-center justify-between border-b border-white/10 pb-3 pt-6">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CFA570]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFA570]" />
                    <span>Folio Part II // Citadel Panoramas &amp; Waterscapes (3:2 Landscape Form • {landscapePlates.length} Plates)</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#A7A7A7] hidden sm:inline">
                    3-Column Widescreen Panoramic Grid
                  </span>
                </div>
              )}

              {/* 3-Column Grid: pure 3:2 aspect ratio, identical widescreen heights in every row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {landscapePlates.map((plate) => {
                  return (
                    <div
                      key={plate.id}
                      onClick={() => setSelectedPlate(plate)}
                      className="group relative overflow-hidden bg-[#1F1E1B] cursor-pointer"
                    >
                      <div className="relative w-full aspect-[3/2] overflow-hidden">
                        <Image
                          src={`/images/${plate.filename}`}
                          alt={plate.title}
                          fill
                          unoptimized
                          quality={100}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Darkroom Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                        {/* Hover Caption Card */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white z-10 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex flex-col justify-end">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#CFA570] tracking-widest uppercase mb-1">
                            <span>3:2 WIDESCREEN LANDSCAPE</span>
                            {plate.hasHuman && (
                              <>
                                <span>•</span>
                                <span className="text-white/80">PROMENADE SITTING</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-serif text-base sm:text-lg font-normal leading-snug drop-shadow-md text-[#F4F1EB]">
                            {plate.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mt-1 font-sans">
                            <MapPin className="w-3.5 h-3.5 text-[#CFA570] shrink-0" />
                            <span className="truncate">{plate.location}</span>
                          </div>
                        </div>

                        {/* Quick Expand Icon */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[#CFA570] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* LIGHTBOX MODAL — UNCOMPRESSED ORIGINAL RESOLUTION DISPLAY                 */}
        {/* ========================================================================= */}
        {selectedPlate && (
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
                <span className="text-[#CFA570]">
                  PLATE {selectedIndex + 1} OF {activeList.length}
                </span>
                <span>•</span>
                <span>{selectedPlate.isLandscape ? "3:2 WIDESCREEN" : "2:3 PORTRAIT"}</span>
                <span>•</span>
                <span className="text-white/60">{selectedPlate.camera}</span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 hover:text-[#CFA570] hover:bg-white/10 rounded transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
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
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#CFA570] hover:text-[#151515] text-white border border-white/20 transition-all hover:scale-110"
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
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#CFA570] hover:text-[#151515] text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Next plate"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Archival Notes in Studioza Palette */}
            <div
              className="max-w-4xl mx-auto w-full text-center space-y-1.5 border-t border-white/10 pt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F1EB] font-normal">
                {selectedPlate.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A7A7A7] font-sans max-w-2xl mx-auto line-clamp-2">
                {selectedPlate.caption}
              </p>
              <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-[#CFA570] tracking-wider uppercase pt-0.5">
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
