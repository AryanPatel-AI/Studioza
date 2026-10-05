"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StudioButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "crystal" | "outline" | "minimal" | "dark";
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
  strength = 0.20,
  className = "",
  type = "button",
  disabled = false,
}: StudioButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
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

  // 1. Proportional Editorial Sizes
  const sizeClasses = {
    sm: "py-2 px-4 text-[11px] gap-1.5",
    md: "py-2.5 px-6 text-[11px] sm:text-xs gap-2",
    lg: "py-3.5 px-8 text-xs gap-2.5",
  }[size];

  // 2. Architectural Editorial Visuals (Restrained, no neon glows, crisp radii)
  const variantClasses = {
    primary:
      "bg-sage-500 text-[#151515] border border-sage-500 hover:bg-sage-600 hover:border-sage-600 transition-colors duration-200 active:scale-[0.99]",
    crystal:
      "bg-transparent text-[#151515] border border-stone-200 hover:border-amber-500 hover:text-amber-600 transition-colors duration-200 active:scale-[0.99]",
    outline:
      "bg-transparent text-[#151515] border border-[#151515]/20 hover:border-[#151515] transition-colors duration-200 active:scale-[0.99]",
    dark:
      "bg-stone-900 text-[#F2F0E9] border border-stone-800 hover:border-stone-500 transition-colors duration-200 active:scale-[0.99]",
    minimal:
      "text-[#151515] hover:text-amber-500 bg-transparent px-0 py-1 hover:underline underline-offset-4 decoration-amber-500/30 transition-colors",
  }[variant];

  // 3. Render Icon
  const renderIcon = () => {
    if (icon === "none") return null;
    if (icon === "arrow-up-right") {
      return (
        <ArrowUpRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isHovered && "transtone-x-0.5 -transtone-y-0.5"
          )}
        />
      );
    }
    if (icon === "arrow-right") {
      return (
        <ArrowRight
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-300",
            isHovered && "transtone-x-1"
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
        "relative select-none inline-flex items-center justify-center rounded-[2px] type-ui-nav tracking-widest uppercase transition-all duration-300 cursor-pointer overflow-hidden",
        sizeClasses,
        variantClasses,
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered
          ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <span
        className="relative z-10 flex items-center gap-2"
        style={{
          transform: `translate3d(${position.x * 0.25}px, ${position.y * 0.25}px, 0)`,
          transition: isHovered
            ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
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
