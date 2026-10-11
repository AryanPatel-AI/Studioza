import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, getImagePlateInfo } from "@/lib/data/studioData";

const CATEGORY_METADATA: Record<string, { title: string; subtitle: string; description: string }> = {
  architecture: {
    title: "Forts & Sacred Architecture",
    subtitle: "Historic citadels, monumental ramparts, and ancient stone sanctuaries.",
    description: "Medium-format documentation of royal Rajasthani bastions and Himalayan stone temples across Amber Fort, Jaigarh Fort, Nahargarh Fort, Chittor Fort, and Almora.",
  },
  weddings: {
    title: "Weddings & Celebrations",
    subtitle: "Sacred unions and royal multi-day celebrations documented with fine-art reverence.",
    description: "Operating discreetly within royal palace courtyards, heritage estates, and destination sanctuaries across India and Europe.",
  },
  portraits: {
    title: "Fine Art Portraits",
    subtitle: "Sculptural, timeless portraiture for artists, patrons, and families.",
    description: "Unhurried sittings in natural ambient illumination capturing quiet character, legacy, and internal gravity.",
  },
  fashion: {
    title: "Fashion & Editorial",
    subtitle: "Couture visual narratives harmonized with authentic architectural scale.",
    description: "Campaign commissions for Vogue, luxury fashion houses, and editorial publications.",
  },
  commercial: {
    title: "Commercial & Expeditions",
    subtitle: "Precision spatial documentation for luxury travel expeditions, alpine valleys, and heritage trusts.",
    description: "Medium-format perspectives capturing pristine alpine lakes, glacial valleys, and natural topographies.",
  },
};

const VALID_CATEGORIES = ["architecture", "weddings", "portraits", "fashion", "commercial"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export default async function CategoryPortfolioPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const categoryKey = resolvedParams.category.toLowerCase();

  if (!VALID_CATEGORIES.includes(categoryKey)) {
    notFound();
  }

  const meta = CATEGORY_METADATA[categoryKey];
  const projects = PROJECTS.filter((p) => p.category === categoryKey);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/portfolio" className="type-meta text-[#77736D] hover:text-[#151515]">
                Portfolio
              </Link>
              <span className="text-[#77736D]">/</span>
              <span className="type-meta text-[#151515] font-semibold">{meta.title}</span>
            </div>
            <h1 className="font-serif text-5xl sm:text-7xl font-normal text-[#151515]">
              {meta.title}
            </h1>
            <p className="type-body-l text-[#77736D] max-w-2xl">
              {meta.subtitle}
            </p>
          </div>

          {/* Quick Category Switcher */}
          <div className="flex flex-wrap items-center gap-6 pt-6 type-meta text-xs">
            <Link href="/portfolio" className="text-[#77736D] hover:text-[#151515]">
              All Projects
            </Link>
            {VALID_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/portfolio/${cat}`}
                className={`capitalize pb-1 ${
                  cat === categoryKey
                    ? "text-[#151515] border-b-2 border-[#151515] font-semibold"
                    : "text-[#77736D] hover:text-[#151515]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-24">
          {projects.length === 0 ? (
            <div className="py-20 text-center text-[#77736D] font-serif text-2xl">
              No monographs published under this category yet.
            </div>
          ) : (
            projects.map((project, idx) => {
              const plateInfo = getImagePlateInfo(project.coverImage);

              return (
                <div key={project.id} className="space-y-6">
                  <Link href={`/project/${project.slug}`} className="group block overflow-hidden">
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plateInfo.aspectClass} ${plateInfo.isLandscape ? (plateInfo.aspectClass === "aspect-[4/3]" ? "max-w-5xl mx-auto" : "max-w-6xl mx-auto") : "max-w-2xl mx-auto"}`}>
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        unoptimized
                        quality={100}
                        sizes="100vw"
                        className="object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 lg:left-10 z-10 type-meta text-white/90 text-xs tracking-widest">
                        {project.location} // {project.year}
                      </div>
                    </div>
                  </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-2 border-t border-[#D9D5CE]">
                  <div>
                    <span className="type-meta text-[#77736D] block mb-1">
                      MONOGRAPH 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#151515]">
                      {project.name}
                    </h3>
                    <p className="type-small text-[#77736D] mt-1 max-w-xl">
                      {project.subtitle}
                    </p>
                  </div>
                  <Link
                    href={`/project/${project.slug}`}
                    className="type-meta text-[#151515] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>Inspect Monograph</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
          )}
        </section>

        {/* CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto pt-36">
          <div className="bg-[#171717] text-white p-12 lg:p-20 text-center space-y-6">
            <span className="type-meta text-[#CC5500]">Commission Inquiry</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal">
              Book your {meta.title.toLowerCase()} commission
            </h2>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="bg-[#F4F1EB] text-[#151515] px-8 py-3.5 type-meta text-xs hover:bg-white transition-colors"
              >
                Start Booking Questionnaire
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
