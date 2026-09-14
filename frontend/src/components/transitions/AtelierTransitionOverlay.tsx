"use client";

import React from "react";
import { RoomInfo } from "./rooms";
import { Scan, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AtelierTransitionOverlayProps {
  status: "idle" | "closing" | "opening";
  targetRoom: RoomInfo | null;
  prefersReducedMotion: boolean;
}

export default function AtelierTransitionOverlay({
  status,
  targetRoom,
  prefersReducedMotion,
}: AtelierTransitionOverlayProps) {
  if (status === "idle" || !targetRoom) return null;

  const isClosing = status === "closing";
  const isOpening = status === "opening";

  // Reduced motion: graceful instantaneous or simple gentle fade
  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-[9999] pointer-events-none bg-[#080706] flex items-center justify-center transition-opacity duration-150",
          isClosing ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-center font-mono text-xs text-amber-400">
          <span>{targetRoom.number} — {targetRoom.title}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none"
    >
      {/* ======================================================================= */}
      {/* 1. DARK VELVET SHUTTER CURTAIN & OPTICAL REFRACTION VEIL                */}
      {/* ======================================================================= */}
      <div
        className={cn(
          "absolute inset-0 bg-[#080706] transition-transform will-change-transform",
          isClosing
            ? "duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-x-0"
            : "duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] translate-x-full"
        )}
        style={{
          transform: isClosing ? "translateX(0%)" : isOpening ? "translateX(100%)" : "translateX(-100%)",
          animation: isClosing
            ? "shutter-close-in 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
            : "shutter-open-out 320ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
        }}
      >
        {/* Leading-Edge Translucent Crystal Refraction Slab (leads during closing sweep) */}
        <div
          className="absolute top-0 bottom-0 left-full w-24 sm:w-40 pointer-events-none backdrop-blur-3xl border-l border-amber-300/50"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,245,230,0.25) 0%, rgba(229,154,36,0.14) 45%, rgba(8,7,6,0) 100%)",
            boxShadow: "0 0 45px rgba(229, 154, 36, 0.25)",
          }}
        />

        {/* Trailing-Edge Translucent Crystal Refraction Slab (trails during opening sweep) */}
        <div
          className="absolute top-0 bottom-0 right-full w-24 sm:w-40 pointer-events-none backdrop-blur-3xl border-r border-amber-300/50"
          style={{
            background:
              "linear-gradient(270deg, rgba(255,245,230,0.25) 0%, rgba(229,154,36,0.14) 45%, rgba(8,7,6,0) 100%)",
            boxShadow: "0 0 45px rgba(229, 154, 36, 0.25)",
          }}
        />

        {/* Deep Analog Darkroom Grain & Modeling Light Leak */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(229,154,36,0.12),transparent_70%)] pointer-events-none" />

        {/* ===================================================================== */}
        {/* 2. TOP & BOTTOM 35MM FILM REBATE RAILS                                */}
        {/* ===================================================================== */}
        <div className="absolute top-0 inset-x-0 h-10 border-b border-white/[0.08] flex items-center justify-between px-6 sm:px-12 text-[9px] font-mono text-zinc-500 tracking-[0.25em] uppercase">
          <div className="flex items-center gap-3">
            <span className="text-amber-400/90 font-bold">STZ • EMULSION 400</span>
            <span>•</span>
            <span>SAFETY FILM 35A</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-600">
            <span>ISO 50</span>
            <span>PROPHOTO RGB</span>
            <span>16-BIT ZERO-LOSS</span>
          </div>
          <span className="text-amber-400 font-bold">24A</span>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-10 border-t border-white/[0.08] flex items-center justify-between px-6 sm:px-12 text-[9px] font-mono text-zinc-500 tracking-[0.25em] uppercase">
          <span>EXHIBITION TRANSITION ENGINE</span>
          <span className="text-zinc-600 hidden sm:inline">LEICA / PHASE ONE / HASSELBLAD BENCH</span>
          <span className="text-amber-400/80 font-bold">ATELIER</span>
        </div>

        {/* ===================================================================== */}
        {/* 3. CENTRAL CURATORIAL ROOM SIGNAGE & MECHANICAL APERTURE IRIS         */}
        {/* ===================================================================== */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="max-w-xl w-full text-center space-y-6 relative">
            {/* Viewfinder Reticle Framing */}
            <div className="absolute -top-10 left-0 text-white/30 font-mono text-[9px] tracking-widest uppercase">
              {targetRoom.number}
            </div>
            <div className="absolute -top-10 right-0 text-white/30">
              <Scan className="w-3.5 h-3.5" />
            </div>
            <div className="absolute -bottom-10 right-0 text-white/30 font-mono text-[9px] tracking-widest uppercase">
              OPTICAL BENCH
            </div>

            {/* Minimalist Mechanical Aperture Blade Icon */}
            <div className="inline-flex items-center justify-center mb-1">
              <div
                className={cn(
                  "w-12 h-12 rounded-full border border-amber-400/50 bg-amber-400/10 flex items-center justify-center shadow-[0_0_24px_rgba(229,154,36,0.25)] transition-transform duration-500",
                  isClosing ? "scale-90 rotate-45" : "scale-100 rotate-0"
                )}
              >
                <div className="w-4 h-4 rounded-full border border-white/60 bg-amber-300/20" />
              </div>
            </div>

            {/* Curatorial Room Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-[10px] font-mono tracking-[0.3em] uppercase text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Exhibition Transition • {targetRoom.number}</span>
              </div>
            </div>

            {/* Monumental Room Title */}
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                {targetRoom.title}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-amber-400/90 tracking-wider">
                {targetRoom.subtitle}
              </p>
            </div>

            {/* Technical Optical Specification */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Optics: {targetRoom.optics}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
