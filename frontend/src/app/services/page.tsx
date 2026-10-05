"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import Link from "next/link";

const services = [
  {
    id: "digital",
    num: "01",
    title: "Digital Experiences",
    desc: "We construct kinetic web architectures and interactive platforms that feel physical. By leveraging WebGL and strict computational motion, we create environments that reject synthetic smoothing in favor of raw digital performance.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
    workLink: "/work/monolith-tech",
    workTitle: "Monolith"
  },
  {
    id: "brand",
    num: "02",
    title: "Brand Systems",
    desc: "Rigorous typographical hierarchies and symbol systems rooted in classical graphic design. We treat brand identity as an architectural foundation—monumental, scalable, and resistant to ephemeral trends.",
    image: "https://images.unsplash.com/photo-1543886566-cb500e303493?auto=format&fit=crop&q=80&w=1200",
    workLink: "/work/vessel-brand",
    workTitle: "Vessel"
  },
  {
    id: "photo",
    num: "03",
    title: "Photography",
    desc: "A discipline of light and time. We balance medium-format digital capture with silver halide methodology, producing archival-grade imagery that focuses on structural chiaroscuro rather than flat illumination.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600",
    workLink: "/work/aura-residence",
    workTitle: "Aura Residence"
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep-night)] text-[var(--ink-inverse)] relative font-sans selection:bg-[var(--accent-muted-gold)] selection:text-[var(--bg-near-black)]">
      <FilmGrain />
      <Navbar />

      <main className="pt-40 pb-32">
        <div className="px-6 lg:px-12 max-w-[100rem] mx-auto mb-32 border-b border-[rgba(247,245,240,0.15)] pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="type-display-hero text-[var(--bg-warm-ivory)]"
          >
            Disciplines
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="type-body-lead text-[var(--ink-inverse-muted)] mt-6 max-w-2xl"
          >
            The studio operates across core practices, treating each as a material study in light, form, and code.
          </motion.p>
        </div>

        <div className="flex flex-col">
          {services.map((service, index) => (
            <div key={service.id} className="border-b border-[rgba(247,245,240,0.1)] group">
              <div className="px-6 lg:px-12 max-w-[100rem] mx-auto py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
                  className="lg:col-span-5 flex flex-col"
                >
                  <span className="type-meta text-[var(--accent-muted-gold)] mb-6">{service.num} / CORE</span>
                  <h2 className="type-display-title text-[var(--bg-warm-ivory)] mb-8">{service.title}</h2>
                  <p className="type-body-base text-[var(--ink-inverse-muted)] mb-12 max-w-md">
                    {service.desc}
                  </p>
                  <div>
                    <span className="type-meta text-[var(--ink-inverse-muted)] block mb-4">Featured Commission</span>
                    <Link href={service.workLink} className="inline-block type-body-base text-[var(--ink-inverse)] hover:text-[var(--accent-muted-gold)] transition-colors border-b border-[rgba(247,245,240,0.3)] hover:border-[var(--accent-muted-gold)] pb-1">
                      {service.workTitle} →
                    </Link>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as any }}
                  className="lg:col-span-7 aspect-[16/9] overflow-hidden relative bg-[var(--bg-midnight-blue)]"
                >
                  <div className="absolute inset-0 bg-[var(--bg-deep-night)] mix-blend-multiply opacity-40 transition-opacity duration-700 group-hover:opacity-0 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s] ease-[var(--ease-editorial)] grayscale group-hover:grayscale-0" />
                </motion.div>
                
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
