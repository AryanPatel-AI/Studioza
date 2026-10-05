"use client";

import { useState } from "react";
import { Aperture } from "lucide-react";

interface ApertureShutter3DProps {
  onSnap?: () => void;
  className?: string;
  label?: string;
}

export default function ApertureShutter3D({
  onSnap,
  className = "",
  label = "Test Mechanical Shutter",
}: ApertureShutter3DProps) {
  const [isSnapping, setIsSnapping] = useState(false);

  const triggerSnap = () => {
    if (isSnapping) return;
    setIsSnapping(true);
    if (onSnap) onSnap();

    setTimeout(() => {
      setIsSnapping(false);
    }, 450);
  };

  return (
    <button
      onClick={triggerSnap}
      className={`relative group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-sage-50/50 hover:bg-sage-50/50 border border-sage-300/40 hover:border-copper-500/50 type-body-base   text-foreground hover:text-foreground backdrop-blur-md transition-all cursor-pointer overflow-hidden shadow-lg select-none active:scale-95 ${className}`}
      aria-label={label}
    >
      {/* 3D Iris Shutter Icon */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Aperture
          className={`w-4 h-4 text-copper-600 transition-transform duration-300 ${
            isSnapping ? "scale-50 rotate-90 text-foreground" : "group-hover:rotate-45"
          }`}
        />
        {/* Shutter Blade Flash */}
        {isSnapping && (
          <span className="absolute inset-0 rounded-full bg-copper-200/90 animate-ping" />
        )}
      </div>

      <span>{isSnapping ? "1/1000s Leaf Shutter Actuated" : label}</span>

      {/* Sensor Exposure Flash (Warm Tungsten/Amber Burst) */}
      {isSnapping && (
        <span className="absolute inset-0 bg-gradient-to-r from-copper-400/30 via-white/50 to-copper-300/30 animate-pulse pointer-events-none" />
      )}
    </button>
  );
}
