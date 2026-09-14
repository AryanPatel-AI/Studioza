"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FullWidthBreakout() {
  const [cropMode, setCropMode] = useState<"master" | "uncropped">("master");

  return (
    <section className="relative w-full overflow-hidden bg-[#050507] py-28 sm:py-40">
      {/* 1. Giant Overlapping Ghost Typography */}
      <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 select-none pointer-events-none z-0 overflow-hidden flex justify-center">
        <span className="text-[18vw] sm:text-[22vw] font-serif font-black tracking-tighter text-white/[0.03] uppercase whitespace-nowrap leading-none blur-[1px]">
          OBSIDIAN
        </span>
      </div>

      {/* 2. Full-Width Edge-to-Edge Architectural Spread */}
      <div className="relative z-10 w-full">
        {/* Top Film Frame Border & Rebate Marking */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-6 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">PLATE REF. // 08-B</span>
            <span className="text-zinc-600">•</span>
            <span>CONTACT STRIP 120-FORMAT</span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>KODAK TRI-X 400 • PUSH +1</span>
            <span>LAT 64°08&apos;N // REYKJAVÍK</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCropMode(cropMode === "master" ? "uncropped" : "master")}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 hover:border-amber-400/80 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer text-[10px]"
            >
              <SlidersHorizontal className="w-3 h-3 text-amber-400" />
              <span>{cropMode === "master" ? "View Full Negative" : "View Archival Crop"}</span>
            </button>
          </div>
        </div>

        {/* The 100vw Giant Image Canvas with intentional analog imperfections */}
        <div className="relative w-full h-[65vh] sm:h-[80vh] lg:h-[88vh] overflow-hidden bg-zinc-950">
          {/* Main Panoramic Image */}
          <div
            className={`w-full h-full transition-all duration-700 ease-out ${
              cropMode === "master"
                ? "scale-100 filter brightness-95 contrast-[1.08]"
                : "scale-[1.12] filter brightness-75 contrast-125"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=90"
              alt="Architectural & Volcanic Monolith"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Optical Anamorphic Light-Leak Edge (Tungsten/Amber flare along left edge) */}
          <div className="absolute inset-y-0 left-0 w-48 sm:w-80 bg-gradient-to-r from-amber-500/20 via-orange-600/10 to-transparent pointer-events-none mix-blend-screen" />

          {/* Vignette & Atmospheric Fog */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/60 pointer-events-none" />

          {/* Photographers Contact Sheet Grease Pencil Crop Annotation (Clear of headline) */}
          {cropMode === "master" && (
            <div className="absolute inset-x-4 sm:inset-x-16 lg:inset-x-24 top-6 sm:top-16 lg:top-24 bottom-52 sm:bottom-44 lg:bottom-52 pointer-events-none border border-amber-400/35 rounded-sm flex flex-col justify-between p-3 sm:p-4 transition-opacity duration-500 animate-in fade-in">
              <div className="flex justify-between items-start text-[9px] sm:text-[10px] font-mono text-amber-400/80">
                <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/30">
                  ✓ CROP 16:9<span className="hidden sm:inline"> // MASTER PRINT</span>
                </span>
                <span className="hidden sm:inline bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/30">
                  BURNING -0.5 EV
                </span>
              </div>
              <div className="flex justify-between items-end text-[9px] sm:text-[10px] font-mono text-amber-400/80">
                <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/30">
                  FRAME 14A • SELECTED
                </span>
                <span className="hidden sm:inline bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-amber-400/30">
                  HAHNEMÜHLE BARYTA 315GSM
                </span>
              </div>
            </div>
          )}

          {/* Overlapping Typography cutting across the bottom edge of the image */}
          <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 lg:left-16 right-6 sm:right-12 lg:right-16 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none">
            <div>
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400/90 block mb-2">
                Field Monograph 04 — The Volcanic Horizon
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tight drop-shadow-lg leading-tight">
                The Volcanic Horizon
              </h2>
            </div>

            <div className="pointer-events-auto">
              <MagneticButton href="/contact" strength={0.3}>
                <div className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/20 text-xs font-mono tracking-wider transition-all shadow-xl font-medium">
                  <span>Inquire Plate Print</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Museum Placard Footnote / Curatorial Commentary */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs font-light text-zinc-400">
          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 block">
              Curatorial Commentary
            </span>
            <p className="leading-relaxed">
              Captured under sub-zero Atlantic gale winds during the blue hour transition. The dense basalt columns act as an architectural sound baffle, trapping silence inside the negative space.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 block">
              Exposure Telemetry
            </span>
            <p className="font-mono text-[11px] text-zinc-300">
              Schneider Apo-Digitar 47mm XL • f/11 • 45s Long Exposure • Lee 0.9 Soft ND Grad filter.
            </p>
          </div>

          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-mono tracking-wider text-zinc-500 block">
              Archival Specifications
            </span>
            <p className="font-mono text-[11px] text-amber-300/90">
              Limited Edition of 7 Worldwide • Signed &amp; blind-embossed by principal photographer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
