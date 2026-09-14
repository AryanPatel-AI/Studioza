"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import StudioButton from "./ui/StudioButton";

interface NavItem {
  name: string;
  href: string;
  sectionId?: string;
  number: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [specular, setSpecular] = useState({ x: 50, y: 50 });
  const navRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: "Anthology", href: "/#anthology", sectionId: "anthology", number: "01" },
    { name: "Roll", href: "/#roll", sectionId: "roll", number: "02" },
    { name: "Archive", href: "/main", sectionId: "archive", number: "03" },
    { name: "Commissions", href: "/contact", sectionId: "commissions", number: "04" },
  ];

  // 1. Scroll & Active Section Detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      if (pathname === "/main") {
        setActiveSection("archive");
        return;
      }
      if (pathname === "/contact") {
        setActiveSection("commissions");
        return;
      }

      if (pathname === "/") {
        const anthologyEl = document.getElementById("anthology");
        const rollEl = document.getElementById("roll");
        const contactEl = document.getElementById("contact");

        if (contactEl && contactEl.getBoundingClientRect().top <= 300) {
          setActiveSection("commissions");
        } else if (rollEl && rollEl.getBoundingClientRect().top <= 200) {
          setActiveSection("roll");
        } else if (anthologyEl && anthologyEl.getBoundingClientRect().top <= 200) {
          setActiveSection("anthology");
        } else {
          setActiveSection("");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // 2. Cursor Specular Tracking along the Crystal Rim
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setSpecular({ x: px * 100, y: py * 100 });
  };

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 z-50 px-4 sm:px-8 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled ? "top-3 sm:top-4" : "top-5 sm:top-7"
      )}
    >
      <div
        ref={navRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "max-w-5xl mx-auto pointer-events-auto rounded-2xl sm:rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden",
          isScrolled
            ? "backdrop-blur-2xl bg-[#090807]/80 border border-white/[0.12] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,235,210,0.18)] py-2 sm:py-2.5 px-5 sm:px-7"
            : "backdrop-blur-xl bg-[#090807]/60 border border-white/[0.08] py-2.5 sm:py-3 px-6 sm:px-8 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,235,210,0.1)]"
        )}
      >
        {/* Soft Specular Hairline Reflection (Active when scrolled) */}
        {isScrolled && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(circle 280px at ${specular.x}% ${specular.y}%, rgba(255, 235, 205, 0.14) 0%, transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10 flex items-center justify-between">
          {/* ========================================================================= */}
          {/* 1. ELEGANT STUDIOZA MARK                                                  */}
          {/* ========================================================================= */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            {/* Minimal Optical Lens Aperture Ring */}
            <div className="w-7 h-7 rounded-full border border-white/20 group-hover:border-amber-300/80 flex items-center justify-center transition-all duration-500 bg-white/[0.02] group-hover:bg-amber-400/[0.08] relative overflow-hidden">
              <span className="font-serif italic font-semibold text-xs text-zinc-200 group-hover:text-amber-200 transition-colors">
                S
              </span>
              <div className="absolute inset-0 rounded-full border border-amber-300/0 group-hover:border-amber-300/30 transition-all duration-500 scale-90 group-hover:scale-100" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-serif text-base sm:text-lg tracking-tight text-white font-medium group-hover:text-amber-200 transition-colors">
                Studioza
              </span>
              <span className="hidden sm:inline-block text-[8px] uppercase tracking-[0.3em] text-zinc-400 font-mono transition-colors group-hover:text-amber-300/80">
                Atelier
              </span>
            </div>
          </Link>

          {/* ========================================================================= */}
          {/* 2. MINIMAL DESKTOP NAVIGATION (Restrained, Timeless Typography)           */}
          {/* ========================================================================= */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono tracking-[0.22em] uppercase select-none">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative py-1 transition-all duration-300 group flex items-center gap-1.5",
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white font-normal"
                  )}
                >
                  <span>{item.name}</span>

                  {/* Active Section Micro Indication */}
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                  )}

                  {/* Subtle Underline Glide on Hover */}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-amber-400/80 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-3"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ========================================================================= */}
          {/* 3. RESTRAINED CTA (Magnetic Motion, No Excessive Glow)                     */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/login"
              className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>

            <StudioButton
              variant="primary"
              size="sm"
              href="/signup"
              icon="arrow-up-right"
              strength={0.22}
            >
              Workspace
            </StudioButton>
          </div>

          {/* ========================================================================= */}
          {/* 4. INTENTIONAL MOBILE TRIGGER (Camera Technical Index Pill)               */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "flex items-center gap-2 py-2 px-3.5 min-h-[42px] rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-300 select-none cursor-pointer",
                mobileOpen
                  ? "border-amber-400/60 bg-amber-400/10 text-amber-300"
                  : "border-white/15 bg-white/[0.03] text-zinc-300 hover:text-white hover:border-white/30"
              )}
              aria-label="Toggle Atelier Index"
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  mobileOpen ? "bg-amber-400" : "bg-zinc-400"
                )}
              />
              <span>{mobileOpen ? "CLOSE ✕" : "INDEX"}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. PREMIUM MOBILE NAVIGATION (Editorial Contact-Strip Accordion)          */}
        {/* ========================================================================= */}
        {mobileOpen && (
          <div className="md:hidden pt-5 pb-2 mt-4 border-t border-white/[0.08] space-y-4 animate-in fade-in slide-in-from-top-2 duration-300 max-h-[75vh] overflow-y-auto scrollbar-none">
            {/* Header Placard */}
            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-widest pb-1 border-b border-white/[0.04]">
              <span>Atelier Catalog Index</span>
              <span>Vol. XXIV</span>
            </div>

            {/* Sequence Rows */}
            <nav className="flex flex-col divide-y divide-white/[0.04]">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "py-3.5 px-1 flex items-center justify-between text-xs font-mono uppercase tracking-widest transition-colors",
                      isActive
                        ? "text-amber-300 font-semibold"
                        : "text-zinc-300 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-amber-400/80 font-normal">
                        {item.number}
                      </span>
                      <span>{item.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 min-h-[44px] flex items-center justify-center rounded-full text-[11px] font-mono uppercase tracking-wider text-zinc-300 hover:text-white border border-white/15 w-1/2 text-center transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="py-3 px-4 min-h-[44px] flex items-center justify-center rounded-full text-[11px] font-mono uppercase tracking-wider text-black bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 font-semibold w-1/2 text-center shadow-md shadow-amber-400/15 transition-all"
              >
                Workspace
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
