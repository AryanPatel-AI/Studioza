"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, Scan, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={`relative overflow-hidden group select-none touch-pan-y ${aspectRatio} ${className} bg-background`}
    >
      {/* 1. Underlying Base Master Photograph */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
      />

      {/* 2. Warm Cinematic Darkroom Light Grading (Tungsten & Amber ambient wash) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#090705] via-transparent to-[#090705]/40 pointer-events-none opacity-80 group-hover:opacity-50 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-gradient-to-r from-copper-900/10 via-transparent to-orange-950/15 pointer-events-none mix-blend-color-dodge" />

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
            className="w-full h-full rounded-full relative overflow-hidden backdrop-blur-[2px] shadow-2xl shadow-sage-900/80"
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
            <div className="absolute inset-0 flex flex-col items-center justify-between p-3 pointer-events-none text-foreground">
              <span className="type-mono-micro text-[8px] text-white/70 border-b border-white/20 pb-0.5">
                LOUPE 8X
              </span>
              <div className="w-3 h-3 border border-white/30 flex items-center justify-center">
                <div className="w-1 h-1 bg-white/60" />
              </div>
              <span className="type-mono-micro text-[8px] text-white/70 border-t border-white/20 pt-0.5">
                {telemetry.split("•")[0]}
              </span>
            </div>
          </div>
        </div>

      {/* 4. Editorial Annotation (Top Edge) - Museum Catalogue Style */}
      <div className="absolute top-4 left-4 flex flex-col gap-1 z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-4 h-px bg-white/40" />
          <span className="type-mono-micro text-white/90">
            {plateTitle}
          </span>
        </div>
        <span className="pl-6 type-mono-micro text-white/50">
          OPTICAL DISPERSION 1.58
        </span>
      </div>

      {/* 5. Architectural Guidance Note (Bottom Right) */}
      <div 
        className={cn(
          "absolute bottom-4 right-4 z-20 pointer-events-none transition-opacity duration-700",
          isActive ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="flex flex-col items-end gap-1">
          <span className="type-mono-micro text-white/50">INTERACTIVE</span>
          <div className="flex items-center gap-2">
            <span className="type-mono-micro text-white/90">EXAMINE WITH LOUPE</span>
            <span className="w-4 h-px bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
}
