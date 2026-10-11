import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#171717] text-[#F4F1EB] pt-24 pb-12 relative overflow-hidden border-t border-[#D9D5CE]/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-20">
        {/* Masthead Banner */}
        <div className="border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="type-meta text-[#A39E96] block mb-3">Digital Photography Magazine · Atelier Monograph Archive</span>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight font-normal text-white">
                STUDIOZA
              </h1>
            </div>
            <div className="max-w-xs space-y-2 type-small text-[#A7A7A7]">
              <span className="text-[#CC5500] type-micro block">Atelier Discipline</span>
              <p>
                Operating at the intersection of medium-format discipline, unhurried observation, and architectural presence.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Core Positioning */}
          <div className="space-y-4">
            <h4 className="type-meta text-white/80 border-b border-white/10 pb-2">01 / The Magazine</h4>
            <p className="type-small text-[#A7A7A7] leading-relaxed">
              We treat the website as an editorial publication rather than a commercial agency brochure. Every commission is curated as an heirloom monograph.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 type-micro text-[#9CAF88]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9CAF88] animate-pulse" />
                Annual Commission Limit: 12 Projects
              </span>
            </div>
          </div>

          {/* Column 2: Architecture & Index */}
          <div className="space-y-4">
            <h4 className="type-meta text-white/80 border-b border-white/10 pb-2">02 / Architecture</h4>
            <ul className="space-y-2.5 type-small text-[#A39E96]">
              {[
                ["/work", "Visual Archive"],
                ["/services", "Disciplines & Services"],
                ["/studio", "Studioza Atelier"],
                ["/vault", "Client Proofing Vault"],
                ["/stories", "Editorial Stories"],
                ["/journal", "Journal & Field Notes"],
                ["/contact", "Commissions Dialogue"],
                ["/booking", "Reserve Date"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{label}</span>
                    <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Atelier Bases */}
          <div className="space-y-4">
            <h4 className="type-meta text-white/80 border-b border-white/10 pb-2">03 / Studio Bases</h4>
            <ul className="space-y-2.5 type-small text-[#A39E96]">
              {[
                ["Jaipur Atelier", "C-Scheme, Civil Lines · 26.91° N"],
                ["New York Studio", "Tribeca, Manhattan · 40.71° N"],
                ["Mumbai Base", "Colaba Arts Precinct · 18.92° N"],
                ["Milan Archive", "Brera Design District · 45.47° N"],
              ].map(([city, loc]) => (
                <li key={city} className="flex flex-col border-b border-white/5 pb-2 last:border-0">
                  <span className="text-white font-medium">{city}</span>
                  <span className="type-micro text-[#A39E96]">{loc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Inquiries & Legal */}
          <div className="space-y-4">
            <h4 className="type-meta text-white/80 border-b border-white/10 pb-2">04 / Commissions</h4>
            <p className="type-small text-[#A39E96]">
              Direct channel for editorial inquiries, wedding commissions, and gallery acquisitions.
            </p>
            <div className="space-y-2 pt-1 type-small">
              <a
                href="mailto:inquiries@studioza.atelier"
                className="text-[#CC5500] hover:underline block pb-0.5"
              >
                inquiries@studioza.atelier
              </a>
              <Link href="/booking" className="text-white hover:underline block pt-1">
                Start Booking Questionnaire →
              </Link>
              <Link href="/admin/dashboard" className="text-[#A39E96] hover:text-white block pt-1 type-micro">
                Admin Management Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Editorial Colophon Standards (Section 02 & 03) */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-start md:items-baseline justify-between text-xs font-mono text-[#77736D] gap-6">
          <div className="space-y-1 max-w-xl">
            <p className="text-[#CFA570] uppercase tracking-widest text-[10px]">Atelier Colophon</p>
            <p className="text-white/80">
              Typeset in Cormorant Garamond and Inter. Plates exposed on medium format analog negative and Leica M systems.
            </p>
            <p className="text-[11px] text-[#77736D]">
              Issue index maintained in Uttar Pradesh, India. All rights reserved under international archival convention.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 shrink-0">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Archival Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Commission
            </Link>
            <Link href="/admin/login" className="hover:text-[#CFA570] transition-colors">
              Studio Desk Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
