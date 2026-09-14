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
      className={`relative group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-amber-400/50 text-xs font-mono tracking-wider text-zinc-300 hover:text-white backdrop-blur-md transition-all cursor-pointer overflow-hidden shadow-lg select-none active:scale-95 ${className}`}
      aria-label={label}
    >
      {/* 3D Iris Shutter Icon */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Aperture
          className={`w-4 h-4 text-amber-400 transition-transform duration-300 ${
            isSnapping ? "scale-50 rotate-90 text-white" : "group-hover:rotate-45"
          }`}
        />
        {/* Shutter Blade Flash */}
        {isSnapping && (
          <span className="absolute inset-0 rounded-full bg-amber-200/90 animate-ping" />
        )}
      </div>

      <span>{isSnapping ? "1/1000s Leaf Shutter Actuated" : label}</span>

      {/* Sensor Exposure Flash (Warm Tungsten/Amber Burst) */}
      {isSnapping && (
        <span className="absolute inset-0 bg-gradient-to-r from-amber-400/30 via-white/50 to-amber-300/30 animate-pulse pointer-events-none" />
      )}
    </button>
  );
}
