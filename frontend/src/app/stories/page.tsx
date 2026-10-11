import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { STORIES, getImagePlateInfo } from "@/lib/data/studioData";

export default function StoriesPage() {
  const featuredStory = STORIES[0];
  const gridStories = STORIES.slice(1);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-4">
            <span className="type-meta text-[#77736D]">02 // Editorial Publication</span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515]">
              Stories
            </h1>
            <p className="type-body-l text-[#77736D] max-w-2xl">
              Essays, darkroom journals, technical observations, and photographic reflections from our expeditions.
            </p>
          </div>
        </section>

        {/* Featured Story */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="bg-[#171717] text-white p-8 lg:p-14 border border-[#D9D5CE]/30">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                {(() => {
                  const featPlate = getImagePlateInfo(featuredStory.coverImage);
                  return (
                    <Link href={`/stories/${featuredStory.slug}`} className="group block overflow-hidden">
                      <div className={`relative overflow-hidden bg-black/40 p-4 flex items-center justify-center ${featPlate.isLandscape ? "aspect-[3/2] w-full" : "aspect-[2/3] max-w-sm mx-auto"}`}>
                        <Image
                          src={featuredStory.coverImage}
                          alt={featuredStory.title}
                          fill
                          priority
                          quality={100}
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>
                  );
                })()}
              </div>

              <div className="lg:col-span-5 space-y-6">
                <span className="type-meta text-[#CC5500] block">FEATURED ESSAY // {featuredStory.category.toUpperCase()}</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
                  <Link href={`/stories/${featuredStory.slug}`} className="hover:text-[#CC5500] transition-colors">
                    {featuredStory.title}
                  </Link>
                </h2>
                <p className="type-meta text-[#A39E96] text-xs">
                  {featuredStory.date} • By {featuredStory.author} • {featuredStory.readTime}
                </p>
                <p className="type-body text-[#A39E96] leading-relaxed">
                  {featuredStory.excerpt}
                </p>
                <div className="pt-2">
                  <Link
                    href={`/stories/${featuredStory.slug}`}
                    className="inline-flex items-center gap-2 type-meta text-[#CC5500] hover:text-white transition-colors"
                  >
                    <span>Read Monograph Essay</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Story Articles */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
          <div className="border-b border-[#D9D5CE] pb-4">
            <h3 className="font-serif text-3xl text-[#151515]">Fieldwork Catalog</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {gridStories.map((story) => {
              const storyPlate = getImagePlateInfo(story.coverImage);
              return (
                <article key={story.id} className="space-y-6 group">
                  <Link href={`/stories/${story.slug}`} className="block overflow-hidden">
                    <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${storyPlate.aspectClass} ${storyPlate.isLandscape ? "w-full" : "max-w-sm mx-auto"}`}>
                      <Image
                        src={story.coverImage}
                        alt={story.title}
                        fill
                        unoptimized
                        quality={100}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-contain p-2"
                      />
                    </div>
                  </Link>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 type-meta text-[#77736D] text-[11px]">
                    <span>{story.category}</span>
                    <span>•</span>
                    <span>{story.date}</span>
                    <span>•</span>
                    <span>{story.readTime}</span>
                  </div>

                  <h4 className="font-serif text-3xl text-[#151515] group-hover:text-[#77736D] transition-colors">
                    <Link href={`/stories/${story.slug}`}>
                      {story.title}
                    </Link>
                  </h4>

                  <p className="type-small text-[#77736D] leading-relaxed">
                    {story.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="type-meta text-[#151515] hover:underline inline-flex items-center gap-1.5"
                    >
                      <span>Read Story</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
          </div>
        </section>

        {/* 3. Load More / Newsletter */}
        <section className="px-6 lg:px-12 max-w-4xl mx-auto pt-32 text-center">
          <div className="border-t border-[#D9D5CE] pt-16 space-y-4">
            <span className="type-meta text-[#77736D]">Print Dispatch &amp; Digital Monograph</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#151515]">
              Receive our quarterly print edition
            </h3>
            <p className="type-small text-[#77736D] max-w-md mx-auto">
              We publish quarterly field monographs exploring photographic chemistry, architecture, and lighting.
            </p>
            <div className="pt-4 flex justify-center">
              <Link
                href="/contact"
                className="bg-[#151515] text-[#F4F1EB] px-8 py-3.5 type-meta text-xs hover:bg-[#333333] transition-colors"
              >
                Subscribe to Editorial Dispatch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
