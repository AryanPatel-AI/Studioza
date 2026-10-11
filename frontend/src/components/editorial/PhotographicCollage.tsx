"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { RECENT_WORK_PLATES, RecentWorkPlate } from "@/lib/data/recentWorkPlates";
import { X, ChevronLeft, ChevronRight, Maximize2, MapPin } from "lucide-react";

export default function PhotographicCollage() {
  const [selectedPlate, setSelectedPlate] = useState<RecentWorkPlate | null>(null);

  // Group images into portrait studies and landscape panoramas
  const portraitPlates = useMemo(() => {
    return RECENT_WORK_PLATES.filter((p) => !p.isLandscape);
  }, []);

  const landscapePlates = useMemo(() => {
    return RECENT_WORK_PLATES.filter((p) => p.isLandscape);
  }, []);

  // Selected plate index for lightbox
  const selectedIndex = selectedPlate
    ? RECENT_WORK_PLATES.findIndex((p) => p.id === selectedPlate.id)
    : -1;

  const handlePrev = useCallback(() => {
    if (selectedIndex < 0) return;
    const nextIdx = selectedIndex > 0 ? selectedIndex - 1 : RECENT_WORK_PLATES.length - 1;
    setSelectedPlate(RECENT_WORK_PLATES[nextIdx]);
  }, [selectedIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex < 0) return;
    const nextIdx = selectedIndex < RECENT_WORK_PLATES.length - 1 ? selectedIndex + 1 : 0;
    setSelectedPlate(RECENT_WORK_PLATES[nextIdx]);
  }, [selectedIndex]);

  const handleClose = useCallback(() => {
    setSelectedPlate(null);
  }, []);

  // Keyboard navigation
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
    <section className="relative w-full bg-[#F4F1EB] text-[#151515] py-24 sm:py-32 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* ========================================================================= */}
        {/* COLLAGE PART I: 3:2 WIDESCREEN CITADEL & WATERSCAPE PANORAMAS             */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D9D5CE] pb-4 gap-2">
            <div>
              <span className="type-meta text-[#77736D] block mb-1">
                COLLAGE COMPOSITION // PANORAMIC EXPEDITIONS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-normal">
                Citadel Ramparts &amp; High-Altitude Waterscapes
              </h2>
            </div>
            <span className="type-meta text-[#CFA570] text-xs">
              ORIGINAL 3:2 WIDESCREEN FORM
            </span>
          </div>

          {/* Panoramic Collage: Dynamic mosaic of 3:2 landscape plates */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* Main Anchor: Jaigarh Fort Crest (Full 8 cols) */}
            <div
              onClick={() => setSelectedPlate(landscapePlates[10] || landscapePlates[0])}
              className="md:col-span-8 group relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] cursor-pointer shadow-sm"
            >
              <div className="aspect-[3/2] relative w-full overflow-hidden">
                <Image
                  src={`/images/${landscapePlates[10]?.filename || "hilltop-fortress-crest.jpg"}`}
                  alt={landscapePlates[10]?.title || "Jaigarh Fort Crest"}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <span className="type-meta text-[#CFA570] text-[10px] block mb-0.5">3:2 LANDSCAPE</span>
                  <p className="font-serif text-lg">{landscapePlates[10]?.title}</p>
                  <p className="type-small text-white/80">{landscapePlates[10]?.location}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-[#CFA570] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Stacked Right Column: Dal Lake & Jageshwar Riverbed (4 cols) */}
            <div className="md:col-span-4 space-y-4 lg:space-y-6">
              {landscapePlates.slice(7, 9).map((plate) => (
                <div
                  key={plate.id}
                  onClick={() => setSelectedPlate(plate)}
                  className="group relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] cursor-pointer shadow-sm"
                >
                  <div className="aspect-[3/2] relative w-full overflow-hidden">
                    <Image
                      src={`/images/${plate.filename}`}
                      alt={plate.title}
                      fill
                      unoptimized
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      <p className="font-serif text-sm leading-snug">{plate.title}</p>
                      <p className="text-[11px] text-white/80 truncate">{plate.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row Triptych: 3 Landscape Panoramas Side-by-Side (4 cols each) */}
            {landscapePlates.slice(2, 5).map((plate) => (
              <div
                key={plate.id}
                onClick={() => setSelectedPlate(plate)}
                className="md:col-span-4 group relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] cursor-pointer shadow-sm"
              >
                <div className="aspect-[3/2] relative w-full overflow-hidden">
                  <Image
                    src={`/images/${plate.filename}`}
                    alt={plate.title}
                    fill
                    unoptimized
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <p className="font-serif text-sm leading-snug">{plate.title}</p>
                    <p className="text-[11px] text-white/80 truncate">{plate.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLLAGE PART II: 2:3 VERTICAL PORTRAITS & TEMPLE MONOLITHS                */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D9D5CE] pb-4 gap-2">
            <div>
              <span className="type-meta text-[#77736D] block mb-1">
                COLLAGE COMPOSITION // SITTINGS &amp; TEMPLE SHIKHARAS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-normal">
                Human Character &amp; Monolithic Stone Architecture
              </h2>
            </div>
            <span className="type-meta text-[#CFA570] text-xs">
              ORIGINAL 2:3 VERTICAL FORM
            </span>
          </div>

          {/* Dynamic 5-Column Collage of Vertical Studies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
            {portraitPlates.slice(0, 15).map((plate, idx) => (
              <div
                key={plate.id}
                onClick={() => setSelectedPlate(plate)}
                className={`group relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] cursor-pointer shadow-sm ${
                  idx % 4 === 1 ? "sm:translate-y-3" : idx % 4 === 3 ? "sm:-translate-y-2" : ""
                }`}
              >
                <div className="aspect-[2/3] relative w-full overflow-hidden">
                  <Image
                    src={`/images/${plate.filename}`}
                    alt={plate.title}
                    fill
                    unoptimized
                    quality={100}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                    <span className="type-meta text-[#CFA570] text-[9px] block mb-0.5">2:3 PORTRAIT</span>
                    <p className="font-serif text-xs leading-snug truncate">{plate.title}</p>
                    <p className="text-[10px] text-white/75 truncate">{plate.location}</p>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-[#CFA570] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  PLATE {selectedIndex + 1} OF {RECENT_WORK_PLATES.length}
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
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#CFA570] hover:text-[#151515] text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Previous plate"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div
                className="relative max-h-[78vh] max-w-[90vw] overflow-hidden rounded border border-white/10 shadow-2xl"
                style={{
                  aspectRatio: selectedPlate.isLandscape ? "3/2" : "2/3",
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

              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/70 hover:bg-[#CFA570] hover:text-[#151515] text-white border border-white/20 transition-all hover:scale-110"
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
