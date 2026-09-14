"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Sparkles, Scan, CheckCircle2, ChevronRight, Compass } from "lucide-react";
import FluidOpticalGlass from "@/components/optical/FluidOpticalGlass";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

interface ProcessStep {
  number: string;
  roman: string;
  title: string;
  subtitle: string;
  narrative: string;
  telemetry: string[];
  deliverables: string;
  image: string;
  camera: string;
  lens: string;
  lightNote: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    roman: "I",
    title: "Concept & Direction",
    subtitle: "Chiaroscuro Studies, Architectural Scouting & Tonal Moodboarding",
    narrative:
      "Before a single shutter blade opens, we sculpt the photograph in thought. We collaborate with clients, maisons, and architects to engineer lighting schematics, scout the sun angle at the golden hour, and calibrate the moodboard around raw textures.",
    telemetry: [
      "Solar Angle & Horizon Light Trajectory",
      "Tactile Material & Wardrobe Moodboards",
      "Pre-Visualized Optical Schematics",
    ],
    deliverables: "Comprehensive Creative Deck & Lighting Blueprint",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=85",
    camera: "Phase One Pre-Viz Systems",
    lens: "Schneider Kreuznach 80mm",
    lightNote: "Natural Ambient Sun Study • 3200K Tungsten Pre-rig",
  },
  {
    number: "02",
    roman: "II",
    title: "Shooting & Production",
    subtitle: "Medium-Format Capture & Kinetic High-Speed Lighting",
    narrative:
      "Dedicated atelier session or on-location architectural commission. Operated with Phase One 150MP and Hasselblad 100MP systems. Twin high-speed Profoto Pro-11 packs freeze flying silk textures at 1/1600s with surgical repeatability.",
    telemetry: [
      "150MP Large Medium-Format Sensor Backs",
      "Profoto Pro-11 2400Ws High-Speed Packs",
      "Digi-Tech Live Calibrated Eizo Tethering",
    ],
    deliverables: "40–80 High-Resolution Master Captures",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=85",
    camera: "Hasselblad H6D-100c & Leica M11",
    lens: "HC 100mm f/2.2 Orange Dot",
    lightNote: "5-ft Octabox Key • High-Speed Rim Flashes",
  },
  {
    number: "03",
    roman: "III",
    title: "Post Production",
    subtitle: "Non-Destructive Micro-Contrast & Baryta Emulsion Curves",
    narrative:
      "Meticulous pixel-level tonal sculpting. We reject synthetic AI smoothing in favor of analog skin cadence, preserving the authentic grain of wool, concrete pores, and human micro-expressions in uncompressed 16-bit ProPhoto RGB.",
    telemetry: [
      "16-Bit ProPhoto RGB Laboratory Color Space",
      "Analog Film Emulsion Response Curves",
      "Zero-Loss Optical Micro-Contrast Balancing",
    ],
    deliverables: "Master Retouched Plates • Full Print Profiles",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1600&q=85",
    camera: "Leica Monochrom & Phase One",
    lens: "Summilux-M 35mm f/1.4 ASPH",
    lightNote: "Chiaroscuro Darkroom Grading • Selenium Tone",
  },
  {
    number: "04",
    roman: "IV",
    title: "Delivery & Archival",
    subtitle: "310gsm Baryta Master Prints & Global Press Suite",
    narrative:
      "The physical culmination of our atelier craft. Master edition prints executed on 310gsm Hahnemühle Photo Rag Baryta with archival pigment inks rated for 150+ years, paired with edge-distributed digital portfolio archives.",
    telemetry: [
      "Hahnemühle 310gsm Photo Rag Baryta Prints",
      "Archival Certificate of Authenticity & Seal",
      "Worldwide Press & Monograph Publishing Rights",
    ],
    deliverables: "Framed Master Prints & Global Digital Archive",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85",
    camera: "Fujifilm GFX 100 II Tilt-Shift",
    lens: "GF 23mm f/4 R LM WR",
    lightNote: "Archival Exhibition Spec • 310gsm Baryta",
  },
];

