import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, Compass, Layers, Calendar, Sliders } from "lucide-react";
import { PROJECTS, ProjectData, getImagePlateInfo } from "@/lib/data/studioData";

const SLUG_ALIASES: Record<string, string> = {
  // Canonical monograph slugs
  "jaipur-royal-citadels": "jaipur-royal-citadels",
  "kashmir-valley-expedition": "kashmir-valley-expedition",
  "chittor-fort-monoliths": "chittor-fort-monoliths",
  "uttarakhand-sacred-sanctuaries": "uttarakhand-sacred-sanctuaries",
  "vrindavan-sacred-architecture": "vrindavan-sacred-architecture",
  "bareilly-monograph-series": "bareilly-monograph-series",

  // Legacy & convenience aliases
  "heritage-celebration": "jaipur-royal-citadels",
  "amer-citadel": "jaipur-royal-citadels",
  "heritage": "jaipur-royal-citadels",
  "jaigarh-citadel": "jaipur-royal-citadels",
  "hilltop-citadel": "jaipur-royal-citadels",
  "citadel": "jaipur-royal-citadels",
  "courtyard-scale": "jaipur-royal-citadels",
  "sandstone-domes": "jaipur-royal-citadels",
  "fort-ramparts": "jaipur-royal-citadels",
  "sheesh-mahal-portraits": "jaipur-royal-citadels",
  "portraits": "jaipur-royal-citadels",

  "kashmir": "kashmir-valley-expedition",
  "dal-lake": "kashmir-valley-expedition",
  "sonamarg": "kashmir-valley-expedition",

  "chittorgarh-citadel": "chittor-fort-monoliths",
  "amber-couture": "chittor-fort-monoliths",
  "chittor": "chittor-fort-monoliths",
  "chittorgarh": "chittor-fort-monoliths",
  "chittor-fort": "chittor-fort-monoliths",
  "monochrome-temple": "chittor-fort-monoliths",

  "jageshwar-dham": "uttarakhand-sacred-sanctuaries",
  "jageshwar": "uttarakhand-sacred-sanctuaries",
  "rishikesh": "uttarakhand-sacred-sanctuaries",
  "temple-shikhara": "uttarakhand-sacred-sanctuaries",

  "vrindavan": "vrindavan-sacred-architecture",
  "prem-mandir": "vrindavan-sacred-architecture",
  "banke-bihari": "vrindavan-sacred-architecture",

  "estate-monograph": "bareilly-monograph-series",
  "estate": "bareilly-monograph-series",
  "bareilly": "bareilly-monograph-series",
  "bareilly-heritage": "bareilly-monograph-series",
  "pelican-solitude": "bareilly-monograph-series",
  "rajasthan-luxury-resort": "bareilly-monograph-series",
  "resort": "bareilly-monograph-series",
  "fashion": "chittor-fort-monoliths",
};

// Camera and print specifications for each project
const TECHNICAL_ARCHIVE_DATA: Record<
  string,
  {
    camera: string;
    lens: string;
    medium: string;
    location: string;
    coordinates: string;
    elevation?: string;
    year: string;
    paper: string;
    edition: string;
  }
