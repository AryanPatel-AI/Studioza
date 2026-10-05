"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CrystalSurfaceProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "deep";
  tint?: "champagne" | "obsidian" | "navy" | "clear";
  elevation?: "flat" | "raised" | "floating";
  depth?: number;
  refractionEffect?: boolean;
  specularLight?: boolean;
  noise?: boolean;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function CrystalSurface({
  children,
  className = "",
  intensity = "medium", // Kept for API compatibility, but effect is flattened
  tint = "obsidian",
  elevation = "flat",
  depth = 12,
  refractionEffect = false, // Disabled by default in new design system
  specularLight = false,    // Disabled by default
  noise = false,
  as: Component = "div",
  onClick,
}: CrystalSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    if (elevation === "floating" && !prefersReducedMotion) {
      const rect = containerRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const xOffset = (px - 0.5) * depth;
      const yOffset = (py - 0.5) * depth;
      const rx = (py - 0.5) * -4;
      const ry = (px - 0.5) * 4;
      setTilt({ x: xOffset, y: yOffset, rx, ry });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (elevation === "floating") {
      setTilt({ x: 0, y: 0, rx: 0, ry: 0 });
    }
  };

  // 1. Flattened Tint Classes (No excessive glass or blur)
  const tintClasses = {
    champagne: "bg-background border border-hairline",
    obsidian:  "bg-charcoal text-ink-inverse border border-hairline",
    navy:      "bg-charcoal text-ink-inverse border border-hairline", // Fallback to charcoal for consistency
    clear:     "bg-transparent border border-hairline",
  }[tint];

  // 2. Structural Shadows (No glowing neon)
  const elevationShadows = {
    flat: "none",
    raised: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
    floating: isHovered
      ? "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
      : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
  }[elevation];

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-none transition-all duration-700",
        tintClasses,
        className
      )}
      style={{
        boxShadow: elevationShadows,
        transform:
          elevation === "floating" && !prefersReducedMotion
            ? `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            : undefined,
        perspective: elevation === "floating" ? "1000px" : undefined,
      }}
    >
      {/* Flattened surface content */}
      <div className="relative z-30">{children}</div>
    </Component>
  );
}
