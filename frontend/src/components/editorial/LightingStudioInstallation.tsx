"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Sliders, Sparkles, Sun, Moon, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import FluidOpticalGlass from "@/components/optical/FluidOpticalGlass";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

const StudioLightingStage3D = dynamic(
  () => import("@/components/3d/StudioLightingStage3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[540px] rounded-3xl border border-white/[0.08] bg-[#090807]/80 backdrop-blur-xl flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-amber-400/40 border-t-amber-400 animate-spin" />
        <span className="font-mono text-[10px] text-zinc-500 tracking-[0.25em] uppercase">
          Initializing Lighting Stage...
        </span>
      </div>
    ),
  }
);

interface LightingSchemeProfile {
  id: string;
  name: string;
  subtitle: string;
  keyAngleDeg: number;
  rimAngleDeg: number;
  ratio: string;
  keyKelvin: string;
  rimKelvin: string;
  character: string;
  historicalReference: string;
}

const SCHEMES: Record<string, LightingSchemeProfile> = {
  chiaroscuro: {
    id: "chiaroscuro",
    name: "Classic Chiaroscuro",
    subtitle: "Caravaggio Depth & Sculptural Shadow",
    keyAngleDeg: -54,
    rimAngleDeg: 117,
    ratio: "3:1 Sculptural Ratio",
    keyKelvin: "5200K Daylight Key",
    rimKelvin: "2800K Tungsten Rim",
    character:
      "Deep dimensional shadow rolloff with soft feathered cheek wrap. Light carves physical mass from dark room obsidian.",
    historicalReference: "Caravaggio • The Calling of Saint Matthew (1600)",
  },
  rembrandt: {
    id: "rembrandt",
    name: "Rembrandt Triangle",
    subtitle: "Iconic Renaissance Directional Modeling",
    keyAngleDeg: 45,
    rimAngleDeg: -126,
    ratio: "4:1 Tonal Contrast",
    keyKelvin: "4800K Neutral Studio",
    rimKelvin: "3000K Warm Fill",
    character:
      "Signature triangular patch of light under the shadowed eye, creating timeless psychological intimacy and anatomical depth.",
    historicalReference: "Rembrandt van Rijn • Self-Portrait (1659)",
  },
  split: {
    id: "split",
    name: "Dual-Tone Split",
    subtitle: "Lateral Chromatic Tension",
    keyAngleDeg: -90,
    rimAngleDeg: 90,
    ratio: "1:1 Balanced Opposition",
    keyKelvin: "5600K Cool Daylight",
    rimKelvin: "2400K Amber Sunset",
    character:
      "Total lateral facial division. Cool architectural daylight opposes incandescent tungsten amber along the facial midline.",
    historicalReference: "Sven Nykvist • Cinematography for Ingmar Bergman",
  },
  rim: {
    id: "rim",
    name: "Golden Halo Rim",
    subtitle: "High-Contrast Contour Silhouette",
    keyAngleDeg: 0,
    rimAngleDeg: 180,
    ratio: "6:1 Silhouette Bias",
    keyKelvin: "4000K Soft Ambient",
    rimKelvin: "2600K Molten Backlight",
    character:
      "Sharp edge flare emphasizing jawline, shoulders, and hair follicles against a deep, unlit studio cyclorama.",
    historicalReference: "Peter Lindbergh • Monochrome Editorial Retrospective",
  },
};

