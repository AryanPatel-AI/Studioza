import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight, Camera, Compass, Award, BookOpen, MapPin } from "lucide-react";

const EQUIPMENT_ARCHIVE = [
  {
    category: "CAMERAS",
    items: [
      { name: "Phase One IQ4 150MP Achromatic", desc: "151-megapixel 16-bit medium-format sensor with exceptional dynamic range and tonal transitions." },
      { name: "Linhof Master Technika 4x5", desc: "Classic German large-format view camera for perspective and plane-of-focus control." },
      { name: "Hasselblad H6D-100c & 907X", desc: "Medium-format modular platform for location commissions and digital precision." },
      { name: "Leica M11-P Monochrom", desc: "Discreet rangefinder for candid documentary moments during celebration rituals." },
    ],
  },
  {
    category: "OPTICS",
    items: [
      { name: "Rodenstock HR Digaron 40mm & 90mm", desc: "Apochromatic technical lenses engineered for zero chromatic aberration." },
      { name: "Zeiss Otus 55mm & 85mm f/1.4", desc: "Extreme edge-to-edge micro-contrast and uncompressed portrait rendering." },
      { name: "Schneider Kreuznach Blue Ring LS", desc: "Leaf-shutter lenses enabling high-speed sync up to 1/1600s with studio strobes." },
    ],
  },
  {
    category: "LAB & LIGHTING",
    items: [
      { name: "Profoto Pro-11 Generators & Giant Reflectors", desc: "Consistent color temperature with ultra-fast flash durations and soft cinematic falloff." },
      { name: "Hahnemühle Photo Rag Baryta 315gsm", desc: "Museum-grade 100% cotton rag paper with subtle baryta satin sheen for 150-year permanence." },
      { name: "Jobo CPP-3 Rotary Drum Processor", desc: "Precision temperature-controlled analog film development for 120 and 4x5 sheet films." },
    ],
  },
];

const ATELIER_LOCATIONS = [
  {
    city: "Jaipur",
    role: "Founding Atelier & Printroom",
    address: "Civil Lines & Amer Foothills",
    coordinates: "26.9124° N, 75.7873° E",
    desc: "Our primary creative darkroom, framing studio, and private client viewing gallery nestled within the Rajasthani capital.",
  },
  {
    city: "New York",
    role: "Editorial Lab & Production",
    address: "Tribeca, Lower Manhattan",
    coordinates: "40.7163° N, 74.0086° W",
    desc: "Consultation suites and international production management for North American and European monograph commissions.",
  },
  {
    city: "Milan",
    role: "Bookbinding & Monograph Archive",
    address: "Brera Design District",
    coordinates: "45.4720° N, 9.1870° E",
    desc: "Bespoke Italian leather and linen bookbinding atelier crafting each client heirloom volume by hand.",
  },
];

const PRESS_RECOGNITION = [
  { outlet: "Architectural Digest", title: "Top Heritage Photographers in South Asia", year: "2026" },
  { outlet: "Vogue India", title: "The Return of the Unhurried Wedding Monograph", year: "2025" },
  { outlet: "British Journal of Photography", title: "Medium Format Discipline in the Digital Age", year: "2025" },
  { outlet: "Condé Nast Traveler", title: "Capturing Rajasthan's Disappearing Fortresses", year: "2024" },
];

