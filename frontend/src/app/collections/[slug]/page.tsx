"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import {
  ArrowLeft,
  Camera,
  Compass,
  MapPin,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Share2,
} from "lucide-react";
import { getCuratedCollectionBySlug, getCuratedCollections } from "@/lib/curation/curationRegistry";
import { CollectionPhotograph } from "@/lib/curation/types";
import { getImagePlateInfo } from "@/lib/data/studioData";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const collection = getCuratedCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const allCollections = getCuratedCollections();
  const relatedCollections = allCollections.filter((c) => c.slug !== collection.slug).slice(0, 3);

  // Separate photographs:
  // User Rule: If no human is in the image, keep them in the landscape section in original aspect ratio.
  // Only photographs featuring human subjects belong in the portrait section.
  const landscapePhotos = collection.photographs.filter((p) => {
    const info = getImagePlateInfo(p.url);
    const hasHuman = p.hasHuman ?? info.hasHuman;
    return !hasHuman;
  });

  const portraitPhotos = collection.photographs.filter((p) => {
    const info = getImagePlateInfo(p.url);
    const hasHuman = p.hasHuman ?? info.hasHuman;
    return hasHuman;
  });

  const [activeOrientationTab, setActiveOrientationTab] = useState<"all" | "landscape" | "portrait">("all");

  // Lightbox state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % collection.photographs.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + collection.photographs.length) % collection.photographs.length
      );
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activePhoto: CollectionPhotograph | null =
    activeLightboxIndex !== null ? collection.photographs[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans selection:bg-[#CFA570] selection:text-white">
      <FilmGrain />
      <Navbar />

      <main className="pt-24 sm:pt-28 pb-32">
        {/* Navigation Breadcrumb Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-8 flex items-center justify-between border-b border-[#D9D5CE]">
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Collections Archive</span>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515] transition-colors border border-[#D9D5CE] px-3 py-1.5 bg-white"
            >
              <Share2 className="w-3 h-3 text-[#CFA570]" />
              <span>{copiedLink ? "Link Copied" : "Share Folio"}</span>
            </button>
          </div>
        </div>

        {/* 1. Master Hero Stage */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto my-12">
          {(() => {
            const coverInfo = getImagePlateInfo(collection.coverImage);
            return (
              <div
                className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] group shadow-sm flex items-center justify-center ${coverInfo.aspectClass} ${
                  coverInfo.isLandscape
                    ? (coverInfo.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-6xl mx-auto")
                    : "w-full max-w-2xl mx-auto"
                }`}
              >
                <Image
                  src={collection.coverImage}
                  alt={collection.title}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  quality={100}
                  className="object-contain transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                <div className="absolute bottom-6 left-6 lg:left-10 right-6 z-10 flex flex-col sm:flex-row justify-between sm:items-end gap-4 text-white">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#CFA570] block mb-1">
                      Master Cover Plate · {collection.category.toUpperCase()} · {coverInfo.isLandscape ? "Landscape Framing" : "Portrait Framing"}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                      {collection.title}
                    </h2>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/80 self-start sm:self-end">
                    {collection.location} // {collection.year}
                  </div>
                </div>

                <button
                  onClick={() => openLightbox(0)}
                  className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black text-white p-2.5 transition-colors border border-white/20"
                  aria-label="View cover full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            );
          })()}
        </section>

        {/* 2. Collection Header & Curatorial Dossier */}
        <header className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#D9D5CE] pb-12">
            <div className="md:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] block">
                Archival Collection · {collection.totalPhotos} Photographs
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#151515] tracking-tight">
                {collection.title}
              </h1>
              <p className="font-serif italic text-2xl text-[#66625B] leading-relaxed">
                {collection.subtitle}
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono self-end bg-white p-6 border border-[#D9D5CE]">
              <div>
                <span className="text-[#66625B] flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px]">
                  <MapPin className="w-3 h-3 text-[#CFA570]" />
                  Location
                </span>
                <span className="text-[#151515] font-semibold">{collection.location}</span>
              </div>
              <div>
                <span className="text-[#66625B] flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px]">
                  <Compass className="w-3 h-3 text-[#CFA570]" />
                  Coordinates
                </span>
                <span className="text-[#151515] font-semibold">{collection.coordinates || "Archival GPS"}</span>
              </div>
              <div>
                <span className="text-[#66625B] flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px]">
                  <Calendar className="w-3 h-3 text-[#CFA570]" />
                  Fieldwork Year
                </span>
                <span className="text-[#151515] font-semibold">{collection.year}</span>
              </div>
              <div>
                <span className="text-[#66625B] flex items-center gap-1.5 mb-1 uppercase tracking-wider text-[10px]">
                  <Camera className="w-3 h-3 text-[#CFA570]" />
                  Photographer
                </span>
                <span className="text-[#151515] font-semibold">{collection.photographer}</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3. Introduction Statement */}
        <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-20 text-center">
          <p className="font-serif text-2xl sm:text-3xl text-[#151515] leading-relaxed font-normal">
            &ldquo;{collection.intro}&rdquo;
          </p>
        </section>

        {/* 4. Complete Responsive Gallery — Separated Landscape & Portrait Studies */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-28">
          <div className="border-t border-[#D9D5CE] pt-12 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] block mb-1">
                Archival Folio Breakdown
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#151515]">Photographic Plates</h3>
            </div>

            {/* Filter Switcher */}
            <div className="flex flex-wrap items-center gap-2 p-1 bg-white border border-[#D9D5CE] text-xs font-mono">
              <button
                onClick={() => setActiveOrientationTab("all")}
                className={`px-3 py-1.5 transition-colors uppercase tracking-wider ${
                  activeOrientationTab === "all"
                    ? "bg-[#151515] text-white"
                    : "text-[#66625B] hover:text-[#151515]"
                }`}
              >
                All Plates ({collection.photographs.length})
              </button>
              {landscapePhotos.length > 0 && (
                <button
                  onClick={() => setActiveOrientationTab("landscape")}
                  className={`px-3 py-1.5 transition-colors uppercase tracking-wider flex items-center gap-1.5 ${
                    activeOrientationTab === "landscape"
                      ? "bg-[#151515] text-white"
                      : "text-[#66625B] hover:text-[#151515]"
                  }`}
                >
                  <span>Landscape &amp; Architecture</span>
                  <span className="opacity-75">· {landscapePhotos.length}</span>
                </button>
              )}
              {portraitPhotos.length > 0 && (
                <button
                  onClick={() => setActiveOrientationTab("portrait")}
                  className={`px-3 py-1.5 transition-colors uppercase tracking-wider flex items-center gap-1.5 ${
                    activeOrientationTab === "portrait"
                      ? "bg-[#151515] text-white"
                      : "text-[#66625B] hover:text-[#151515]"
                  }`}
                >
                  <span>Portraits (Humans)</span>
                  <span className="opacity-75">· {portraitPhotos.length}</span>
                </button>
              )}
            </div>
          </div>

          <div className="space-y-20">
            {/* PART 1: LANDSCAPE & ARCHITECTURAL STUDIES (All images without human subjects, in original aspect ratio) */}
            {(activeOrientationTab === "all" || activeOrientationTab === "landscape") && landscapePhotos.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-baseline justify-between border-b border-[#D9D5CE]/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                      {portraitPhotos.length > 0 ? "Folio 01 // Landscape & Structural Studies" : "Curated Photographic Plates"}
                    </span>
                    <h4 className="font-serif text-2xl text-[#151515]">
                      {portraitPhotos.length > 0 ? "Landscape & Architecture" : "Landscape & Environment"}
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                    {landscapePhotos.length} Plates · Original Aspect Ratio
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  {landscapePhotos.map((photo) => {
                    const originalIdx = collection.photographs.findIndex((p) => p.id === photo.id);
                    const photoInfo = getImagePlateInfo(photo.url);
                    const aspectClass = photoInfo.aspectClass || (photoInfo.isLandscape ? "aspect-[3/2]" : "aspect-[2/3]");
                    const formatLabel = photoInfo.isLandscape
                      ? `Landscape ${photoInfo.aspectRatio}`
                      : `Vertical ${photoInfo.aspectRatio}`;

                    return (
                      <figure
                        key={photo.id}
                        className="group cursor-pointer space-y-3"
                        onClick={() => openLightbox(originalIdx >= 0 ? originalIdx : 0)}
                      >
                        <div
                          className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center w-full ${aspectClass}`}
                        >
                          <Image
                            src={photo.url}
                            alt={photo.altText}
                            fill
                            unoptimized
                            quality={100}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white p-1.5">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 pointer-events-none">
                            {formatLabel}
                          </div>
                        </div>

                        <figcaption className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-2 text-[12px] text-[#66625B]">
                          <span className="font-mono uppercase tracking-widest text-[#151515] font-medium">
                            Plate {String(photo.order).padStart(2, "0")}
                          </span>
                          <span className="ml-3 truncate font-serif italic text-[#77736D] max-w-[70%]">
                            {photo.caption}
                          </span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PART 2: PORTRAIT STUDIES (Rendered when human subjects exist, in original aspect ratio) */}
            {(activeOrientationTab === "all" || activeOrientationTab === "portrait") && portraitPhotos.length > 0 && (
              <div className="space-y-8">
                <div className="flex items-baseline justify-between border-b border-[#D9D5CE]/80 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#CFA570] uppercase tracking-widest font-semibold">
                      Folio 02 // Character Studies
                    </span>
                    <h4 className="font-serif text-2xl text-[#151515]">Portraits &amp; Human Sittings</h4>
                  </div>
                  <span className="font-mono text-xs text-[#77736D] uppercase tracking-widest">
                    {portraitPhotos.length} Portrait Plates · Original Aspect Ratio
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                  {portraitPhotos.map((photo) => {
                    const originalIdx = collection.photographs.findIndex((p) => p.id === photo.id);
                    const photoInfo = getImagePlateInfo(photo.url);
                    const aspectClass = photoInfo.aspectClass || (photoInfo.isLandscape ? "aspect-[3/2]" : "aspect-[2/3]");
                    const formatLabel = `Portrait ${photoInfo.aspectRatio}`;

                    return (
                      <figure
                        key={photo.id}
                        className="group cursor-pointer space-y-3"
                        onClick={() => openLightbox(originalIdx >= 0 ? originalIdx : 0)}
                      >
                        <div
                          className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] shadow-sm flex items-center justify-center w-full ${aspectClass}`}
                        >
                          <Image
                            src={photo.url}
                            alt={photo.altText}
                            fill
                            unoptimized
                            quality={100}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white p-1.5">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="absolute bottom-3 left-3 bg-black/70 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 pointer-events-none">
                            {formatLabel}
                          </div>
                        </div>

                        <figcaption className="flex items-baseline justify-between border-b border-[#D9D5CE] pb-2 text-[12px] text-[#66625B]">
                          <span className="font-mono uppercase tracking-widest text-[#151515] font-medium">
                            Plate {String(photo.order).padStart(2, "0")}
                          </span>
                          <span className="ml-3 truncate font-serif italic text-[#77736D] max-w-[70%]">
                            {photo.caption}
                          </span>
                        </figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. Curatorial Narrative */}
        <section className="px-6 lg:px-12 max-w-3xl mx-auto mb-28">
          <div className="border-t border-b border-[#D9D5CE] py-12 space-y-4">
            <span className="text-[11px] font-mono tracking-widest uppercase text-[#66625B] block">
              The Curatorial Field Report
            </span>
            <p className="font-serif text-lg sm:text-xl text-[#151515] leading-relaxed">
              {collection.curatorialStory}
            </p>
          </div>
        </section>

        {/* 6. Related Location Collections */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto mb-20">
          <div className="border-t border-[#D9D5CE] pt-12 mb-8 flex justify-between items-baseline">
            <h4 className="font-serif text-2xl text-[#151515]">Explore Other Destinations</h4>
            <Link
              href="/collections"
              className="text-xs font-mono uppercase tracking-widest text-[#CFA570] hover:underline"
            >
              View Full Archive
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {relatedCollections.map((rel) => {
              const relInfo = getImagePlateInfo(rel.coverImage);
              return (
                <Link
                  key={rel.slug}
                  href={`/collections/${rel.slug}`}
                  className="group block space-y-3"
                >
                  <div className={`relative overflow-hidden bg-[#171717] border border-[#D9D5CE] flex items-center justify-center ${relInfo.aspectClass}`}>
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      unoptimized
                      quality={100}
                      sizes="33vw"
                      className="object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#77736D] block">
                    {rel.location} · {rel.totalPhotos} Plates
                  </span>
                  <h5 className="font-serif text-xl text-[#151515] group-hover:text-[#CFA570] transition-colors mt-0.5">
                    {rel.title}
                  </h5>
                </div>
              </Link>
            );
          })}
          </div>
        </section>
      </main>

      {/* 7. Full-Screen Interactive Lightbox */}
      {activeLightboxIndex !== null && activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar */}
          <div className="flex justify-between items-center z-10">
            <div className="font-mono text-xs uppercase tracking-widest text-white/70">
              Plate {String(activePhoto.order).padStart(2, "0")} / {collection.photographs.length} · {collection.location}
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              aria-label="Close full screen viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual Frame */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevLightbox}
              className="absolute left-2 sm:left-6 z-20 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-h-[82vh] flex items-center justify-center">
              <Image
                src={activePhoto.url}
                alt={activePhoto.altText}
                fill
                unoptimized
                quality={100}
                className="object-contain"
                sizes="100vw"
              />
            </div>

            <button
              onClick={nextLightbox}
              className="absolute right-2 sm:right-6 z-20 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="max-w-3xl mx-auto text-center space-y-1 z-10">
            <p className="font-serif italic text-lg sm:text-xl text-white">
              {activePhoto.caption}
            </p>
            {activePhoto.camera && (
              <span className="font-mono text-[11px] text-white/60 block uppercase tracking-wider">
                {activePhoto.camera} {activePhoto.exposure ? `· ${activePhoto.exposure}` : ""}
              </span>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
