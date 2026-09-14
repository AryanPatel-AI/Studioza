"use client";

import React, { useState, useEffect, useRef } from "react";
import { Scan, ArrowUpRight } from "lucide-react";
import FluidOpticalGlass from "@/components/optical/FluidOpticalGlass";
import LiquidRefractionLoupe from "@/components/optical/LiquidRefractionLoupe";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

export type CuratorialCategory =
  | "ALL"
  | "ARCHITECTURE"
  | "FINE ART"
  | "PORTRAIT"
  | "EDITORIAL"
  | "OBJECTS";

interface ExhibitionPlate {
  id: string;
  suite: string;
  roomNumber: string;
  category: CuratorialCategory;
  title: string;
  curatorialThesis: string;
  location: string;
  year: string;
  edition: string;
  paperStock: string;
  primaryImage: {
    src: string;
    alt: string;
    camera: string;
    lens: string;
    exposure: string;
    aspect: string;
  };
  overlappingImage?: {
    src: string;
    alt: string;
    label: string;
    camera: string;
    exposure: string;
    aspect: string;
  };
}

const EXHIBITION_DATA: ExhibitionPlate[] = [
  {
    id: "suite-architecture",
    suite: "Spatial Chiaroscuro & Modernist Concrete",
    roomNumber: "01",
    category: "ARCHITECTURE",
    title: "Monolithic Cantilever",
    curatorialThesis:
      "Deep chiaroscuro shadows carving through Kyoto timber and post-war brutalist concrete. An exploration of structural massing balanced with twilight architectural illumination.",
    location: "Kyoto, Japan",
    year: "2026",
    edition: "Edition of 8 • Archival Master Negative",
    paperStock: "Heavyweight 310gsm Hahnemühle Photo Rag Baryta",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      alt: "Kyoto Brutalist Residence Architecture",
      camera: "Fujifilm GFX 100 II",
      lens: "GF 23mm f/4 R LM WR Tilt-Shift",
      exposure: "1/30s • f/11 • ISO 50",
      aspect: "aspect-[16/10]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      alt: "Abstract Minimalist Spatial Light Study",
      label: "Plate 01-B • Surface Micro-Relief",
      camera: "Leica Monochrom",
      exposure: "1/125s • f/5.6",
      aspect: "aspect-[4/5]",
    },
  },
  {
    id: "suite-portrait",
    suite: "The Human Cadence & Silver Emulsion",
    roomNumber: "02",
    category: "PORTRAIT",
    title: "Soul in Silver",
    curatorialThesis:
      "An intimate chiaroscuro monochrome study capturing micro-expressions and authentic human stillness. Recorded on whisper-quiet mechanical rangefinder systems without studio artificiality.",
    location: "Le Marais Studio, Paris",
    year: "2026",
    edition: "Edition of 12 • Silver Gelatin Master Print",
    paperStock: "Ilford Galerie Prestige Warmtone 310gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
      alt: "Monochrome Portrait Paris",
      camera: "Leica M11 Rangefinder",
      lens: "Summilux-M 35mm f/1.4 ASPH",
      exposure: "1/500s • f/1.4 • ISO 100",
      aspect: "aspect-[3/4]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      alt: "Quiet Geometry Shadow Study",
      label: "Plate 02-B • Negative Space Form",
      camera: "Leica Monochrom",
      exposure: "1/250s • f/4.0",
      aspect: "aspect-[4/3]",
    },
  },
  {
    id: "suite-editorial",
    suite: "Kinetic Fluidity & Haute Couture",
    roomNumber: "03",
    category: "EDITORIAL",
    title: "Haute Chiaroscuro & Velvet Movement",
    curatorialThesis:
      "Capturing the fluid suspension of draped silk textiles in athletic haute couture choreography. Twin high-speed sync studio packs arrest fabric in flight with sculptural precision.",
    location: "Studioza Atelier SoHo, New York",
    year: "2026",
    edition: "Permanent Atelier Archive • Maison Commission",
    paperStock: "Canson Infinity Platine Fibre Rag 310gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
      alt: "Haute Chiaroscuro Fashion Study",
      camera: "Hasselblad H6D-100c",
      lens: "HC 100mm f/2.2 Orange Dot",
      exposure: "1/800s • f/2.8 • ISO 64",
      aspect: "aspect-[16/9]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
      alt: "Velvet Movement Crimson Silk",
      label: "Plate 03-B • Kinetic Suspension",
      camera: "Phase One IQ4",
      exposure: "1/1600s • f/4.0",
      aspect: "aspect-[4/5]",
    },
  },
  {
    id: "suite-fineart",
    suite: "Stillness & Darkroom Atmospheric Form",
    roomNumber: "04",
    category: "FINE ART",
    title: "Quiet Shadows & Volcanic Horizon",
    curatorialThesis:
      "A meditation on shadow gradients and twilight tonal transitions. Sunlight glancing across volcanic sand, printed on traditional baryta silver rag with selenium toning.",
    location: "Reykjavík, Iceland & Traditional Kyoto",
    year: "2026",
    edition: "Edition of 6 • Platinum-Palladium Print",
    paperStock: "Handmade Arches Platine 310gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
      alt: "Atmospheric Light Still Life",
      camera: "Phase One XF IQ4 150MP",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      exposure: "1/1600s • f/4.0 • ISO 100",
      aspect: "aspect-[16/10]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
      alt: "Monochrome Form Still Life",
      label: "Plate 04-B • Darkroom Still Life",
      camera: "Leica Monochrom",
      exposure: "1/60s • f/8.0",
      aspect: "aspect-[1/1]",
    },
  },
  {
    id: "suite-objects",
    suite: "Tactile Artifacts & Material Relics",
    roomNumber: "05",
    category: "OBJECTS",
    title: "Curated Relics & Pure Glass",
    curatorialThesis:
      "Physical examination of optical instruments, raw glass blanks, and vintage shutter assemblies. Highlighting the tactile mechanics that precede digital capture.",
    location: "Studioza Optical Laboratory, Zurich",
    year: "2026",
    edition: "Monograph Collection • Technical Ledger",
    paperStock: "Somerset Velvet Archival 300gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
      alt: "Curated Objects and Form",
      camera: "Hasselblad 907X 50C",
      lens: "XCD 45mm f/4 P",
      exposure: "1/125s • f/5.6 • ISO 100",
      aspect: "aspect-[16/10]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      alt: "Tactile Character Profile",
      label: "Plate 05-B • Studio Artifact",
      camera: "Leica M11",
      exposure: "1/250s • f/2.0",
      aspect: "aspect-[4/5]",
    },
  },
];

