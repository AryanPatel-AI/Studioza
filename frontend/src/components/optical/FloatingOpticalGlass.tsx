"use client";

import React, { useRef, useState, useEffect } from "react";

interface FloatingOpticalGlassProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glassTint?: "champagne" | "smoke" | "clear";
}

export default function FloatingOpticalGlass({
  children,
  className = "",
  depth = 12,
  glassTint = "champagne",
}: FloatingOpticalGlassProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
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
    const rx = (py - 0.5) * -4;
    const ry = (px - 0.5) * 4;

    setTransform({ x: xOffset, y: yOffset, rotateX: rx, rotateY: ry });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  // Flattened Tint Styles
  const tintStyles = {
    champagne: "bg-background border border-hairline",
    smoke: "bg-charcoal text-ink-inverse border border-hairline",
    clear: "bg-transparent border border-hairline",
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
      {/* Flattened Physical Drop Shadow */}
      <div
        className="absolute inset-2 bg-charcoal pointer-events-none transition-all ease-out z-0"
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${-transform.x * 0.75}px, ${-transform.y * 0.75 + 12}px, 0)`,
          opacity: isHovered ? 0.15 : 0.08,
          filter: "blur(12px)",
          transitionDuration: isHovered ? "200ms" : "800ms",
        }}
      />

      {/* Flat Architectural Panel (No glass) */}
      <div
        className={`relative z-10 overflow-hidden rounded-none ${tintStyles} transition-transform ease-out will-change-transform`}
        style={{
          transform: prefersReducedMotion
            ? "none"
            : `translate3d(${transform.x}px, ${transform.y}px, 0) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transitionDuration: isHovered ? "200ms" : "800ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: isHovered
            ? "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
            : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Interior Surface Content */}
        <div className="relative z-30">{children}</div>
      </div>
    </div>
  );
}
