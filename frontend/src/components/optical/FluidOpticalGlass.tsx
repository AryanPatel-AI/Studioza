/**
 * Interactive optical glass card with subtle refraction and specular highlights.
 */
"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface FluidOpticalGlassProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  contentClassName?: string;
  depth?: number;
  tint?: "champagne" | "obsidian" | "navy" | "clear";
  intensity?: "subtle" | "medium" | "deep";
  backgroundRefractionSrc?: string;
  scrollDeform?: boolean;
  damping?: number;
  as?: React.ElementType;
  onClick?: () => void;
}

export default function FluidOpticalGlass({
  children,
  className = "",
  innerClassName = "",
  contentClassName = "",
  depth = 18,
  tint = "champagne",
  intensity = "medium",
  backgroundRefractionSrc,
  scrollDeform = true,
  damping = 0.075,
  as: Component = "div",
  onClick,
}: FluidOpticalGlassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Physics vectors interpolated via RAF lerp
  const target = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const current = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const specular = useRef({ x: 50, y: 50 });
  const targetSpecular = useRef({ x: 50, y: 50 });

  // Scroll velocity tracking
  const lastScrollY = useRef(0);
  const targetScrollVelocity = useRef(0);
  const currentScrollVelocity = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const normX = (px - 0.5) * 2;
      const normY = (py - 0.5) * 2;

      target.current = {
        x: normX * depth,
        y: normY * depth,
        rx: normY * -4.5,
        ry: normX * 4.5,
      };

      targetSpecular.current = { x: px * 100, y: py * 100 };
    },
    [depth, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    target.current = { x: 0, y: 0, rx: 0, ry: 0 };
    targetSpecular.current = { x: 50, y: 50 };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Track scroll velocity for kinetic shear deformation
  useEffect(() => {
    if (prefersReducedMotion || !scrollDeform) return;

    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      targetScrollVelocity.current = Math.max(-0.04, Math.min(0.04, delta * 0.0008));

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        targetScrollVelocity.current = 0;
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion, scrollDeform]);

  // Main RAF physics loop applying transforms directly to DOM elements
  useEffect(() => {
    if (prefersReducedMotion) return;

    const slabEl = containerRef.current?.querySelector<HTMLDivElement>("[data-glass-slab]");
    const shadowEl = containerRef.current?.querySelector<HTMLDivElement>("[data-glass-shadow]");
    const specularEl = containerRef.current?.querySelector<HTMLDivElement>("[data-glass-specular]");
    const refractionEl = containerRef.current?.querySelector<HTMLDivElement>("[data-glass-refraction]");

    let isRunning = true;

    const tick = () => {
      if (!isRunning) return;

      let idleX = 0, idleY = 0, idleRx = 0, idleRy = 0;
      let activeTargetSpecX = targetSpecular.current.x;
      let activeTargetSpecY = targetSpecular.current.y;

      if (!isHovered) {
        const t = performance.now() * 0.0008;
        idleX = Math.sin(t) * 2.2;
        idleY = Math.cos(t * 0.8) * 1.8;
        idleRx = Math.sin(t * 0.7) * -0.7;
        idleRy = Math.cos(t * 0.9) * 0.7;
        activeTargetSpecX = 50 + Math.sin(t * 0.6) * 28;
        activeTargetSpecY = 50 + Math.cos(t * 0.5) * 22;
      }

      // Lerp positions with viscous damping
      current.current.x += (target.current.x + idleX - current.current.x) * damping;
      current.current.y += (target.current.y + idleY - current.current.y) * damping;
      current.current.rx += (target.current.rx + idleRx - current.current.rx) * damping;
      current.current.ry += (target.current.ry + idleRy - current.current.ry) * damping;

      specular.current.x += (activeTargetSpecX - specular.current.x) * 0.12;
      specular.current.y += (activeTargetSpecY - specular.current.y) * 0.12;

      if (scrollDeform) {
        currentScrollVelocity.current += (targetScrollVelocity.current - currentScrollVelocity.current) * 0.14;
      }

      const scaleY = 1 + Math.abs(currentScrollVelocity.current) * 0.28;
      const shearX = currentScrollVelocity.current * -2.0;

      if (slabEl) {
        slabEl.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${(
          current.current.y + currentScrollVelocity.current * 30
        ).toFixed(2)}px, 0) rotateX(${current.current.rx.toFixed(2)}deg) rotateY(${current.current.ry.toFixed(
          2
        )}deg) scaleY(${scaleY.toFixed(4)}) skewX(${shearX.toFixed(2)}deg)`;
      }

      if (shadowEl) {
        shadowEl.style.transform = `translate3d(${(-current.current.x * 0.75).toFixed(2)}px, ${(
          -current.current.y * 0.75 + 22
        ).toFixed(2)}px, 0)`;
      }

      if (specularEl) {
        specularEl.style.background = `radial-gradient(circle 380px at ${specular.current.x.toFixed(
          1
        )}% ${specular.current.y.toFixed(1)}%, rgba(255, 235, 205, 0.16) 0%, transparent 75%)`;
      }

      if (refractionEl) {
        refractionEl.style.transform = `translate3d(${(-current.current.x * 0.35).toFixed(
          2
        )}px, ${(-current.current.y * 0.35).toFixed(2)}px, 0) scale(1.06)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      isRunning = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [damping, prefersReducedMotion, scrollDeform]);

  const tintClasses = {
    champagne: {
      subtle: "backdrop-blur-md bg-sage-50/30",
      medium: "backdrop-blur-2xl bg-sage-50/45",
      deep: "backdrop-blur-3xl bg-sage-50/65",
    },
    obsidian: {
      subtle: "backdrop-blur-md bg-background",
      medium: "backdrop-blur-2xl bg-background",
      deep: "backdrop-blur-3xl bg-sage-400",
    },
    navy: {
      subtle: "backdrop-blur-md bg-sage-50/35",
      medium: "backdrop-blur-2xl bg-sage-50/55",
      deep: "backdrop-blur-3xl bg-sage-50/80",
    },
    clear: {
      subtle: "backdrop-blur-md bg-sage-50/50",
      medium: "backdrop-blur-2xl bg-sage-50/50",
      deep: "backdrop-blur-3xl bg-sage-50",
    },
  }[tint][intensity];

  return (
    <Component
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("relative select-none", className)}
      style={{ perspective: "1000px" }}
    >
      {/* 1. Counter-shifting physical shadow */}
      <div
        data-glass-shadow
        className={cn(
          "absolute inset-5 rounded-3xl bg-sage-100 blur-2xl pointer-events-none transition-opacity duration-500 ease-out z-0",
          isHovered ? "opacity-85" : "opacity-45"
        )}
      />

      {/* 2. Fluid optical glass container */}
      <div
        data-glass-slab
        className={cn(
          "relative z-10 overflow-hidden rounded-2xl sm:rounded-3xl border border-sage-300/40 will-change-transform",
          tintClasses,
          innerClassName
        )}
        style={{
          boxShadow: isHovered
            ? "0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 15px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px 0 rgba(255, 235, 210, 0.28), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.5)"
            : "0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 10px 20px -8px rgba(0, 0, 0, 0.5), inset 0 1px 1.5px 0 rgba(255, 235, 210, 0.18), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)",
        }}
      >
        {backgroundRefractionSrc && (
          <div
            data-glass-refraction
            className="absolute -inset-10 pointer-events-none bg-cover bg-center filter blur-md brightness-90 contrast-110 opacity-35 mix-blend-screen will-change-transform z-0"
            style={{ backgroundImage: `url(${backgroundRefractionSrc})` }}
          />
        )}

        {/* Specular grazing light */}
        <div
          data-glass-specular
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500 z-20",
            isHovered ? "opacity-90" : "opacity-40"
          )}
          style={{
            background: "radial-gradient(circle 380px at 50% 50%, rgba(255, 235, 205, 0.16) 0%, transparent 75%)",
          }}
        />

        <div className={cn("relative z-30", contentClassName)}>{children}</div>
      </div>
    </Component>
  );
}
