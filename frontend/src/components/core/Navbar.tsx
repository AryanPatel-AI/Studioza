"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Menu, X, FolderLock } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Primary navigation links requested for the site
  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Services", href: "/services" },
    { name: "Stories", href: "/stories" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Add subtle background blur once the user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Check if link matches current route
  const isItemActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    if (href === "/collections") {
      return pathname.startsWith("/collections");
    }
    if (href === "/about") {
      return pathname === "/about" || pathname === "/studio";
    }
    if (href === "/portfolio") {
      return (
        pathname === "/portfolio" ||
        pathname.startsWith("/portfolio/") ||
        pathname.startsWith("/project/") ||
        pathname.startsWith("/work")
      );
    }
    if (href === "/journal") {
      return pathname === "/journal" || pathname.startsWith("/journal/");
    }
    if (href === "/stories") {
      return pathname === "/stories" || pathname.startsWith("/stories/");
    }
    if (href === "/services") {
      return pathname === "/services" || pathname.startsWith("/services/");
    }
    if (href === "/contact") {
      return pathname === "/contact";
    }
    return pathname.startsWith(href);
  };

  const isDarkHero = (pathname === "/" || pathname?.startsWith("/vault")) && !isScrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div
        className={cn(
          "w-full transition-all duration-500",
          isScrolled
            ? "bg-[#F4F1EB]/95 backdrop-blur-md border-b border-[#D9D5CE] py-3.5 shadow-xs"
            : isDarkHero
            ? "bg-transparent py-6"
            : "bg-[#F4F1EB]/80 backdrop-blur-xs py-5 border-b border-[#D9D5CE]/40"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-baseline gap-2 group select-none">
            <span
              className={cn(
                "font-serif text-2xl tracking-[-0.02em] font-medium transition-colors duration-300",
                isDarkHero ? "text-white" : "text-[#151515]"
              )}
            >
              STUDIOZA
            </span>
            <span
              className={cn(
                "type-micro transition-colors duration-300 hidden sm:inline-block",
                isDarkHero ? "text-white/60" : "text-[#77736D]"
              )}
            >
              ATELIER // ARCHIVES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isItemActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "type-meta transition-colors duration-300 relative py-1 text-[11px] tracking-widest uppercase",
                    isDarkHero
                      ? active
                        ? "text-white font-semibold"
                        : "text-white/80 hover:text-white"
                      : active
                      ? "text-[#151515] font-semibold"
                      : "text-[#77736D] hover:text-[#151515]"
                  )}
                >
                  {item.name}
                  {active && (
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 w-full h-[1.5px] transition-all",
                        isDarkHero ? "bg-[#CFA570]" : "bg-[#151515]"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/vault"
              className={cn(
                "type-meta text-[11px] tracking-wider transition-colors flex items-center gap-1.5",
                isDarkHero ? "text-white/80 hover:text-[#CFA570]" : "text-[#77736D] hover:text-[#151515]"
              )}
            >
              <FolderLock className="w-3.5 h-3.5 text-[#CFA570]" />
              <span>Vault</span>
            </Link>

            <Link
              href="/admin/dashboard"
              className={cn(
                "type-micro hover:underline transition-colors text-[10px]",
                isDarkHero ? "text-white/60 hover:text-white" : "text-[#77736D] hover:text-[#151515]"
              )}
            >
              CMS
            </Link>

            <Link
              href="/booking"
              className={cn(
                "type-meta text-[11px] px-5 py-2.5 transition-all duration-300 flex items-center gap-1.5 border",
                isDarkHero
                  ? "bg-white text-[#151515] border-white hover:bg-[#CFA570] hover:text-[#151515] hover:border-[#CFA570]"
                  : "bg-[#151515] text-[#F4F1EB] border-[#151515] hover:bg-[#333333]"
              )}
            >
              <span>Commission Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 transition-colors",
              isDarkHero ? "text-white" : "text-[#151515]"
            )}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#151515]" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#171717] text-[#F4F1EB] z-50 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto">
          {/* Header inside Drawer */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
              <span className="font-serif text-2xl text-white">STUDIOZA</span>
              <span className="type-micro text-[#CFA570]">ATELIER</span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-6 py-8">
            <span className="type-meta text-[10px] text-[#A39E96] tracking-widest block">
              MENU
            </span>
            <div className="flex flex-col space-y-4">
              {navItems.map((item, idx) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl sm:text-4xl text-white hover:text-[#CFA570] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-xs text-[#CFA570]">0{idx + 1}</span>
                </Link>
              ))}

              <Link
                href="/vault"
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl sm:text-4xl text-[#CFA570] hover:text-white transition-colors flex items-center justify-between border-b border-white/10 pb-3"
              >
                <span>Client Vault</span>
                <span className="font-mono text-xs text-[#CFA570]">08</span>
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-8 space-y-6 border-t border-white/10">
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="w-full bg-[#F4F1EB] text-[#171717] py-4 text-center type-meta text-xs block hover:bg-[#CFA570] hover:text-[#171717] transition-colors font-medium"
            >
              COMMISSION DOSSIER →
            </Link>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs type-meta text-[#A39E96]">
              <Link href="/admin/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-white underline">
                Admin Portal
              </Link>
              <span>JAIPUR · NEW YORK · MILAN</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
