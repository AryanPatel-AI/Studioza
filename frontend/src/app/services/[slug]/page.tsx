import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowLeft, ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { SERVICES, PROJECTS, getImagePlateInfo } from "@/lib/data/studioData";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = SERVICES.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const portfolioExamples = PROJECTS.filter((p) =>
    service.portfolioSlugs.includes(p.slug)
  );

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-28 pb-32">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 type-meta text-[#77736D] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Services</span>
          </Link>
        </div>

        {/* 1. Hero */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="type-meta text-[#77736D] block">DISCIPLINE COMMISSION</span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#151515]">
                {service.name}
              </h1>
              <p className="font-serif italic text-2xl text-[#77736D] leading-relaxed">
                {service.tagline}
              </p>
              <div className="pt-2">
                <span className="type-meta text-[#151515] font-semibold text-sm">
                  INVESTMENT: {service.startingPrice.toUpperCase()}
                </span>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/booking"
                  className="bg-[#151515] text-[#F4F1EB] px-8 py-3.5 type-meta text-xs hover:bg-[#333333] transition-colors"
                >
                  Start Commission Booking →
                </Link>
                <Link
                  href="/contact"
                  className="type-meta text-[#151515] hover:underline text-xs"
                >
                  Inquire Direct
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              {(() => {
                const servicePlate = getImagePlateInfo(service.coverImage);
                return (
                  <div className={`relative bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${servicePlate.aspectClass} ${servicePlate.isLandscape ? "w-full" : "max-w-sm mx-auto"}`}>
                    <Image
                      src={service.coverImage}
                      alt={service.name}
                      fill
                      priority
                      unoptimized
                      quality={100}
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-contain p-2"
                    />
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* 2. Philosophy */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-28">
          <div className="bg-white p-10 sm:p-14 border border-[#D9D5CE] space-y-6">
            <span className="type-meta text-[#77736D]">Our Philosophy &amp; Stance</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] leading-snug">
              &ldquo;{service.philosophy}&rdquo;
            </h2>
          </div>
        </section>

        {/* 3. What is Included */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="border-t border-[#D9D5CE] pt-16 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="type-meta text-[#77736D]">Deliverables &amp; Inclusions</span>
              <h3 className="font-serif text-4xl text-[#151515]">What is Included</h3>
              <p className="type-small text-[#77736D]">
                Every detail is handled with uncompromising curatorial care from preliminary location scouting to archival binding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.included.map((item, idx) => (
                <div key={idx} className="p-6 bg-white border border-[#D9D5CE] space-y-3">
                  <div className="flex items-center gap-2 text-[#9CAF88]">
                    <Check className="w-4 h-4" />
                    <span className="type-meta text-[11px]">DELIVERABLE 0{idx + 1}</span>
                  </div>
                  <p className="type-small text-[#151515] font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Process */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="border-t border-[#D9D5CE] pt-16 space-y-12">
            <div className="max-w-2xl space-y-2">
              <span className="type-meta text-[#77736D]">Methodology</span>
              <h3 className="font-serif text-4xl text-[#151515]">The Commission Process</h3>
              <p className="type-small text-[#77736D]">
                Four disciplined stages designed to eliminate friction and yield an enduring historical document.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((p) => (
                <div key={p.step} className="space-y-4 border-t border-[#151515] pt-4">
                  <span className="font-serif text-3xl text-[#151515] block">{p.step}</span>
                  <h4 className="font-serif text-2xl text-[#151515]">{p.title}</h4>
                  <p className="type-small text-[#77736D] leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Portfolio Examples */}
        {portfolioExamples.length > 0 && (
          <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
            <div className="border-t border-[#D9D5CE] pt-16 space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <span className="type-meta text-[#77736D]">Exemplar Works</span>
                  <h3 className="font-serif text-4xl text-[#151515]">Portfolio Monographs</h3>
                </div>
                <Link href="/portfolio" className="type-meta text-[#151515] hover:underline flex items-center gap-1">
                  <span>View All Works</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {portfolioExamples.map((project) => {
                  const plateInfo = getImagePlateInfo(project.coverImage);
                  return (
                    <Link
                      key={project.id}
                      href={`/project/${project.slug}`}
                      className="group space-y-4 block"
                    >
                      <div className={`relative bg-[#EAE6DE] border border-[#D9D5CE] p-4 flex items-center justify-center ${plateInfo.aspectClass} ${plateInfo.isLandscape ? "w-full" : "max-w-sm mx-auto"}`}>
                        <Image
                          src={project.coverImage}
                          alt={project.name}
                          fill
                          unoptimized
                          quality={100}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex justify-between items-baseline pt-1">
                        <h4 className="font-serif text-2xl text-[#151515] group-hover:underline">
                          {project.name}
                        </h4>
                        <span className="type-meta text-[#77736D] text-[11px]">{project.year}</span>
                      </div>
                      <p className="type-small text-[#77736D]">
                        {project.subtitle}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 6. FAQ */}
        <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-28">
          <div className="border-t border-[#D9D5CE] pt-16 space-y-8">
            <div className="space-y-2">
              <span className="type-meta text-[#77736D]">Clarifications</span>
              <h3 className="font-serif text-4xl text-[#151515]">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-8 border border-[#D9D5CE] space-y-3">
                  <h4 className="font-serif text-2xl text-[#151515]">{faq.question}</h4>
                  <p className="type-body text-[#77736D] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-[#171717] text-white p-12 lg:p-20 text-center space-y-6">
            <span className="type-meta text-[#CC5500]">Initiate Commission</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal">
              Commission {service.name}
            </h2>
            <p className="type-body text-[#A39E96] max-w-md mx-auto">
              Tell us about your celebration, campaign, or architectural commission.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/booking"
                className="bg-[#F4F1EB] text-[#151515] px-8 py-3.5 type-meta text-xs hover:bg-white transition-colors"
              >
                Proceed to Multi-Step Booking Questionnaire →
              </Link>
              <Link
                href="/contact"
                className="border border-white/30 text-white px-8 py-3.5 type-meta text-xs hover:bg-white/10 transition-colors"
              >
                Send General Message
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
