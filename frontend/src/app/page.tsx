"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ArrowDownRight, ArrowUpRight, Camera } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } },
};

export default function AtelierHomepage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Cinematic Parallax Physics
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const headline = "WE MAKE THINGS WORTH REMEMBERING".split(" ");

  return (
    <div className="min-h-screen bg-[var(--bg-deep-night)] text-[var(--ink-inverse)] selection:bg-[var(--accent-muted-gold)] selection:text-[var(--bg-near-black)] relative overflow-x-hidden font-sans">
      <FilmGrain />
      <Navbar />

      <main>
        {/* ========================================================================= */}
        {/* HERO SECTION — SIGNATURE PHOTOGRAPHER & MOUNTAIN RANGES VISUAL            */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[720px] w-full flex flex-col justify-between overflow-hidden px-6 lg:px-12 select-none"
        >
          {/* Master Photography Background Layer */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="absolute inset-0 w-full h-full z-0 overflow-hidden"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/hero-photographer-mountains.jpg"
                alt="Studioza Signature Optical Archive — Photographer on Mountain Summit"
                fill
                priority
                sizes="100vw"
                quality={90}
                className="object-cover object-[center_32%] sm:object-center w-full h-full filter brightness-[0.72] contrast-[1.08] saturate-[1.08]"
              />
            </div>

            {/* Darkroom Vignette & Atmospheric Contrast Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-near-black)]/75 via-transparent to-[var(--bg-deep-night)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep-night)] via-[var(--bg-deep-night)]/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-deep-night)]/40 via-transparent to-[var(--bg-deep-night)]/40 pointer-events-none" />
          </motion.div>

          {/* Top Archival Telemetry Strip */}
          <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 sm:pt-36 flex items-center justify-between border-b border-[rgba(247,245,240,0.12)] pb-4 type-meta text-[var(--ink-inverse-muted)]">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-muted-gold)] animate-pulse" />
              <span className="tracking-widest uppercase">VOL. XXVI // 40.7228° N, 74.0015° W</span>
            </div>
            <div className="hidden md:flex items-center gap-6 tracking-widest uppercase text-[11px]">
              <span>MEDIUM FORMAT ARCHIVAL</span>
              <span>•</span>
              <span>SILVER HALIDE DISCIPLINE</span>
            </div>
            <div className="text-right tracking-widest uppercase text-[11px] text-[var(--accent-muted-gold)]">
              EST. MMXVIII
            </div>
          </div>

          {/* Hero Centerpiece Typography */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center items-center text-center my-auto px-4"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center gap-x-3.5 sm:gap-x-5 gap-y-2 mb-8 max-w-5xl"
            >
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  variants={letterVariant}
                  className="type-display-hero text-[var(--bg-warm-ivory)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] tracking-[-0.02em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
              className="text-[var(--bg-warm-ivory)]/90 max-w-2xl text-center type-body-lead mb-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              An independent creative studio operating at the intersection of cinematic design, digital architecture, and analog photographic discipline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <Link href="#work">
                <MagneticButton
                  variant="primary"
                  className="bg-[var(--accent-muted-gold)] text-[var(--bg-near-black)] border-[var(--accent-muted-gold)] hover:bg-[var(--accent-dark-bronze)] hover:border-[var(--accent-dark-bronze)] px-8 py-3.5 shadow-[0_8px_32px_rgba(207,165,112,0.25)]"
                >
                  Explore Selected Work
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>

          {/* Bottom Hero Baseline Telemetry & Scroll Cue */}
          <div className="relative z-10 w-full max-w-7xl mx-auto pb-8 sm:pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(247,245,240,0.12)] pt-4 type-meta text-[var(--ink-inverse-muted)]">
            <div className="flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[var(--accent-muted-gold)]" />
              <span className="tracking-widest uppercase">PLATE 01 // ALPINE SUMMIT OBSERVATORY</span>
            </div>

            <Link
              href="#work"
              className="group flex items-center gap-2 tracking-widest uppercase hover:text-[var(--bg-warm-ivory)] transition-colors text-[11px]"
            >
              <span>Scroll to explore</span>
              <ArrowDownRight className="w-3.5 h-3.5 text-[var(--accent-muted-gold)] transition-transform duration-500 group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <div className="hidden sm:block tracking-widest uppercase text-[11px]">
              MILAN • NEW YORK • TOKYO
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SELECTED WORK SECTION — AUTHENTIC ATELIER MONOGRAPHS                      */}
        {/* ========================================================================= */}
        <section
          id="work"
          className="py-32 px-6 lg:px-12 bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative border-t border-[var(--border-medium)]"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-20 flex justify-between items-end border-b border-[var(--border-light)] pb-6"
            >
              <div>
                <span className="type-meta text-[var(--ink-muted)] block mb-2">01 / Curated Monograph Series</span>
                <h2 className="type-display-title">Selected Work</h2>
              </div>
              <Link href="/work" className="type-meta text-[var(--ink-muted)] hover:text-[var(--accent-dark-bronze)] transition-colors flex items-center gap-1">
                <span>View Complete Index</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Asymmetric Curated Gallery of Real Works */}
            <div className="space-y-32">
              {/* Monograph 00: Monumental Mountain Citadel (Topographic Architecture Feature) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-8"
              >
                <Link href="/work/hilltop-citadel" className="group block">
                  <div className="aspect-[16/9] lg:aspect-[21/9] bg-[var(--bg-slate)] relative overflow-hidden">
                    <Image
                      src="/images/hilltop-fortress-crest.jpg"
                      alt="Jaigarh Mountain Citadel — Aravalli Escarpment & Diwa Burj"
                      fill
                      priority
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep-night)]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-6 left-6 lg:left-12 z-10 type-meta text-[var(--bg-warm-ivory)]/90 tracking-widest uppercase text-xs">
                      CHEEL KA TEELA // 648M ELEVATION • OVERCAST MONSOON TRANSITION
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-2 border-t border-[var(--border-light)]">
                  <div>
                    <span className="type-meta text-[var(--accent-dark-bronze)] block mb-1">PLATE 00 • TOPOGRAPHICAL CITADEL</span>
                    <h3 className="type-display-title text-[var(--ink-primary)]">
                      Jaigarh Mountain Citadel
                    </h3>
                    <p className="type-body-base text-[var(--ink-muted)] mt-1 max-w-xl">
                      Massive stone bastions and the Diwa Burj watchtower crowning the rugged Aravalli ridge, capturing raw geological elevation under brooding skies.
                    </p>
                  </div>
                  <Link
                    href="/work/hilltop-citadel"
                    className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>

              {/* Monograph 01: Amer Citadel Archway (Large Feature) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
              >
                <div className="md:col-span-8">
                  <Link href="/work/amer-citadel" className="group block">
                    <div className="aspect-[4/5] sm:aspect-[16/11] bg-[var(--bg-slate)] relative overflow-hidden">
                      <Image
                        src="/images/palace-arch-courtyard.jpg"
                        alt="Amer Citadel — Chiaroscuro Archway & Courtyard"
                        fill
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </div>
                  </Link>
                </div>
                <div className="md:col-span-4 space-y-4">
                  <span className="type-meta text-[var(--accent-dark-bronze)]">PLATE 01 • JAIPUR</span>
                  <h3 className="type-display-statement text-[var(--ink-primary)]">
                    Amer Citadel Study
                  </h3>
                  <p className="type-body-base text-[var(--ink-muted)]">
                    A deep chiaroscuro framing through monumental Rajasthani masonry, capturing courtyard geometry under natural high-noon tungsten light.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/work/amer-citadel"
                      className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors inline-flex items-center gap-1.5 uppercase"
                    >
                      <span>Inspect Plate</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Split Monograph: Shikhara Temple & Courtyard Living Heritage */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Temple Shikhara & Oleander */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="md:col-span-6 flex flex-col gap-6"
                >
                  <Link href="/work/temple-shikhara" className="group block">
                    <div className="aspect-[3/4] bg-[var(--bg-slate)] relative overflow-hidden">
                      <Image
                        src="/images/temple-shikhara-oleander.jpg"
                        alt="Shikhara & Oleander Bloom — Nagara Architecture and Flora"
                        fill
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </div>
                    <div className="flex justify-between items-start mt-6">
                      <div>
                        <span className="type-meta text-[var(--accent-dark-bronze)] block mb-1">PLATE 02 • SACRED FLORA</span>
                        <h3 className="type-display-statement mb-1 group-hover:text-[var(--accent-dark-bronze)] transition-colors">
                          Shikhara &amp; Oleander
                        </h3>
                        <p className="type-body-base text-[var(--ink-muted)]">Carved stone spire softened by wild blooming oleander.</p>
                      </div>
                      <span className="type-meta">2026</span>
                    </div>
                  </Link>
                </motion.div>

                {/* Ochre Palace Courtyard Scale */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="md:col-span-6 flex flex-col gap-6 md:mt-24"
                >
                  <Link href="/work/courtyard-scale" className="group block">
                    <div className="aspect-[3/4] bg-[var(--bg-slate)] relative overflow-hidden">
                      <Image
                        src="/images/ochre-palace-courtyard-scale.jpg"
                        alt="Ochre Palace Courtyard Scale — Living Architectural Heritage"
                        fill
                        className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </div>
                    <div className="flex justify-between items-start mt-6">
                      <div>
                        <span className="type-meta text-[var(--accent-dark-bronze)] block mb-1">PLATE 03 • LIVING HERITAGE</span>
                        <h3 className="type-display-statement mb-1 group-hover:text-[var(--accent-dark-bronze)] transition-colors">
                          Courtyard Scale
                        </h3>
                        <p className="type-body-base text-[var(--ink-muted)]">Terracotta facades &amp; human volume under sunlight.</p>
                      </div>
                      <span className="type-meta">2026</span>
                    </div>
                  </Link>
                </motion.div>
              </div>

              {/* Monograph: Panoramic Sandstone Palace Domes */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="space-y-8"
              >
                <Link href="/work/sandstone-domes" className="group block">
                  <div className="aspect-[16/9] lg:aspect-[21/9] bg-[var(--bg-slate)] relative overflow-hidden">
                    <Image
                      src="/images/sandstone-palace-domes.jpg"
                      alt="Sandstone Palace Domes — Heritage Geometry & Sky"
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                    />
                  </div>
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-2 border-t border-[var(--border-light)]">
                  <div>
                    <span className="type-meta text-[var(--accent-dark-bronze)] block mb-1">PLATE 04 • AMBER</span>
                    <h3 className="type-display-title text-[var(--ink-primary)]">
                      Sandstone Palace Domes
                    </h3>
                    <p className="type-body-base text-[var(--ink-muted)] mt-1 max-w-xl">
                      Curvilinear Bangaldar pavilions and carved sandstone chhatris resting under atmospheric turquoise heavens.
                    </p>
                  </div>
                  <Link
                    href="/work/sandstone-domes"
                    className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>

              {/* Monograph: Fort Ramparts & High Ridge */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end"
              >
                <div className="md:col-span-8 order-2 md:order-1 space-y-4">
                  <span className="type-meta text-[var(--accent-dark-bronze)]">PLATE 05 • JAIGARH RIDGE</span>
                  <h3 className="type-display-statement text-[var(--ink-primary)]">
                    Fort Ramparts &amp; High Ridge
                  </h3>
                  <p className="type-body-base text-[var(--ink-muted)] max-w-lg">
                    Ancient stepped ramparts and historic rainwater harvesting infrastructure snaking across rugged mountain topography.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/work/fort-ramparts"
                      className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors inline-flex items-center gap-1.5 uppercase tracking-widest"
                    >
                      <span>Inspect Plate</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="md:col-span-4 order-1 md:order-2">
                  <Link href="/work/fort-ramparts" className="group block">
                    <div className="aspect-[3/4] bg-[var(--bg-slate)] relative overflow-hidden">
                      <Image
                        src="/images/fort-ramparts-overlook.jpg"
                        alt="Jaigarh Fort Ramparts Overlook — Territorial Architecture"
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ATELIER FOUNDER & FIELD EXPEDITIONS SPOTLIGHT                             */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[var(--bg-midnight-blue)] text-[var(--ink-inverse)] border-t border-[rgba(247,245,240,0.1)]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="lg:col-span-5"
              >
                <div className="aspect-[3/4] relative overflow-hidden border border-[rgba(247,245,240,0.15)] shadow-2xl">
                  <Image
                    src="/images/aryan-patel-portrait.jpg"
                    alt="Aryan Patel — Creative Director & Photographer"
                    fill
                    className="object-cover object-top w-full h-full filter contrast-[1.04]"
                  />
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="lg:col-span-7 space-y-8 lg:pl-12"
              >
                <span className="type-meta text-[var(--accent-muted-gold)]">02 / Behind the Lens</span>
                <h2 className="type-display-title text-[var(--bg-warm-ivory)]">
                  Aryan Patel
                </h2>
                <p className="type-body-lead text-[var(--ink-inverse-muted)] leading-relaxed">
                  Founder, art director, and photographer at Studioza. Blending traditional large-format discipline, heritage architectural observation, and modern digital engineering across Rajasthan.
                </p>
                <blockquote className="border-l-2 border-[var(--accent-muted-gold)] pl-6 text-lg sm:text-xl font-serif italic text-[var(--bg-warm-ivory)]">
                  &ldquo;Every plate is an unhurried encounter with space, scale, and natural illumination.&rdquo;
                </blockquote>
                <div className="pt-4 flex items-center gap-6">
                  <Link href="/studio">
                    <MagneticButton variant="dark">Read Atelier Story</MagneticButton>
                  </Link>
                  <Link href="/contact" className="type-meta text-[var(--accent-muted-gold)] hover:underline uppercase tracking-widest">
                    Commission Direct →
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Field Expedition Studies 4-Plate Series */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="border-t border-[rgba(247,245,240,0.12)] pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <div className="space-y-4 group">
                <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-deep-night)] border border-[rgba(247,245,240,0.1)]">
                  <Image
                    src="/images/aryan-patel-pillared-court.jpg"
                    alt="Field Study — Diwan-i-Aam Pillared Colonnade"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                  />
                </div>
                <div>
                  <span className="type-meta text-[var(--accent-muted-gold)] block">STUDY 01 • PROPORTION</span>
                  <h4 className="type-display-statement text-base sm:text-lg text-[var(--bg-warm-ivory)]">Pillared Colonnade</h4>
                  <p className="text-xs text-[var(--ink-inverse-muted)] mt-1">Diwan-i-Aam sandstone brackets &amp; perspective.</p>
                </div>
              </div>

              <div className="space-y-4 group">
                <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-deep-night)] border border-[rgba(247,245,240,0.1)]">
                  <Image
                    src="/images/aryan-patel-archway.jpg"
                    alt="Field Study — Palace Archway Perspective"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                  />
                </div>
                <div>
                  <span className="type-meta text-[var(--accent-muted-gold)] block">STUDY 02 • SPATIAL VOID</span>
                  <h4 className="type-display-statement text-base sm:text-lg text-[var(--bg-warm-ivory)]">Palace Archway</h4>
                  <p className="text-xs text-[var(--ink-inverse-muted)] mt-1">Receding chambers &amp; chiaroscuro shadow.</p>
                </div>
              </div>

              <div className="space-y-4 group">
                <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-deep-night)] border border-[rgba(247,245,240,0.1)]">
                  <Image
                    src="/images/aryan-patel-sheesh-mahal.jpg"
                    alt="Field Study — Sheesh Mahal Convex Mirror Glass"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                  />
                </div>
                <div>
                  <span className="type-meta text-[var(--accent-muted-gold)] block">STUDY 03 • MATERIALITY</span>
                  <h4 className="type-display-statement text-base sm:text-lg text-[var(--bg-warm-ivory)]">Mirror Mosaic Hall</h4>
                  <p className="text-xs text-[var(--ink-inverse-muted)] mt-1">Convex glass inlays catching ambient light.</p>
                </div>
              </div>

              <div className="space-y-4 group">
                <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-deep-night)] border border-[rgba(247,245,240,0.1)]">
                  <Image
                    src="/images/aryan-patel-temple-monochrome.jpg"
                    alt="Field Study — Monolithic Temple Shikhara"
                    fill
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)] grayscale"
                  />
                </div>
                <div>
                  <span className="type-meta text-[var(--accent-muted-gold)] block">STUDY 04 • MONOCHROME</span>
                  <h4 className="type-display-statement text-base sm:text-lg text-[var(--bg-warm-ivory)]">Stone Temple Spire</h4>
                  <p className="text-xs text-[var(--ink-inverse-muted)] mt-1">Monolithic Nagara carving &amp; weathering.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DISCIPLINES SECTION                                                       */}
        {/* ========================================================================= */}
        <section className="py-32 px-6 lg:px-12 bg-[var(--bg-slate)] text-[var(--ink-inverse)] border-t border-[rgba(247,245,240,0.1)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mb-20 flex justify-between items-end border-b border-[rgba(247,245,240,0.15)] pb-6"
            >
              <h2 className="type-display-title text-[var(--bg-warm-ivory)]">Disciplines</h2>
              <span className="type-meta text-[var(--ink-inverse-muted)]">03 / Services &amp; Capabilities</span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  title: "Digital Experiences",
                  desc: "Interactive web installations, digital monographs, and online platforms engineered with responsive spatial kinetics and zero synthetic smoothing.",
                },
                {
                  title: "Brand Systems",
                  desc: "Comprehensive visual identities, editorial publications, and typography guidelines anchored in deep historical and architectural research.",
                },
                {
                  title: "Creative Tech",
                  desc: "Custom high-performance software frameworks, WebGL visualizers, and digital archives designed for longevity, speed, and sensory poise.",
                },
                {
                  title: "Photography",
                  desc: "Classical darkroom discipline, medium-format digital capture (100MP+), and archival pigment mastery for landmark cultural and commercial commissions.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: index * 0.1 } },
                  }}
                  className="group cursor-default"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[var(--accent-muted-gold)] type-meta">0{index + 1}</span>
                    <h3 className="type-display-statement text-[var(--bg-warm-ivory)] group-hover:text-[var(--accent-muted-gold)] transition-colors duration-400">
                      {service.title}
                    </h3>
                  </div>
                  <p className="type-body-base text-[var(--ink-inverse-muted)] max-w-sm ml-8">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* COMMISSION / CONTACT CTA SECTION                                          */}
        {/* ========================================================================= */}
        <section className="py-40 px-6 lg:px-12 bg-[var(--bg-deep-night)] text-[var(--ink-inverse)] text-center relative overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto relative z-10"
          >
            <motion.h2 variants={fadeIn} className="type-display-title text-[var(--bg-warm-ivory)] mb-8">
              COMMISSION AN INQUIRY
            </motion.h2>
            <motion.p variants={fadeIn} className="type-body-lead text-[var(--ink-inverse-muted)] mb-12">
              We collaborate with institutions, cultural brands, and visionaries who understand that enduring quality requires patience and uncompromising discipline.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link href="/contact">
                <MagneticButton variant="dark">Initiate Dialogue</MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
