import React from "react";
import { cn } from "@/lib/utils";

/* ========================================================================= */
/* 1. DISPLAY HEADLINE (Cormorant Garamond Serif)                            */
/* ========================================================================= */

export interface DisplayHeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "hero" | "2xl" | "xl" | "lg" | "md" | "sm";
  tone?: "ivory" | "gold" | "selenium";
  children: React.ReactNode;
  className?: string;
}

export function DisplayHeadline({
  as: Component = "h2",
  size = "lg",
  tone = "ivory",
  children,
  className = "",
  ...props
}: DisplayHeadlineProps) {
  const sizeClasses = {
    hero: "text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight leading-none",
    "2xl": "text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none",
    xl: "text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight",
    lg: "text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-snug",
    md: "text-2xl sm:text-3xl tracking-tight leading-snug",
    sm: "text-xl sm:text-2xl tracking-normal leading-normal",
  }[size];

  const toneClasses = {
    ivory: "text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/35 drop-shadow-2xl",
    gold: "text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500/80 drop-shadow-xl",
    selenium: "text-zinc-300",
  }[tone];

  return (
    <Component
      className={cn(
        "font-serif font-bold select-none",
        sizeClasses,
        toneClasses,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

/* ========================================================================= */
/* 2. EDITORIAL ITALIC & QUOTE                                               */
/* ========================================================================= */

export interface EditorialQuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
  attribution?: string;
  role?: string;
  size?: "lg" | "md" | "sm";
  className?: string;
}

export function EditorialQuote({
  children,
  attribution,
  role,
  size = "md",
  className = "",
  ...props
}: EditorialQuoteProps) {
  const sizeClasses = {
    lg: "text-3xl sm:text-5xl md:text-6xl",
    md: "text-xl sm:text-2xl md:text-3xl",
    sm: "text-lg sm:text-xl",
  }[size];

  return (
    <blockquote className={cn("space-y-4", className)} {...props}>
      <p className={cn("font-serif font-normal italic text-zinc-200 leading-relaxed", sizeClasses)}>
        &ldquo;{children}&rdquo;
      </p>
      {(attribution || role) && (
        <footer className="pt-2 text-xs font-mono tracking-wider">
          {attribution && <cite className="text-amber-400/90 font-medium not-italic">{attribution}</cite>}
          {attribution && role && <span className="text-zinc-600 mx-2">—</span>}
          {role && <span className="text-zinc-500 font-light">{role}</span>}
        </footer>
      )}
    </blockquote>
  );
}

/* ========================================================================= */
/* 3. TECHNICAL SPECIFICATION / EXIF TELEMETRY TAG                           */
/* ========================================================================= */

export interface TechnicalSpecProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: "amber" | "zinc" | "white";
  dot?: boolean;
  className?: string;
}

export function TechnicalSpec({
  children,
  tone = "amber",
  dot = false,
  className = "",
  ...props
}: TechnicalSpecProps) {
  const toneClasses = {
    amber: "text-amber-300/90",
    zinc: "text-zinc-400",
    white: "text-zinc-200",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] uppercase select-none",
        toneClasses,
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

/* ========================================================================= */
/* 4. PLATE NUMBER & REBATE IDENTIFIER                                       */
/* ========================================================================= */

export interface PlateLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: string | number;
  label?: string;
  stock?: string;
  location?: string;
  className?: string;
}

export function PlateLabel({
  number,
  label,
  stock = "ILFORD HP5 PLUS • 400",
  location,
  className = "",
  ...props
}: PlateLabelProps) {
  const formattedNumber = typeof number === "number" ? `PL. 0${number}` : number;

  return (
    <div
      className={cn(
        "flex items-center justify-between text-[10px] font-mono text-zinc-500 tracking-wider uppercase select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span className="text-amber-400 font-semibold">{formattedNumber}</span>
        {label && <span className="text-zinc-400">— {label}</span>}
      </div>

      <div className="flex items-center gap-4">
        {stock && <span className="hidden sm:inline-block tracking-[0.25em]">{stock}</span>}
        {location && <span className="text-zinc-400">{location}</span>}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 5. BODY PROSE TEXT                                                        */
/* ========================================================================= */

export interface BodyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: "base" | "sm" | "xs";
  tone?: "light" | "muted" | "subtle";
  children: React.ReactNode;
  className?: string;
}

export function BodyText({
  size = "sm",
  tone = "light",
  children,
  className = "",
  ...props
}: BodyTextProps) {
  const sizeClasses = {
    base: "text-sm sm:text-base leading-relaxed",
    sm: "text-xs sm:text-sm leading-relaxed",
    xs: "text-xs leading-normal",
  }[size];

  const toneClasses = {
    light: "text-zinc-300 font-light",
    muted: "text-zinc-400 font-light",
    subtle: "text-zinc-500 font-normal",
  }[tone];

  return (
    <p className={cn(sizeClasses, toneClasses, className)} {...props}>
      {children}
    </p>
  );
}
