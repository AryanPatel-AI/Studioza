"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
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
  const sectionRef = useRef<HTMLElement>(null);

  const current = PROCESS_STEPS[activeStep];
  const progressPercent = ((activeStep + 1) / PROCESS_STEPS.length) * 100;

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="py-24 sm:py-36 px-6 sm:px-12 lg:px-16 border-t border-hairline relative bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24 relative z-10">
        {/* ========================================================================= */}
        {/* HEADER: MONOGRAPH METHODOLOGY SUMMARY                                     */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-hairline">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 type-meta">
              <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
              <span>Chapter 03 • Atelier Methodology</span>
            </div>
            <h2 className="type-display-section text-ink-primary">
              The Creative Process
            </h2>
            <p className="text-ink-muted type-body-base max-w-2xl pt-2">
              We do not sell pre-packaged photography tiers. Every project is an unhurried, rigorous editorial journey from raw atmospheric conception through to museum-grade silver-gelatin master editions.
            </p>
          </div>

          {/* Technical Telemetry Counter */}
          <div className="flex items-center gap-6 type-meta">
            <div className="border-l border-hairline pl-4 py-1">
              <span className="text-stone-400 block text-[10px]">Methodology</span>
              <span className="text-ink-primary">4 Sequenced Disciplines</span>
            </div>
            <div className="border-l border-hairline pl-4 py-1">
              <span className="text-stone-400 block text-[10px]">Tolerances</span>
              <span className="text-copper-600">Single-Micron Calibration</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RESTRAINED HAIRLINE TIMELINE RAIL                                          */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between type-meta">
            <span>Progressive Cadence • Phase {current.number} of 04</span>
            <span className="text-copper-600">{current.title}</span>
          </div>

          {/* Hairline Rail Track */}
          <div className="relative py-2">
            <div className="h-px w-full bg-stone-200 relative overflow-hidden">
              <div
                className="h-full bg-copper-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 4 Architectural Step Triggers */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep >= idx;

                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "text-left pt-4 pb-6 transition-all duration-500 cursor-pointer select-none border-t relative",
                      isActive
                        ? "border-copper-500"
                        : isPassed
                        ? "border-stone-300 hover:border-stone-400"
                        : "border-stone-200/60 opacity-60 hover:opacity-90"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-colors",
                            isActive
                              ? "bg-copper-500"
                              : isPassed
                              ? "bg-copper-500/50"
                              : "bg-stone-300"
                          )}
                        />
                        <span
                          className={cn(
                            "type-meta",
                            isActive ? "text-copper-600 font-semibold" : "text-ink-muted"
                          )}
                        >
                          PHASE {step.number}
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400">
                        [{step.roman}]
                      </span>
                    </div>

                    <h4
                      className={cn(
                        "type-body-base   transition-colors",
                        isActive ? "text-ink-primary " : "text-ink-muted"
                      )}
                    >
                      {step.title}
                    </h4>
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
          {/* Left Column: Rich Editorial Typography */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="type-meta text-copper-500 block">
                [Phase {current.number} // Protocol]
              </span>

              <h3 className="type-display-project text-ink-primary">
                {current.title}
              </h3>

              <p className="type-body-base text-copper-600">
                {current.subtitle}
              </p>
            </div>

            <p className="type-body-base text-ink-body">
              {current.narrative}
            </p>

            {/* Architectural Telemetry Checklist */}
            <div className="pt-2 space-y-2.5">
              <span className="type-meta text-ink-muted block">
                Phase Verification Standards:
              </span>
              <ul className="space-y-2 text-xs text-ink-body">
                {current.telemetry.map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-copper-500 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables Card */}
            <div className="pt-4">
              <div className="pt-4 border-t border-hairline space-y-1">
                <span className="type-meta text-ink-muted block">
                  Phase Deliverables
                </span>
                <p className="type-meta text-ink-primary">
                  {current.deliverables}
                </p>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 flex items-center gap-4">
              <StudioButton
                variant="primary"
                size="md"
                href="/contact"
                icon="arrow-right"
              >
                Inquire Commission
              </StudioButton>
            </div>
          </div>

          {/* Right Column: Architectural Image Plate */}
          <div className="lg:col-span-6">
            <div className="relative group overflow-hidden bg-stone-100">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover filter grayscale-[0.05] sepia-[0.02] brightness-[0.95] contrast-[1.04] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>

              {/* Negative Film Rebate Markings */}
              <div className="pt-4 flex items-center justify-between text-[11px] text-ink-muted border-t border-hairline mt-6">
                <div className="flex items-center gap-2">
                  <span className="text-copper-600">PHASE {current.number}</span>
                  <span>•</span>
                  <span>{current.camera}</span>
                </div>
                <span className="text-stone-400">{current.lightNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