> = {
  "jaipur-royal-citadels": {
    camera: "Phase One IQ4 150MP & Linhof Master Technika 4x5",
    lens: "Schneider Kreuznach 80mm LS f/2.8 & Rodenstock 90mm",
    medium: "16-Bit Trichromatic RAW & Kodak Tri-X 320 4x5 Sheet Film",
    location: "Amber Fort, Nahargarh & Jaigarh Fort, Jaipur, Rajasthan",
    coordinates: "26.9855° N, 75.8513° E",
    elevation: "648m above sea level",
    year: "2026",
    paper: "Hahnemühle Photo Rag Baryta 315gsm 100% Cotton",
    edition: "Limited Archival Folio of 7",
  },
  "kashmir-valley-expedition": {
    camera: "Fuji GFX 100 II & Phase One IQ4 150MP",
    lens: "Fujinon GF 45mm f/2.8 & Schneider 120mm f/5.6",
    medium: "16-Bit Medium Format Digital RAW & Kodak Portra 400",
    location: "Dal Lake, Srinagar, Sonamarg & Pulwama, Jammu & Kashmir",
    coordinates: "34.0837° N, 74.7973° E",
    elevation: "2,800m above sea level",
    year: "2026",
    paper: "Hahnemühle Museum Etching 350gsm 100% Cotton Rag",
    edition: "Alpine Expedition Portfolio of 5",
  },
  "chittor-fort-monoliths": {
    camera: "Canon EOS 200D II & Linhof 4x5 Field Camera",
    lens: "EF-S 18-55mm IS STM & Schneider Super-Angulon 90mm f/8",
    medium: "14-Bit High Latitude RAW & Kodak Tri-X 320",
    location: "Chittor Fort, Chittorgarh, Mewar, Rajasthan",
    coordinates: "24.8879° N, 74.6452° E",
    elevation: "590m above sea level",
    year: "2026",
    paper: "Hahnemühle Museum Etching 350gsm 100% Cotton Rag",
    edition: "Architectural Folio of 7",
  },
  "uttarakhand-sacred-sanctuaries": {
    camera: "Canon EOS 200D II & Hasselblad 907X 50C",
    lens: "EF-S 18-55mm IS STM & XCD 45mm f/4 P",
    medium: "14-Bit High Latitude RAW & Ilford HP5 Plus 120",
    location: "Jageshwar Dham Almora & Rishikesh, Uttarakhand",
    coordinates: "29.6406° N, 79.8519° E",
    elevation: "1,870m above sea level",
    year: "2026",
    paper: "Awagami Bamboo Japanese Fine Art Washi 250gsm",
    edition: "Sacred Monograph Edition of 6",
  },
  "vrindavan-sacred-architecture": {
    camera: "Hasselblad H6D-100c & Leica M11-P",
    lens: "Hasselblad HC 100mm f/2.2 & Summilux-M 35mm f/1.4",
    medium: "16-Bit Medium Format Digital RAW",
    location: "Shri Banke Bihari & Prem Mandir, Vrindavan, Uttar Pradesh",
    coordinates: "27.5806° N, 77.7006° E",
    year: "2026",
    paper: "Canson Infinity Platine Fibre Rag 310gsm",
    edition: "Exhibition Monograph of 8",
  },
  "bareilly-monograph-series": {
    camera: "Canon EOS 200D II & Rolleiflex 2.8F",
    lens: "Carl Zeiss Planar 80mm f/2.8 & 50mm f/1.8",
    medium: "Kodak Portra 160 120 Film & High Latitude Digital",
    location: "Bareilly Havelis, Terraces & Civil Lines, Uttar Pradesh",
    coordinates: "28.3670° N, 79.4304° E",
    year: "2025",
    paper: "Hahnemühle Photo Rag 308gsm 100% Cotton",
    edition: "Private Family Archive Edition of 3",
  },
  // Legacy project slug keys
  "jaigarh-citadel": {
    camera: "Linhof Master Technika 4x5 & Phase One IQ4 150MP",
    lens: "Rodenstock Grandagon-N 90mm f/4.5 & Schneider 150mm",
    medium: "16-Bit Trichromatic Digital & Kodak Tri-X 320 4x5 Sheet Film",
    location: "Cheel ka Teela, Aravalli Mountain Range, Rajasthan",
    coordinates: "26.9855° N, 75.8513° E",
    elevation: "648m above sea level",
    year: "2026",
    paper: "Hahnemühle Photo Rag Baryta 315gsm 100% Cotton",
    edition: "Limited Archival Folio of 7",
  },
  "heritage-celebration": {
    camera: "Hasselblad H6D-100c & Leica M11-P",
    lens: "Hasselblad HC 100mm f/2.2 & Summilux-M 35mm f/1.4",
    medium: "Kodak Portra 400 120 Film & 16-Bit Medium Format Digital RAW",
    location: "Rambagh Palace Courtyards, Jaipur, Rajasthan",
    coordinates: "26.8927° N, 75.8083° E",
    year: "2026",
    paper: "Awagami Bamboo Japanese Fine Art Washi 250gsm",
    edition: "Bespoke Royal Monograph, Unique 1 of 1",
  },
  "sheesh-mahal-portraits": {
    camera: "Phase One XF IQ3 100MP Trichromatic",
    lens: "Schneider Kreuznach 80mm LS f/2.8 & Zeiss Otus 55mm f/1.4",
    medium: "Ultra-High Bit Depth Sensor & Ilford HP5 Plus 120",
    location: "Hall of Private Audience, Amer Palace, Rajasthan",
    coordinates: "26.9859° N, 75.8507° E",
    year: "2025",
    paper: "Canson Infinity Platine Fibre Rag 310gsm",
    edition: "Exhibition Portfolio of 12",
  },
  "chittorgarh-citadel": {
    camera: "Canon EOS 200D II & Hasselblad 907X 50C",
    lens: "EF-S 18-55mm IS STM & XCD 45mm f/4 P",
    medium: "14-Bit High Latitude RAW & Kodak Tri-X 320",
    location: "Jageshwar Dham, Almora, Uttarakhand",
    coordinates: "29.6406° N, 79.8519° E",
    elevation: "1,870m above sea level",
    year: "2026",
    paper: "Hahnemühle Museum Etching 350gsm 100% Cotton Rag",
    edition: "Architectural Folio of 7",
  },
  "amber-couture": {
    camera: "Hasselblad 907X 50C & Linhof 4x5 Field Camera",
    lens: "XCD 45mm f/4 P & Schneider Super-Angulon 90mm f/8",
    medium: "Kodak Tri-X 320 4x5 Sheet Film & Medium Format RAW",
    location: "Chittorgarh Fort (Chittor Fort), Mewar, Rajasthan",
    coordinates: "24.8879° N, 74.6452° E",
    elevation: "590m above sea level",
    year: "2026",
    paper: "Hahnemühle Museum Etching 350gsm 100% Cotton Rag",
    edition: "Architectural Folio of 7",
  },
  "estate-monograph": {
    camera: "Rolleiflex 2.8F & Hasselblad 503CW",
    lens: "Carl Zeiss Planar 80mm f/2.8",
    medium: "Kodak Portra 160 & Kodak T-Max 400 120 Film",
    location: "Lake Pichola Ancestral Estate, Udaipur, Rajasthan",
    coordinates: "24.5764° N, 73.6835° E",
    year: "2025",
    paper: "Hahnemühle Museum Etching 350gsm 100% Cotton",
    edition: "Private Family Archive Edition of 3",
  },
  "rajasthan-luxury-resort": {
    camera: "Arca-Swiss Rm3di Technical Camera & Phase One IQ4 150MP",
    lens: "Rodenstock HR Digaron-W 40mm f/4.0 Tilt-Shift",
    medium: "16-Bit Low ISO Technical Digital Plate",
    location: "Amanbagh Sanctuary, Ajabgarh Valley, Alwar",
    coordinates: "27.1892° N, 76.2844° E",
    year: "2026",
    paper: "Hahnemühle German Etching 310gsm",
    edition: "Architectural Monograph of 10",
  },
};