const CURATORIAL_CATEGORIES: { key: CuratorialCategory; label: string; index: string }[] = [
  { key: "ALL", label: "ENTIRE ARCHIVE", index: "00" },
  { key: "ARCHITECTURE", label: "ARCHITECTURE", index: "01" },
  { key: "FINE ART", label: "FINE ART", index: "02" },
  { key: "PORTRAIT", label: "PORTRAIT", index: "03" },
  { key: "EDITORIAL", label: "EDITORIAL", index: "04" },
  { key: "OBJECTS", label: "OBJECTS", index: "05" },
];

export default function VisualArchiveExhibition() {
  const [activeCategory, setActiveCategory] = useState<CuratorialCategory>("ALL");
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredPlateId, setHoveredPlateId] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Smooth scroll tracker for multi-depth physical parallax
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setScrollY(window.scrollY - rect.top);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Filter plates based on selected curatorial label
  const displayedPlates =
    activeCategory === "ALL"
      ? EXHIBITION_DATA
      : EXHIBITION_DATA.filter((p) => p.category === activeCategory);

  return (
    <section
      id="anthology"
      ref={containerRef}
      className="py-28 sm:py-40 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] relative bg-[#080706] text-neutral-100 selection:bg-amber-400 selection:text-black overflow-hidden"
    >
      {/* Background Architectural Ambient Tone */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(229,154,36,0.03)_0%,transparent_75%)]" />

      <div className="max-w-7xl mx-auto space-y-24 sm:space-y-36 relative z-10">
        {/* ========================================================================= */}
        {/* EXHIBITION HEADER & CURATORIAL SALON LABELS                                */}
        {/* ========================================================================= */}
        <div className="space-y-12 pb-10 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-amber-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Exhibition Room I • The Permanent Archive</span>
              </div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none">
                Curated Visual Archive
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl pt-2">
                A physical retrospective of medium format master negatives, archival selenium prints, and architectural chiaroscuro. Exploring light density and tactile form across four continents.
              </p>
            </div>

            {/* Curatorial Ledger Telemetry */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs font-mono text-zinc-400">
              <div className="border-l sm:border-l-0 sm:border-r border-white/10 pl-4 sm:pl-0 sm:pr-6 py-1">
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                  Archive Volume
                </span>
                <span className="text-zinc-200 font-semibold">Vol. XXIV — 2026</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                  Print Classification
                </span>
                <span className="text-amber-300 font-semibold">Silver Gelatin &amp; Baryta</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CURATORIAL LABELS (NOT UI BUTTONS)                                        */}
          {/* ========================================================================= */}
          <div className="pt-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-widest uppercase mb-4">
              <span>Curatorial Index Directory</span>
              <span className="hidden sm:inline">Select Room to Filter</span>
            </div>

            <nav
              aria-label="Exhibition curatorial index"
              className="flex items-center gap-1 sm:gap-3 flex-nowrap sm:flex-wrap border-t border-b border-white/[0.08] py-3 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none touch-pan-x"
            >
              {CURATORIAL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      "group relative shrink-0 sm:shrink px-3 sm:px-4 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 select-none",
                      isActive
                        ? "text-amber-300 font-semibold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] transition-colors",
                        isActive ? "text-amber-400" : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    >
                      [{cat.index}]
                    </span>
                    <span>{cat.label}</span>

                    {/* Subtle Curatorial Hairline Accent */}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PHYSICAL EXHIBITION SUITES: ASYMMETRIC, OVERLAPPING & MULTI-DEPTH         */}
        {/* ========================================================================= */}
        <div className="space-y-36 sm:space-y-48 lg:space-y-64">
          {displayedPlates.map((plate, index) => {
            const isReversed = index % 2 === 1;

            // Parallax displacements based on scroll position (subtle, physical)
            const primaryParallax = prefersReducedMotion ? 0 : (index * 30 - scrollY * 0.035);
            const overlappingParallax = prefersReducedMotion
              ? 0
              : (index * 60 - scrollY * 0.08);
            const textParallax = prefersReducedMotion ? 0 : (index * 15 - scrollY * 0.018);

            return (
              <article
                key={plate.id}
                onMouseEnter={() => setHoveredPlateId(plate.id)}
                onMouseLeave={() => setHoveredPlateId(null)}
                className="relative space-y-12"
              >
                {/* Suite Header Room Identifier */}
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-[0.25em] uppercase pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-bold">ROOM {plate.roomNumber}</span>
                    <span className="text-zinc-600">—</span>
                    <span className="text-zinc-300">{plate.category}</span>
                  </div>
                  <span className="hidden sm:inline text-zinc-500">{plate.location}</span>
                </div>

                {/* Main Asymmetric Composition Grid */}
                <div
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start",
                    isReversed && "lg:grid-flow-dense"
                  )}
                >
                  {/* ================================================================= */}
                  {/* IMAGERY CLUSTER: PRIMARY EXPANSIVE PLATE + OVERLAPPING INSET     */}
                  {/* ================================================================= */}
                  <div
                    className={cn(
                      "lg:col-span-8 relative",
                      isReversed && "lg:col-start-5"
                    )}
                  >
                    {/* Primary Massive Photographic Plate */}
                    <div
                      className="group relative overflow-hidden rounded-sm bg-zinc-950 border border-white/[0.10] shadow-2xl transition-all duration-700 ease-out will-change-transform"
                      style={{
                        transform: `translate3d(0, ${primaryParallax.toFixed(1)}px, 0)`,
                      }}
                    >
                      {/* Interactive Liquid Refraction Loupe on Suite 1, or High-Resolution Plate */}
                      {plate.id === "suite-architecture" ? (
                        <LiquidRefractionLoupe
                          imageSrc={plate.primaryImage.src}
                          imageAlt={plate.primaryImage.alt}
                          plateTitle={`${plate.title} — ${plate.location}`}
                          telemetry={plate.primaryImage.camera}
                          aspectRatio={plate.primaryImage.aspect as "16/10"}
                        />
                      ) : (
                        <div
                          className={cn(
                            "relative overflow-hidden cursor-pointer",
                            plate.primaryImage.aspect
                          )}
                        >
                          <img
                            src={plate.primaryImage.src}
                            alt={plate.primaryImage.alt}
                            loading="lazy"
                            className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.06] transition-all duration-1000 ease-out group-hover:scale-[1.04] group-hover:brightness-100"
                          />

                          {/* Atmospheric Vignette & Viewfinder Framing */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />

                          {/* Interactive Reticle Corner Guides */}
                          <div className="absolute top-5 left-5 text-white/30 group-hover:text-amber-400/90 transition-colors pointer-events-none">
                            <span className="font-mono text-[10px] tracking-widest block">
                              EXP. {plate.primaryImage.exposure}
                            </span>
                          </div>
                          <div className="absolute bottom-5 right-5 text-white/30 group-hover:text-amber-400/90 transition-colors pointer-events-none">
                            <span className="font-mono text-[10px] tracking-widest block">
                              {plate.primaryImage.camera}
                            </span>
                          </div>

                          {/* Hover Zoom & Inspection Pill */}
                          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="py-1 px-3 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono text-amber-300 flex items-center gap-1.5 shadow-xl">
                              <Scan className="w-3 h-3 text-amber-400" />
                              Inspect Negative
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Negative Rebate Film Footer */}
                      <div className="px-5 py-3 bg-[#0a0807] border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 font-bold">PL. {plate.roomNumber}</span>
                          <span>•</span>
                          <span className="uppercase tracking-widest">
                            {plate.primaryImage.lens}
                          </span>
                        </div>
                        <span className="text-zinc-400">{plate.primaryImage.exposure}</span>
                      </div>
                    </div>

                    {/* Overlapping Inset Plate (Physical Exhibition Multi-Plane Layering) */}
                    {plate.overlappingImage && (
                      <div
                        className={cn(
                          "absolute z-20 shadow-2xl rounded-sm overflow-hidden border border-white/20 bg-black will-change-transform group/inset cursor-pointer transition-all duration-700",
                          // On mobile (< lg): anchor inside bottom corner so it never occludes text below!
                          // On desktop (>= lg): multi-depth expansive offset overlapping outside the frame
                          "bottom-3 right-3 w-36 sm:bottom-4 sm:right-4 sm:w-52 lg:bottom-auto lg:right-auto lg:-bottom-16 lg:w-72",
                          isReversed
                            ? "lg:-left-16"
                            : "lg:-right-16"
                        )}
                        style={{
                          transform: `translate3d(0, ${overlappingParallax.toFixed(1)}px, 0)`,
                          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.9)",
                        }}
                      >
                        <div
                          className={cn(
                            "relative overflow-hidden",
                            plate.overlappingImage.aspect
                          )}
                        >
                          <img
                            src={plate.overlappingImage.src}
                            alt={plate.overlappingImage.alt}
                            loading="lazy"
                            className="w-full h-full object-cover filter brightness-95 group-hover/inset:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                          {/* Grease-Pencil Contact Sheet Annotation */}
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-mono text-amber-300">
                            {plate.overlappingImage.label}
                          </div>

                          <div className="absolute bottom-2 left-2 right-2 text-[9px] font-mono text-zinc-300 truncate">
                            {plate.overlappingImage.camera}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ================================================================= */}
                  {/* EDITORIAL METADATA & CURATORIAL THESIS (INDEPENDENT PARALLAX)     */}
                  {/* ================================================================= */}
                  <div
                    className={cn(
                      "lg:col-span-4 space-y-6 pt-4 lg:pt-8",
                      isReversed && "lg:col-start-1"
                    )}
                    style={{
                      transform: `translate3d(0, ${textParallax.toFixed(1)}px, 0)`,
                    }}
                  >
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block">
                        Monograph Retrospective
                      </span>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                        {plate.title}
                      </h3>
                    </div>

                    <p className="text-sm font-light text-zinc-300 leading-relaxed">
                      {plate.curatorialThesis}
                    </p>

                    {/* Subtle Optical Glass Inspection Placard */}
                    <FluidOpticalGlass
                      tint="obsidian"
                      intensity="medium"
                      depth={8}
                      contentClassName="p-5 sm:p-6 space-y-3 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 pb-2 border-b border-white/[0.08]">
                        <span className="text-amber-400 font-medium">CURATORIAL SPEC.</span>
                        <span>{plate.year} ARCHIVE</span>
                      </div>

                      <div className="space-y-1.5 text-zinc-400 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Edition:</span>
                          <span className="text-zinc-200 text-right">{plate.edition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Paper:</span>
                          <span className="text-amber-300 text-right">{plate.paperStock}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Optics:</span>
                          <span className="text-zinc-200 text-right">{plate.primaryImage.camera}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/[0.08]">
                        <StudioButton
                          href={`/contact?inquiry=${encodeURIComponent(plate.title)}`}
                          variant="minimal"
                          size="sm"
                          icon="arrow-up-right"
                          strength={0.2}
                          className="w-full justify-between text-zinc-300 hover:text-white text-xs"
                        >
                          Inquire for Master Print
                        </StudioButton>
                      </div>
                    </FluidOpticalGlass>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
