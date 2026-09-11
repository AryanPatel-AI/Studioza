"use client";

import Link from "next/link";
import { useState } from "react";
import { Camera, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Camera Aperture */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#08080a] rounded-[10px] flex items-center justify-center text-amber-400 group-hover:text-amber-300">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight text-white font-bold group-hover:text-amber-300 transition-colors">
              Studioza
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-medium -mt-1">
              Photography Atelier
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Overview
          </Link>
          <Link
            href="/main"
            className="hover:text-amber-300 text-white font-medium transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Visual Archive
          </Link>
          <Link href="/main#services" className="hover:text-amber-300 transition-colors">
            Session Tiers
          </Link>
          <Link href="/main#gear" className="hover:text-amber-300 transition-colors">
            Equipment Vault
          </Link>
          <Link href="/contact" className="hover:text-amber-300 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-white px-3.5 py-2 rounded-lg hover:bg-neutral-900/80 border border-transparent hover:border-neutral-800 transition-all"
          >
            Client Portal
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Book a Session
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0c0d13]/95 backdrop-blur-2xl px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-neutral-300">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-amber-300 transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/main"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-white font-semibold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Visual Archive
            </Link>
            <Link
              href="/main#services"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-amber-300 transition-colors"
            >
              Session Tiers
            </Link>
            <Link
              href="/main#gear"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-amber-300 transition-colors"
            >
              Equipment Vault
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-amber-300 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-800"
            >
              Client Portal
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md shadow-amber-500/20"
            >
              Book a Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
