import React from "react";
import { cn } from "@/lib/utils";

/* ========================================================================= */
/* 1. DISPLAY HEADLINE (Cormorant Garamond Serif — Art Book Editorial)      */
/* ========================================================================= */

export interface DisplayHeadlineProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "hero" | "2xl" | "xl" | "lg" | "md" | "sm";
  tone?: "ivory" | "copper" | "charcoal" | "light";
  children: React.ReactNode;
  className?: string;
}

export function DisplayHeadline({
  as: Component = "h2",
  size = "lg",
  tone = "charcoal",
  children,
  className = "",
  ...props
}: DisplayHeadlineProps) {
  const sizeClasses = {
    hero: "text-6xl sm:text-8xl md:text-9xl lg:text-[10rem]  ",
    "2xl": "text-5xl sm:text-7xl lg:text-8xl  ",
    xl: "text-4xl sm:text-6xl lg:text-7xl  leading-tight",
    lg: "text-3xl sm:text-4xl lg:text-5xl  ",
    md: "text-2xl sm:text-3xl  ",
    sm: "text-xl sm:text-2xl tracking-normal leading-normal",
  }[size];

  const toneClasses = {
    charcoal: "text-ink-primary ",
    ivory: "text-ink-primary ",
    copper: "text-copper-500 ",
    light: "text-ink-inverse ",
  }[tone];

  return (
    <Component
      className={cn(
        " select-none",
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
      <p className={cn("  italic text-ink-primary ", sizeClasses)}>
        &ldquo;{children}&rdquo;
      </p>
      {(attribution || role) && (
        <footer className="pt-2 type-meta">
          {attribution && <cite className="text-copper-500 not-italic">{attribution}</cite>}
          {attribution && role && <span className="text-stone-400 mx-2">—</span>}
          {role && <span className="text-ink-muted">{role}</span>}
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
  tone?: "copper" | "stone" | "light";
  dot?: boolean;
  className?: string;
}

export function TechnicalSpec({
  children,
  tone = "copper",
  dot = false,
  className = "",
  ...props
}: TechnicalSpecProps) {
  const toneClasses = {
    copper: "text-copper-500",
    stone: "text-ink-muted",
    light: "text-stone-300",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 type-meta select-none",
        toneClasses,
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-copper-500 shrink-0" />}
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
        "flex items-center justify-between type-meta select-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <span className="text-copper-500 font-semibold">{formattedNumber}</span>
        {label && <span className="text-ink-muted">— {label}</span>}
      </div>

      <div className="flex items-center gap-4">
        {stock && <span className="hidden sm:inline-block">{stock}</span>}
        {location && <span className="text-ink-muted">{location}</span>}
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
    base: "type-body-base ",
    sm: "type-body-base ",
    xs: "text-xs leading-normal",
  }[size];

  const toneClasses = {
    light: "text-ink-body ",
    muted: "text-ink-muted ",
    subtle: "text-ink-muted ",
  }[tone];

  return (
    <p className={cn(sizeClasses, toneClasses, className)} {...props}>
      {children}
    </p>
  );
}
