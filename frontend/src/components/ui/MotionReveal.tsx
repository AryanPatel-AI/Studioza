"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MotionRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "fade-scale" | "reveal-aperture";
  durationMs?: number;
  delayMs?: number;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export default function MotionReveal({
  children,
  animation = "fade-up",
  durationMs = 800,
  delayMs = 0,
  threshold = 0.15,
  className = "",
  as: Component = "div",
}: MotionRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentDom = domRef.current;
    if (currentDom) {
      observer.observe(currentDom);
    }

    return () => {
      if (currentDom) observer.unobserve(currentDom);
    };
  }, [threshold]);

  // Initial & Visible Styles based on selected animation
  const getStyles = () => {
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: "none",
        transition: "none",
      };
    }

    const baseTransition = `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`;

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return {
            opacity: 0,
            transform: "translate3d(0, 28px, 0)",
            transition: baseTransition,
            willChange: "opacity, transform",
          };
        case "fade-scale":
          return {
            opacity: 0,
            transform: "scale(0.96) translate3d(0, 16px, 0)",
            transition: baseTransition,
            willChange: "opacity, transform",
          };
        case "reveal-aperture":
          return {
            opacity: 0,
            transform: "scale(1.04)",
            filter: "blur(4px)",
            transition: `${baseTransition}, filter ${durationMs}ms ease-out ${delayMs}ms`,
            willChange: "opacity, transform, filter",
          };
        case "fade-in":
        default:
          return {
            opacity: 0,
            transform: "none",
            transition: baseTransition,
            willChange: "opacity",
          };
      }
    }

    return {
      opacity: 1,
      transform: "translate3d(0, 0, 0) scale(1)",
      filter: "none",
      transition: baseTransition,
    };
  };

  return (
    <Component ref={domRef} style={getStyles()} className={cn(className)}>
      {children}
    </Component>
  );
}
