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
        <div className="flex items-center justify-between type-body-base text-foreground-muted mb-3">
          <div className="flex items-center gap-2">
            {formattedPlate && (
              <span className="text-copper-600/90 font-semibold">{formattedPlate}</span>
            )}
            {formattedPlate && emulsion && <span className="text-concrete-700">•</span>}
            {emulsion && <span className="">{emulsion}</span>}
          </div>
          {location && <span className="hidden sm:inline-block text-foreground-muted">{location}</span>}
        </div>
      )}

      {/* 2. Main Photographic Canvas Container */}
      <div
        className={cn(
          "relative overflow-hidden bg-sage-950 rounded-sm cursor-pointer border border-sage-300/40",
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
          <div className="absolute top-4 right-4 text-foreground group-hover:text-copper-600 transition-colors duration-300 pointer-events-none">
            <Scan className="w-4 h-4" />
          </div>
        )}

        {/* Subtle Anamorphic Edge Flare (Warm light leak on left rim) */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-copper-500/10 to-transparent pointer-events-none mix-blend-screen opacity-50 group-hover:opacity-80 transition-opacity" />

        {/* Interactive Inspection Badge on Hover */}
        {onClick && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transtone-y-1 group-hover:transtone-y-0 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-sage-100 backdrop-blur-md type-body-base text-copper-600 border border-copper-500/40 flex items-center gap-1.5 shadow-xl">
              <Scan className="w-3 h-3 text-copper-600" />
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
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-copper-600 transition-colors">
                {title}
              </h3>
            )}
            {client && (
              <span className="type-body-base text-foreground-muted shrink-0">
                {client}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="type-body-base text-foreground-muted max-w-xl">
              {subtitle}
            </p>
          )}

          {telemetry && (
            <div className="pt-1 type-body-base text-foreground-muted">
              {telemetry}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