export default function LightingStudioInstallation() {
  const [activePreset, setActivePreset] = useState<string>("chiaroscuro");
  const scheme = useMemo(() => SCHEMES[activePreset] || SCHEMES.chiaroscuro, [activePreset]);

  return (
    <section
      id="stage"
      className="py-28 sm:py-40 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] relative bg-[#070605] text-neutral-100 selection:bg-amber-400 selection:text-black overflow-hidden"
    >
      {/* Background Architectural Ambient Tone */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_35%,rgba(229,154,36,0.03)_0%,rgba(16,185,129,0.02)_50%,transparent_75%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full border border-white/[0.02] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-white/[0.03] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 relative z-10">
        {/* ========================================================================= */}
        {/* EXHIBIT HEADER & EDITORIAL TYPOGRAPHY                                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-amber-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Exhibit No. 08 • The Chiaroscuro Stage</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-zinc-500 tracking-[0.25em] uppercase block">
                Sculpting Light &amp; Shadow
              </span>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">
                THE ATELIER STAGE
              </h2>
              <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 pt-3">
                <span className="text-3xl sm:text-5xl font-serif italic text-amber-300">
                  5200K / 2800K
                </span>
                <span className="text-2xl sm:text-4xl font-mono font-light text-zinc-300">
                  {scheme.ratio}
                </span>
                <span className="text-xs font-mono text-amber-400/90 tracking-widest uppercase border-l border-white/20 pl-4 py-1">
                  Continuous Tungsten &amp; Daylight Modeling Bench
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-md space-y-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2 text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Profoto Pro-11 High-Speed Strobe Engine</span>
            </div>
            <p className="font-sans font-light text-zinc-300 text-sm leading-relaxed">
              Photography is the deliberate arrest of light. On the Studioza stage, light is treated as a physical substance that carves mass, mood, and architectural form from darkness.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTRAL INSTALLATION CHAMBER: 3D LIGHTING STAGE + SCHEMATIC BLUEPRINT     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Interactive 3D Lighting Stage */}
          <div className="lg:col-span-7 relative">
            <div className="absolute top-4 left-4 z-20 pointer-events-none text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
              STUDIO CYCLORAMA • 3D SHADOW SIMULATOR
            </div>
            <div className="absolute bottom-4 right-4 z-20 pointer-events-none text-zinc-500 font-mono text-[9px] tracking-widest uppercase">
              KEY OCTABOX • RIM STRIPBOX
            </div>

            <StudioLightingStage3D
              initialPreset={activePreset as any}
              className="w-full h-[460px] sm:h-[540px] border-white/[0.12]"
            />
          </div>

          {/* Right Column: Curatorial Console & 2D Overhead Blueprint */}
          <div className="lg:col-span-5 space-y-8">
            <FluidOpticalGlass
              tint="obsidian"
              intensity="deep"
              depth={10}
              contentClassName="p-6 sm:p-8 space-y-6"
            >
              {/* Active Scheme Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                    Active Lighting Scheme
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      {scheme.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {scheme.subtitle}
                  </span>
                </div>

                {/* Overhead 2D Stage Lighting Blueprint SVG */}
                <div className="relative w-20 h-20 rounded-full border border-white/15 bg-black/70 flex items-center justify-center overflow-hidden shadow-inner">
                  {/* Subject Center Dot */}
                  <div className="w-3 h-3 rounded-full bg-zinc-200 border border-amber-400/80 shadow-[0_0_8px_rgba(245,158,11,0.5)] z-10" />

                  {/* SVG Orbit Lines & Light Heads */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                    {/* Key Light Position (Daylight) */}
                    <circle
                      cx={50 + Math.cos((scheme.keyAngleDeg * Math.PI) / 180) * 36}
                      cy={50 + Math.sin((scheme.keyAngleDeg * Math.PI) / 180) * 36}
                      r="4"
                      fill="#38bdf8"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Rim Light Position (Amber) */}
                    <circle
                      cx={50 + Math.cos((scheme.rimAngleDeg * Math.PI) / 180) * 36}
                      cy={50 + Math.sin((scheme.rimAngleDeg * Math.PI) / 180) * 36}
                      r="4"
                      fill="#f59e0b"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Curatorial Commentary */}
              <p className="text-xs font-light text-zinc-300 leading-relaxed italic font-serif text-sm">
                &ldquo;{scheme.character}&rdquo;
              </p>

              {/* Technical Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/[0.06] text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                    Key Strobe
                  </span>
                  <span className="text-sky-300 font-medium block">
                    {scheme.keyKelvin}
                  </span>
                  <span className="text-[10px] text-zinc-400">Soft Octabox Key</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">
                    Rim Strobe
                  </span>
                  <span className="text-amber-300 font-medium block">
                    {scheme.rimKelvin}
                  </span>
                  <span className="text-[10px] text-zinc-400">Tungsten Stripbox</span>
                </div>
              </div>

              {/* Historical Reference Footnote */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>REFERENCE CANON</span>
                <span className="text-zinc-400 truncate max-w-[200px]">{scheme.historicalReference}</span>
              </div>
            </FluidOpticalGlass>

            {/* Stepped Lighting Scheme Selector */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                Select Master Lighting Scheme
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                {Object.values(SCHEMES).map((item) => {
                  const isSelected = activePreset === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActivePreset(item.id)}
                      className={cn(
                        "p-3 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-1 cursor-pointer select-none",
                        isSelected
                          ? "bg-amber-400/10 border-amber-400/70 text-white shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                          : "bg-black/40 border-white/[0.08] text-zinc-400 hover:text-zinc-200 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className={cn("text-xs font-medium font-serif", isSelected ? "text-amber-300 font-bold" : "text-zinc-200")}>
                          {item.name}
                        </span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 truncate">
                        {item.ratio}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Studio Action Button */}
            <div className="pt-2 flex items-center justify-between gap-4">
              <StudioButton
                variant="crystal"
                size="md"
                href="#contact"
                icon="arrow-up-right"
                strength={0.2}
                className="w-full text-xs"
              >
                Inquire for Bespoke Lighting Direction
              </StudioButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
