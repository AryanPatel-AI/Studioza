import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SERVICES, getImagePlateInfo } from "@/lib/data/studioData";

export default function ServicesIndexPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Header */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="border-b border-[#D9D5CE] pb-10 space-y-4">
            <span className="type-meta text-[#77736D]">03 // Studio Disciplines</span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515]">
              Services
            </h1>
            <p className="type-body-l text-[#77736D] max-w-2xl">
              We specialize in five core creative disciplines: weddings, fine art portraits, fashion editorials, architectural documentation, and private cultural events.
            </p>
          </div>
        </section>

        {/* Disciplines & Services Showcase */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-24">
          {SERVICES.map((service, idx) => (
            <div
              key={service.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-[#D9D5CE] pb-24"
            >
              <div className="lg:col-span-6">
                {(() => {
                  const plateInfo = getImagePlateInfo(service.coverImage);
                  return (
                    <Link href={`/services/${service.slug}`} className="group block overflow-hidden">
                      <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${plateInfo.aspectClass} ${plateInfo.isLandscape ? "w-full" : "max-w-sm mx-auto"}`}>
                        <Image
                          quality={100}
                          unoptimized
                          src={service.coverImage}
                          alt={service.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain p-2"
                        />
                      </div>
                    </Link>
                  );
                })()}
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="type-meta text-[#77736D]">DISCIPLINE 0{idx + 1}</span>
                  <span className="type-meta text-[#CC5500] text-xs">{service.startingPrice}</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
                  <Link href={`/services/${service.slug}`} className="hover:underline">
                    {service.name}
                  </Link>
                </h2>

                <p className="type-body-l text-[#77736D]">
                  {service.tagline}
                </p>

                <p className="type-body text-[#151515] leading-relaxed">
                  {service.philosophy}
                </p>

                <div className="pt-2 flex items-center gap-6">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 bg-[#151515] text-[#F4F1EB] px-6 py-3.5 type-meta text-xs hover:bg-[#333333] transition-colors"
                  >
                    <span>View Deliverables &amp; Process</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/booking"
                    className="type-meta text-[#151515] hover:underline text-xs"
                  >
                    Book Consultation →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Studio Standard Principles */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto pt-24">
          <div className="bg-[#171717] text-white p-12 lg:p-16 space-y-8">
            <span className="type-meta text-[#CC5500]">Our Technical &amp; Archival Standard</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-white">Medium Format Glass</h4>
                <p className="type-small text-[#A39E96]">
                  Phase One and Hasselblad medium format sensors delivering 100MP optical resolution and natural dynamic range.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-white">Silver Halide Chemistry</h4>
                <p className="type-small text-[#A39E96]">
                  Selected large format 4x5 and 120 film sheets hand-processed in our Jaipur darkroom for true tonal richness.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-2xl text-white">Bespoke Monograph Binding</h4>
                <p className="type-small text-[#A39E96]">
                  Heirloom books printed on 100% cotton rag paper, bound by master artisans in leather and Florentine marble paper.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
