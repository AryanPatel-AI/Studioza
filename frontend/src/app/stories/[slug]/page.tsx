import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { STORIES, PROJECTS, getImagePlateInfo } from "@/lib/data/studioData";

export function generateStaticParams() {
  return STORIES.map((story) => ({ slug: story.slug }));
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const story = STORIES.find((s) => s.slug === resolvedParams.slug);

  if (!story) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((p) =>
    story.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-28 pb-32">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-6 lg:px-12 pt-6 pb-6">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 type-meta text-[#77736D] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories</span>
          </Link>
        </div>

        {/* 1. Hero */}
        {(() => {
          const heroInfo = getImagePlateInfo(story.coverImage);
          return (
            <section className="max-w-5xl mx-auto px-6 lg:px-12 mb-14">
              <div className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center ${heroInfo.aspectClass} ${heroInfo.isLandscape ? (heroInfo.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-5xl mx-auto") : "max-w-2xl mx-auto"}`}>
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  fill
                  priority
                  unoptimized
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </section>
          );
        })()}

        {/* 2. Headline & 3. Metadata */}
        <header className="max-w-3xl mx-auto px-6 lg:px-12 mb-16 space-y-6 text-center">
          <span className="type-meta text-[#77736D] block">
            {story.category.toUpperCase()} // ESSAY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#151515] leading-[1.05]">
            {story.title}
          </h1>
          <p className="font-serif italic text-2xl text-[#77736D] leading-relaxed">
            {story.subtitle}
          </p>
          <div className="flex items-center justify-center gap-4 type-meta text-[#77736D] text-xs pt-4 border-t border-[#D9D5CE]">
            <span>By {story.author}</span>
            <span>•</span>
            <span>{story.date}</span>
            <span>•</span>
            <span>{story.readTime}</span>
          </div>
        </header>

        {/* 4. Editorial Text (First Section) */}
        <article className="max-w-2xl mx-auto px-6 lg:px-12 mb-16 space-y-6">
          <p className="type-body-l text-[#151515] leading-relaxed font-normal">
            {story.editorialText1}
          </p>
        </article>

        {/* 5. Photography (Plate 1) */}
        {(() => {
          const p1 = getImagePlateInfo(story.plate1);
          return (
            <section className="max-w-5xl mx-auto px-6 lg:px-12 mb-20 space-y-3">
              <div className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center ${p1.aspectClass} ${p1.isLandscape ? (p1.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-5xl mx-auto") : "max-w-2xl mx-auto"}`}>
                <Image
                  src={story.plate1}
                  alt={story.plate1Caption}
                  fill
                  unoptimized
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <p className="type-meta text-[#77736D] text-center text-[11px]">
                {story.plate1Caption}
              </p>
            </section>
          );
        })()}

        {/* 6. Photography (Plate 2) */}
        {(() => {
          const p2 = getImagePlateInfo(story.plate2);
          return (
            <section className="max-w-4xl mx-auto px-6 lg:px-12 mb-20 space-y-3">
              <div className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center ${p2.aspectClass} ${p2.isLandscape ? "w-full max-w-4xl mx-auto" : "max-w-2xl mx-auto"}`}>
                <Image
                  src={story.plate2}
                  alt={story.plate2Caption}
                  fill
                  unoptimized
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <p className="type-meta text-[#77736D] text-center text-[11px]">
                {story.plate2Caption}
              </p>
            </section>
          );
        })()}

        {/* Editorial Text (Mid Section) */}
        <article className="max-w-2xl mx-auto px-6 lg:px-12 mb-16 space-y-6">
          <p className="type-body-l text-[#151515] leading-relaxed font-normal">
            {story.editorialText2}
          </p>
        </article>

        {/* 7. Quote (Large Pull Quote) */}
        <section className="max-w-3xl mx-auto px-6 lg:px-12 my-20">
          <blockquote className="border-l-2 border-[#151515] pl-8 py-2 font-serif italic text-3xl sm:text-4xl text-[#151515] leading-tight">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </section>

        {/* 8. Photography (Plate 3) */}
        {(() => {
          const p3 = getImagePlateInfo(story.plate3);
          return (
            <section className="max-w-5xl mx-auto px-6 lg:px-12 mb-20 space-y-3">
              <div className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center ${p3.aspectClass} ${p3.isLandscape ? (p3.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-5xl mx-auto") : "max-w-2xl mx-auto"}`}>
                <Image
                  src={story.plate3}
                  alt={story.plate3Caption}
                  fill
                  unoptimized
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <p className="type-meta text-[#77736D] text-center text-[11px]">
                {story.plate3Caption}
              </p>
            </section>
          );
        })()}

        {/* Editorial Conclusion */}
        <article className="max-w-2xl mx-auto px-6 lg:px-12 mb-28 space-y-6 border-b border-[#D9D5CE] pb-16">
          <p className="type-body-l text-[#151515] leading-relaxed font-normal">
            {story.editorialConclusion}
          </p>
        </article>

        {/* 9. Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="max-w-5xl mx-auto px-6 lg:px-12 space-y-10">
            <div className="flex justify-between items-end border-b border-[#D9D5CE] pb-4">
              <h3 className="font-serif text-3xl text-[#151515]">Related Monographs</h3>
              <span className="type-meta text-[#77736D]">FIELD ARCHIVE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((p) => {
                const plateInfo = getImagePlateInfo(p.coverImage);
                return (
                  <Link
                    key={p.id}
                    href={`/project/${p.slug}`}
                    className="group block space-y-3"
                  >
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${plateInfo.isLandscape ? "aspect-[3/2] w-full" : "aspect-[2/3] max-w-sm mx-auto"}`}>
                      <Image
                        src={p.coverImage}
                        alt={p.name}
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex justify-between items-baseline pt-1">
                      <h4 className="font-serif text-2xl text-[#151515] group-hover:underline">
                        {p.name}
                      </h4>
                      <span className="type-meta text-[#77736D] text-[11px]">{p.year}</span>
                    </div>
                    <p className="type-small text-[#77736D]">
                      {p.subtitle}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
