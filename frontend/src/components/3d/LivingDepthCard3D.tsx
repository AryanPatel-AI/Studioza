/**
 * LivingDepthCard3D Component
 * 3D card tilt effect calculating cursor pitch/yaw angles and specular baryta glare highlights.
 */
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

  // Compute 3D rotation angles (-10deg to +10deg) from cursor offset
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotateX(((y - centerY) / centerY) * -10);
    setRotateY(((x - centerX) / centerX) * 10);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: glareOpacity });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowStyles = {
    blue: "hover:border-sky-400/50 hover:shadow-sky-500/15",
    amber: "hover:border-copper-500/50 hover:shadow-copper-500/15",
    dual: "hover:border-copper-500/40 hover:shadow-2xl hover:shadow-stone-500/10",
  }[glowTone];

  return (
    <div
      style={{ perspective: 1200 }}
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
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
        {/* Dynamic Specular Glare Highlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4), rgba(245, 158, 11, 0.15) 35%, transparent 70%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Elevated 3D Content Container */}
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
