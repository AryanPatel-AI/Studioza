"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudioButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "crystal" | "outline" | "minimal";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  icon?: "arrow-up-right" | "arrow-right" | "none" | React.ReactNode;
  strength?: number; // Magnetic displacement factor (0 to 0.4)
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function StudioButton({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  icon = "none",
  strength = 0.28,
  className = "",
  type = "button",
  disabled = false,
}: StudioButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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
    if (!containerRef.current || disabled) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setSpecular({ x: px * 100, y: py * 100 });

    if (!prefersReducedMotion) {
      setPosition({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  // 1. Size Specs
  const sizeClasses = {
    sm: "py-2 px-4 text-[11px] gap-1.5",
    md: "py-2.5 px-6 text-xs gap-2",
    lg: "py-3.5 px-8 text-xs sm:text-sm gap-2.5",
  }[size];

  // 2. Variant Visuals
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 text-black font-semibold shadow-md shadow-amber-400/10 hover:shadow-lg hover:shadow-amber-400/20 active:scale-[0.98]",
    crystal:
      "backdrop-blur-xl bg-[#18130e]/40 text-ivory-100 border border-white/[0.12] hover:border-amber-400/60 shadow-[inset_0_1px_1px_rgba(255,235,210,0.2)] active:scale-[0.98]",
    outline:
      "border border-white/20 text-zinc-200 hover:text-white hover:border-amber-400/60 bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.98]",
    minimal:
      "text-zinc-300 hover:text-amber-300 bg-transparent px-0 py-1 font-medium hover:underline underline-offset-8 decoration-amber-400/40",
  }[variant];

  // 3. Render Icon
  const renderIcon = () => {
    if (icon === "none") return null;
    if (icon === "arrow-up-right") {
      return (
        <ArrowUpRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isHovered && "translate-x-0.5 -translate-y-0.5"
          )}
        />
      );
    }
    if (icon === "arrow-right") {
      return (
        <ArrowRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isHovered && "translate-x-1"
          )}
        />
      );
    }
    return icon;
  };

  const innerContent = (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative select-none inline-flex items-center justify-center rounded-full font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer overflow-hidden",
        sizeClasses,
        variantClasses,
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Specular Edge Highlight for Crystal & Primary */}
      {variant === "crystal" && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.9 : 0.3,
            background: `radial-gradient(circle 120px at ${specular.x}% ${specular.y}%, rgba(255, 235, 205, 0.25), transparent 70%)`,
          }}
        />
      )}

      <span
        className="relative z-10 flex items-center gap-2"
        style={{
          transform: `translate3d(${position.x * 0.3}px, ${position.y * 0.3}px, 0)`,
          transition: isHovered
            ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
            : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <span>{children}</span>
        {renderIcon()}
      </span>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-block">
        {innerContent}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block bg-transparent p-0 border-0">
      {innerContent}
    </button>
  );
}
