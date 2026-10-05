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
    slug: "aura-residence",
    title: "Aura Residence",
    category: "Architectural Photography",
    year: "2026",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    desc: "A study in minimal geometry and natural light."
  },
  {
    slug: "vessel-brand",
    title: "Vessel",
    category: "Brand System",
    year: "2025",
    img: "https://images.unsplash.com/photo-1543886566-cb500e303493?auto=format&fit=crop&q=80&w=1200",
    desc: "Rigorous typographical hierarchy for a luxury lifestyle brand."
  },
  {
    slug: "monolith-tech",
    title: "Monolith",
    category: "Digital Experience",
    year: "2025",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    desc: "Kinetic web architecture with WebGL integrations."
  }
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
          <h1 className="type-display-hero">Archive</h1>
          <p className="type-body-lead text-[var(--ink-muted)] mt-6 max-w-2xl">
            A curated selection of commissions spanning digital architecture, spatial photography, and typographic systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32 lg:gap-48">
          {/* Project 1: Dominant Left Image */}
          <div className="flex flex-col md:flex-row items-end gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
              className="w-full md:w-2/3"
            >
              <Link href={`/work/${projects[0].slug}`} className="block relative aspect-[16/9] overflow-hidden group bg-[var(--bg-slate)]">
                <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={projects[0].img} alt={projects[0].title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
              className="w-full md:w-1/3 flex flex-col pb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="type-meta text-[var(--ink-muted)]">01 / {projects[0].category}</span>
              </div>
              <Link href={`/work/${projects[0].slug}`} className="group inline-block w-max">
                <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                  {projects[0].title}
                </h2>
              </Link>
              <p className="type-body-base text-[var(--ink-muted)] mb-8">
                {projects[0].desc}
              </p>
            </motion.div>
          </div>

          {/* Project 2: Portrait Right, Text Left Top */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-8 lg:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
              className="w-full md:w-5/12 flex flex-col pt-12 lg:pt-32"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="type-meta text-[var(--ink-muted)]">02 / {projects[1].category}</span>
              </div>
              <Link href={`/work/${projects[1].slug}`} className="group inline-block">
                <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                  {projects[1].title}
                </h2>
              </Link>
              <p className="type-body-base text-[var(--ink-muted)] mb-8 max-w-sm">
                {projects[1].desc}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
              className="w-full md:w-5/12"
            >
              <Link href={`/work/${projects[1].slug}`} className="block relative aspect-[3/4] overflow-hidden group bg-[var(--bg-slate)]">
                <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={projects[1].img} alt={projects[1].title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]" />
              </Link>
            </motion.div>
          </div>

          {/* Project 3: Full Width Bleed, Offset Text Below */}
          <div className="flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
              className="w-full"
            >
              <Link href={`/work/${projects[2].slug}`} className="block relative aspect-[21/9] overflow-hidden group bg-[var(--bg-slate)]">
                <div className="absolute inset-0 bg-[var(--bg-midnight-blue)] mix-blend-multiply opacity-10 transition-opacity duration-500 group-hover:opacity-0 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image src={projects[2].img} alt={projects[2].title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 md:ml-auto flex flex-col border-t border-[var(--border-medium)] pt-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="type-meta text-[var(--ink-muted)]">03 / {projects[2].category}</span>
              </div>
              <Link href={`/work/${projects[2].slug}`} className="group inline-block w-max">
                <h2 className="type-display-title mb-4 group-hover:text-[var(--accent-dark-bronze)] transition-colors duration-400">
                  {projects[2].title}
                </h2>
              </Link>
              <p className="type-body-base text-[var(--ink-muted)]">
                {projects[2].desc}
              </p>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