export function generateStaticParams() {
  const primarySlugs = PROJECTS.map((project) => ({ slug: project.slug }));
  const aliasSlugs = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...primarySlugs, ...aliasSlugs];
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const rawSlug = resolvedParams.slug;
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;

  const projectIndex = PROJECTS.findIndex((p) => p.slug === canonicalSlug);
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : PROJECTS[PROJECTS.length - 1];
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : PROJECTS[0];

  const tech = TECHNICAL_ARCHIVE_DATA[project.slug] || {
    camera: "Phase One IQ4 150MP Medium Format",
    lens: "Schneider Kreuznach 80mm LS f/2.8",
    medium: "16-Bit Trichromatic RAW",
    location: project.location,
    coordinates: "26.9124° N, 75.7873° E",
    year: project.year,
    paper: "Hahnemühle Photo Rag Baryta 315gsm",
    edition: "Limited Archival Monograph",
  };

  const plateNumber = String(projectIndex + 1).padStart(2, "0");

  // Visual plates for the case-study layout
  const heroPlate = project.coverImage;
  const fullWidthPlate1 = project.gallery[0]?.url || project.coverImage;
  const dualPlate1 = project.gallery[1]?.url || project.coverImage;
  const dualPlate2 = project.gallery[2]?.url || project.gallery[0]?.url || project.coverImage;
  const fullWidthPlate2 = project.gallery[3]?.url || project.gallery[0]?.url || project.coverImage;

  const heroInfo = getImagePlateInfo(heroPlate);
  const plate1Info = getImagePlateInfo(fullWidthPlate1);
  const plate2Info = getImagePlateInfo(dualPlate1);
  const plate3Info = getImagePlateInfo(dualPlate2);
  const plate4Info = getImagePlateInfo(fullWidthPlate2);

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative selection:bg-[#151515] selection:text-[#F4F1EB]">
      <FilmGrain />
      <Navbar />

      <main className="pt-28 pb-32">
        {/* Navigation Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 type-meta text-[#77736D] hover:text-[#151515] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Archive // Return to Monograph Catalog</span>
          </Link>
        </div>

        {/* Project Hero */}
        <header className="px-6 lg:px-12 max-w-7xl mx-auto mb-16">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9D5CE] pb-8 gap-6">
              <div>
                <span className="type-meta text-[#77736D] tracking-widest block mb-2">
                  PROJECT HERO // {project.category.toUpperCase()}
                </span>
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#151515] tracking-tight uppercase">
                  {project.name}
                </h1>
              </div>
              <div className="text-left md:text-right type-meta text-xs text-[#77736D] space-y-1">
                <span className="block text-[#151515] font-semibold text-sm tracking-widest">
                  {project.location.toUpperCase()}
                </span>
                <span className="block text-[#CC5500] font-mono text-sm">
                  PLATE {plateNumber}
                </span>
                <span>VOL. XXVI // ARCHIVAL STUDY</span>
              </div>
            </div>

            {/* Hero Photographic Plate — Displayed at natural proportion without digital crop */}
            <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${heroInfo.aspectClass} ${heroInfo.isLandscape ? (heroInfo.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-6xl mx-auto") : "max-w-2xl mx-auto"}`}>
              <Image
                src={heroPlate}
                alt={project.name}
                fill
                priority
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-6 flex items-end justify-between type-meta text-white/90 text-[10px] sm:text-xs tracking-widest pointer-events-none">
                <span>{tech.location.toUpperCase()}</span>
                <span>{tech.coordinates}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Introduction */}
        <section className="px-6 lg:px-12 max-w-4xl mx-auto my-16">
          <span className="type-meta text-[#77736D] block mb-4 text-xs">
            01 // INTRODUCTION
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#151515] leading-relaxed font-normal">
            &ldquo;{project.intro}&rdquo;
          </blockquote>
          <div className="mt-8 flex flex-wrap gap-8 type-meta text-xs text-[#77736D] border-t border-[#D9D5CE] pt-6">
            <div>
              <span className="block text-[10px] text-[#A39E96]">COMMISSION PATRON</span>
              <span className="text-[#151515] font-semibold">{project.client || "Studioza Atelier Monograph"}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#A39E96]">YEAR</span>
              <span className="text-[#151515] font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#A39E96]">DISCIPLINE</span>
              <span className="text-[#151515] font-semibold uppercase">{project.category}</span>
            </div>
            {tech.elevation && (
              <div>
                <span className="block text-[10px] text-[#A39E96]">ELEVATION</span>
                <span className="text-[#151515] font-semibold">{tech.elevation}</span>
              </div>
            )}
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Primary Full Width Plate */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto my-16">
          <div className="space-y-4">
            <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plate1Info.aspectClass} ${plate1Info.isLandscape ? (plate1Info.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-6xl mx-auto") : "max-w-2xl mx-auto"}`}>
              <Image
                src={fullWidthPlate1}
                alt={`${project.name} primary plate`}
                fill
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center type-meta text-xs text-[#77736D] px-1">
              <span>{project.gallery[0]?.caption || "Plate 01: Monumental study in chiaroscuro and atmospheric desert haze."}</span>
              <span className="font-mono text-[#CC5500]">PLATE {plateNumber}.1</span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Paired Detail Plates */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-start">
            <div className="space-y-3">
              <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plate2Info.aspectClass}`}>
                <Image
                  src={dualPlate1}
                  alt={`${project.name} secondary detail`}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="flex justify-between type-meta text-[11px] text-[#77736D]">
                <span>{project.gallery[1]?.caption || "Geometric alignment and masonry texture."}</span>
                <span className="font-mono text-[#CC5500]">PLATE {plateNumber}.2</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plate3Info.aspectClass}`}>
                <Image
                  src={dualPlate2}
                  alt={`${project.name} tertiary detail`}
                  fill
                  unoptimized
                  quality={100}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain"
                />
              </div>
              <div className="flex justify-between type-meta text-[11px] text-[#77736D]">
                <span>{project.gallery[2]?.caption || "Intimate light dialogue in shadowed alcoves."}</span>
                <span className="font-mono text-[#CC5500]">PLATE {plateNumber}.3</span>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Curatorial & Field Notes */}
        <section className="px-6 lg:px-12 max-w-4xl mx-auto my-20">
          <span className="type-meta text-[#77736D] block mb-4 text-xs">
            02 // CURATORIAL NOTES & FIELD MONOGRAPH
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#151515] mb-8 font-normal">
            Atmospheric Discipline & Method
          </h2>
          <div className="prose prose-lg text-[#151515] space-y-6 font-sans leading-relaxed text-base sm:text-lg">
            <p className="type-body-l text-[#151515]/90">
              {project.story}
            </p>
            <p className="type-body text-[#77736D]">
              In every frame, we intentionally restrained artificial intervention. By harmonizing shutter timing with the earth’s natural rotation, each plate records the geological weight of stone and the fragile fleeting presence of human celebration without digital contrivance.
            </p>
          </div>

          {/* Credits */}
          {project.credits && project.credits.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#D9D5CE]">
              <span className="type-meta text-[11px] text-[#77736D] block mb-4">
                COMMISSION CREDITS & ARCHIVAL COLLABORATORS
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 type-meta text-xs">
                {project.credits.map((credit, idx) => (
                  <div key={idx}>
                    <span className="text-[#77736D] block text-[10px]">{credit.role}</span>
                    <span className="text-[#151515] font-semibold">{credit.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Landscape Horizon Plate */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto my-16">
          <div className="space-y-4">
            <div className={`relative overflow-hidden bg-[#EAE6DE] border border-[#D9D5CE] shadow-sm ${plate4Info.aspectClass} ${plate4Info.isLandscape ? (plate4Info.aspectClass === "aspect-[4/3]" ? "w-full max-w-5xl mx-auto" : "w-full max-w-6xl mx-auto") : "max-w-2xl mx-auto"}`}>
              <Image
                src={fullWidthPlate2}
                alt={`${project.name} panoramic plate`}
                fill
                unoptimized
                quality={100}
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <div className="flex justify-between items-center type-meta text-xs text-[#77736D] px-1">
              <span>{project.gallery[3]?.caption || "Plate 04: Twilight dispersion across sandstone and slate mountain horizon."}</span>
              <span className="font-mono text-[#CC5500]">PLATE {plateNumber}.4</span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Technical Data Sheet */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto my-20">
          <div className="border border-[#151515] p-8 sm:p-12 bg-[#F4F1EB]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#151515] mb-8 gap-4">
              <div>
                <span className="type-meta text-[#77736D] text-[10px] block">
                  SYSTEM CATALOG // SHEET DATA
                </span>
                <h3 className="font-serif text-3xl text-[#151515] font-normal tracking-tight">
                  Technical Archive
                </h3>
              </div>
              <span className="font-mono text-xs type-meta bg-[#151515] text-[#F4F1EB] px-3 py-1">
                REF: STZ-PLT-{plateNumber}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 type-meta text-xs">
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Camera className="w-3 h-3 text-[#CC5500]" /> CAMERA SYSTEM
                </span>
                <span className="text-[#151515] font-medium">{tech.camera}</span>
              </div>
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Sliders className="w-3 h-3 text-[#CC5500]" /> OPTICS / LENS
                </span>
                <span className="text-[#151515] font-medium">{tech.lens}</span>
              </div>
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#CC5500]" /> FILM / DIGITAL EMULSION
                </span>
                <span className="text-[#151515] font-medium">{tech.medium}</span>
              </div>
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-[#CC5500]" /> GEOGRAPHIC LOCATION
                </span>
                <span className="text-[#151515] font-medium">{tech.location}</span>
              </div>
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#CC5500]" /> ARCHIVAL CAPTURE YEAR
                </span>
                <span className="text-[#151515] font-medium">{tech.year}</span>
              </div>
              <div>
                <span className="text-[#77736D] block text-[10px] mb-1 flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#CC5500]" /> PAPER SUBSTRATE
                </span>
                <span className="text-[#151515] font-medium">{tech.paper}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D9D5CE] flex justify-between items-center text-[10px] type-meta text-[#77736D]">
              <span>COORDINATES: {tech.coordinates}</span>
              <span className="text-[#151515] font-semibold">{tech.edition}</span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Previous & Next Monograph Navigation */}
        <section className="px-6 lg:px-12 max-w-7xl mx-auto my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-b border-[#D9D5CE] py-12">
            {/* Previous */}
            <Link
              href={`/work/${prevProject.slug}`}
              className="group block space-y-4 hover:opacity-90 transition-opacity"
            >
              <span className="type-meta text-xs text-[#77736D] flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>PREVIOUS MONOGRAPH</span>
              </span>
              <div className="flex items-center gap-5">
                <div className="w-24 h-16 bg-[#EAE6DE] relative shrink-0 overflow-hidden">
                  <Image
                    src={prevProject.coverImage}
                    alt={prevProject.name}
                    fill
                    quality={100}
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-[#151515] group-hover:text-[#CC5500] transition-colors">
                    {prevProject.name}
                  </h4>
                  <span className="type-meta text-[11px] text-[#77736D]">
                    {prevProject.location} · {prevProject.year}
                  </span>
                </div>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/work/${nextProject.slug}`}
              className="group block space-y-4 md:text-right hover:opacity-90 transition-opacity"
            >
              <span className="type-meta text-xs text-[#77736D] flex items-center justify-start md:justify-end gap-1.5">
                <span>NEXT MONOGRAPH</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="flex items-center justify-start md:justify-end gap-5">
                <div className="order-2 md:order-1">
                  <h4 className="font-serif text-2xl text-[#151515] group-hover:text-[#CC5500] transition-colors">
                    {nextProject.name}
                  </h4>
                  <span className="type-meta text-[11px] text-[#77736D]">
                    {nextProject.location} · {nextProject.year}
                  </span>
                </div>
                <div className="w-24 h-16 bg-[#EAE6DE] relative shrink-0 overflow-hidden order-1 md:order-2">
                  <Image
                    src={nextProject.coverImage}
                    alt={nextProject.name}
                    fill
                    quality={100}
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 my-14">
          <hr className="border-t border-[#D9D5CE]" />
        </div>

        {/* Commission CTA */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto text-center my-20">
          <div className="bg-[#171717] text-[#F4F1EB] p-12 sm:p-20 space-y-6 relative overflow-hidden">
            <span className="type-meta text-[#A39E96] tracking-widest text-xs">
              COMMISSION DIALOGUE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-tight">
              Let us document your celebration or architectural commission.
            </h2>
            <p className="type-body text-[#A39E96] max-w-xl mx-auto">
              Each commission is treated as a lasting museum-grade monograph. Reserve dates or consult on location scouting worldwide.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-[#F4F1EB] text-[#171717] px-8 py-4 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors"
              >
                START AN INQUIRY →
              </Link>
              <Link
                href="/booking"
                className="border border-white/20 text-white px-8 py-4 type-meta text-xs hover:border-white transition-colors"
              >
                SCHEDULE A CONSULTATION
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
