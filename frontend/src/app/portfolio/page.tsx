'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import FilmGrain from '@/components/film/FilmGrain';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS, getImagePlateInfo } from '@/lib/data/studioData';
import { useReveal } from '@/lib/useReveal';

const CATEGORIES = [
  { id: 'all', label: 'All Monographs', slug: 'all' },
  { id: 'architecture', label: 'Architecture', slug: 'architecture' },
  { id: 'weddings', label: 'Weddings', slug: 'weddings' },
  { id: 'portraits', label: 'Portraits', slug: 'portraits' },
  { id: 'fashion', label: 'Fashion', slug: 'fashion' },
  { id: 'commercial', label: 'Commercial', slug: 'commercial' },
];

export default function PortfolioFolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  // Partition ordered projects into groups of 3 for the repeating Large / Dual rhythm
  // Group pattern: [Project_Large, Project_DualLeft, Project_DualRight]
  const projectGroups: (typeof PROJECTS)[] = [];
  for (let i = 0; i < filteredProjects.length; i += 3) {
    projectGroups.push(filteredProjects.slice(i, i + 3));
  }

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans">
      <FilmGrain />
      <Navbar />

      <main className="pt-28 pb-32">
        {/* Folio Register Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-3">
            <span className="text-[11px] font-mono tracking-[0.12em] uppercase text-[#66625B] block">
              Archive Index // Monograph Series
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515] tracking-tight">
              Portfolio
            </h1>
            <p className="text-base sm:text-lg text-[#66625B] max-w-2xl leading-relaxed">
              Curated photographic monographs, fine-art portrait folios, and architectural studies
              documented on medium format negative and archival digital plates.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-8 text-xs font-mono uppercase tracking-wider">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.slug)}
                className={`pb-1.5 transition-all ${
                  activeCategory === cat.slug
                    ? 'text-[#151515] border-b-2 border-[#151515] font-semibold'
                    : 'text-[#77736D] hover:text-[#151515]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Portfolio Rhythm: Large / Dual / Large / Dual */}
        {filteredProjects.length === 0 ? (
          <section className="px-6 lg:px-12 max-w-4xl mx-auto py-24 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#66625B] block">
              Folio Notice
            </span>
            <h2 className="font-serif text-3xl text-[#151515]">
              Nothing has been published in{' '}
              {CATEGORIES.find((c) => c.slug === activeCategory)?.label || 'this series'} yet.
            </h2>
            <p className="text-sm text-[#66625B]">
              Browse the full portfolio to inspect active monographs across all disciplines.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className="px-6 py-3 bg-[#171717] text-[#F4F1EB] text-xs font-mono uppercase tracking-wider hover:bg-black"
              >
                Browse All Monographs
              </button>
            </div>
          </section>
        ) : (
          <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-28">
            {projectGroups.map((group, groupIdx) => {
              const largeProject = group[0];
              const dualFirst = group[1];
              const dualSecond = group[2];

              return (
                <div key={`group-${groupIdx}`} className="space-y-24">
                  {/* RHYTHM ELEMENT: LARGE (Full-bleed 3:2 if landscape, 2:3 archival frame if portrait) */}
                  {largeProject && (() => {
                    const largePlateInfo = getImagePlateInfo(largeProject.coverImage);
                    return (
                      <article className="space-y-6">
                        <Link
                          href={`/project/${largeProject.slug}`}
                          className="group block overflow-hidden"
                        >
                          <div
                            className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] zoomable flex items-center justify-center ${largePlateInfo.aspectClass} ${
                              largePlateInfo.isLandscape
                                ? "w-full max-w-6xl mx-auto"
                                : "w-full max-w-2xl mx-auto"
                            }`}
                          >
                            <Image
                              src={largeProject.coverImage}
                              alt={largeProject.name}
                              fill
                              sizes="100vw"
                              unoptimized
                              quality={100}
                              priority={groupIdx === 0}
                              className="object-contain transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 lg:left-10 z-10 font-mono text-[11px] uppercase tracking-widest text-white/90">
                              {largeProject.location || 'Uttar Pradesh'} // {largeProject.year || '2026'} · {largePlateInfo.isLandscape ? "Landscape" : "Portrait"}
                            </div>
                          </div>
                        </Link>

                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#D9D5CE] pb-4">
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono uppercase tracking-widest text-[#66625B] block">
                            Monograph No. {String(groupIdx * 3 + 1).padStart(3, '0')} · Plate 01 · {largeProject.category.toUpperCase()}
                          </span>
                          <h2 className="font-serif text-3xl sm:text-4xl text-[#151515]">
                            {largeProject.name}
                          </h2>
                          <p className="text-sm font-serif italic text-[#77736D] max-w-xl">
                            {largeProject.gallery[0]?.caption || largeProject.subtitle}
                          </p>
                        </div>
                        <Link
                          href={`/project/${largeProject.slug}`}
                          className="text-xs font-mono uppercase tracking-wider text-[#151515] hover:text-[#CFA570] flex items-center gap-1 shrink-0"
                        >
                          <span>Open Folio</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </article>
                    );
                  })()}

                  {/* RHYTHM ELEMENT: DUAL (58 / 38 columns with 8px editorial offset on desktop) */}
                  {(dualFirst || dualSecond) && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                      {/* Dual Left (58% width col on desktop, authentic aspect frame) */}
                      {dualFirst && (() => {
                        const dual1Info = getImagePlateInfo(dualFirst.coverImage);
                        return (
                          <article className="md:col-span-7 space-y-6">
                            <Link
                              href={`/project/${dualFirst.slug}`}
                              className="group block overflow-hidden"
                            >
                              <div className={`relative w-full overflow-hidden bg-[#171717] border border-[#D9D5CE] zoomable flex items-center justify-center ${dual1Info.aspectClass}`}>
                                <Image
                                  src={dualFirst.coverImage}
                                  alt={dualFirst.name}
                                  fill
                                  sizes="(min-width: 1024px) 58vw, 100vw"
                                  unoptimized
                                  quality={100}
                                  className="object-contain transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                                />
                                <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-white/90">
                                  {dualFirst.location} // {dualFirst.year}
                                </div>
                              </div>
                            </Link>

                          <div className="space-y-1 border-b border-[#D9D5CE] pb-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66625B] block">
                              Monograph No. {String(groupIdx * 3 + 2).padStart(3, '0')} · Plate 01
                            </span>
                            <h3 className="font-serif text-2xl text-[#151515]">
                              {dualFirst.name}
                            </h3>
                            <p className="text-xs font-serif italic text-[#77736D]">
                              {dualFirst.gallery[0]?.caption || dualFirst.subtitle}
                            </p>
                          </div>
                        </article>
                        );
                      })()}

                      {/* Dual Right (38% width col on desktop, authentic aspect frame) */}
                      {dualSecond && (() => {
                        const dual2Info = getImagePlateInfo(dualSecond.coverImage);
                        return (
                          <article className="md:col-span-5 space-y-6 lg:translate-y-2">
                            <Link
                              href={`/project/${dualSecond.slug}`}
                              className="group block overflow-hidden"
                            >
                              <div className={`relative w-full overflow-hidden bg-[#171717] border border-[#D9D5CE] zoomable flex items-center justify-center ${dual2Info.aspectClass}`}>
                                <Image
                                  src={dualSecond.coverImage}
                                  alt={dualSecond.name}
                                  fill
                                  sizes="(min-width: 1024px) 38vw, 100vw"
                                  unoptimized
                                  quality={100}
                                  className="object-contain transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]"
                                />
                                <div className="absolute bottom-4 left-4 z-10 font-mono text-[10px] uppercase tracking-widest text-white/90">
                                  {dualSecond.location} // {dualSecond.year}
                                </div>
                              </div>
                            </Link>

                          <div className="space-y-1 border-b border-[#D9D5CE] pb-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-[#66625B] block">
                              Monograph No. {String(groupIdx * 3 + 3).padStart(3, '0')} · Plate 01
                            </span>
                            <h3 className="font-serif text-2xl text-[#151515]">
                              {dualSecond.name}
                            </h3>
                            <p className="text-xs font-serif italic text-[#77736D]">
                              {dualSecond.gallery[0]?.caption || dualSecond.subtitle}
                            </p>
                          </div>
                        </article>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        )}

        {/* Commission Registration CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto pt-32">
          <div className="bg-[#171717] text-[#F4F1EB] p-12 lg:p-20 border border-[#171717] text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] block">
              Atelier Commission Register
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal max-w-2xl mx-auto leading-tight">
              Commission an unhurried photographic monograph.
            </h2>
            <p className="text-sm text-[#77736D] max-w-lg mx-auto leading-relaxed">
              We reserve a finite number of commission windows per year to maintain archival
              discipline and hand-bound print standards.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="px-8 py-3.5 bg-[#F4F1EB] text-[#151515] text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors"
              >
                Register Commission
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-[#77736D] text-[#F4F1EB] text-xs font-mono uppercase tracking-wider hover:border-white transition-colors"
              >
                Atelier Correspondence
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