const SELECTED_CLIENTS = [
  "Architectural Heritage Trust",
  "Maison Jaipur Couture",
  "The Royal Family of Mewar",
  "Amanbagh & Aman Resorts",
  "Taj Hotels Heritage Collection",
  "Vogue International",
  "Private Dynastic Families worldwide",
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative selection:bg-[#151515] selection:text-[#F4F1EB]">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-36">
        {/* 1. Hero Statement */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="border-b border-[#D9D5CE] pb-12 space-y-4">
            <span className="type-meta text-[#77736D] block">
              ATELIER MONOGRAPH // EST. MMXVIII
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515] tracking-tight leading-[0.95]">
              Studioza Atelier
            </h1>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#77736D] max-w-3xl pt-2">
              An unhurried sanctuary of large-format discipline, historical architectural observation, and tactile heirloom craft.
            </p>
          </div>
        </section>

        {/* 2. Photographer Portrait & Biography */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Portrait Frame */}
            <div className="lg:col-span-5 space-y-4">
              <div className="aspect-[2/3] bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                <Image
                  src="/images/aryan-patel-sheesh-mahal.jpg"
                  alt="Aryan Patel — Principal Photographer"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="flex justify-between type-meta text-[11px] text-[#77736D] px-1">
                <span>ARYAN PATEL — PRINCIPAL</span>
                <span>SHEESH MAHAL, AMBER FORT</span>
              </div>
            </div>

            {/* Biography & Vision */}
            <div className="lg:col-span-7 space-y-8 lg:pt-4">
              <span className="type-meta text-[#77736D] block text-xs">
                BIOGRAPHY & ORIGINS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#151515] font-normal leading-tight">
                Trained in architectural geometry, devoted to the permanence of silver halide.
              </h2>
              <div className="prose text-[#151515]/90 space-y-5 type-body leading-relaxed">
                <p>
                  Founded by Aryan Patel, Studioza Atelier was born from an aversion to disposable, hyper-processed digital churn. After studying architectural geometry and classical large-format camera craft across Rajasthan and Northern Italy, Aryan established an atelier devoted to a singular thesis: photographs should feel like museum objects, not fleeting online pixels.
                </p>
                <p>
                  Over eight years of commissions, Studioza has photographed grand multi-day royal unions, ancient mountain fortresses, and intimate legacy portraits across the globe. We maintain a deliberately small annual roster—capping our private commissions at twelve per calendar year—to ensure every frame receives weeks of darkroom attention and personal curatorial oversight.
                </p>
                <p>
                  Our work is grounded in 80% artistic intuition and 20% technical perfection. We do not pose our subjects into stiff artificialities; rather, we orchestrate serene environments where character emerges with natural dignity.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-[#D9D5CE] type-meta text-xs">
                <div>
                  <span className="text-[#77736D] block text-[10px] mb-1">FOUNDED</span>
                  <span className="text-[#151515] font-semibold text-sm">2018</span>
                </div>
                <div>
                  <span className="text-[#77736D] block text-[10px] mb-1">ANNUAL COMMISSIONS</span>
                  <span className="text-[#151515] font-semibold text-sm">Strictly 12</span>
                </div>
                <div>
                  <span className="text-[#77736D] block text-[10px] mb-1">ARCHIVAL LIFE</span>
                  <span className="text-[#151515] font-semibold text-sm">150+ Years</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Philosophy & Working Method */}
        <section className="bg-[#171717] text-[#F4F1EB] py-24 mb-28">
          <div className="px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
            <div className="max-w-3xl space-y-4">
              <span className="type-meta text-[#A39E96]">OUR PHILOSOPHY</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal leading-tight">
                The Sacred Discipline of Stillness
              </h2>
              <p className="type-body text-[#A39E96]">
                Modern cameras take 30 frames a second, encouraging photographers to shoot blindly and sort later. We believe in the opposite: looking through ground glass for thirty minutes before touching the shutter once.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
              <div className="space-y-4">
                <span className="font-mono text-[#CC5500] text-sm">01 / SOLAR MAPPING</span>
                <h3 className="font-serif text-2xl text-white">Celestial Dialogue</h3>
                <p className="type-small text-[#A39E96] leading-relaxed">
                  Before shooting a single frame, we map how shadows fall across your celebration venue from dawn to blue hour. We place key moments where light is most flattering and evocative.
                </p>
              </div>
              <div className="space-y-4">
                <span className="font-mono text-[#CC5500] text-sm">02 / UNHURRIED CAPTURE</span>
                <h3 className="font-serif text-2xl text-white">Discreet Observation</h3>
                <p className="type-small text-[#A39E96] leading-relaxed">
                  We blend into the crowd like invisible historians. We honor ceremony protocols and sacred moments without intrusion, using quiet rangefinders and ambient illumination.
                </p>
              </div>
              <div className="space-y-4">
                <span className="font-mono text-[#CC5500] text-sm">03 / BESPOKE BINDING</span>
                <h3 className="font-serif text-2xl text-white">Tactile Heirloom</h3>
                <p className="type-small text-[#A39E96] leading-relaxed">
                  Each commission concludes not with a download link, but with a custom hand-bound 40x30cm leather and silk monograph crafted in Florence and Jaipur to last across centuries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment & Medium-Format Optics */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="border-b border-[#D9D5CE] pb-8 mb-12">
            <span className="type-meta text-[#77736D] block mb-2">TECHNICAL RIGOR</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#151515] font-normal">
              Equipment Archive
            </h2>
            <p className="type-body text-[#77736D] mt-2 max-w-2xl">
              Tools chosen not for vanity, but for their tonal fidelity, micro-contrast, and timeless optical geometry.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {EQUIPMENT_ARCHIVE.map((group, idx) => (
              <div key={idx} className="space-y-6">
                <h3 className="type-meta text-xs text-[#151515] font-semibold tracking-widest border-b border-[#D9D5CE] pb-2">
                  [{group.category}]
                </h3>
                <div className="space-y-6">
                  {group.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1">
                      <h4 className="font-serif text-xl text-[#151515] font-medium">
                        {item.name}
                      </h4>
                      <p className="type-small text-[#77736D] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Locations (Jaipur, NYC, Milan) */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="border-b border-[#D9D5CE] pb-8 mb-12">
            <span className="type-meta text-[#77736D] block mb-2">GEOGRAPHIC PRESENCE</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#151515] font-normal">
              Atelier Footprint
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ATELIER_LOCATIONS.map((loc, idx) => (
              <div key={idx} className="border border-[#D9D5CE] p-8 bg-[#F4F1EB] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-3xl text-[#151515]">{loc.city}</h3>
                  <MapPin className="w-4 h-4 text-[#CC5500]" />
                </div>
                <span className="type-meta text-xs text-[#CC5500] block">
                  {loc.role}
                </span>
                <p className="type-small text-[#77736D]">
                  {loc.desc}
                </p>
                <div className="pt-4 border-t border-[#D9D5CE] text-[10px] font-mono type-meta text-[#A39E96]">
                  {loc.coordinates}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Press & Selected Clients */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Press */}
            <div className="lg:col-span-6 space-y-6">
              <span className="type-meta text-[#77736D] block">
                PRESS & RECOGNITION
              </span>
              <h3 className="font-serif text-3xl text-[#151515]">
                Critical Reception
              </h3>
              <div className="divide-y divide-[#D9D5CE]">
                {PRESS_RECOGNITION.map((press, idx) => (
                  <div key={idx} className="py-4 space-y-1">
                    <div className="flex justify-between items-center type-meta text-xs text-[#77736D]">
                      <span className="font-semibold text-[#151515]">{press.outlet}</span>
                      <span>{press.year}</span>
                    </div>
                    <p className="font-serif text-lg text-[#151515] italic">
                      &ldquo;{press.title}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Clients */}
            <div className="lg:col-span-6 space-y-6">
              <span className="type-meta text-[#77736D] block">
                SELECTED PATRONS & CLIENTS
              </span>
              <h3 className="font-serif text-3xl text-[#151515]">
                Trust & Heritage
              </h3>
              <ul className="space-y-3 pt-2">
                {SELECTED_CLIENTS.map((client, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 py-2 border-b border-[#D9D5CE]/60 font-serif text-xl text-[#151515]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CC5500]" />
                    <span>{client}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7. Commission CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#171717] text-[#F4F1EB] p-12 sm:p-20 text-center space-y-6 relative overflow-hidden">
            <span className="type-meta text-[#A39E96] text-xs">
              COMMISSION THE ATELIER
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal leading-tight max-w-3xl mx-auto">
              Initiate a dialogue with Aryan Patel & our curatorial team.
            </h2>
            <p className="type-body text-[#A39E96] max-w-xl mx-auto">
              We welcome private inquiries for 2026 and 2027 worldwide celebrations, architectural monographs, and fine-art portraits.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/contact"
                className="bg-[#F4F1EB] text-[#171717] px-8 py-4 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors"
              >
                REQUEST COMMISSION DOSSIER →
              </Link>
              <Link
                href="/booking"
                className="border border-white/20 text-white px-8 py-4 type-meta text-xs hover:border-white transition-colors"
              >
                EXPLORE BOOKING CALENDAR
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
