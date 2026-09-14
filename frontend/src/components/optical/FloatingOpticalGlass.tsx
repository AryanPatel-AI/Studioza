"use client";

import React, { useRef, useState, useEffect } from "react";

interface FloatingOpticalGlassProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // Spatial displacement factor (e.g. 15 to 30)
  glassTint?: "champagne" | "smoke" | "clear";
}

export default function FloatingOpticalGlass({
  children,
  className = "",
  depth = 20,
  glassTint = "champagne",
}: FloatingOpticalGlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [specular, setSpecular] = useState({ x: 50, y: 50 });
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
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const xOffset = (px - 0.5) * depth;
    const yOffset = (py - 0.5) * depth;
    const rx = (py - 0.5) * -6; // subtle tilt
    const ry = (px - 0.5) * 6;

    setTransform({ x: xOffset, y: yOffset, rotateX: rx, rotateY: ry });
    setSpecular({ x: px * 100, y: py * 100 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    setSpecular({ x: 50, y: 50 });
  };

  const tintStyles = {
    champagne: "bg-[#14100c]/40",
    smoke: "bg-[#0f0e0c]/50",
    clear: "bg-white/[0.04]",
  }[glassTint];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Physical Optical Drop Shadow Cast on the Underlying Master Photograph */}
      <div
        className="absolute inset-4 rounded-3xl bg-black/60 blur-2xl pointer-events-none transition-all ease-out z-0"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${-transform.x * 0.75}px, ${-transform.y * 0.75 + 18}px, 0)`,
          opacity: isHovered ? 0.85 : 0.45,
          transitionDuration: isHovered ? "200ms" : "800ms",
        }}
      />

      {/* Physical Optical Glass Slab */}
      <div
        className={`relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-2xl ${tintStyles} transition-transform ease-out will-change-transform`}
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${transform.x}px, ${transform.y}px, 0) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transitionDuration: isHovered ? "200ms" : "800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isHovered
            ? "0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 15px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 235, 210, 0.3), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 10px 20px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 235, 210, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Soft Beveled Edge Highlight (Specular tracking cursor light) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 z-20"
          style={{
            border: "1px solid rgba(255, 235, 215, 0.12)",
            background: `radial-gradient(circle 380px at ${specular.x}% ${specular.y}%, rgba(255, 230, 195, 0.14) 0%, rgba(255, 200, 140, 0.02) 50%, transparent 80%)`,
          }}
        />

        {/* Physical Studio Softbox Light Reflection (Subtle angled luminous sheen) */}
        <div
          className="absolute -inset-full pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-700 mix-blend-screen z-10"
          style={{
            background:
              "linear-gradient(135deg, transparent 35%, rgba(255, 240, 220, 0.18) 48%, rgba(255, 210, 150, 0.25) 50%, transparent 62%)",
            transform: `translate(${transform.x * 1.5}px, ${transform.y * 1.5}px)`,
          }}
        />

        {/* Micro Prismatic Caustic Edge (Faint warm chromatic dispersion on top and left borders) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-15 opacity-60"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(255, 200, 120, 0.08) 0%, transparent 40%, rgba(180, 220, 255, 0.04) 100%)",
          }}
        />

        {/* Interior Surface Content */}
        <div className="relative z-30">{children}</div>
      </div>
    </div>
  );
}
