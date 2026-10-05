"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = React.use(params);
  // Mock data for any slug
  const title = (unwrappedParams?.slug || "").replace(/-/g, " ").toUpperCase();

  return (
    <div className="min-h-screen bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main>
        {/* HERO VISUAL */}
        <section className="relative h-[80vh] w-full overflow-hidden bg-[var(--bg-deep-night)]">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as any }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover opacity-80 mix-blend-luminosity" />
          </motion.div>
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-12 max-w-7xl mx-auto w-full">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="type-display-hero text-[var(--ink-inverse)]"
            >
              {title}
            </motion.h1>
          </div>
        </section>

        {/* METADATA & PROJECT STORY */}
        <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 flex flex-col gap-8 type-meta text-[var(--ink-muted)]">
            <div>
              <p className="text-[var(--ink-primary)] mb-1">Client</p>
              <p>Studioza Internal</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] mb-1">Role</p>
              <p>Art Direction, Digital Architecture</p>
            </div>
            <div>
              <p className="text-[var(--ink-primary)] mb-1">Year</p>
              <p>2025</p>
            </div>
          </div>

          <div className="md:col-span-8">
            <h2 className="type-display-statement mb-8">
              A comprehensive exploration into the intersection of spatial brutalism and digital interfaces, challenging the modern norms of synthetic smoothing.
            </h2>
            <div className="type-body-base text-[var(--ink-body)] space-y-6 max-w-2xl">
              <p>
                The project required a ground-up conceptualization of structural identity. We approached the commission with a classical darkroom discipline, treating digital pixels as physical material.
              </p>
              <p>
                By rejecting artificial drop shadows and relying solely on typographic scale, negative space, and monochromatic tension, we established a visual hierarchy that feels permanent and monumental.
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE SEQUENCE */}
        <section className="py-12 bg-[var(--bg-deep-night)]">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12 space-y-12 lg:space-y-32">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="aspect-video w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600" alt="Seq 1" className="w-full h-full object-cover" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="aspect-[3/4]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1543886566-cb500e303493?auto=format&fit=crop&q=80&w=1200" alt="Seq 2" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="aspect-[3/4] md:mt-32"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200" alt="Seq 3" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CREDITS & PAGINATION */}
        <section className="py-32 px-6 lg:px-12 bg-[var(--bg-warm-ivory)] border-t border-[var(--border-medium)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h3 className="type-meta text-[var(--ink-muted)] mb-4">Team & Credits</h3>
              <ul className="type-body-base space-y-2">
                <li>Art Direction: Aryan Patel</li>
                <li>Photography: Studioza Archive</li>
                <li>Development: Studioza Atelier</li>
              </ul>
            </div>
            
            <div className="text-left md:text-right">
              <span className="type-meta text-[var(--ink-muted)] block mb-4">Next Project</span>
              <a href="/work" className="type-display-title hover:text-[var(--accent-dark-bronze)] transition-colors">
                Archive Overview
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
