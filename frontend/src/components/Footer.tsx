import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#050507] text-neutral-400 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle Atmospheric Light Pool */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-48 blur-[120px] pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.45), transparent 75%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-20">
        {/* ========================================================================= */}
        {/* ARCHITECTURAL MASTHEAD                                                    */}
        {/* ========================================================================= */}
        <div className="border-b border-white/[0.06] pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] text-zinc-500 uppercase block mb-3">
                Colophon &amp; Monograph Index
              </span>
              <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-light text-zinc-200 tracking-tight leading-none">
                STUDIOZA
              </h1>
            </div>

            <div className="max-w-xs space-y-2 text-xs font-mono text-zinc-500">
              <span className="text-amber-400/90 font-medium block">
                Atelier Standards
              </span>
              <p className="leading-relaxed">
                Medium-format sensor backs, apochromatic planar lenses, and hand-pulled baryta prints. Zero synthetic smoothing.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ATELIER COLOPHON GRID (4 MINIMALIST COLUMNS)                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-xs">
          {/* Column 1: Premise & Direction */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">
              01 / Atelier Direction
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              A private photography atelier dedicated to the deliberate arrest of light, form, and human gesture. Operating globally for selective luxury commissions, architectural archives, and private monographs.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 text-[10px] font-mono text-amber-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                Annual Commission Quota: 12 Projects
              </span>
            </div>
          </div>

          {/* Column 2: Permanent Studios */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">
              02 / Production Bases
            </h4>
            <ul className="space-y-3 font-mono text-[11px] text-zinc-400">
              <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-zinc-300">New York</span>
                <span className="text-zinc-500">SoHo • 40.72° N</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-zinc-300">Paris</span>
                <span className="text-zinc-500">Le Marais • 48.85° N</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/[0.04] pb-2">
                <span className="text-zinc-300">Tokyo</span>
                <span className="text-zinc-500">Daikanyama • 35.65° N</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-zinc-300">Milan</span>
                <span className="text-zinc-500">Brera • 45.47° N</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Index */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">
              03 / Index &amp; Works
            </h4>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link
                  href="/main"
                  className="text-zinc-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Visual Archive • Plates 01–24</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#optics"
                  className="text-zinc-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Optics Installation • Zeiss Otus 85</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#timeline"
                  className="text-zinc-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Methodology • Phases I–IV</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-zinc-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Client Workspace &amp; Proofing</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Curatorial Contact & Vault */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-300">
              04 / Direct Line
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Inquire regarding editorial monographs, private portraiture sittings, or museum-grade baryta prints.
            </p>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <a
                href="mailto:commissions@studioza.com"
                className="text-amber-300 hover:text-amber-200 transition-colors block border-b border-amber-400/30 pb-1 w-fit"
              >
                commissions@studioza.com
              </a>
              <Link
                href="/login"
                className="text-zinc-500 hover:text-zinc-300 transition-colors block pt-2"
              >
                Access Archival Proofing Vault →
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COLOPHON BAR & MANDATORY ARYAN PATEL CREDIT                               */}
        {/* ========================================================================= */}
        <div className="pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Studioza Atelier Inc. All rights reserved.</p>

          {/* Aryan Patel Atelier Credit */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-300">
            <span className="text-zinc-500">Conceived &amp; Engineered by</span>
            <span className="text-amber-400 font-medium tracking-wide">Aryan Patel</span>
          </div>

          <p className="text-zinc-600 text-[10px]">
            Hahnemühle 310gsm • Phase One IQ4 • Profoto Pro-11
          </p>
        </div>
      </div>
    </footer>
  );
}
