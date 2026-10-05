import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-ink-primary text-background pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-20">
        {/* ── Masthead ── */}
        <div className="border-b border-white/10 pb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="type-meta block mb-3">
                Colophon &amp; Monograph Index
              </span>
              <h1 className="type-display-hero text-[white]">
                STUDIOZA
              </h1>
            </div>
            <div className="max-w-xs space-y-2 type-meta text-stone-400">
              <span className="text-copper-400 block uppercase">
                Atelier Standards
              </span>
              <p className="text-stone-400">
                Medium-format digital backs, apochromatic lenses, and hand-pulled baryta prints. Zero synthetic smoothing.
              </p>
            </div>
          </div>
        </div>

        {/* ── Colophon Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 type-body-base">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4 className="type-meta text-stone-300 border-b border-white/10 pb-2">
              01 / Atelier Direction
            </h4>
            <p className="text-stone-400 type-ui-nav">
              A private photography atelier dedicated to the deliberate arrest of light, form, and architectural gesture. Operating globally for selective luxury commissions, architectural archives, and private monographs.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 type-meta text-copper-400">
                <span className="w-1.5 h-1.5 rounded-full bg-copper-500 shrink-0" />
                Annual Commission Quota: 12 Projects
              </span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h4 className="type-meta text-stone-300 border-b border-white/10 pb-2">
              02 / Production Bases
            </h4>
            <ul className="space-y-2.5 type-ui-nav text-stone-400">
              {[
                ["New York",  "SoHo • 40.72° N"],
                ["Paris",     "Le Marais • 48.85° N"],
                ["Tokyo",     "Daikanyama • 35.65° N"],
                ["Milan",     "Brera • 45.47° N"],
              ].map(([city, loc]) => (
                <li key={city} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                  <span className="text-stone-200">{city}</span>
                  <span className="text-stone-500 type-meta">{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h4 className="type-meta text-stone-300 border-b border-white/10 pb-2">
              03 / Index &amp; Works
            </h4>
            <ul className="space-y-2.5 type-ui-nav">
              {[
                ["/main",      "Visual Archive • Plates 01–24"],
                ["/#optics",   "Optics Installation • Zeiss Otus 85"],
                ["/#timeline", "Methodology • Phases I–IV"],
                ["/projects",  "Client Workspace &amp; Proofing"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-stone-400 hover:text-copper-400 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                    <ArrowUpRight className="w-3 h-3 text-stone-600 group-hover:text-copper-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h4 className="type-meta text-stone-300 border-b border-white/10 pb-2">
              04 / Direct Line
            </h4>
            <p className="text-stone-400 type-ui-nav">
              Inquire regarding editorial monographs, private portraiture sittings, or museum-grade baryta prints.
            </p>
            <div className="space-y-2 pt-1 type-ui-nav">
              <a
                href="mailto:commissions@studioza.com"
                className="text-copper-400 hover:text-copper-300 transition-colors block border-b border-copper-500/30 pb-0.5 w-fit"
              >
                commissions@studioza.com
              </a>
              <Link
                href="/login"
                className="text-stone-400 hover:text-stone-200 transition-colors block pt-1"
              >
                Access Archival Proofing Vault →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Colophon Bar ── */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between type-meta text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Studioza Atelier Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-[2px] bg-stone-900 border border-stone-800">
            <span className="text-stone-400">Conceived &amp; Engineered by</span>
            <span className="text-copper-400 tracking-wide">Aryan Patel</span>
          </div>
          <p className="text-stone-600">Hahnemühle 310gsm • Phase One IQ4 • Profoto Pro-11</p>
        </div>
      </div>
    </footer>
  );
}
