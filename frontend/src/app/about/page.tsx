import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Header & Studio Statement */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="border-b border-[#D9D5CE] pb-12 space-y-6">
            <span className="type-meta text-[#77736D]">04 // The Atelier</span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515] leading-[0.95]">
              We make things worth remembering.
            </h1>
            <p className="type-body-l text-[#77736D] max-w-3xl">
              Studioza is an independent photography atelier and digital magazine operating at the intersection of cinematic observation, medium-format discipline, and timeless architecture.
            </p>
          </div>
        </section>

        {/* Founder Portrait & Letter */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <div className="aspect-[2/3] max-w-lg mx-auto bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                <Image
                  src="/images/aryan-patel-pillared-court.jpg"
                  alt="Aryan Patel — Founder & Principal Lens"
                  fill
                  priority
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <p className="type-meta text-[#77736D] text-[11px] pt-3 text-center tracking-widest">
                ARYAN PATEL · DIWAN-E-AAM, AMBER FORT, JAIPUR
              </p>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="type-meta text-[#77736D]">Personal Letter</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] font-normal leading-snug">
                &ldquo;Photography should not be hurried. When you give light and space time to breathe, the true character of people and places emerges.&rdquo;
              </h2>
              <p className="type-body text-[#77736D] leading-relaxed">
                I founded Studioza out of dissatisfaction with the frantic pace of modern digital image-making. Too many celebrations and architectural projects are treated like content churn—hurried through artificial shot lists and smothered in synthetic color presets.
              </p>
              <p className="type-body text-[#77736D] leading-relaxed">
                Instead, our studio returns to the reverence of medium format cameras and historical view cameras. We wait for the sun to hit the sandstone at the exact right angle. We photograph the silence between vows, the laughter in dimly lit corridors, and the geological weight of stone battlements.
              </p>
              <div className="pt-2">
                <span className="font-serif italic text-2xl text-[#151515] block">Aryan Patel</span>
                <span className="type-meta text-[#77736D] text-[11px]">Creative Director &amp; Principal Photographer</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Studio Story & Evolution */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-28">
          <div className="border-t border-b border-[#D9D5CE] py-16 space-y-8">
            <span className="type-meta text-[#77736D]">The Genesis</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#151515]">
              From Rajasthan&apos;s Desert Fortresses to Global Commissions
            </h3>
            <div className="space-y-6 type-body text-[#77736D] leading-relaxed">
              <p>
                Studioza was conceived in 2018 in Jaipur, surrounded by 300-year-old carved marble courtyards and rugged Aravalli ridges. What began as an analog field study documenting heritage architectural conservation rapidly evolved into an internationally commissioned atelier.
              </p>
              <p>
                Today, our studio is split between our primary darkroom atelier in Jaipur and our production base in New York. We undertake no more than 12 wedding monographs and 8 architectural/editorial campaigns per calendar year, dedicating weeks of bespoke color-grading and hand-binding to every commission.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Studio Philosophy Pillars */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="type-meta text-[#77736D]">Core Tenets</span>
              <h3 className="font-serif text-4xl text-[#151515]">The Three Studio Pillars</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-white border border-[#D9D5CE] space-y-4">
                <span className="font-serif text-3xl text-[#151515]">01</span>
                <h4 className="font-serif text-2xl text-[#151515]">Unhurried Observation</h4>
                <p className="type-small text-[#77736D] leading-relaxed">
                  We never force synthetic poses or artificial choreography. We observe with quiet reverence, allowing genuine human intimacy and spatial poetry to reveal themselves naturally.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#D9D5CE] space-y-4">
                <span className="font-serif text-3xl text-[#151515]">02</span>
                <h4 className="font-serif text-2xl text-[#151515]">Optical Purity</h4>
                <p className="type-small text-[#77736D] leading-relaxed">
                  We reject software smoothing, artificial AI sharpening, and generic presets. We rely on medium-format optics (100MP+) and authentic silver halide sheet film developed by hand.
                </p>
              </div>

              <div className="p-8 bg-white border border-[#D9D5CE] space-y-4">
                <span className="font-serif text-3xl text-[#151515]">03</span>
                <h4 className="font-serif text-2xl text-[#151515]">The Physical Monograph</h4>
                <p className="type-small text-[#77736D] leading-relaxed">
                  Photographs belong on archival cotton paper, bound in linen and leather, not trapped on disappearing cloud drives. Every major commission culminates in an heirloom book.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Experience & Statistics */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="bg-[#171717] text-white p-12 lg:p-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              <div className="pt-4 lg:pt-0 space-y-2">
                <span className="font-serif text-5xl sm:text-6xl text-white">10+</span>
                <span className="type-meta text-[#A39E96] block text-xs">Years of Atelier Craft</span>
              </div>
              <div className="pt-4 lg:pt-0 space-y-2">
                <span className="font-serif text-5xl sm:text-6xl text-white">150+</span>
                <span className="type-meta text-[#A39E96] block text-xs">Commissioned Monographs</span>
              </div>
              <div className="pt-4 lg:pt-0 space-y-2">
                <span className="font-serif text-5xl sm:text-6xl text-white">12</span>
                <span className="type-meta text-[#A39E96] block text-xs">Countries Traversed</span>
              </div>
              <div className="pt-4 lg:pt-0 space-y-2">
                <span className="font-serif text-5xl sm:text-6xl text-[#CC5500]">12</span>
                <span className="type-meta text-[#A39E96] block text-xs">Annual Commissions Limit</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Awards & Publications */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-28">
          <div className="space-y-8">
            <span className="type-meta text-[#77736D]">Editorial Recognition</span>
            <h3 className="font-serif text-4xl text-[#151515]">Publications &amp; Honours</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#D9D5CE] pt-6">
              {[
                ["British Journal of Photography", "Editorial Feature on Heritage Monograph Craft"],
                ["Vogue India", "Cover & Feature for Heritage Textile Campaign"],
                ["Architectural Digest", "Photographic Portfolio: Desert Fortresses of Amber"],
                ["Hasselblad Masters Shortlist", "Nominee in Architecture & Fine Art Category"],
                ["Harper's Bazaar", "Destination Wedding Feature at Rambagh Palace"],
                ["Conde Nast Traveller", "Visual Guide to Rajasthan High-Desert Twilight"],
              ].map(([pub, note], i) => (
                <div key={i} className="p-6 bg-white border border-[#D9D5CE] space-y-1">
                  <h4 className="font-serif text-xl text-[#151515]">{pub}</h4>
                  <p className="type-small text-[#77736D]">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Studio Team */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          {/* Atelier Principal */}
          <div className="space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="type-meta text-[#77736D]">The Principal Artist</span>
              <h3 className="font-serif text-4xl text-[#151515]">Aryan Patel</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="md:col-span-5">
                <div className="aspect-[3/4] bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE]">
                  <Image
                    src="/images/aryan-patel-pillared-court.jpg"
                    alt="Aryan Patel"
                    fill
                    quality={100}
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-6">
                <div>
                  <span className="type-meta text-[#77736D] text-[11px] block">FOUNDER &amp; PRINCIPAL PHOTOGRAPHER</span>
                  <h4 className="font-serif text-3xl sm:text-4xl text-[#151515] mt-1">Aryan Patel</h4>
                </div>
                <p className="type-body text-[#555] leading-relaxed">
                  Directing every commission personally, Aryan Patel combines an architect&apos;s sensitivity to volume and light with an editorial photojournalist&apos;s instinct for unforced human emotion. Rather than relying on rigid choreography, his fieldwork prioritizes patient observation, medium-format discipline, and timeless monochrome and tonal nuance.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#D9D5CE]">
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">MEDIUM</span>
                    <p className="font-serif text-lg text-[#151515]">Phase One &amp; 120 Film</p>
                  </div>
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">BASE &amp; FIELDWORK</span>
                    <p className="font-serif text-lg text-[#151515]">Jaipur · Worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#171717] text-white p-12 lg:p-20 text-center space-y-6">
            <span className="type-meta text-[#CC5500]">Commission Dialogue</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal">
              Let&apos;s create something worth remembering.
            </h2>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="bg-[#F4F1EB] text-[#151515] px-8 py-3.5 type-meta text-xs hover:bg-white transition-colors"
              >
                Start Booking Questionnaire →
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 text-white px-8 py-3.5 type-meta text-xs hover:bg-white/10 transition-colors"
              >
                Direct Inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
