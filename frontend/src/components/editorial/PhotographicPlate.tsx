"use client";

import React, { useState } from "react";
import { Scan } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PhotographicPlateProps {
  imageSrc: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  client?: string;
  plateNumber?: string | number;
  location?: string;
  emulsion?: string;
  telemetry?: string;
  aspectRatio?: "16/10" | "4/5" | "3/4" | "21/9" | "1/1" | "full";
  className?: string;
  onClick?: () => void;
  showReticle?: boolean;
  showVignette?: boolean;
  showRebate?: boolean;
  showPlacard?: boolean;
}

export default function PhotographicPlate({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  client,
  plateNumber,
  location,
  emulsion = "ILFORD HP5 PLUS • 400",
  telemetry,
  aspectRatio = "16/10",
  className = "",
  onClick,
  showReticle = true,
  showVignette = true,
  showRebate = true,
  showPlacard = true,
}: PhotographicPlateProps) {
  const [isHovered, setIsHovered] = useState(false);

  const aspectClasses = {
    "16/10": "aspect-[16/10]",
    "4/5": "aspect-[4/5]",
    "3/4": "aspect-[3/4]",
    "21/9": "aspect-[21/9]",
    "1/1": "aspect-square",
    full: "w-full h-full min-h-[60vh]",
  }[aspectRatio];

  const formattedPlate =
    plateNumber !== undefined
      ? typeof plateNumber === "number"
        ? `PL. 0${plateNumber}`
        : plateNumber
      : undefined;

  return (
    <div
      className={cn("group select-none flex flex-col justify-between", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 1. Film Frame Header (Negative Rebate Markings) */}
      {showRebate && (formattedPlate || emulsion || location) && (
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 tracking-wider mb-3 uppercase">
          <div className="flex items-center gap-2">
            {formattedPlate && (
              <span className="text-amber-400/90 font-semibold">{formattedPlate}</span>
            )}
            {formattedPlate && emulsion && <span className="text-zinc-700">•</span>}
            {emulsion && <span className="tracking-[0.2em]">{emulsion}</span>}
          </div>
          {location && <span className="hidden sm:inline-block text-zinc-400">{location}</span>}
        </div>
      )}

      {/* 2. Main Photographic Canvas Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-zinc-950 rounded-sm cursor-pointer border border-white/[0.06]",
          aspectClasses
        )}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
          loading="lazy"
        />

        {/* Darkroom Vignette & Ambient Wash */}
        {showVignette && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20 opacity-70 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
        )}

        {/* Viewfinder Corner Reticle Brackets */}
        {showReticle && (
          <div className="absolute top-4 right-4 text-white/30 group-hover:text-amber-400 transition-colors duration-300 pointer-events-none">
            <Scan className="w-4 h-4" />
          </div>
        )}

        {/* Subtle Anamorphic Edge Flare (Warm light leak on left rim) */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-amber-500/10 to-transparent pointer-events-none mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity" />

        {/* Interactive Inspection Badge on Hover */}
        {onClick && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-xl">
              <Scan className="w-3 h-3 text-amber-400" />
              <span>Inspect Plate</span>
            </span>
          </div>
        )}
      </div>

      {/* 3. Editorial Museum Placard Footnote (No bordered box!) */}
      {showPlacard && (title || subtitle || telemetry || client) && (
        <div className="pt-4 space-y-1.5">
          <div className="flex items-baseline justify-between gap-4">
            {title && (
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                {title}
              </h3>
            )}
            {client && (
              <span className="text-xs font-mono text-zinc-500 shrink-0 uppercase tracking-wider">
                {client}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed max-w-xl">
              {subtitle}
            </p>
          )}

          {telemetry && (
            <div className="pt-1 text-[10px] font-mono text-zinc-500 tracking-wider">
              {telemetry}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
