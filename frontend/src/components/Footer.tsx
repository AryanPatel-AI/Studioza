import Link from "next/link";
import { Camera, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#06070a] text-neutral-400 py-16 relative overflow-hidden">
      {/* Subtle Ambient Bottom Flare */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 blur-[80px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.4), transparent 70%)"
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-black text-sm shadow-md shadow-amber-500/20">
              <Camera className="w-4 h-4 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg font-bold text-white tracking-tight">Studioza</span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Visual Atelier</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            A bespoke luxury photography studio creating iconic editorial campaigns, intimate cinematic portraits, and architectural archives worldwide.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-amber-400/90 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Accepting 2026/2027 Commissions
            </span>
          </div>
        </div>

        {/* Curation Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
            Archive & Works
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/main" className="hover:text-amber-300 transition-colors">
                Visual Archive & Gallery
              </Link>
            </li>
            <li>
              <Link href="/main#services" className="hover:text-amber-300 transition-colors">
                Session Tiers & Commissions
              </Link>
            </li>
            <li>
              <Link href="/main#gear" className="hover:text-amber-300 transition-colors">
                Studio Gear & Optics Vault
              </Link>
            </li>
            <li>
              <Link href="/main#publications" className="hover:text-amber-300 transition-colors">
                Press & Editorial Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Global Locations */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
            Atelier Studios
          </h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li className="flex items-center justify-between">
              <span>New York City</span>
              <span className="text-[10px] text-neutral-500 font-mono">SoHo Studio</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Paris</span>
              <span className="text-[10px] text-neutral-500 font-mono">Le Marais</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Tokyo</span>
              <span className="text-[10px] text-neutral-500 font-mono">Daikanyama</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Milan</span>
              <span className="text-[10px] text-neutral-500 font-mono">Brera District</span>
            </li>
          </ul>
        </div>

        {/* Direct Inquiries & Portal */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-200 mb-4 font-mono">
            Direct Inquiries
          </h4>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Inquire regarding editorial shoots, brand campaigns, private commissions, or prints.
          </p>
          <div className="flex flex-col gap-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              Inquire About Shoot Dates →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors"
            >
              Client Asset Access Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row with Mandatory Aryan Patel Credit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 relative z-10 gap-3">
        <p>© {new Date().getFullYear()} Studioza Atelier Inc. All rights reserved. Registered trademark.</p>
        
        {/* Subtle, elegant credit as requested */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-neutral-300 font-medium">
          <span>Designed &amp; Built by</span>
          <span className="text-amber-400 font-semibold tracking-wide">Aryan Patel</span>
        </div>

        <p className="font-mono text-[11px] text-neutral-600">Leica M11 • Hasselblad H6D • Profoto</p>
      </div>
    </footer>
  );
}
