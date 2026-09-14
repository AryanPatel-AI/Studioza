"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

export default function HeroOpticalInstallation() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion states
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [idleOffset, setIdleOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loadStage, setLoadStage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Ambient harmonic drift for mobile & idle states (subtle specular caustics)
  useEffect(() => {
    if (prefersReducedMotion) return;
    let animId: number;
    const startTime = performance.now();

    const animateIdle = (time: number) => {
      if (!isInteracting && !isHovered) {
        const elapsed = (time - startTime) * 0.0012; // slow breathing frequency
        const driftX = Math.sin(elapsed) * 0.28;
        const driftY = Math.cos(elapsed * 0.8) * 0.22;
        setIdleOffset({ x: driftX, y: driftY });
      } else {
        setIdleOffset((prev) => ({ x: prev.x * 0.9, y: prev.y * 0.9 }));
      }
      animId = requestAnimationFrame(animateIdle);
    };

    animId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion, isInteracting, isHovered]);

  // Staged entrance animation on initial mount
  useEffect(() => {
    if (prefersReducedMotion) {
      setLoadStage(5);
      return;
    }

    // Step 1: Background enters slowly
    const t1 = setTimeout(() => setLoadStage(1), 60);
    // Step 2: Glass surface forms into view
    const t2 = setTimeout(() => setLoadStage(2), 350);
    // Step 3: Typography reveals progressively
    const t3 = setTimeout(() => setLoadStage(3), 650);
    // Step 4: CTA enters
    const t4 = setTimeout(() => setLoadStage(4), 950);
    // Step 5: Full ambient interactivity active
    const t5 = setTimeout(() => setLoadStage(5), 1250);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [prefersReducedMotion]);

  // Scroll listener for parallax & dissolve
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse move handler for physical parallax & specular tracking
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      setIsInteracting(true);
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    },
    [prefersReducedMotion]
  );

  // Touch move handler for responsive tactile thumb tilt
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLElement>) => {
      if (prefersReducedMotion || !e.touches[0]) return;
      setIsInteracting(true);
      const touch = e.touches[0];
      const { innerWidth, innerHeight } = window;
      const x = Math.max(-1, Math.min(1, (touch.clientX / innerWidth - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, (touch.clientY / innerHeight - 0.5) * 2));
      setMousePos({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleTouchEnd = useCallback(() => {
    setIsInteracting(false);
  }, []);

  // Active composite coordinate combining physical input and idle drift
  const activeX = isInteracting || isHovered ? mousePos.x : idleOffset.x;
  const activeY = isInteracting || isHovered ? mousePos.y : idleOffset.y;

  // Calculate optical tilt for the crystal plate
  const tiltX = prefersReducedMotion ? 0 : activeX * 12;
  const tiltY = prefersReducedMotion ? 0 : activeY * 12;
  const rotateX = prefersReducedMotion ? 0 : activeY * -4.5;
  const rotateY = prefersReducedMotion ? 0 : activeX * 4.5;
  const specularX = ((activeX + 1) / 2) * 100;
  const specularY = ((activeY + 1) / 2) * 100;

  // Scroll-based dissolve calculations (slow, dignified fade)
  const scrollRatio = Math.min(1, scrollY / 600);
  const heroOpacity = Math.max(0, 1 - scrollRatio * 1.15);
  const heroTranslateY = scrollY * 0.28;
  const bgScale = 1.04 + scrollRatio * 0.06;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="relative min-h-[100svh] w-full flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-10 sm:pb-14 px-5 sm:px-10 lg:px-16 select-none touch-pan-y"
      style={{ perspective: "1200px" }}
    >
      {/* ========================================================================= */}
      {/* LAYER 1: FULL-SCREEN MASTER PHOTOGRAPHIC BACKGROUND                       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -inset-10 transition-transform ease-out will-change-transform"
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(${activeX * -18}px, ${activeY * -18 + scrollY * 0.12}px, 0) scale(${bgScale})`,
            transitionDuration: isHovered || isInteracting ? "200ms" : "900ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2400&q=90"
            srcSet="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85 1200w, https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2400&q=90 2400w"
            sizes="100vw"
            fetchPriority="high"
            decoding="async"
            alt="Studioza Master Chiaroscuro Plate"
            className={cn(
              "w-full h-full object-cover object-[center_35%] sm:object-center filter brightness-[0.40] contrast-[1.14] transition-opacity duration-1000 ease-out",
              loadStage >= 1 ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        {/* Viewfinder Vignette & Darkroom Grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706]/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/60 via-transparent to-[#080706]/60" />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 1.5: EMERALD CHIAROSCURO ATMOSPHERIC GLOW (FROM USER REFERENCE)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {/* Emerald Ambient Tone Radial */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-color pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 95% 80% at 50% 40%, rgba(16, 185, 129, 0.65) 0%, rgba(6, 78, 59, 0.45) 45%, transparent 80%)",
          }}
        />
        {/* Deep Emerald Backlight Pool */}
        <div
          className={cn(
            "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[550px] sm:h-[750px] rounded-full blur-[140px] transition-opacity duration-1000 mix-blend-screen pointer-events-none",
            loadStage >= 1 ? "opacity-30" : "opacity-0"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(16, 185, 129, 0.5) 0%, rgba(5, 150, 105, 0.2) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* LAYER 3: ATMOSPHERIC DEPTH / GRAIN & CALIBRATION RETICLES                */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-overlay">
        {/* Center Framing Reticles */}
        <div className="absolute top-1/3 left-1/4 w-3 h-3 border-t border-l border-white/20 pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 border-t border-r border-white/20 pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* TOP HEADER DECK: MONOGRAPH ISSUE TELEMETRY                                */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between gap-4 pt-1 transition-all duration-700",
          loadStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        )}
      >
        <div className="inline-flex items-center gap-2.5 text-[11px] font-mono text-amber-300/90 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Studio Atelier • Monograph Vol. XXIV</span>
        </div>

        <span className="hidden sm:inline-block text-[10px] font-mono text-zinc-400 tracking-widest uppercase">
          Fine art photography &amp; digital works
        </span>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 2: MONUMENTAL SERIF WORDMARK ('STUDIO')                             */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "flex-1 flex flex-col justify-center items-center w-full pointer-events-none z-5 select-none px-4 transition-all duration-1000 min-h-[25vh]",
          loadStage >= 1 ? "opacity-90 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <h1
          className="font-serif font-light text-[18vw] sm:text-[19vw] lg:text-[20vw] leading-none tracking-[-0.02em] text-white/85 transition-transform duration-700 will-change-transform"
          style={{
            textShadow: "0 20px 60px rgba(0, 0, 0, 0.9), 0 2px 10px rgba(0, 0, 0, 0.8)",
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(${activeX * 8}px, ${activeY * 8}px, 0)`,
          }}
        >
          STUDIO
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* LAYER 4: FLOATING TRANSLUCENT CRYSTAL-GLASS CARD (AS IN REFERENCE IMAGE)   */}
      {/* ========================================================================= */}
      <div
        className="relative z-20 mt-auto mb-6 sm:mb-10 max-w-xl mx-auto w-full px-2"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${heroTranslateY}px, 0)`,
        }}
      >
        {/* Counter-Shifting Physical Shadow */}
        <div
          className="absolute inset-4 rounded-3xl bg-black/75 blur-2xl pointer-events-none transition-all duration-700 ease-out z-0"
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(${-tiltX * 0.75}px, ${-tiltY * 0.75 + 16}px, 0)`,
            opacity: loadStage >= 2 ? (isHovered ? 0.9 : 0.6) : 0,
          }}
        />

        {/* The Crystal Glass Slab */}
        <div
          ref={cardRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "relative z-10 overflow-hidden rounded-3xl backdrop-blur-2xl bg-[#08090b]/75 border border-white/[0.12] transition-all will-change-transform p-6 sm:p-9 text-center shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,235,210,0.22)]",
            loadStage >= 2
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-[0.97] translate-y-6"
          )}
          style={{
            transform: prefersReducedMotion
              ? "none"
              : `translate3d(${tiltX}px, ${tiltY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transitionDuration: isHovered ? "200ms" : "900ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Specular Edge Highlight */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 z-20"
            style={{
              background: `radial-gradient(circle 340px at ${specularX}% ${specularY}%, rgba(255, 230, 195, 0.16) 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0.55,
            }}
          />

          {/* Microscopic Optical Paper Tooth */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay z-15"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 0)`,
              backgroundSize: "4px 4px",
            }}
          />

          {/* Card Content Matching Reference Image */}
          <div className="relative z-30 space-y-4 sm:space-y-5">
            {/* Telemetry Monograph Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-amber-300 tracking-[0.2em] uppercase transition-all duration-700",
                loadStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              )}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Phase One 150MP • Schneider 80mm • ISO 50</span>
            </div>

            {/* Headline */}
            <div
              className={cn(
                "space-y-1 select-none transition-all duration-1000",
                loadStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal text-white tracking-tight leading-snug">
                Where light becomes tangible form.
              </h2>
            </div>

            {/* Curatorial Thesis */}
            <p
              className={cn(
                "text-xs sm:text-[13px] font-light text-zinc-300 leading-relaxed max-w-md mx-auto transition-all duration-1000",
                loadStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
            >
              An intimate atelier creating, archiving, and publishing landmark digital projects with surgical restraint and cinematic depth.
            </p>

            {/* Actions: Radiant Gold Pill & Frosted Glass Pill */}
            <div
              className={cn(
                "pt-2 flex flex-wrap items-center justify-center gap-3 transition-all duration-700",
                loadStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              )}
            >
              <StudioButton
                variant="primary"
                size="md"
                href="/signup"
                icon="arrow-up-right"
                strength={0.22}
                className="font-semibold shadow-[0_0_24px_rgba(245,158,11,0.3)] text-black"
              >
                Enter Workspace
              </StudioButton>

              <StudioButton
                variant="crystal"
                size="md"
                href="/main"
                strength={0.18}
                className="text-zinc-200"
              >
                Selected Plates
              </StudioButton>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM HERO CONTROLS: RESTRAINED TELEMETRY & FOOTNOTE                     */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-white/[0.08] text-xs font-mono text-zinc-400 transition-all duration-700",
          loadStage >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-zinc-200 font-medium">Curation 01</span>
          <span className="text-zinc-600">•</span>
          <span>Medium Format Digital Archive</span>
        </div>

        <div className="flex items-center gap-6 text-[11px] text-zinc-500">
          <span>Hasselblad H6D • Schneider 80mm</span>
          <span className="hidden sm:inline-block">Scroll to explore plates ↓</span>
        </div>
      </div>
    </section>
  );
}
