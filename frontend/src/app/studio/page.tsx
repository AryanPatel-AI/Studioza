"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-warm-ivory)] text-[var(--ink-primary)] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main className="pt-40 pb-32">
        {/* HERO SECTION */}
        <section className="px-6 lg:px-12 max-w-[100rem] mx-auto mb-32 border-b border-[var(--border-medium)] pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="type-display-hero text-[var(--ink-primary)]"
          >
            The Studio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="type-body-lead text-[var(--ink-muted)] mt-6 max-w-2xl"
          >
            An independent creative atelier focusing on the intersection of digital architecture, robust brand systems, and structural aesthetics.
          </motion.p>
        </section>

        {/* PHILOSOPHY */}
        <section className="px-6 lg:px-12 max-w-[100rem] mx-auto py-24 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <h2 className="type-meta text-[var(--ink-muted)] mb-8">01 / Philosophy</h2>
            <h3 className="type-display-title">Digital Brutalism</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 type-body-base text-[var(--ink-body)] space-y-6 max-w-2xl"
          >
            <p>
              We reject the homogenization of the modern web. The proliferation of synthetic gradients, excessive border-radii, and template-driven layouts has stripped the medium of its structural integrity.
            </p>
            <p>
              Our philosophy is rooted in architectural tenets: form must follow function, and the materials (typography, grid, motion) must be expressed honestly. We treat digital spaces as physical environments, emphasizing monochromatic tension, oversized typography, and negative space.
            </p>
          </motion.div>
        </section>

        {/* VISUAL BREAK */}
        <section className="w-full py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="aspect-video lg:aspect-[21/9] w-full bg-[var(--bg-deep-night)] overflow-hidden relative"
          >
            <Image
              src="/images/city-aerial-overview.jpg"
              alt="Historic City Panoramic View — Studioza Archive"
              fill
              className="object-cover opacity-90 contrast-[1.05]"
            />
          </motion.div>
        </section>

        {/* APPROACH */}
        <section className="px-6 lg:px-12 max-w-[100rem] mx-auto py-24 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 border-t border-[var(--border-medium)]">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5"
          >
            <h2 className="type-meta text-[var(--ink-muted)] mb-8">02 / Approach</h2>
            <h3 className="type-display-title">Disciplined Execution</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12 type-body-base text-[var(--ink-body)]"
          >
            <div>
              <h4 className="type-meta text-[var(--ink-primary)] mb-4">Discovery & Thesis</h4>
              <p>Every commission begins with rigorous research to establish a central thesis. We audit the landscape to ensure our work stands in stark contrast to the expected.</p>
            </div>
            <div>
              <h4 className="type-meta text-[var(--ink-primary)] mb-4">Structural Design</h4>
              <p>Prototyping in wireframes and typography before introducing any visual layer. The grid dictates the rhythm; the typography establishes the hierarchy.</p>
            </div>
            <div>
              <h4 className="type-meta text-[var(--ink-primary)] mb-4">Kinetic Implementation</h4>
              <p>Motion is never an afterthought. We program physical easing and inertia into our interfaces, ensuring the experience feels tactile and monumental.</p>
            </div>
            <div>
              <h4 className="type-meta text-[var(--ink-primary)] mb-4">Archival Delivery</h4>
              <p>Systems built to endure. We deliver clean codebases, comprehensive design systems, and robust documentation.</p>
            </div>
          </motion.div>
        </section>

        {/* PEOPLE */}
        <section className="px-6 lg:px-12 max-w-[100rem] mx-auto py-24 border-t border-[var(--border-medium)]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h2 className="type-meta text-[var(--ink-muted)] mb-6">03 / The Atelier</h2>
            <h3 className="type-display-statement">A lean collective of digital architects.</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="aspect-[3/4] mb-8 overflow-hidden bg-[var(--bg-slate)] mx-auto max-w-sm relative border border-[var(--border-medium)]">
                <Image
                  src="/images/aryan-patel-portrait.jpg"
                  alt="Aryan Patel — Creative Director & Photographer"
                  fill
                  className="object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)]"
                />
              </div>
              <h4 className="type-display-statement text-[var(--ink-primary)] mb-2">Aryan Patel</h4>
              <p className="type-meta text-[var(--ink-muted)]">Creative Director &amp; Photographer</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
