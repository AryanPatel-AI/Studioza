"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowDownRight, ArrowUpRight, Camera, ArrowRight } from "lucide-react";
import { PROJECTS, STORIES, SERVICES, TESTIMONIALS, getImagePlateInfo } from "@/lib/data/studioData";

export default function AtelierHomepage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const featuredStory = STORIES[0];
  const jaipurProject = PROJECTS[0];
  const kashmirProject = PROJECTS[1];
  const chittorProject = PROJECTS[2];
  const uttarakhandProject = PROJECTS[3];
  const portraitsProject = PROJECTS[6] || PROJECTS[2];

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative overflow-x-hidden">
      <FilmGrain />
      <Navbar />

      <main>
        {/* ========================================================================= */}
        {/* 1. CINEMATIC HERO — MINIMAL, UNCLUTTERED, FULL VIEWPORT                   */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[720px] w-full flex flex-col justify-between overflow-hidden px-6 lg:px-12 select-none"
        >
          {/* Background Photography Layer */}
          <motion.div
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          >
            <Image
              src="/images/Dal_Lake.jpeg"
              alt="Studioza Signature Optical Archive — Dal Lake Expedition"
              fill
              priority
              sizes="100vw"
              quality={100}
              className="object-cover object-center w-full h-full brightness-[0.82] contrast-[1.04]"
            />
            {/* Darkroom Vignette Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
          </motion.div>

          {/* Top Archival Telemetry Strip */}
          <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 sm:pt-36 flex items-center justify-between border-b border-white/15 pb-4 type-meta text-white/70">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9CAF88] animate-pulse" />
              <span className="tracking-widest">VOL. XXVI // JAIPUR · NEW YORK</span>
            </div>
            <div className="hidden md:flex items-center gap-6 tracking-widest text-[11px]">
              <span>DIGITAL PHOTOGRAPHY MAGAZINE</span>
              <span>•</span>
              <span>FINE ART ATELIER</span>
            </div>
            <div className="text-right tracking-widest text-[11px] text-[#CFA570]">
              EST. MMXVIII
            </div>
          </div>

          {/* Hero Centerpiece — Uncluttered, Large Serif */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center text-center my-auto px-4"
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-normal tracking-tight leading-[0.92] max-w-5xl mb-8 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]">
              STORIES WORTH
              <br />
              <span className="italic font-light">REMEMBERING.</span>
            </h1>

            <p className="text-white/85 max-w-xl text-center type-body-l mb-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] font-light">
              An editorial photography platform operating at the intersection of cinematic design, medium-format discipline, and timeless architecture.
            </p>

            <div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-3 bg-white text-[#151515] px-8 py-4 type-meta text-[12px] hover:bg-[#CFA570] hover:text-[#151515] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] group"
              >
                <span>EXPLORE THE FOLIO</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Bottom Hero Baseline Strip */}
          <div className="relative z-10 w-full max-w-7xl mx-auto pb-8 sm:pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/15 pt-4 type-meta text-white/70">
            <div className="flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#CFA570]" />
              <span className="tracking-widest">PLATE 01 // DAL LAKE EXPEDITION</span>
            </div>

            <Link
              href="#statement"
              className="group flex items-center gap-2 tracking-widest hover:text-white transition-colors text-[11px]"
            >
              <span>Scroll to explore</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-[#CFA570] transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <div className="hidden sm:block tracking-widest text-[11px]">
              MEDIUM FORMAT · SILVER HALIDE
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. INTRO STATEMENT — EDITORIAL MANIFESTO                                  */}
        {/* ========================================================================= */}
        <section id="statement" className="py-28 sm:py-36 px-6 lg:px-12 bg-[#F4F1EB] border-b border-[#D9D5CE]">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <span className="type-meta text-[#77736D] block">01 / The Atelier Manifesto</span>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#151515] leading-[1.15] font-normal tracking-tight">
              We believe photography should feel like an heirloom magazine, not ephemeral digital noise.
            </h2>
            <p className="type-body-l text-[#77736D] max-w-2xl mx-auto leading-relaxed">
              Every commission is treated as a historical document. From royal multi-day wedding celebrations in Jaipur to commercial monographs across Europe, we pair unhurried observation with medium-format optics.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SELECTED WORK — DELIBERATELY VARYING EDITORIAL LAYOUT                  */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[#F4F1EB]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D9D5CE] pb-6 gap-4">
              <div>
                <span className="type-meta text-[#77736D] block mb-2">02 / Curated Monograph Series</span>
                <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#151515]">Selected Work</h2>
              </div>
              <Link
                href="/collections"
                className="type-meta text-[#151515] hover:text-[#77736D] transition-colors flex items-center gap-1.5"
              >
                <span>View All Collections</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Curated Editorial Project Grid */}
            <div className="space-y-28">
              {/* MONOGRAPH 01: Royal Citadels of Jaipur (Full Original 3:2 Landscape Form) */}
              <div className="space-y-6">
                <Link href={`/project/${jaipurProject.slug}`} className="group block overflow-hidden">
                  <div className="aspect-[3/2] max-w-6xl mx-auto bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                    <Image
                      src={jaipurProject.coverImage}
                      alt={jaipurProject.name}
                      fill
                      unoptimized
                      quality={100}
                      sizes="100vw"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 lg:left-10 z-10 type-meta text-white/90 text-xs tracking-widest flex items-center gap-3">
                      <span>{jaipurProject.location.toUpperCase()} // {jaipurProject.year}</span>
                      <span>•</span>
                      <span className="text-[#CFA570]">ORIGINAL LANDSCAPE 3:2</span>
                    </div>
                  </div>
                </Link>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-2 border-t border-[#D9D5CE]">
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">MONOGRAPH 01 • {jaipurProject.category.toUpperCase()}</span>
                    <Link href={`/project/${jaipurProject.slug}`}>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#151515] hover:text-[#CFA570] transition-colors">{jaipurProject.name}</h3>
                    </Link>
                    <p className="type-small text-[#77736D] mt-1 max-w-xl">{jaipurProject.subtitle}</p>
                  </div>
                  <Link
                    href={`/project/${jaipurProject.slug}`}
                    className="type-meta text-[#151515] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* MONOGRAPH 02: Kashmir Valley Expedition (Full Original 3:2 Landscape Form) */}
              <div className="space-y-6">
                <Link href={`/project/${kashmirProject.slug}`} className="group block overflow-hidden">
                  <div className="aspect-[3/2] max-w-6xl mx-auto bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                    <Image
                      src={kashmirProject.coverImage}
                      alt={kashmirProject.name}
                      fill
                      unoptimized
                      quality={100}
                      sizes="100vw"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 lg:left-10 z-10 type-meta text-white/90 text-xs tracking-widest flex items-center gap-3">
                      <span>{kashmirProject.location.toUpperCase()} // {kashmirProject.year}</span>
                      <span>•</span>
                      <span className="text-[#CFA570]">ORIGINAL LANDSCAPE 3:2</span>
                    </div>
                  </div>
                </Link>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-2 border-t border-[#D9D5CE]">
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">MONOGRAPH 02 • {kashmirProject.category.toUpperCase()}</span>
                    <Link href={`/project/${kashmirProject.slug}`}>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#151515] hover:text-[#CFA570] transition-colors">{kashmirProject.name}</h3>
                    </Link>
                    <p className="type-small text-[#77736D] mt-1 max-w-xl">{kashmirProject.subtitle}</p>
                  </div>
                  <Link
                    href={`/project/${kashmirProject.slug}`}
                    className="type-meta text-[#151515] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* MONOGRAPH 03: Uttarakhand Sacred Sanctuaries (Full Original 3:2 Landscape Form) */}
              <div className="space-y-6">
                <Link href={`/project/${uttarakhandProject.slug}`} className="group block overflow-hidden">
                  <div className="aspect-[3/2] max-w-6xl mx-auto bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                    <Image
                      src={uttarakhandProject.coverImage}
                      alt={uttarakhandProject.name}
                      fill
                      unoptimized
                      quality={100}
                      sizes="100vw"
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 lg:left-10 z-10 type-meta text-white/90 text-xs tracking-widest flex items-center gap-3">
                      <span>{uttarakhandProject.location.toUpperCase()} // {uttarakhandProject.year}</span>
                      <span>•</span>
                      <span className="text-[#CFA570]">ORIGINAL LANDSCAPE 3:2</span>
                    </div>
                  </div>
                </Link>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-2 border-t border-[#D9D5CE]">
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">MONOGRAPH 03 • {uttarakhandProject.category.toUpperCase()}</span>
                    <Link href={`/project/${uttarakhandProject.slug}`}>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#151515] hover:text-[#CFA570] transition-colors">{uttarakhandProject.name}</h3>
                    </Link>
                    <p className="type-small text-[#77736D] mt-1 max-w-xl">{uttarakhandProject.subtitle}</p>
                  </div>
                  <Link
                    href={`/project/${uttarakhandProject.slug}`}
                    className="type-meta text-[#151515] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* DUAL MONOGRAPHS: Authentic 2:3 Vertical Character & Temple Studies */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
                {/* Chittor Fort Monoliths (Left, 6 cols, Original 2:3 Vertical) */}
                <div className="md:col-span-6 space-y-6">
                  <Link href={`/project/${chittorProject.slug}`} className="group block overflow-hidden">
                    <div className="aspect-[2/3] bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                      <Image
                        src={chittorProject.coverImage}
                        alt={chittorProject.name}
                        fill
                        unoptimized
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 z-10 type-meta text-white/90 text-[11px] tracking-widest">
                        {chittorProject.location} // {chittorProject.year}
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-[#D9D5CE] pt-3 flex justify-between items-start">
                    <div>
                      <span className="type-meta text-[#77736D] block mb-1">MONOGRAPH 04 • {chittorProject.category.toUpperCase()}</span>
                      <Link href={`/project/${chittorProject.slug}`}>
                        <h4 className="font-serif text-2xl sm:text-3xl text-[#151515] hover:text-[#CFA570] transition-colors">{chittorProject.name}</h4>
                      </Link>
                      <p className="type-small text-[#77736D] mt-1">{chittorProject.subtitle}</p>
                    </div>
                    <span className="type-meta text-[#77736D]">{chittorProject.year}</span>
                  </div>
                </div>

                {/* Fine Art Portraits (Right, 6 cols, Original 2:3 Vertical, staggered top) */}
                <div className="md:col-span-6 space-y-6 md:pt-16">
                  <Link href={`/project/${portraitsProject.slug}`} className="group block overflow-hidden">
                    <div className="aspect-[2/3] bg-[#EAE6DE] relative overflow-hidden border border-[#D9D5CE] shadow-sm">
                      <Image
                        src={portraitsProject.coverImage}
                        alt={portraitsProject.name}
                        fill
                        unoptimized
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 z-10 type-meta text-white/90 text-[11px] tracking-widest">
                        {portraitsProject.location} // {portraitsProject.year}
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-[#D9D5CE] pt-3 flex justify-between items-start">
                    <div>
                      <span className="type-meta text-[#77736D] block mb-1">MONOGRAPH 05 • {portraitsProject.category.toUpperCase()}</span>
                      <Link href={`/project/${portraitsProject.slug}`}>
                        <h4 className="font-serif text-2xl sm:text-3xl text-[#151515] hover:text-[#CFA570] transition-colors">{portraitsProject.name}</h4>
                      </Link>
                      <p className="type-small text-[#77736D] mt-1">{portraitsProject.subtitle}</p>
                    </div>
                    <span className="type-meta text-[#77736D]">{portraitsProject.year}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FEATURED STORY — EDITORIAL NARRATIVE (DARK SECTION)                    */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[#171717] text-[#F4F1EB] relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="border-b border-white/10 pb-6 flex justify-between items-end">
              <div>
                <span className="type-meta text-[#CFA570] block mb-2">03 / Featured Editorial Story</span>
                <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal">Fieldwork &amp; Essays</h2>
              </div>
              <Link href="/stories" className="type-meta text-[#A7A7A7] hover:text-white flex items-center gap-1">
                <span>View All Stories</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <Link href={`/stories/${featuredStory.slug}`} className="group block overflow-hidden">
                  <div className="aspect-[3/2] bg-black/40 relative overflow-hidden border border-white/10">
                    <Image
                      src={featuredStory.coverImage}
                      alt={featuredStory.title}
                      fill
                      unoptimized
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain"
                    />
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-4 type-meta text-[#A7A7A7] text-xs">
                  <span>{featuredStory.category}</span>
                  <span>•</span>
                  <span>{featuredStory.readTime}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal leading-tight">
                  <Link href={`/stories/${featuredStory.slug}`} className="hover:text-[#CFA570] transition-colors">
                    {featuredStory.title}
                  </Link>
                </h3>

                <p className="type-body text-[#A7A7A7] leading-relaxed">
                  {featuredStory.excerpt}
                </p>

                <blockquote className="border-l-2 border-[#CFA570] pl-6 italic font-serif text-lg text-white/90">
                  &ldquo;{featuredStory.quote}&rdquo;
                </blockquote>

                <div className="pt-4">
                  <Link
                    href={`/stories/${featuredStory.slug}`}
                    className="inline-flex items-center gap-2 type-meta text-[#CFA570] hover:text-white transition-colors"
                  >
                    <span>Read Complete Monograph Essay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. SERVICES & DISCIPLINES                                                 */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[#F4F1EB] border-b border-[#D9D5CE]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#D9D5CE] pb-6 gap-4">
              <div>
                <span className="type-meta text-[#77736D] block mb-2">04 / Creative Disciplines</span>
                <h2 className="font-serif text-4xl sm:text-6xl text-[#151515] font-normal">Services</h2>
              </div>
              <Link href="/services" className="type-meta text-[#151515] hover:text-[#77736D] flex items-center gap-1">
                <span>Detailed Deliverables &amp; Process</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service, idx) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white p-8 border border-[#D9D5CE] hover:border-[#151515] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="type-meta text-[#77736D]">0{idx + 1}</span>
                      <span className="type-meta text-[#CFA570] text-[11px] font-medium">{service.startingPrice}</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#151515] group-hover:text-[#77736D] transition-colors">
                      {service.name}
                    </h3>
                    <p className="type-small text-[#77736D] leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  <div className="pt-8 border-t border-[#D9D5CE]/60 flex items-center justify-between type-meta text-xs">
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. STUDIO PHILOSOPHY — PERSONAL CRAFT & FOUNDER SPOTLIGHT                 */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[#F4F1EB]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[2/3] relative overflow-hidden border border-[#D9D5CE] shadow-sm bg-[#EAE6DE]">
                  <Image
                    src="/images/aryan-patel-temple-monochrome.jpg"
                    alt="Aryan Patel — Creative Director & Principal Photographer"
                    fill
                    priority
                    unoptimized
                    quality={100}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between type-meta text-[11px] text-[#77736D] px-1">
                  <span>PLATE 05 // ARYAN PATEL</span>
                  <span>CHITTORGARH FORT, RAJASTHAN</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <span className="type-meta text-[#77736D]">05 / Philosophy &amp; Craft</span>
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#151515] font-normal leading-tight">
                  Aryan Patel
                </h2>
                <p className="type-body-l text-[#77736D] leading-relaxed">
                  Founder and principal lens at Studioza. Trained in medium-format analog view cameras, Aryan blends historical architectural research with contemporary editorial lighting across Rajasthan and international capitals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#D9D5CE]">
                  <div className="space-y-1">
                    <span className="type-meta text-[#151515] font-semibold block">Unhurried Time</span>
                    <p className="type-small text-[#77736D]">Allowing human emotion to unfold without artificial stage directions.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="type-meta text-[#151515] font-semibold block">Medium Format</span>
                    <p className="type-small text-[#77736D]">100MP optical sensors and 120 film sheet fidelity for museum prints.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="type-meta text-[#151515] font-semibold block">Natural Light</span>
                    <p className="type-small text-[#77736D]">Honoring desert celestial paths, morning gold, and twilight shadows.</p>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-6">
                  <Link
                    href="/studio"
                    className="bg-[#151515] text-[#F4F1EB] px-8 py-3.5 type-meta text-[11px] hover:bg-[#333333] transition-colors"
                  >
                    Read Atelier Story
                  </Link>
                  <Link
                    href="/contact"
                    className="type-meta text-[#151515] hover:underline"
                  >
                    Direct Inquiries →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. FEATURED GALLERY — PHOTOGRAPHIC PLATES EXHIBITION                      */}
        {/* ========================================================================= */}
        <section className="py-24 px-6 lg:px-12 bg-[#EAE6DE] border-y border-[#D9D5CE]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end border-b border-[#D9D5CE] pb-4">
              <div>
                <span className="type-meta text-[#77736D] block">06 / Exhibition</span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#151515]">Plates &amp; Fragments</h3>
              </div>
              <span className="type-meta text-[#77736D]">MEDIUM FORMAT SAMPLES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { src: "/images/aryan-patel-sheesh-mahal.jpg", title: "Convex Mosaic Inlay", sub: "Sheesh Mahal, Amber Fort" },
                { src: "/images/palace-arch-courtyard.jpg", title: "Fluted Scalloped Archways", sub: "Nahargarh Fort, Jaipur" },
                { src: "/images/temple-shikhara-oleander.jpg", title: "Flora & Monolithic Spire", sub: "Chittorgarh Fort, Rajasthan" },
                { src: "/images/5A9200AE-C6BF-4275-8C64-49875EC857D0.jpg", title: "Ceremonial Oil Diya", sub: "Diwali Evening, Uttar Pradesh" },
              ].map((plate, index) => {
                const plateInfo = getImagePlateInfo(plate.src);
                return (
                  <div key={index} className="space-y-3 group">
                    <div className={`${plateInfo.aspectClass} relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE]`}>
                      <Image
                        src={plate.src}
                        alt={plate.title}
                        fill
                        unoptimized
                        quality={100}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  <div className="border-t border-[#D9D5CE] pt-2">
                    <h5 className="font-serif text-lg text-[#151515]">{plate.title}</h5>
                    <p className="type-meta text-xs text-[#77736D]">{plate.sub}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. TESTIMONIALS                                                           */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[#F4F1EB]">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="type-meta text-[#77736D]">07 / Voices &amp; Praise</span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#151515] font-normal">What Patrons Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-8 border border-[#D9D5CE] space-y-6 flex flex-col justify-between"
                >
                  <p className="font-serif italic text-lg sm:text-xl text-[#151515] leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="border-t border-[#D9D5CE] pt-4">
                    <span className="font-medium text-sm text-[#151515] block">{t.clientName}</span>
                    <span className="type-meta text-[#77736D] text-[11px] block">{t.clientRole} — {t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. JOURNAL / FIELDWORK STORIES SUMMARY                                    */}
        {/* ========================================================================= */}
        <section className="py-24 px-6 lg:px-12 bg-[#F4F1EB] border-t border-[#D9D5CE]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex justify-between items-end border-b border-[#D9D5CE] pb-6">
              <div>
                <span className="type-meta text-[#77736D] block mb-2">08 / The Journal</span>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#151515]">Field Notes &amp; Writings</h2>
              </div>
              <Link href="/journal" className="type-meta text-[#151515] hover:underline flex items-center gap-1">
                <span>All Journal Articles</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STORIES.map((s) => {
                const plateInfo = getImagePlateInfo(s.coverImage);
                return (
                  <Link
                    key={s.slug}
                    href={`/stories/${s.slug}`}
                    className="group space-y-4 block"
                  >
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] p-3 flex items-center justify-center ${plateInfo.aspectClass} ${plateInfo.isLandscape ? "w-full" : "max-w-xs mx-auto"}`}>
                      <Image
                        src={s.coverImage}
                        alt={s.title}
                        fill
                        unoptimized
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-2"
                      />
                    </div>
                    <div>
                      <span className="type-meta text-[#77736D] text-[11px]">{s.date} • {s.category}</span>
                      <h4 className="font-serif text-2xl text-[#151515] group-hover:text-[#77736D] transition-colors mt-1">
                        {s.title}
                      </h4>
                      <p className="type-small text-[#77736D] line-clamp-2 mt-1">
                        {s.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CALL TO ACTION (CTA)                                                  */}
        {/* ========================================================================= */}
        <section className="py-36 px-6 lg:px-12 bg-[#171717] text-white text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <span className="type-meta text-[#CFA570] block">09 / Begin a Commission</span>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05]">
              Let&apos;s create something worth remembering.
            </h2>
            <p className="type-body-l text-[#A39E96] max-w-xl mx-auto">
              We collaborate with couples, curators, and brands seeking enduring photographic works anchored in stillness and light.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto bg-[#F4F1EB] text-[#151515] px-10 py-4 type-meta text-[12px] hover:bg-[#CFA570] hover:text-[#151515] transition-colors"
              >
                Start Commission Dossier →
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-white/30 text-white px-8 py-4 type-meta text-[12px] hover:bg-white/10 transition-colors"
              >
                Inquire Directly
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
