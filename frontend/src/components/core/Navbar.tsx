"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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

  const navItems: NavItem[] = [
    { name: "Archive",    href: "/work",     sectionId: "archive",    number: "01" },
    { name: "Disciplines",href: "/services", sectionId: "disciplines",number: "02" },
    { name: "Commissions",href: "/contact",  sectionId: "commissions",number: "03" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 32);
      if (pathname.startsWith("/work")) { setActiveSection("archive"); return; }
      if (pathname === "/services")     { setActiveSection("disciplines"); return; }
      if (pathname === "/contact")      { setActiveSection("commissions"); return; }
      setActiveSection("");
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
      <div
        className={cn(
          "w-full pointer-events-auto transition-all duration-700",
          isScrolled
            ? "bg-background border-b border-hairline py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Logo Typography - Strictly Editorial */}
          <Link href="/" className="flex flex-col group select-none shrink-0">
            <span
              className={cn(
                "font-serif text-xl leading-none tracking-normal transition-colors duration-500",
                isScrolled ? "text-ink-primary" : "text-[#F2F0E9]"
              )}
            >
              Studioza
            </span>
            <span
              className={cn(
                "type-mono-micro mt-1 transition-colors duration-500",
                isScrolled ? "text-ink-muted" : "text-[#BDBDBD]"
              )}
            >
              Atelier
            </span>
          </Link>

          {/* Desktop Nav - Excellent Whitespace, Thin & Elegant */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative type-ui-nav transition-all duration-500 text-[13px] uppercase tracking-widest",
                    isActive
                      ? (isScrolled ? "text-ink-primary font-medium" : "text-[#F2F0E9] font-medium")
                      : (isScrolled ? "text-ink-muted hover:text-ink-primary" : "text-[#BDBDBD] hover:text-[#F2F0E9]")
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span className={cn(
                      "absolute -bottom-1.5 left-0 w-full h-px transition-colors duration-500",
                      isScrolled ? "bg-ink-primary" : "bg-[#F2F0E9]"
                    )} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs - Understated, Architectural */}
          <div className="hidden md:flex items-center gap-8 shrink-0">
            <Link
              href="/login"
              className={cn(
                "type-ui-nav text-[13px] uppercase tracking-widest transition-colors duration-500",
                isScrolled ? "text-ink-muted hover:text-ink-primary" : "text-[#BDBDBD] hover:text-[#F2F0E9]"
              )}
            >
              Sign In
            </Link>
            
            <Link
              href="/signup"
              className={cn(
                "group relative flex items-center justify-center type-ui-nav text-[13px] uppercase tracking-widest transition-all duration-500 px-6 py-2.5 overflow-hidden rounded-none",
                isScrolled 
                  ? "text-ink-primary border border-stone-300 hover:border-copper-500 hover:text-copper-600 hover:bg-copper-500/5" 
                  : "text-[#F2F0E9] border border-ink-inverse/30 hover:border-ink-inverse hover:bg-[#F2F0E9]/5"
              )}
            >
              <span className="relative z-10">Workspace</span>
            </Link>
          </div>

          {/* Mobile toggle - Minimal Typography */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "type-ui-nav text-[13px] uppercase tracking-widest transition-colors duration-500 p-4 -m-4",
                isScrolled ? "text-ink-primary" : "text-[#F2F0E9]"
              )}
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {/* Mobile drawer - Thin & Elegant */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-t border-hairline px-6 pb-10 pt-8 mt-3 sm:mt-5 animate-editorial-in">
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-end justify-between border-b border-hairline pb-3"
                >
                  <span className="font-serif text-3xl text-ink-primary">{item.name}</span>
                  <span className="type-mono-micro text-ink-muted">{item.number}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-12 flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 text-center type-ui-nav text-[13px] uppercase tracking-widest text-ink-muted hover:text-ink-primary transition-colors border border-transparent"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 text-center type-ui-nav text-[13px] uppercase tracking-widest text-ink-primary border border-stone-300 transition-colors hover:border-copper-500 hover:text-copper-600 hover:bg-copper-500/5"
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
