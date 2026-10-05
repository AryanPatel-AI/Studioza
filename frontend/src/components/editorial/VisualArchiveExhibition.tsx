"use client";

import React, { useState, useEffect, useRef } from "react";
import { Scan, ArrowUpRight } from "lucide-react";
import LiquidRefractionLoupe from "@/components/optical/LiquidRefractionLoupe";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      "Intimate medium format portraiture recording unrepeatable facial cadence and emotional stillness. Shot under uncorrected north studio skylight with zero post-capture smoothing.",
    location: "Le Marais Atelier, Paris",
    year: "2026",
    edition: "Edition of 5 • Signed Master Baryta",
    paperStock: "Ilford Galerie Gold Fibre Silk 310gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85",
      alt: "Monochrome Chiaroscuro Portrait Study",
      camera: "Leica M11 Monochrom",
      lens: "Summilux-M 35mm f/1.4 ASPH",
      exposure: "1/500s • f/1.4 • ISO 100",
      aspect: "aspect-[3/4]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      alt: "Micro-Expression Skin Texture Plate",
      label: "Plate 02-B • Raw Negative Crop",
      camera: "Hasselblad H6D",
      exposure: "1/250s • f/2.8",
      aspect: "aspect-[1/1]",
    },
  },
  {
    id: "suite-fine-art",
    suite: "Choreography of Drapery & Kinetic Wool",
    roomNumber: "03",
    category: "FINE ART",
    title: "Choreography in Shadow",
    curatorialThesis:
      "A meditation on tactile gravity and sculptured fabric in mid-suspension. Single overhead modeling lamp carving pure physical mass from dark room obsidian.",
    location: "Studioza Atelier SoHo, New York",
    year: "2026",
    edition: "Edition of 3 • Archival Baryta Master",
    paperStock: "Canson Infinity Platine Fibre Rag 310gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      alt: "Fine Art Kinetic Wool Drapery Study",
      camera: "Phase One IQ4 150MP",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      exposure: "1/800s • f/2.8 • ISO 64",
      aspect: "aspect-[16/10]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      alt: "Duchess Satin Kinetic High-Speed Plate",
      label: "Plate 03-B • 1/1600s Strobe",
      camera: "Phase One IQ4",
      exposure: "1/1600s • f/4.0",
      aspect: "aspect-[3/4]",
    },
  },
  {
    id: "suite-editorial",
    suite: "Haute Chiaroscuro & Textile Architecture",
    roomNumber: "04",
    category: "EDITORIAL",
    title: "Haute Chiaroscuro",
    curatorialThesis:
      "An exploration of monumental high fashion drapery and architectural lighting. Sculptural chiaroscuro modeling balancing directional tungsten with soft natural fill.",
    location: "Studioza Atelier, Milan",
    year: "2026",
    edition: "Commission Archive • Vogue Monograph",
    paperStock: "Hahnemühle Photo Rag Baryta 315gsm",
    primaryImage: {
      src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85",
      alt: "Haute Couture Textile Study",
      camera: "Hasselblad H6D-100c",
      lens: "HC 100mm f/2.2 Orange Dot",
      exposure: "1/800s • f/2.8 • ISO 64",
      aspect: "aspect-[16/10]",
    },
    overlappingImage: {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
      alt: "Textile Texture Macro",
      label: "Plate 04-B • Fiber Detail",
      camera: "Hasselblad H6D",
      exposure: "1/500s • f/4.0",
      aspect: "aspect-[4/5]",
    },
  },
  {
    id: "suite-objects",
    suite: "Curated Artifacts & Optical Instruments",
    roomNumber: "05",
    category: "OBJECTS",
    title: "Instruments of Light",
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
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

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

  const displayedPlates =
    activeCategory === "ALL"
      ? EXHIBITION_DATA
      : EXHIBITION_DATA.filter((p) => p.category === activeCategory);

  return (
    <section
      id="anthology"
      ref={containerRef}
      className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-hairline relative bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-32 relative z-10">
        {/* ========================================================================= */}
        {/* EXHIBITION HEADER & CURATORIAL DIRECTORY                                   */}
        {/* ========================================================================= */}
        <div className="space-y-10 pb-8 border-b border-hairline">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 type-meta">
                <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
                <span>Exhibition Room I • The Permanent Archive</span>
              </div>
              <h2 className="type-display-section text-ink-primary">
                Curated Visual Archive
              </h2>
              <p className="text-ink-body type-body-base max-w-2xl pt-2">
                A physical retrospective of medium format master negatives, archival selenium prints, and architectural chiaroscuro. Exploring light density and tactile form across four continents.
              </p>
            </div>

            {/* Curatorial Ledger Telemetry */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 type-meta text-ink-muted">
              <div className="border-l sm:border-l-0 sm:border-r border-hairline pl-4 sm:pl-0 sm:pr-6 py-1">
                <span className="text-stone-400 block text-[10px] uppercase">
                  Archive Volume
                </span>
                <span className="text-ink-primary">Vol. XXIV — 2026</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">
                  Print Classification
                </span>
                <span className="text-copper-600">Silver Gelatin &amp; Baryta</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CURATORIAL SALON DIRECTORY TABS                                           */}
          {/* ========================================================================= */}
          <div className="pt-4">
            <div className="flex items-center justify-between type-meta mb-3">
              <span>Curatorial Index Directory</span>
              <span className="hidden sm:inline">Select Room to Filter</span>
            </div>

            <nav
              aria-label="Exhibition curatorial index"
              className="flex items-center gap-1 sm:gap-2 flex-nowrap sm:flex-wrap border-t border-b border-hairline py-2.5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-none"
            >
              {CURATORIAL_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      "group relative shrink-0 sm:shrink px-3 py-1.5 type-meta transition-colors cursor-pointer flex items-center gap-2 select-none",
                      isActive
                        ? "text-copper-600 "
                        : "text-ink-muted hover:text-ink-primary"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] transition-colors",
                        isActive ? "text-copper-600" : "text-stone-400 group-hover:text-ink-muted"
                      )}
                    >
                      [{cat.index}]
                    </span>
                    <span>{cat.label}</span>

                    {isActive && (
                      <span className="absolute -bottom-2.5 left-2 right-2 h-px bg-copper-500" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXHIBITION SUITES: ASYMMETRIC ARCHITECTURAL LAYOUT                        */}
        {/* ========================================================================= */}
        <div className="space-y-32 sm:space-y-44 lg:space-y-56">
          {displayedPlates.map((plate, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.article
                key={plate.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col space-y-12 sm:space-y-16 pb-16 sm:pb-24 border-b border-hairline last:border-0"
              >
                {/* 1. Metadata Block (Top) */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className={cn(
                    "w-full flex flex-col",
                    isReversed ? "items-end text-right" : "items-start text-left"
                  )}
                >
                  <span className="type-mono-meta text-ink-muted block mb-4 sm:mb-6">{plate.roomNumber}</span>
                  
                  <h3 className="type-display-hero text-ink-primary leading-[1.05] tracking-tight max-w-4xl mb-6 sm:mb-10">
                    {plate.title}
                  </h3>
                  
                  <div className="type-mono-micro text-ink-muted space-y-1 mb-6 sm:mb-8">
                    <p>{plate.location}</p>
                    <p>{plate.year}</p>
                  </div>
                  
                  <div className="type-mono-micro text-copper-600 uppercase tracking-widest pt-4 border-t border-hairline min-w-[200px]">
                    {plate.category} / PHOTOGRAPHY
                  </div>
                </motion.div>

                {/* 2. Massive Photography Block */}
                <div
                  className={cn(
                    "w-full lg:w-[85%] relative",
                    isReversed ? "self-start" : "self-end"
                  )}
                >
                  <motion.div
                    initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                    whileInView={{ clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full border border-hairline p-2 sm:p-4 bg-white"
                  >
                    {plate.id === "suite-architecture" ? (
                      <LiquidRefractionLoupe
                        imageSrc={plate.primaryImage.src}
                        imageAlt={plate.primaryImage.alt}
                        plateTitle={plate.title}
                        telemetry={plate.primaryImage.camera}
                        aspectRatio={plate.primaryImage.aspect as "16/10"}
                      />
                    ) : (
                      <div className="relative group overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          src={plate.primaryImage.src}
                          alt={plate.primaryImage.alt}
                          loading="lazy"
                          className={cn(
                            "w-full h-auto object-cover",
                            plate.primaryImage.aspect
                          )}
                        />
                      </div>
                    )}

                    {/* Archival Inset */}
                    {plate.overlappingImage && (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "absolute z-20 flex flex-col p-1.5 sm:p-2 bg-white border border-hairline shadow-2xl",
                          "bottom-6 right-6 w-32 sm:w-40 lg:-bottom-12 lg:-right-12 lg:w-56",
                          isReversed ? "lg:left-auto lg:-left-12" : ""
                        )}
                      >
                        <div className={cn(
                          "relative overflow-hidden group/inset",
                          plate.overlappingImage.aspect
                        )}>
                          <motion.img
                            whileHover={{ scale: 1.1, filter: "grayscale(0%)" }}
                            initial={{ filter: "grayscale(100%)" }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            src={plate.overlappingImage.src}
                            alt={plate.overlappingImage.alt}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Connected Metadata */}
                        <div className="pt-2">
                          <span className="type-mono-micro text-[10px] text-ink-muted">
                            {plate.overlappingImage.label}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* 3. The Thesis (Bottom Description) */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className={cn(
                    "w-full pt-8 sm:pt-16 max-w-2xl",
                    isReversed ? "self-end lg:pr-12" : "self-start lg:pl-12"
                  )}
                >
                  <p className="type-body-lead text-ink-primary leading-relaxed">
                    {plate.curatorialThesis}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