export default function AtelierProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInteracting = useRef<boolean>(false);

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Scroll observer: calculates continuous beam of light traveling through process
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;

        // Start measuring when section top enters viewport (around top 80%) to when it leaves (bottom 20%)
        const startY = vh * 0.75;
        const totalDist = rect.height + vh * 0.5;
        const currentDist = startY - rect.top;

        const progress = Math.max(0, Math.min(1, currentDist / totalDist));
        setScrollProgress(progress);

        // Only auto-advance if user is scrolling rather than manual click lock
        if (!isInteracting.current) {
          const stepIndex = Math.min(3, Math.floor(progress * 4));
          setActiveStep(stepIndex);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    isInteracting.current = true;
    setTimeout(() => {
      isInteracting.current = false;
    }, 1200);
  }, []);

  const current = PROCESS_STEPS[activeStep];
  const progressPercent = Math.max(5, Math.min(100, (activeStep / 3) * 100));

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 sm:py-40 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] relative bg-[#080706] text-neutral-100 selection:bg-amber-400 selection:text-black overflow-hidden"
    >
      {/* Background Soft Darkroom Ambient Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-amber-500/[0.02] blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-sky-500/[0.02] blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-28 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER: EDITORIAL ATELIER PHILOSOPHY                              */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] text-amber-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Creative Methodology • The Atelier Path</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-none">
              The Creative Process
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-2xl pt-2">
              We do not sell pre-packaged photography tiers. Every project is an unhurried, rigorous editorial journey from raw atmospheric conception through to museum-grade silver-gelatin master editions.
            </p>
          </div>

          {/* Technical Telemetry Counter */}
          <div className="flex items-center gap-6 text-xs font-mono text-zinc-400">
            <div className="border-l border-white/20 pl-4 py-1">
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                Methodology
              </span>
              <span className="text-zinc-200 font-semibold">4 Sequenced Disciplines</span>
            </div>
            <div className="border-l border-white/20 pl-4 py-1">
              <span className="text-zinc-500 block text-[10px] uppercase tracking-wider">
                Tolerances
              </span>
              <span className="text-amber-300 font-semibold">Single-Micron Precision</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CONTINUOUS BEAM OF LIGHT: HORIZONTAL FLOWING TIMELINE                      */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          {/* Timeline Rail Header */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-widest uppercase">
            <span>Progressive Light Path • Phase {current.number} of 04</span>
            <span className="text-amber-400 font-bold">{current.title}</span>
          </div>

          {/* The Optical Light Path Track */}
          <div className="relative py-4">
            {/* Base Wireframe Line */}
            <div className="h-[1.5px] w-full bg-white/[0.08] relative rounded-full overflow-hidden">
              {/* Animated Light Beam Traveling through Sequence */}
              <div
                className="absolute top-0 left-0 h-full transition-all duration-700 ease-out will-change-[width]"
                style={{
                  width: `${progressPercent}%`,
                  background:
                    "linear-gradient(90deg, rgba(229,154,36,0.3) 0%, rgba(229,154,36,0.85) 75%, rgba(255,250,240,1) 100%)",
                  boxShadow: "0 0 16px rgba(229, 154, 36, 0.7), 0 0 6px rgba(255, 255, 255, 0.9)",
                }}
              />
            </div>

            {/* 4 Interactive Flowing Step Triggers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep >= idx;

                return (
                  <button
                    key={step.number}
                    onClick={() => handleStepClick(idx)}
                    className={cn(
                      "group text-left p-3 sm:p-4 rounded-2xl transition-all duration-500 cursor-pointer relative select-none border",
                      isActive
                        ? "bg-white/[0.05] border-amber-400/40 shadow-xl shadow-amber-400/5"
                        : isPassed
                        ? "bg-transparent border-white/[0.12] hover:bg-white/[0.02]"
                        : "bg-transparent border-white/[0.05] opacity-50 hover:opacity-80"
                    )}
                  >
                    {/* Beam Head Indicator Node */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full transition-all duration-500",
                            isActive
                              ? "bg-amber-400 scale-125 shadow-[0_0_10px_#f59e0b]"
                              : isPassed
                              ? "bg-amber-400/60"
                              : "bg-zinc-700"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xs font-mono tracking-widest uppercase transition-colors duration-300",
                            isActive ? "text-amber-400 font-bold" : "text-zinc-500"
                          )}
                        >
                          PHASE {step.number}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">
                        [{step.roman}]
                      </span>
                    </div>

                    <h4
                      className={cn(
                        "text-base sm:text-lg font-serif font-bold transition-colors duration-300",
                        isActive
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      )}
                    >
                      {step.title}
                    </h4>

                    {/* Glowing Underline on Active Step */}
                    {isActive && (
                      <div className="absolute -bottom-px left-4 right-4 h-[1.5px] bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STEP SHOWCASE: TYPOGRAPHY, TELEMETRY & SUPPORTING PHOTOGRAPHY             */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center">
          {/* Left Column: Rich Typography, Methodology & Telemetry */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Phase {current.number} Methodology</span>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {current.title}
              </h3>

              <p className="text-sm font-mono text-amber-400/90 tracking-wider">
                {current.subtitle}
              </p>
            </div>

            <p className="text-base text-zinc-300 font-light leading-relaxed max-w-xl">
              {current.narrative}
            </p>

            {/* Telemetry Checklist on Frosted Crystal Slab */}
            <FluidOpticalGlass
              tint="obsidian"
              intensity="medium"
              depth={8}
              contentClassName="p-6 sm:p-7 space-y-4 text-xs font-mono"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pb-2 border-b border-white/[0.08] uppercase tracking-wider">
                <span className="text-amber-400 font-medium">Stage Deliverables</span>
                <span>Atelier Protocol</span>
              </div>

              <div className="space-y-2.5">
                {current.telemetry.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">Output:</span>
                <span className="text-amber-300 font-semibold">{current.deliverables}</span>
              </div>
            </FluidOpticalGlass>

            {/* Next Phase Quick Advance or Commission CTA */}
            <div className="pt-2 flex items-center gap-4">
              <StudioButton
                href="/contact"
                variant="primary"
                size="md"
                icon="arrow-right"
                strength={0.28}
              >
                Inquire For This Scope
              </StudioButton>

              {activeStep < 3 ? (
                <button
                  onClick={() => handleStepClick(activeStep + 1)}
                  className="px-5 py-3 rounded-full border border-white/20 hover:border-amber-400/60 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next: Phase 0{activeStep + 2}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleStepClick(0)}
                  className="px-5 py-3 rounded-full border border-white/20 hover:border-amber-400/60 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Review from Beginning</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Supporting Photography with Selective Glass Inset */}
          <div className="lg:col-span-6 relative">
            {/* Primary Large Photographic Plate with Viewfinder Reticles */}
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-sm overflow-hidden bg-zinc-950 border border-white/[0.12] shadow-2xl group">
              <img
                key={current.image}
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover filter brightness-[0.93] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105 animate-in fade-in zoom-in-95 duration-500"
              />

              {/* Viewfinder Reticle Corners */}
              <div className="absolute top-4 left-4 text-white/30 pointer-events-none font-mono text-[10px]">
                PHASE {current.number} • {current.camera}
              </div>
              <div className="absolute top-4 right-4 text-white/20 pointer-events-none">
                <Scan className="w-4 h-4" />
              </div>
              <div className="absolute bottom-4 right-4 text-white/30 pointer-events-none font-mono text-[10px]">
                {current.lens}
              </div>

              {/* Atmospheric Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

              {/* Bottom Negative Film Rebate Stamp */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold">ATELIER {current.number}</span>
                  <span>•</span>
                  <span className="text-zinc-300">{current.lightNote}</span>
                </div>
                <span className="text-zinc-500 hidden sm:inline">16-BIT ARCHIVE</span>
              </div>
            </div>

            {/* Selective Floating Optical Glass Telemetry Card */}
            <div className="absolute -bottom-8 -left-4 sm:-left-8 z-20 max-w-[280px] sm:max-w-xs hidden sm:block">
              <FluidOpticalGlass
                tint="champagne"
                intensity="medium"
                depth={10}
                contentClassName="p-4 space-y-2 text-[10px] font-mono text-zinc-400"
              >
                <div className="flex items-center justify-between text-amber-400 font-bold pb-1 border-b border-white/[0.08]">
                  <span>TECHNICAL TELEMETRY</span>
                  <span>PHASE {current.number}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed font-sans text-xs">
                  {current.deliverables}
                </p>
                <div className="pt-1 text-zinc-500 flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>Optical Standard: Zeiss T* &amp; Phase One</span>
                </div>
              </FluidOpticalGlass>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
