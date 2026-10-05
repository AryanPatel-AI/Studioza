"use client";

import { useState } from "react";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";

export default function FullWidthBreakout() {
  const [cropMode, setCropMode] = useState<"master" | "uncropped">("master");

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 sm:py-36">
      {/* 1. Subtle Architectural Watermark Typography */}
      <div className="absolute top-1/2 left-0 right-0 -transtone-y-1/2 select-none pointer-events-none z-0 overflow-hidden flex justify-center opacity-[0.04]">
        <span className="type-display-hero">
          MONOLITH
        </span>
      </div>

      {/* 2. Full-Width Edge-to-Edge Architectural Spread */}
      <div className="relative z-10 w-full">
        {/* Top Film Frame Border & Rebate Marking */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-5 flex items-center justify-between type-meta border-b border-hairline pb-4">
          <div className="flex items-center gap-3">
            <span className="text-copper-500">PLATE REF. // 08-B</span>
            <span className="text-stone-300">•</span>
            <span>CONTACT STRIP 120-FORMAT</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-stone-400">
            <span>KODAK TRI-X 400 • PUSH +1</span>
            <span>LAT 64°08&apos;N // REYKJAVÍK</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCropMode(cropMode === "master" ? "uncropped" : "master")}
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-hairline hover:border-stone-400 text-ink-primary hover:text-ink-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer type-meta bg-transparent"
            >
              <SlidersHorizontal className="w-3 h-3 text-copper-500" />
              <span>{cropMode === "master" ? "View Full Negative" : "View Archival Crop"}</span>
            </button>
          </div>
        </div>

        {/* 100vw Panoramic Canvas */}
        <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[84vh] overflow-hidden bg-stone-950">
          <div
            className={`w-full h-full transition-all duration-700 ease-out ${
              cropMode === "master"
                ? "scale-100"
                : "scale-[1.10]"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=2400&q=90"
              alt="Architectural & Volcanic Monolith"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Overlapping Editorial Typography on bottom edge */}
          <div className="absolute bottom-6 sm:bottom-12 left-6 sm:left-12 lg:left-16 right-6 sm:right-12 lg:right-16 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pointer-events-none mix-blend-difference text-white">
            <div>
              <span className="type-meta opacity-80">
                Field Monograph 04 — The Volcanic Horizon
              </span>
              <h2 className="type-display-section mt-2">
                The Volcanic Horizon
              </h2>
            </div>

            <div className="pointer-events-auto">
              <a
                href="/contact"
                className="btn-editorial-secondary text-[10px] bg-transparent border-white text-white hover:bg-white hover:text-black hover:border-white mix-blend-normal"
              >
                <span>Inquire Plate Print</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Curatorial Commentary */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-[13px] text-ink-muted">
          <div className="md:col-span-4 space-y-1">
            <span className="type-meta block">
              Curatorial Commentary
            </span>
            <p className="">
              Exposed along the black basalt coastline of south Iceland under heavy maritime cloud cover. Captured with Hasselblad H6D-100c and 100mm prime.
            </p>
          </div>
          <div className="md:col-span-4 space-y-1">
            <span className="type-meta block">
              Print Specification
            </span>
            <p className="">
              Master edition limited to 8 museum prints. Pigment inks on 315gsm Hahnemühle Photo Rag Baryta with 50mm archival white border.
            </p>
          </div>
          <div className="md:col-span-4 space-y-1">
            <span className="type-meta block">
              Archival Provenance
            </span>
            <p className="">
              Hand-signed, numbered in graphite, and embossed with the Atelier seal. Accompanied by encrypted certificate of authenticity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
