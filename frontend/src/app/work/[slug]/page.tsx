"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";

const PROJECT_DETAILS: Record<
  string,
  {
    title: string;
    category: string;
    year: string;
    location: string;
    heroImage: string;
    statement: string;
    context: string;
    discipline: string;
    images: { src: string; caption: string }[];
  }
> = {
  "amer-citadel": {
    title: "Amer Citadel Study",
    category: "Architectural Chiaroscuro",
    year: "2026",
    location: "Amer, Rajasthan",
    heroImage: "/images/palace-arch-courtyard.jpg",
    statement:
      "A monumental study in silhouette, deep shadow, and classical Rajasthani palace archways.",
    context:
      "Captured under natural high-noon illumination, this monograph explores the dramatic transition between dark monolithic corridors and the blazing light of the palace courtyard.",
    discipline: "Medium Format • 80mm • Archival Mineral Pigment",
    images: [
      { src: "/images/palace-arch-courtyard.jpg", caption: "Monolithic Archway Framing" },
      { src: "/images/aryan-patel-portrait.jpg", caption: "Artist in Residence — Sheesh Mahal" },
      { src: "/images/city-aerial-overview.jpg", caption: "Fortress Ramparts & Surrounding Landscape" },
    ],
  },
  "pelican-solitude": {
    title: "Sagar Lake Pelicans",
    category: "Wildlife Form & Riparian Stillness",
    year: "2026",
    location: "Sagar Lake, Amber",
    heroImage: "/images/pelicans-lake.jpg",
    statement:
      "Two pelicans resting on a solitary stone block in shimmering turquoise waters.",
    context:
      "An unhurried telephoto capture emphasizing stillness and organic form against the blurred monumental ramparts of the fort behind.",
    discipline: "Medium Format • 210mm • Natural Illumination",
    images: [
      { src: "/images/pelicans-lake.jpg", caption: "Pelicans on Submerged Stone Block" },
      { src: "/images/city-aerial-overview.jpg", caption: "Historic Valley & Lake Basin" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Adjacent Palace Fortifications" },
    ],
  },
  "jaipur-aerial": {
    title: "Dense Masonry Aerial",
    category: "Urban Cartography & Atmosphere",
    year: "2025",
    location: "Jaipur, India",
    heroImage: "/images/city-aerial-overview.jpg",
    statement:
      "High-vantage panoramic study of historic urban density, rooftops, and soaring birds in misty morning light.",
    context:
      "Looking down from the hill forts over centuries of contiguous stone architecture, captured during morning mist with black kites wheeling in the thermal currents.",
    discipline: "Medium Format • 45mm • ISO 100",
    images: [
      { src: "/images/city-aerial-overview.jpg", caption: "Dense Urban Fabric & Roof Terraces" },
      { src: "/images/palace-arch-courtyard.jpg", caption: "Courtyard Scale & Interior Volume" },
      { src: "/images/pelicans-lake.jpg", caption: "Perimeter Water Reservoir" },
    ],
  },
};

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams?.slug || "";

  const project =
    PROJECT_DETAILS[slug] || {
      title: slug.replace(/-/g, " ").toUpperCase(),
      category: "Architectural Photography",
      year: "2026",
      location: "Studioza Atelier Archive",
      heroImage: "/images/palace-arch-courtyard.jpg",
      statement:
        "An exploration into spatial form, texture, and light, challenging the modern norms of synthetic smoothing.",
      context:
        "The project required a ground-up conceptualization of structural identity. We approached the commission with a classical darkroom discipline, treating digital capture with silver halide patience.",
      discipline: "Medium Format • Silver Halide Discipline",
      images: [
        { src: "/images/palace-arch-courtyard.jpg", caption: "Plate 01 — Spatial Geometry" },
        { src: "/images/pelicans-lake.jpg", caption: "Plate 02 — Riparian Quietude" },
        { src: "/images/city-aerial-overview.jpg", caption: "Plate 03 — Environmental Scale" },
      ],
    };

  return (
    <div className="min-h-screen bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main>
        {/* HERO VISUAL */}
        <section className="relative h-[85vh] w-full overflow-hidden bg-[var(--bg-deep-night)]">
          <motion.div
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0"
          >
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              className="object-cover opacity-90 contrast-[1.06]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep-night)] via-[var(--bg-deep-night)]/25 to-transparent pointer-events-none" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-16 max-w-7xl mx-auto w-full z-10">
            <span className="type-meta text-[var(--accent-muted-gold)] mb-3 uppercase tracking-widest">
              {project.location} // {project.category}
            </span>
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="type-display-hero text-[var(--bg-warm-ivory)] drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
            >
              {project.title}
            </motion.h1>
          </div>
        </section>

        {/* METADATA & PROJECT STORY */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[var(--border-medium)] pb-24">
          <div className="md:col-span-4 flex flex-col gap-8 type-meta text-[var(--ink-muted)]">
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Location
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.location}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Discipline
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.discipline}</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] font-semibold mb-1 uppercase tracking-wider text-xs">
                Year
              </p>
              <p className="type-body-base text-[var(--ink-muted)]">{project.year}</p>
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="type-display-statement mb-8 text-[var(--ink-primary)]">
              {project.statement}
            </h2>
            <div className="type-body-base text-[var(--ink-body)] space-y-6 max-w-2xl leading-relaxed">
              <p>{project.context}</p>
              <p>
                Printed on 310gsm Hahnemühle Photo Rag Baryta with archival mineral pigment inks rated for permanence. Zero synthetic smoothing.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE SEQUENCE */}
        <section className="py-24 bg-[var(--bg-deep-night)] text-[var(--ink-inverse)]">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12 space-y-24">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="type-meta text-[var(--accent-muted-gold)] uppercase tracking-widest block mb-2">
                Curatorial Plates
              </span>
              <h3 className="type-display-title text-[var(--bg-warm-ivory)]">Archival Sequence</h3>
            </div>

            {/* Sequence 1: Full-Width Monolith */}
            {project.images[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-[var(--bg-slate)]">
                  <Image
                    src={project.images[0].src}
                    alt={project.images[0].caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center type-meta text-[var(--ink-inverse-muted)] pt-2">
                  <span>01 // {project.images[0].caption}</span>
                  <span>100% UNCOMPRESSED RAW</span>
                </div>
              </motion.div>
            )}

            {/* Sequence 2 & 3: Staggered Pair */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
              {project.images[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="space-y-4"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-slate)]">
                    <Image
                      src={project.images[1].src}
                      alt={project.images[1].caption}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="type-meta text-[var(--ink-inverse-muted)] pt-2">
                    02 // {project.images[1].caption}
                  </div>
                </motion.div>
              )}

              {project.images[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-4 md:mt-24"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-[var(--bg-slate)]">
                    <Image
                      src={project.images[2].src}
                      alt={project.images[2].caption}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="type-meta text-[var(--ink-inverse-muted)] pt-2">
                    03 // {project.images[2].caption}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CREDITS & PAGINATION */}
        <section className="py-32 px-6 lg:px-12 bg-[var(--bg-warm-ivory)] border-t border-[var(--border-medium)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h3 className="type-meta text-[var(--ink-muted)] mb-4 uppercase tracking-widest text-xs">
                Credits
              </h3>
              <ul className="type-body-base space-y-2 text-[var(--ink-body)]">
                <li>
                  <span className="text-[var(--ink-muted)]">Photographer:</span> Aryan Patel
                </li>
                <li>
                  <span className="text-[var(--ink-muted)]">Curation:</span> Studioza Atelier Archive
                </li>
                <li>
                  <span className="text-[var(--ink-muted)]">Medium:</span> Medium Format Film &amp; Raw Capture
                </li>
              </ul>
            </div>

            <div className="text-left md:text-right">
              <span className="type-meta text-[var(--ink-muted)] block mb-4 uppercase tracking-widest text-xs">
                Navigation
              </span>
              <Link
                href="/work"
                className="type-display-title hover:text-[var(--accent-dark-bronze)] transition-colors"
              >
                Archive Overview &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
