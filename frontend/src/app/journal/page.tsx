import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight } from "lucide-react";
import { STORIES, getImagePlateInfo } from "@/lib/data/studioData";

export default function JournalIndexPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-4">
            <span className="type-meta text-[#77736D]">05 // Fieldwork &amp; Observations</span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515]">
              Journal
            </h1>
            <p className="type-body-l text-[#77736D] max-w-2xl">
              Technical field notes, chemical darkroom experiments, gear reflections, and philosophical musings from the Studioza team.
            </p>
          </div>
        </section>

        {/* Journal Entries Grid */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {STORIES.map((entry) => {
              const plateInfo = getImagePlateInfo(entry.coverImage);
              return (
                <article key={entry.id} className="space-y-4 group">
                  <Link href={`/journal/${entry.slug}`} className="block overflow-hidden">
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${plateInfo.isLandscape ? "aspect-[3/2] w-full" : "aspect-[2/3] max-w-xs mx-auto"}`}>
                      <Image
                        src={entry.coverImage}
                        alt={entry.title}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-2"
                      />
                    </div>
                  </Link>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 type-meta text-[#77736D] text-[11px]">
                    <span>{entry.date}</span>
                    <span>•</span>
                    <span>{entry.readTime}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#151515] group-hover:underline">
                    <Link href={`/journal/${entry.slug}`}>
                      {entry.title}
                    </Link>
                  </h3>

                  <p className="type-small text-[#77736D] line-clamp-3">
                    {entry.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/journal/${entry.slug}`}
                      className="type-meta text-[#151515] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Read Field Note</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
