"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import Link from "next/link";

const projects = [
  {
    slug: "hilltop-citadel",
    title: "Jaigarh Mountain Citadel",
    category: "Topographical Military Architecture",
    year: "2026",
    location: "Cheel ka Teela, Amber • 648m Elevation",
    img: "/images/hilltop-fortress-crest.jpg",
    desc: "Massive stone bastions and the Diwa Burj watchtower crowning the rugged Aravalli ridge under brooding atmospheric skies.",
    aspect: "aspect-[16/10]",
    layout: "left-dominant",
  },
  {
    slug: "temple-shikhara",
    title: "Shikhara & Oleander Bloom",
    category: "Sacred Epigraphy & Living Flora",
    year: "2026",
    location: "Rajasthan Heritage Corridor • High-Key Illumination",
    img: "/images/temple-shikhara-oleander.jpg",
    desc: "Ancient carved stone Nagara temple spire framed through wild blooming oleander branches and fluttering saffron flag.",
    aspect: "aspect-[3/4]",
    layout: "left-portrait",
  },
  {
    slug: "courtyard-scale",
    title: "Courtyard Scale & Living Heritage",
    category: "Cultural Space & Architectural Scale",
    year: "2026",
    location: "Amber Palace Complex • Terracotta Lime Plaster",
    img: "/images/ochre-palace-courtyard-scale.jpg",
    desc: "Sun-drenched terracotta and mineral ochre walls framing human movement and centuries of architectural volume.",
    aspect: "aspect-[3/4]",
    layout: "right-portrait",
  },
  {
    slug: "amer-citadel",
    title: "Amer Citadel Study",
    category: "Architectural Chiaroscuro",
    year: "2026",
    location: "Amer, Rajasthan • 80mm Medium Format",
    img: "/images/palace-arch-courtyard.jpg",
    desc: "A study in deep spatial shadow, historic Rajasthani masonry, and monumental courtyard geometry.",
    aspect: "aspect-[16/10]",
    layout: "left-dominant",
  },
  {
    slug: "sandstone-domes",
    title: "Sandstone Palace Domes",
    category: "Heritage Geometry & Sky",
    year: "2026",
    location: "Amber Fort • Bangaldar Eaves & Turquoise Sky",
    img: "/images/sandstone-palace-domes.jpg",
    desc: "Curvilinear Bangaldar pavilions and carved sandstone chhatris set against atmospheric turquoise heavens.",
    aspect: "aspect-[16/9]",
    layout: "full-bleed",
  },
  {
    slug: "pelican-solitude",
    title: "Sagar Lake Pelicans",
    category: "Wildlife & Natural Form",
    year: "2026",
    location: "Sagar Lake Basin • Riparian Stillness",
    img: "/images/pelicans-lake.jpg",
    desc: "Two pelicans perched on a stone pedestal in calm turquoise water, framed against fortified mountain ridges.",
    aspect: "aspect-[3/4]",
    layout: "right-portrait",
  },
  {
    slug: "jaipur-aerial",
    title: "Dense Masonry Aerial",
    category: "Urban Cartography",
    year: "2025",
    location: "Nahargarh Ridge • Morning Mist & Aerial Kites",
    img: "/images/city-aerial-overview.jpg",
    desc: "High-vantage panoramic study of historic urban density, rooftops, and soaring birds in misty morning light.",
    aspect: "aspect-[16/10]",
    layout: "left-dominant",
  },
  {
    slug: "fort-ramparts",
    title: "Fort Ramparts & High Ridge",
    category: "Territorial Architecture",
    year: "2026",
    location: "Jaigarh Western Wall • Taanka Rainwater Basin",
    img: "/images/fort-ramparts-overlook.jpg",
    desc: "Ancient stepped ramparts and historic rainwater harvesting infrastructure snaking across rugged mountain ridges.",
    aspect: "aspect-[21/9]",
    layout: "full-bleed",
  },
  {
    slug: "monochrome-temple",
    title: "Monolithic Shikhara Expedition",
    category: "Epigraphical Heritage & Form",
    year: "2025",
    location: "Rajasthan Heritage Corridor • Silver Gelatin Emulsion",
    img: "/images/aryan-patel-temple-monochrome.jpg",
    desc: "Black and white study of an ancient carved stone temple spire, exploring tactile masonry and human scale.",
    aspect: "aspect-[3/4]",
    layout: "left-portrait",
  },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main className="pt-40 pb-32 px-6 lg:px-12 max-w-[100rem] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
          className="mb-32 border-b border-[var(--border-medium)] pb-12"
        >
          <span className="type-meta text-[var(--accent-dark-bronze)] block mb-3 uppercase tracking-widest">
            MONOGRAPH INDEX // VOL. XXVI
          </span>
          <h1 className="type-display-hero">Archive</h1>
          <p className="type-body-lead text-[var(--ink-muted)] mt-6 max-w-2xl">
            A curated selection of photographic monographs capturing monumentality, wildlife silence, and architectural chiaroscuro across the heritage topography of Rajasthan.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32 lg:gap-48">
          {projects.map((proj, idx) => {
            const num = String(idx + 1).padStart(2, "0");

            if (proj.layout === "left-dominant") {
              return (
                <div key={proj.slug} className="flex flex-col md:flex-row items-end gap-8 lg:gap-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-2/3"
                  >
                    <Link href={`/work/${proj.slug}`} className={`block relative ${proj.aspect} overflow-hidden group bg-[var(--bg-slate)]`}>
                      <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        priority={idx < 2}
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-1/3 flex flex-col pb-8"
                  >
                    <div className="flex flex-col gap-1 mb-6">
                      <div className="flex items-center gap-4">
                        <span className="type-meta text-[var(--accent-dark-bronze)]">{num} / {proj.category}</span>
                        <span className="type-meta text-[var(--ink-muted)]">• {proj.year}</span>
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-[var(--ink-muted)] uppercase">
                        {proj.location}
                      </span>
                    </div>
                    <Link href={`/work/${proj.slug}`} className="group inline-block w-max">
                      <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                        {proj.title}
                      </h2>
                    </Link>
                    <p className="type-body-base text-[var(--ink-muted)] mb-8">
                      {proj.desc}
                    </p>
                    <Link
                      href={`/work/${proj.slug}`}
                      className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors uppercase tracking-widest inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Plate &rarr;</span>
                    </Link>
                  </motion.div>
                </div>
              );
            }

            if (proj.layout === "right-portrait") {
              return (
                <div key={proj.slug} className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 lg:gap-16">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-5/12 flex flex-col pt-12 lg:pt-32"
                  >
                    <div className="flex flex-col gap-1 mb-6">
                      <div className="flex items-center gap-4">
                        <span className="type-meta text-[var(--accent-dark-bronze)]">{num} / {proj.category}</span>
                        <span className="type-meta text-[var(--ink-muted)]">• {proj.year}</span>
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-[var(--ink-muted)] uppercase">
                        {proj.location}
                      </span>
                    </div>
                    <Link href={`/work/${proj.slug}`} className="group inline-block">
                      <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                        {proj.title}
                      </h2>
                    </Link>
                    <p className="type-body-base text-[var(--ink-muted)] mb-8 max-w-sm">
                      {proj.desc}
                    </p>
                    <Link
                      href={`/work/${proj.slug}`}
                      className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors uppercase tracking-widest inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Plate &rarr;</span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-5/12"
                  >
                    <Link href={`/work/${proj.slug}`} className={`block relative ${proj.aspect} overflow-hidden group bg-[var(--bg-slate)]`}>
                      <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </Link>
                  </motion.div>
                </div>
              );
            }

            if (proj.layout === "left-portrait") {
              return (
                <div key={proj.slug} className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-5/12"
                  >
                    <Link href={`/work/${proj.slug}`} className={`block relative ${proj.aspect} overflow-hidden group bg-[var(--bg-slate)]`}>
                      <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                      <Image
                        src={proj.img}
                        alt={proj.title}
                        fill
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                      />
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
                    className="w-full md:w-5/12 flex flex-col pt-12 lg:pt-32"
                  >
                    <div className="flex flex-col gap-1 mb-6">
                      <div className="flex items-center gap-4">
                        <span className="type-meta text-[var(--accent-dark-bronze)]">{num} / {proj.category}</span>
                        <span className="type-meta text-[var(--ink-muted)]">• {proj.year}</span>
                      </div>
                      <span className="text-[11px] font-mono tracking-wider text-[var(--ink-muted)] uppercase">
                        {proj.location}
                      </span>
                    </div>
                    <Link href={`/work/${proj.slug}`} className="group inline-block">
                      <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                        {proj.title}
                      </h2>
                    </Link>
                    <p className="type-body-base text-[var(--ink-muted)] mb-8 max-w-sm">
                      {proj.desc}
                    </p>
                    <Link
                      href={`/work/${proj.slug}`}
                      className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors uppercase tracking-widest inline-flex items-center gap-1.5"
                    >
                      <span>Inspect Plate &rarr;</span>
                    </Link>
                  </motion.div>
                </div>
              );
            }

            // full-bleed
            return (
              <div key={proj.slug} className="flex flex-col gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                  className="w-full"
                >
                  <Link href={`/work/${proj.slug}`} className={`block relative ${proj.aspect} overflow-hidden group bg-[var(--bg-slate)]`}>
                    <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                    <Image
                      src={proj.img}
                      alt={proj.title}
                      fill
                      className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                    />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full md:w-1/2 md:ml-auto flex flex-col border-t border-[var(--border-medium)] pt-8"
                >
                  <div className="flex flex-col gap-1 mb-6">
                    <div className="flex items-center gap-4">
                      <span className="type-meta text-[var(--accent-dark-bronze)]">{num} / {proj.category}</span>
                      <span className="type-meta text-[var(--ink-muted)]">• {proj.year}</span>
                    </div>
                    <span className="text-[11px] font-mono tracking-wider text-[var(--ink-muted)] uppercase">
                      {proj.location}
                    </span>
                  </div>
                  <Link href={`/work/${proj.slug}`} className="group inline-block w-max">
                    <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                      {proj.title}
                    </h2>
                  </Link>
                  <p className="type-body-base text-[var(--ink-muted)] mb-8">
                    {proj.desc}
                  </p>
                  <Link
                    href={`/work/${proj.slug}`}
                    className="type-meta text-[var(--ink-primary)] hover:text-[var(--accent-dark-bronze)] transition-colors uppercase tracking-widest inline-flex items-center gap-1.5"
                  >
                    <span>Inspect Plate &rarr;</span>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
