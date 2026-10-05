"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Sliders, Sun, Moon, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

const StudioLightingStage3D = dynamic(
  () => import("@/components/3d/StudioLightingStage3D"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[460px] sm:h-[520px] bg-white/5 flex flex-col items-center justify-center gap-3">
        <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-copper-500 animate-spin" />
        <span className="text-[10px] text-ink-muted uppercase">
          Calibrating Optical Stage...
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
      "Deep dimensional shadow rolloff with soft feathered cheek wrap. Light carves physical mass from darkness.",
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
      "Signature triangular patch of light under the shadowed eye, creating psychological intimacy and anatomical depth.",
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
      className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-hairline relative bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        {/* ========================================================================= */}
        {/* EXHIBIT HEADER & EDITORIAL TYPOGRAPHY                                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 type-meta">
              <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
              <span>Exhibit 08 • The Optical Stage</span>
            </div>

            <h2 className="type-display-section text-ink-primary">
              The Chiaroscuro Stage
            </h2>

            <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 pt-2">
              <span className="type-display-project italic text-copper-600">
                5200K / 2800K
              </span>
              <span className="type-display-project text-ink-primary">
                {scheme.ratio}
              </span>
              <span className="type-meta border-l border-hairline pl-4 py-0.5">
                Continuous Modeling Bench
              </span>
            </div>
          </div>

          <div className="max-w-md space-y-2 type-meta text-ink-muted">
            <div className="flex items-center gap-2 text-copper-600 uppercase text-[10px]">
              <span className="w-1 h-1 rounded-full bg-copper-500" />
              <span>Profoto Pro-11 Strobe Engine</span>
            </div>
            <p className="text-ink-body type-body-base">
              Photography is the deliberate arrest of light. On the Studioza stage, light is treated as a physical substance that carves mass, mood, and architectural form from darkness.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTRAL INSTALLATION CHAMBER: 3D LIGHTING STAGE + SCHEMATIC BLUEPRINT     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive 3D Lighting Stage */}
          <div className="lg:col-span-7 relative">
            <div className="absolute top-3.5 left-4 z-20 pointer-events-none text-stone-400 text-[10px] uppercase">
              STUDIO CYCLORAMA • 3D SHADOW SIMULATOR
            </div>
            <div className="absolute bottom-3.5 right-4 z-20 pointer-events-none text-stone-400 text-[10px] uppercase">
              KEY OCTABOX • RIM STRIPBOX
            </div>

            <div className="rounded-[2px] overflow-hidden border border-hairline bg-black/50">
              <StudioLightingStage3D
                initialPreset={activePreset as any}
                className="w-full h-[440px] sm:h-[500px]"
              />
            </div>
          </div>

          {/* Right Column: Curatorial Console & 2D Overhead Blueprint */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 bg-background border border-hairline space-y-6">
              {/* Active Scheme Header */}
              <div className="flex items-center justify-between pb-4 border-b border-hairline">
                <div>
                  <span className="type-meta text-copper-600 block mb-1">
                    Selected Setup
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="type-display-project text-ink-primary">
                      {scheme.name}
                    </span>
                  </div>
                  <span className="type-meta text-ink-muted">
                    {scheme.subtitle}
                  </span>
                </div>

                {/* Overhead 2D Stage Lighting Blueprint SVG */}
                <div className="relative w-16 h-16 border border-hairline bg-transparent flex items-center justify-center overflow-hidden">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-200 border border-copper-500 z-10" />

                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(20,20,19,0.12)" strokeDasharray="2 2" />

                    {/* Key Light Position */}
                    <circle
                      cx={50 + Math.cos((scheme.keyAngleDeg * Math.PI) / 180) * 32}
                      cy={50 + Math.sin((scheme.keyAngleDeg * Math.PI) / 180) * 32}
                      r="3.5"
                      fill="#C85A17"
                      className="transition-all duration-500 ease-out"
                    />

                    {/* Rim Light Position */}
                    <circle
                      cx={50 + Math.cos((scheme.rimAngleDeg * Math.PI) / 180) * 32}
                      cy={50 + Math.sin((scheme.rimAngleDeg * Math.PI) / 180) * 32}
                      r="3"
                      fill="#8F9E82"
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                </div>
              </div>

              {/* Technical Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-3 border border-hairline bg-transparent">
                  <span className="text-stone-400 block text-[9px] uppercase mb-0.5">Key Light</span>
                  <span className="text-ink-primary">{scheme.keyKelvin}</span>
                </div>
                <div className="p-3 border border-hairline bg-transparent">
                  <span className="text-stone-400 block text-[9px] uppercase mb-0.5">Rim Contour</span>
                  <span className="text-copper-600">{scheme.rimKelvin}</span>
                </div>
              </div>

              {/* Character & Historical Reference */}
              <div className="space-y-2 text-xs">
                <p className="text-ink-body">
                  {scheme.character}
                </p>
                <div className="pt-2 border-t border-hairline text-[10px] text-ink-muted">
                  <span className="text-stone-400">HISTORICAL REF: </span>
                  <span className="text-ink-primary">{scheme.historicalReference}</span>
                </div>
              </div>

              {/* 4 Preset Buttons */}
              <div className="pt-2 border-t border-hairline space-y-2">
                <span className="type-meta text-ink-muted block mb-2">
                  Select Stage Configuration:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(SCHEMES).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActivePreset(item.id)}
                      className={cn(
                        "py-2 px-3 text-left  text-[10px] uppercase  rounded-[2px] border transition-colors cursor-pointer",
                        activePreset === item.id
                          ? "border-copper-500 bg-white/10 text-copper-500 font-semibold"
                          : "border-hairline bg-background text-ink-muted hover:border-white/20 hover:text-ink-primary"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
