import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import FilmGrain from '@/components/film/FilmGrain';
import { DevelopingPlate } from '@/components/editorial/DevelopingPlate';
import { ArrowLeft, ArrowRight, Printer } from 'lucide-react';
import { PROJECTS, getImagePlateInfo } from '@/lib/data/studioData';

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === resolvedParams.slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject =
    projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject =
    projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  const allImages = [
    { url: project.coverImage, alt: `${project.name} Cover Plate`, caption: 'Cover Plate' },
    ...project.gallery,
  ];
  const totalPlates = allImages.length;
  const issueNumber = String(projectIndex + 14).padStart(3, '0');

  // User Rule: If no human is in the image, keep them in the landscape section in original aspect ratio.
  const landscapeGallery = project.gallery.filter((img) => !getImagePlateInfo(img.url).hasHuman);
  const portraitGallery = project.gallery.filter((img) => getImagePlateInfo(img.url).hasHuman);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans">
      <FilmGrain />
      <div className="no-print">
        <Navbar />
      </div>

      <main className="pt-24 sm:pt-28 pb-32">
        {/* Breadcrumb & Print Utility Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-8 flex items-center justify-between no-print">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </Link>

          <button
            type="button"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515] transition-colors border border-[#D9D5CE] px-3 py-1.5 bg-white"
          >
            <Printer className="w-3 h-3 text-[#CFA570]" />
            <span>Save Folio PDF</span>
          </button>
        </div>

        {/* 1. Hero Plate */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          {(() => {
            const coverPlateInfo = getImagePlateInfo(project.coverImage);
            return (
              <div
                className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] zoomable flex items-center justify-center ${coverPlateInfo.aspectClass} ${
                  coverPlateInfo.isLandscape
                    ? (coverPlateInfo.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-6xl mx-auto")
                    : "w-full max-w-2xl mx-auto"
                }`}
              >
                <Image
                  src={project.coverImage}
                  alt={project.name}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  quality={100}
                  className="object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 lg:left-10 z-10 font-mono text-[11px] uppercase tracking-widest text-white/90">
                  Plate 01 / {String(totalPlates).padStart(2, '0')} · {project.location} // {project.year} · {coverPlateInfo.isLandscape ? "Landscape Master" : "Portrait Master"}
                </div>
              </div>
            );
          })()}
        </section>

        {/* 2. Monograph Title & Archival Register Header */}
        <header className="px-6 lg:px-12 max-w-7xl mx-auto mb-20 monograph-header">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D5CE] pb-12">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] block">
                Monograph No. {issueNumber} · {project.category.toUpperCase()}
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#151515] tracking-tight">
                {project.name}
              </h1>
              <p className="font-serif italic text-2xl text-[#66625B]">
                {project.subtitle || `${project.location} — ${project.year}`}
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono self-end">
              <div>
                <span className="text-[#66625B] block mb-1 uppercase tracking-wider text-[10px]">
                  Patron / Client
                </span>
                <span className="text-[#151515] font-semibold">{project.client || 'Studioza Atelier'}</span>
              </div>
              <div>
                <span className="text-[#66625B] block mb-1 uppercase tracking-wider text-[10px]">
                  Location
                </span>
                <span className="text-[#151515] font-semibold">{project.location}</span>
              </div>
              <div>
                <span className="text-[#66625B] block mb-1 uppercase tracking-wider text-[10px]">
                  Year
                </span>
                <span className="text-[#151515] font-semibold">{project.year}</span>
              </div>
              <div>
                <span className="text-[#66625B] block mb-1 uppercase tracking-wider text-[10px]">
                  Discipline
                </span>
                <span className="text-[#151515] font-semibold capitalize">{project.category}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Introduction Statement */}
        {project.intro && (
          <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-24">
            <p className="font-serif text-2xl sm:text-3xl text-[#151515] leading-relaxed font-normal">
              &ldquo;{project.intro}&rdquo;
            </p>
          </section>
        )}

        {/* 4. Sequential Plates Gallery — Non-Human in Landscape Folio, Humans in Portrait Folio */}
        <section className="px-6 lg:px-12 max-w-6xl mx-auto space-y-28 mb-28">
          {landscapeGallery.length > 0 && (
            <div className="space-y-16">
              <div className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                    {portraitGallery.length > 0 ? "Folio I // Landscape & Structural Studies" : "Curated Photographic Plates"}
                  </span>
                  <h3 className="font-serif text-2xl text-[#151515]">
                    {portraitGallery.length > 0 ? "Landscape & Architecture" : "Landscape & Environment"}
                  </h3>
                </div>
                <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                  {landscapeGallery.length} Plates · Original Framing
                </span>
              </div>
              <div className="space-y-24">
                {landscapeGallery.map((img, idx) => {
                  const plateInfo = getImagePlateInfo(img.url);
                  return (
                    <DevelopingPlate
                      key={img.id || idx}
                      image={{
                        src: img.url,
                        alt: img.alt || `${project.name} Scenic Plate ${idx + 2}`,
                        width: plateInfo.naturalWidth,
                        height: plateInfo.naturalHeight,
                      }}
                      caption={img.caption || undefined}
                      plateNo={idx + 2}
                      total={totalPlates}
                      layout="full"
                    />
                  );
                })}
              </div>
            </div>
          )}

          {portraitGallery.length > 0 && (
            <div className="space-y-16">
              <div className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                    Folio II // Character Studies
                  </span>
                  <h3 className="font-serif text-2xl text-[#151515]">Portraits &amp; Human Sittings</h3>
                </div>
                <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                  {portraitGallery.length} Portrait Plates · Original Framing
                </span>
              </div>
              <div className="space-y-24">
                {portraitGallery.map((img, idx) => {
                  const plateInfo = getImagePlateInfo(img.url);
                  return (
                    <DevelopingPlate
                      key={img.id || idx}
                      image={{
                        src: img.url,
                        alt: img.alt || `${project.name} Portrait Plate ${landscapeGallery.length + idx + 2}`,
                        width: plateInfo.naturalWidth,
                        height: plateInfo.naturalHeight,
                      }}
                      caption={img.caption || undefined}
                      plateNo={landscapeGallery.length + idx + 2}
                      total={totalPlates}
                      layout="full"
                    />
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* 5. Editorial Narrative */}
        {project.story && (
          <section className="px-6 lg:px-12 max-w-3xl mx-auto mb-28 monograph-narrative">
            <div className="border-t border-b border-[#D9D5CE] py-12 space-y-4">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#66625B] block">
                The Curatorial Narrative
              </span>
              <p className="font-serif text-lg sm:text-xl text-[#151515] leading-relaxed">
                {project.story}
              </p>
            </div>
          </section>
        )}

        {/* 6. Production & Archival Credits */}
        {project.credits && project.credits.length > 0 && (
          <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-28 monograph-credits">
            <div className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#66625B] block">
                Production Dossier
              </span>
              <h3 className="font-serif text-2xl text-[#151515]">Credits &amp; Negative Register</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#D9D5CE] pt-6 text-xs font-mono">
                {project.credits.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-baseline border-b border-[#D9D5CE]/50 pb-2"
                  >
                    <span className="text-[#66625B] uppercase text-[10px]">{c.role}</span>
                    <span className="text-[#151515] font-medium">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 7. Previous / Next Navigation */}
        <nav
          aria-label="Monograph pagination"
          className="px-6 lg:px-12 max-w-7xl mx-auto pt-16 border-t border-[#D9D5CE] no-print"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Link
              href={`/project/${prevProject.slug}`}
              className="p-6 border border-[#D9D5CE] hover:border-[#151515] bg-white transition-all group flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66625B] flex items-center gap-1.5 mb-3">
                <ArrowLeft className="w-3 h-3 text-[#CFA570]" />
                <span>Previous Issue</span>
              </span>
              <span className="font-serif text-2xl text-[#151515] group-hover:text-[#CFA570] transition-colors">
                {prevProject.name}
              </span>
            </Link>

            <Link
              href={`/project/${nextProject.slug}`}
              className="p-6 border border-[#D9D5CE] hover:border-[#151515] bg-white transition-all group flex flex-col justify-between text-right"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#66625B] flex items-center justify-end gap-1.5 mb-3">
                <span>Next Issue</span>
                <ArrowRight className="w-3 h-3 text-[#CFA570]" />
              </span>
              <span className="font-serif text-2xl text-[#151515] group-hover:text-[#CFA570] transition-colors">
                {nextProject.name}
              </span>
            </Link>
          </div>
        </nav>
      </main>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
