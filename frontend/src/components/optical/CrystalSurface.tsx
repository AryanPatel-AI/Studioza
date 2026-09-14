"use client";

import React, { useRef, useState, useEffect } from "react";

export interface CrystalSurfaceProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "deep";
  tint?: "champagne" | "obsidian" | "navy" | "clear";
  elevation?: "flat" | "raised" | "floating";
  depth?: number; // Spatial displacement factor for floating elevation
  refractionEffect?: boolean;
  specularLight?: boolean;
  noise?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function CrystalSurface({
  children,
  className = "",
  intensity = "medium",
  tint = "champagne",
  elevation = "flat",
  depth = 16,
  refractionEffect = true,
  specularLight = true,
  noise = false,
  as: Component = "div",
  onClick,
}: CrystalSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setLightPos({ x: px * 100, y: py * 100 });

    if (elevation === "floating" && !prefersReducedMotion) {
      const xOffset = (px - 0.5) * depth;
      const yOffset = (py - 0.5) * depth;
      const rx = (py - 0.5) * -5;
      const ry = (px - 0.5) * 5;
      setTilt({ x: xOffset, y: yOffset, rx, ry });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (elevation === "floating") {
      setTilt({ x: 0, y: 0, rx: 0, ry: 0 });
    }
  };

  // 1. Tint & Intensity Styles
  const tintClasses = {
    champagne: {
      subtle: "backdrop-blur-md bg-[#18130f]/25",
      medium: "backdrop-blur-2xl bg-[#14100c]/40",
      deep: "backdrop-blur-3xl bg-[#0f0c09]/60",
    },
    obsidian: {
      subtle: "backdrop-blur-md bg-[#0a0807]/40",
      medium: "backdrop-blur-2xl bg-[#080706]/65",
      deep: "backdrop-blur-3xl bg-[#050403]/85",
    },
    navy: {
      subtle: "backdrop-blur-md bg-[#090d16]/30",
      medium: "backdrop-blur-2xl bg-[#070a12]/50",
      deep: "backdrop-blur-3xl bg-[#05070d]/75",
    },
    clear: {
      subtle: "backdrop-blur-md bg-white/[0.03]",
      medium: "backdrop-blur-2xl bg-white/[0.06]",
      deep: "backdrop-blur-3xl bg-white/[0.10]",
    },
  }[tint][intensity];

  // 2. Elevation Box Shadows
  const elevationShadows = {
    flat: isHovered
      ? "inset 0 1px 1px 0 rgba(255, 235, 205, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 16px 32px -10px rgba(0, 0, 0, 0.6)"
      : "inset 0 1px 1px 0 rgba(255, 235, 205, 0.08), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.3), 0 8px 24px -10px rgba(0, 0, 0, 0.4)",
    raised: isHovered
      ? "inset 0 1px 1.5px 0 rgba(255, 235, 205, 0.24), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5), 0 24px 48px -12px rgba(0, 0, 0, 0.75)"
      : "inset 0 1px 1px 0 rgba(255, 235, 205, 0.12), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4), 0 16px 36px -12px rgba(0, 0, 0, 0.6)",
    floating: isHovered
      ? "inset 0 1px 2px 0 rgba(255, 235, 205, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.6), 0 35px 70px -15px rgba(0, 0, 0, 0.85)"
      : "inset 0 1px 1.5px 0 rgba(255, 235, 205, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.45), 0 25px 50px -12px rgba(0, 0, 0, 0.75)",
  }[elevation];

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative group overflow-hidden transition-all duration-700 ${tintClasses} ${className}`}
      style={{
        boxShadow: elevationShadows,
        transform:
          elevation === "floating" && !prefersReducedMotion
            ? `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : undefined,
        perspective: elevation === "floating" ? "1000px" : undefined,
      }}
    >
      {/* 1. Dynamic Specular Grazing Light (Catches the beveled crystal rim) */}
      {specularLight && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-10"
          style={{
            opacity: isHovered ? 1 : 0.4,
            background: `radial-gradient(circle 380px at ${lightPos.x}% ${lightPos.y}%, rgba(255, 230, 195, 0.14) 0%, rgba(255, 205, 155, 0.03) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* 2. Micro Prismatic Edge Dispersion (Beveled edge refraction) */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 transition-opacity duration-500"
        style={{
          border: "1px solid rgba(255, 235, 215, 0.10)",
          background:
            isHovered && refractionEffect
              ? `linear-gradient(${lightPos.x * 3.6}deg, rgba(255, 215, 155, 0.09) 0%, transparent 50%, rgba(255, 240, 220, 0.04) 100%)`
              : "transparent",
        }}
      />

      {/* 3. Microscopic Noise / Paper Tooth (when enabled) */}
      {noise && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-15"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: "4px 4px",
          }}
        />
      )}

      {/* 4. Subtle Warm Ambient Interior Hue */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] via-transparent to-black/[0.18] pointer-events-none z-0" />

      {/* 5. Glass Surface Content */}
      <div className="relative z-30">{children}</div>
    </Component>
  );
}
