"use client";

import React, { useRef, useState, useEffect } from "react";

interface LivingDepthCard3DProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glareOpacity?: number;
  depthOffset?: number;
  glowTone?: "blue" | "amber" | "dual";
}

export default function LivingDepthCard3D({
  children,
  className = "",
  onClick,
  glareOpacity = 0.25,
  depthOffset = 25,
  glowTone = "dual",
}: LivingDepthCard3DProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg)
    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);

    // Calculate glare coordinate in percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: glareOpacity });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Tone-specific border glow styling
  const glowStyles = {
    blue: "hover:border-sky-400/50 hover:shadow-sky-500/15",
    amber: "hover:border-amber-400/50 hover:shadow-amber-500/15",
    dual: "hover:border-amber-400/40 hover:shadow-2xl hover:shadow-blue-500/10",
  }[glowTone];

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        style={{
          transform: reducedMotion
            ? "none"
            : `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) ${
                isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
              }`,
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full rounded-3xl transition-shadow duration-500 ${glowStyles} ${className}`}
      >
        {/* Dynamic Baryta Specular Glare Layer */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), rgba(245, 158, 11, 0.15) 35%, transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Card Content with 3D Layer Elevation */}
        <div
          style={{
            transform: reducedMotion ? "none" : `translateZ(${depthOffset}px)`,
            transformStyle: "preserve-3d",
          }}
          className="w-full h-full"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
