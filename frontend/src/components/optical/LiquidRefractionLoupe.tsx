"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Scan, Eye } from "lucide-react";

interface LiquidRefractionLoupeProps {
  imageSrc: string;
  imageAlt: string;
  plateTitle?: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]" or "aspect-[3/4]"
  telemetry?: string;
  className?: string;
}

export default function LiquidRefractionLoupe({
  imageSrc,
  imageAlt,
  plateTitle = "Master Study",
  aspectRatio = "aspect-[16/10]",
  telemetry = "Hasselblad H6D • 100mm f/2.2",
  className = "",
}: LiquidRefractionLoupeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLoupePos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={() => setIsActive(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsActive(false)}
      className={`relative overflow-hidden group select-none touch-pan-y ${aspectRatio} ${className} bg-[#0a0807]`}
    >
      {/* 1. Underlying Base Master Photograph */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
      />

      {/* 2. Warm Cinematic Darkroom Light Grading (Tungsten & Amber ambient wash) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-transparent to-[#090705]/40 pointer-events-none opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/10 via-transparent to-orange-950/15 pointer-events-none mix-blend-color-dodge" />

      {/* 3. Floating Translucent Crystal Loupe (Liquid Refraction & Optical Magnification) */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 ease-out z-30 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56"
        style={{
          left: `${loupePos.x}%`,
          top: `${loupePos.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: isActive ? 1 : 0,
        }}
      >
          {/* Circular Ground-Glass Beveled Rim with Warm Caustic Grazing Highlight */}
          <div
            className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-[2px] shadow-2xl shadow-black/80"
            style={{
              border: "1.5px solid rgba(255, 235, 205, 0.35)",
              boxShadow:
                "inset 0 0 25px rgba(255, 215, 170, 0.18), inset 0 0 40px rgba(0,0,0,0.5), 0 15px 35px rgba(0,0,0,0.6)",
            }}
          >
            {/* Liquid Optical Refraction: Magnified Duplicate with Dynamic Transform */}
            <div
              className="absolute inset-0 overflow-hidden rounded-full"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "400%",
                backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
                filter: "contrast(1.15) brightness(1.05)",
                transform: "scale(1.08)",
                transformOrigin: "center center",
              }}
            />

            {/* Chromatic Edge Aberration Ring (Warm Amber & Prism Dispersion) */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-40"
              style={{
                background:
                  "radial-gradient(circle, transparent 60%, rgba(255, 180, 100, 0.4) 85%, rgba(180, 220, 255, 0.25) 100%)",
              }}
            />

            {/* Viewfinder Micro Crosshair & Telemetry */}
            <div className="absolute inset-0 flex flex-col items-center justify-between p-2.5 sm:p-3 pointer-events-none text-white/70">
              <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase bg-black/50 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                LOUPE 8X • REFRACT
              </span>
              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 border border-white/40 rounded-full flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-amber-400 rounded-full" />
              </div>
              <span className="text-[6.5px] sm:text-[7px] font-mono tracking-wider text-amber-300/90 bg-black/50 px-1.5 py-0.5 rounded">
                {telemetry.split("•")[0]}
              </span>
            </div>
          </div>
        </div>

      {/* 4. Film Rebate Frame Marking (Top Edge) */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[9px] font-mono text-zinc-400 tracking-wider z-20 pointer-events-none">
        <span className="bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/[0.08] text-amber-300/90">
          {plateTitle}
        </span>
        <span className="hidden sm:inline-block bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/[0.08] uppercase tracking-[0.2em]">
          OPTICAL DISPERSION 1.58
        </span>
      </div>

      {/* 5. Subtle Guidance Tooltip (Fades out when interacting) */}
      {!isActive && (
        <>
          <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
            <Eye className="w-3 h-3 text-amber-400" />
            <span>Hover to examine with optical loupe</span>
          </div>
          <div className="absolute bottom-4 right-4 z-20 pointer-events-none sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300">
            <Eye className="w-3 h-3 text-amber-400" />
            <span>Touch to magnify</span>
          </div>
        </>
      )}
    </div>
  );
}
