"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Sliders,
  Maximize2,
  X,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Info,
  Scan,
  Check,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import MagneticButton from "@/components/ui/MagneticButton";
import StudioButton from "@/components/ui/StudioButton";
import {
  StudioLightingStage3D,
  ApertureShutter3D,
} from "@/components/3d";
import CrystalSurface from "@/components/optical/CrystalSurface";
import FluidOpticalGlass from "@/components/optical/FluidOpticalGlass";
import { LightingStudioInstallation } from "@/components/editorial";
import { cn } from "@/lib/utils";

interface PhotoItem {
  id: string;
  title: string;
  category: string;
  image: string;
  camera: string;
  lens: string;
  settings: string;
  lighting: string;
  location: string;
  client: string;
  description: string;
  aspect: string;
  spanClass: string;
  offsetClass: string;
}

export default function MainStudioArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [inspectedPhoto, setInspectedPhoto] = useState<PhotoItem | null>(null);
  const [modalView, setModalView] = useState<"photo" | "lighting">("photo");

  const categories = [
    "All Works",
    "Editorial & Fashion",
    "Cinematic Portraiture",
    "Architecture & Spaces",
    "Fine Art & Monochrome",
    "Commercial Stills",
  ];

  const curatorialCategories = [
    { key: "ALL", label: "ALL WORKS", index: "00", match: "All Works" },
    { key: "ARCHITECTURE", label: "ARCHITECTURE", index: "01", match: "Architecture & Spaces" },
    { key: "FINE ART", label: "FINE ART", index: "02", match: "Fine Art & Monochrome" },
    { key: "PORTRAIT", label: "PORTRAIT", index: "03", match: "Cinematic Portraiture" },
    { key: "EDITORIAL", label: "EDITORIAL", index: "04", match: "Editorial & Fashion" },
    { key: "OBJECTS", label: "OBJECTS", index: "05", match: "Commercial Stills" },
  ];

  const archivePhotos: PhotoItem[] = [
    {
      id: "photo-1",
      title: "Haute Chiaroscuro",
      category: "Editorial & Fashion",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
      camera: "Hasselblad H6D-100c",
      lens: "HC 100mm f/2.2 Orange Dot",
      settings: "1/800s • f/2.8 • ISO 64",
      lighting: "Key: Profoto Pro-11 with 5-ft Octabox 45° left; Rim: Profoto B10X with 1x4 strip softbox.",
      location: "Studioza Atelier SoHo, New York",
      client: "Vogue International",
      description: "Autumn Haute Couture collection study emphasizing dramatic folds, tactile wool textures, and sculptural lighting.",
      aspect: "aspect-[16/10]",
      spanClass: "lg:col-span-8",
      offsetClass: "",
    },
    {
      id: "photo-2",
      title: "Soul in Silver",
      category: "Cinematic Portraiture",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      camera: "Leica M11 Rangefinder",
      lens: "Summilux-M 35mm f/1.4 ASPH",
      settings: "1/500s • f/1.4 • ISO 100",
      lighting: "Natural north-facing studio window daylight complemented by 4x8 matte white bounce board.",
      location: "Le Marais Studio, Paris",
      client: "Personal Commission",
      description: "Intimate chiaroscuro monochrome study capturing micro-expressions, raw skin cadence, and emotional depth.",
      aspect: "aspect-[3/4]",
      spanClass: "lg:col-span-4",
      offsetClass: "lg:pt-20",
    },
    {
      id: "photo-3",
      title: "Monolithic Cantilever",
      category: "Architecture & Spaces",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
      camera: "Fujifilm GFX 100 II",
      lens: "GF 23mm f/4 R LM WR Tilt-Shift",
      settings: "1/30s • f/11 • ISO 50 (Tripod Mounted)",
      lighting: "Golden hour dusk ambient balanced with interior 2700K warm architectural illumination.",
      location: "Brutalist Residence, Tokyo",
      client: "Architectural Digest Japan",
      description: "Geometric balance between concrete brutalism and twilight warmth, shot with zero perspective distortion.",
      aspect: "aspect-[4/3]",
      spanClass: "lg:col-span-5",
      offsetClass: "",
    },
    {
      id: "photo-4",
      title: "Velvet Movement",
      category: "Editorial & Fashion",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
      camera: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      settings: "1/1600s • f/4.0 • ISO 100",
      lighting: "High-speed sync twin Profoto Pro-Head packs freezing flowing silk fabrics in mid-air.",
      location: "Studioza Atelier, Milan",
      client: "Harper's Bazaar Italy",
      description: "Capturing kinetic fluidity in draped crimson satin during an athletic haute couture choreography.",
      aspect: "aspect-[16/9]",
      spanClass: "lg:col-span-7",
      offsetClass: "lg:-mt-10",
    },
    {
      id: "photo-5",
      title: "Quiet Geometry",
      category: "Fine Art & Monochrome",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
      camera: "Leica Monochrom (Typ 246)",
      lens: "APO-Summicron-M 50mm f/2 ASPH",
      settings: "1/250s • f/5.6 • ISO 320",
      lighting: "Direct hard sunlight through slatted wooden blinds creating rhythmic architectural shadows.",
      location: "Kyoto Traditional Pavilion",
      client: "Private Collection Master Print",
      description: "A meditation on shadow gradients and high-contrast tonal transitions printed on baryta silver rag.",
      aspect: "aspect-[4/5]",
      spanClass: "lg:col-span-4",
      offsetClass: "",
    },
    {
      id: "photo-6",
      title: "Horological Still Life",
      category: "Commercial Stills",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1400&auto=format&fit=crop",
      camera: "Hasselblad H6D-100c",
      lens: "HC Macro 120mm f/4 II",
      settings: "1/125s • f/16 • ISO 64 (Focus Stacked 14 Plates)",
      lighting: "Diffusion cone with three fiber-optic micro-spots highlighting bevelled sapphire crystal.",
      location: "Geneva Watch Lab",
      client: "Swiss Haute Horlogerie",
      description: "Sub-millimeter macro reproduction of an openworked perpetual calendar tourbillon movement.",
      aspect: "aspect-[1/1]",
      spanClass: "lg:col-span-4",
      offsetClass: "lg:pt-12",
    },
    {
      id: "photo-7",
      title: "Portrait of the Sculptor",
      category: "Cinematic Portraiture",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
      camera: "Leica M11",
      lens: "Noctilux-M 75mm f/1.25 ASPH",
      settings: "1/750s • f/1.25 • ISO 64",
      lighting: "Overhead tungsten modeling lamp paired with an amber back-reflector catching marble dust particles.",
      location: "Carrara Marble Atelier, Italy",
      client: "GQ Global Feature",
      description: "Environmental character portrait of a master stone sculptor amidst Carrara marble blocks and ambient chisel dust.",
      aspect: "aspect-[3/4]",
      spanClass: "lg:col-span-4",
      offsetClass: "",
    },
    {
      id: "photo-8",
      title: "Dusk in the Concrete Canyon",
      category: "Architecture & Spaces",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2200&auto=format&fit=crop",
      camera: "Fujifilm GFX 100 II",
      lens: "GF 30mm f/5.6 T/S",
      settings: "2.5s • f/8.0 • ISO 100",
      lighting: "Civil twilight ambient light with long exposure light trails.",
      location: "Midtown Manhattan, New York",
      client: "Foster & Partners Archival",
      description: "Symmetrical perspective capturing the steel and glass convergence of contemporary skyscraper architecture.",
      aspect: "aspect-[21/9]",
      spanClass: "lg:col-span-12",
      offsetClass: "pt-8",
    },
  ];

  const filteredPhotos =
    activeCategory === "All Works"
      ? archivePhotos
      : archivePhotos.filter((p) => p.category === activeCategory);

  const sessionTiers = [
    {
      roman: "I",
      name: "Private & Artistic Portraiture",
      subtitle: "Individual patrons, authors, artists & luminaries",
      price: "1,850",
      duration: "3-Hour Dedicated Atelier Session",
      format: "Leica M11 Rangefinder & Medium Format",
      deliverables: [
        "Pre-session creative direction & styling consultation",
        "3 Wardrobe changes with hair/makeup artist",
        "20 Master retouched high-resolution deliverables",
        "One 16x20 Archival Silver-Gelatin Hahnemühle Master Print",
      ],
      cta: "Book Portrait Session",
    },
    {
      roman: "II",
      name: "Editorial Cover & Brand Campaign",
      subtitle: "Atelier Full Suite • Global editorial & maison campaigns",
      price: "3,600",
      featured: true,
      duration: "Full-Day Atelier or On-Location",
      format: "100MP Hasselblad H6D-100c Digital Capture",
      deliverables: [
        "Comprehensive moodboarding & lighting schematic design",
        "Full studio production: Gaffers, Digi-Tech, Stylist",
        "High-Speed Profoto Pro-11 lighting ecosystem",
        "40 Master plates with international commercial licensing",
      ],
      cta: "Commission Campaign",
    },
    {
      roman: "III",
      name: "Architectural & Spatial Archive",
      subtitle: "Monographs, architectural estates & heritage projects",
      price: "4,800",
      duration: "2-Day Golden Hour & Twilight Coverage",
      format: "Fujifilm GFX 100 II Tilt-Shift Systems",
      deliverables: [
        "Zero-distortion interior & exterior architectural perspectives",
        "Ambient dusk balancing & advanced architectural retouching",
        "Ultra-high resolution suitable for billboard & monograph printing",
        "Full worldwide licensing rights for PR & architectural press",
      ],
      cta: "Commission Architecture",
    },
  ];

  const gearVault = [
    {
      spec: "100MP • 53.4 x 40.0mm",
      name: "Hasselblad H6D-100c",
      category: "Medium Format Body",
      role: "Primary Commercial & Fine Art Capture",
      note: "Delivers 16-bit color depth and micro-textures beyond standard full-frame sensors.",
    },
    {
      spec: "60MP • Triple Resolution",
      name: "Leica M11 & M-Monochrom",
      category: "Rangefinder System",
      role: "Intimate Editorial & Street Portraiture",
      note: "Whisper-quiet mechanical shutter preserving unforced, authentic human expressions.",
    },
    {
      spec: "f/1.25 & f/1.4 Primes",
      name: "Zeiss Otus & Leica Noctilux",
      category: "Reference Optics",
      role: "Apochromatic Depth & Micro-Contrast",
      note: "Virtually zero chromatic aberration, yielding creamy three-dimensional subject separation.",
    },
    {
      spec: "2400Ws • 1/80,000s Freeze",
      name: "Profoto Pro-11 Ecosystem",
      category: "Studio Lighting",
      role: "High-Speed Sync & Sculptural Light",
      note: "Freezes kinetic fabrics, water droplets, and high-speed motion with absolute repeatability.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#080706] text-neutral-100 flex flex-col relative selection:bg-amber-400 selection:text-black font-sans">
      {/* Subtle Analog Film Grain & Optical Light Leak */}
      <FilmGrain />

      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* ARCHIVE HEADER: TYPOGRAPHIC MONOGRAPH STYLE                               */}
        {/* ========================================================================= */}
        <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-white/[0.08] relative px-6 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 text-xs font-mono tracking-[0.25em] text-amber-400/90">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Atelier Archive — Monograph Vol. XXIV</span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-none">
                Curated Plates
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl pt-2">
                An asymmetric retrospective of medium format negatives, raw optical telemetry, commission scopes, and laboratory lighting schematics.
              </p>
            </div>

            {/* Technical Shutter Utility & Navigation */}
            <div className="flex flex-wrap items-center gap-4">
              <ApertureShutter3D label="Test Shutter" />
              <MagneticButton href="/contact" strength={0.3}>
                <div className="px-6 py-3 rounded-full text-xs font-mono font-medium text-black bg-amber-400 hover:bg-amber-300 transition-all uppercase tracking-wider font-semibold">
                  Book Session
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Curatorial Salon Labels (NOT UI Buttons) */}
          <div className="max-w-7xl mx-auto mt-12 sm:mt-16">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 tracking-widest uppercase mb-3">
              <span>Curatorial Index Directory</span>
              <span className="hidden sm:inline">Select Room to Filter</span>
            </div>
            <nav
              aria-label="Archive curatorial directory"
              className="flex items-center gap-2 sm:gap-4 flex-wrap border-t border-b border-white/[0.08] py-3.5 -mx-2 px-2 overflow-x-auto scrollbar-none"
            >
              {curatorialCategories.map((cat) => {
                const isActive = activeCategory === cat.match;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.match)}
                    className={cn(
                      "group relative px-3 sm:px-4 py-2 text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 select-none",
                      isActive
                        ? "text-amber-300 font-semibold"
                        : "text-zinc-400 hover:text-white"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[10px] transition-colors",
                        isActive ? "text-amber-400" : "text-zinc-600 group-hover:text-zinc-400"
                      )}
                    >
                      [{cat.index}]
                    </span>
                    <span>{cat.label}</span>

                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-amber-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ASYMMETRIC CURATED WALL: NO UNIFORM REPEATED CARD GRIDS                   */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500 tracking-wider pb-6 border-b border-white/[0.08]">
              <span>Sequence 02 — {filteredPhotos.length} Master Plates in &ldquo;{activeCategory}&rdquo;</span>
              <span className="hidden sm:inline-flex items-center gap-2 text-amber-400/90">
                <Info className="w-3.5 h-3.5" />
                Select any plate to inspect EXIF &amp; 3D lighting rig
              </span>
            </div>

            {/* The Asymmetric Composition Track */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-start">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  className={`${photo.spanClass} ${photo.offsetClass} group cursor-pointer`}
                  onClick={() => {
                    setInspectedPhoto(photo);
                    setModalView("photo");
                  }}
                >
                  {/* Film Frame Header: Negative Film Rebate Markings */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 tracking-wider mb-3">
                    <span className="text-amber-400/90 font-semibold">PL. 0{idx + 1}</span>
                    <span className="uppercase tracking-[0.25em]">ILFORD HP5 PLUS • {20 + idx}A</span>
                    <span className="hidden sm:inline-block">{photo.location}</span>
                  </div>

                  {/* Asymmetric Image Container with Reticle Corners & Hover Zoom */}
                  <div className={`relative overflow-hidden ${photo.aspect} bg-zinc-950 rounded-sm`}>
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out brightness-[0.92] group-hover:brightness-100"
                    />

                    {/* Viewfinder Vignette & Optical Wash */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    {/* Corner Reticle Marks */}
                    <div className="absolute top-4 right-4 text-white/30 group-hover:text-amber-400 transition-colors">
                      <Scan className="w-4 h-4" />
                    </div>

                    {/* Grease-Pencil Selection Mark on Hover */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono tracking-wider text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-xl">
                        <Scan className="w-3 h-3 text-amber-400" />
                        Inspect Telemetry &amp; 3D Rig
                      </span>
                    </div>
                  </div>

                  {/* Editorial Museum Placard Caption (NOT a boxed card!) */}
                  <div className="pt-5 space-y-2">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
                        {photo.title}
                      </h3>
                      <span className="text-xs font-mono text-zinc-500 shrink-0">
                        {photo.client}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed max-w-2xl">
                      {photo.description}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-[10px] font-mono text-zinc-500 tracking-wider border-t border-white/[0.06]">
                      <span className="text-zinc-300">{photo.camera}</span>
                      <span>•</span>
                      <span className="text-amber-300/90 font-medium">{photo.settings}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHOTO LIGHTBOX & 3D STUDIO LIGHTING INSPECTOR MODAL                       */}
        {/* ========================================================================= */}
        {inspectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setInspectedPhoto(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl border border-white/20 bg-[#0b0c10] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setInspectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black border border-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close Inspector"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo / 3D Lighting Stage View */}
              <div className="md:w-3/5 bg-black flex flex-col justify-between relative min-h-[420px] p-4">
                {/* View Mode Switcher Pills */}
                <div className="flex items-center justify-center mb-3 z-10">
                  <div className="inline-flex p-1 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-lg">
                    <button
                      onClick={() => setModalView("photo")}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        modalView === "photo"
                          ? "bg-amber-400 text-black font-semibold shadow-md"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Master Plate
                    </button>
                    <button
                      onClick={() => setModalView("lighting")}
                      className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        modalView === "lighting"
                          ? "bg-amber-400 text-black font-semibold shadow-md"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Sparkles className="w-3 h-3" />
                      3D Lighting Rig
                    </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  {modalView === "photo" ? (
                    <img
                      src={inspectedPhoto.image}
                      alt={inspectedPhoto.title}
                      className="w-full h-full max-h-[70vh] object-contain rounded-xl"
                    />
                  ) : (
                    <div className="w-full h-full min-h-[380px]">
                      <StudioLightingStage3D photoTitle={inspectedPhoto.title} />
                    </div>
                  )}
                </div>
              </div>

              {/* EXIF Telemetry & Story Panel */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/[0.08] bg-[#0c0d12]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      {inspectedPhoto.category}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">
                      Client: {inspectedPhoto.client}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {inspectedPhoto.title}
                  </h3>

                  <p className="text-xs text-zinc-300 mt-3 leading-relaxed font-light">
                    {inspectedPhoto.description}
                  </p>

                  {/* Technical Telemetry Section */}
                  <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3.5">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5" />
                      Optical &amp; Exposure Telemetry
                    </h4>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-zinc-500">Camera Body:</span>
                        <span className="text-zinc-200 font-medium">{inspectedPhoto.camera}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-zinc-500">Optics / Glass:</span>
                        <span className="text-zinc-200 font-medium">{inspectedPhoto.lens}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-zinc-500">Exposure:</span>
                        <span className="text-amber-400 font-medium">{inspectedPhoto.settings}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                        <span className="text-zinc-500">Location:</span>
                        <span className="text-zinc-200 font-medium">{inspectedPhoto.location}</span>
                      </div>
                    </div>

                    {/* Lighting Notes with 3D Simulation Trigger */}
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[10px] text-amber-400 uppercase tracking-wider font-semibold">
                          Lighting Schematic
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          Profoto Pro-11
                        </span>
                      </div>
                      <p className="text-amber-100/90 text-[11px] leading-relaxed font-light">
                        {inspectedPhoto.lighting}
                      </p>
                      <button
                        onClick={() => setModalView("lighting")}
                        className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/30 text-[11px] font-mono text-amber-300 font-medium transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Launch 3D Studio Lighting Simulator
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="mt-8 pt-4 border-t border-white/[0.08]">
                  <Link
                    href={`/contact?style=${encodeURIComponent(inspectedPhoto.title)}`}
                    onClick={() => setInspectedPhoto(null)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 transition-all shadow-lg"
                  >
                    Inquire Regarding This Shoot Style <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ATELIER COMMISSION LEDGER: EDITORIAL MONOGRAPH FORMAT (NO AI PRICING CARDS) */}
        {/* ========================================================================= */}
        <section id="services" className="py-28 sm:py-40 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] bg-[#050507]">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* Section Typographic Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
              <div className="space-y-3">
                <span className="text-xs font-mono tracking-[0.25em] text-amber-400/90">
                  Commission Ledger — Season 2026
                </span>
                <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                  Atelier Scopes &amp; Engagements
                </h2>
              </div>
              <p className="text-sm font-light text-zinc-400 max-w-md leading-relaxed">
                Dedicated principal director, medium-format precision, full studio gaffer and digi-tech crew, and worldwide editorial print licensing.
              </p>
            </div>

            {/* Typographic Commission Ledger Rows on Fluid Optical Glass Plates */}
            <div className="space-y-6">
              {sessionTiers.map((tier) => (
                <FluidOpticalGlass
                  key={tier.name}
                  tint="obsidian"
                  intensity={tier.featured ? "deep" : "subtle"}
                  depth={tier.featured ? 12 : 8}
                  contentClassName="p-8 sm:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                    {/* Roman Numeral & Title */}
                    <div className="lg:col-span-4 space-y-2">
                      <div className="flex items-center gap-3 text-xs font-mono text-amber-400">
                        <span>COMMISSION {tier.roman}</span>
                        {tier.featured && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-[9px] uppercase tracking-wider">
                            Atelier Master Suite
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                        {tier.name}
                      </h3>
                      <p className="text-xs font-light text-zinc-400">
                        {tier.subtitle}
                      </p>
                    </div>

                    {/* Deliverables Editorial Footnote */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="text-xs font-mono text-zinc-300">
                        <span className="text-zinc-500 block mb-1">OPTICAL SPECIFICATION:</span>
                        {tier.format} • {tier.duration}
                      </div>
                      <div className="space-y-1.5 text-xs font-light text-zinc-400">
                        {tier.deliverables.map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-amber-400 select-none">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                          Investment
                        </span>
                        <span className="text-4xl sm:text-5xl font-serif font-bold text-white">
                          ${tier.price}
                        </span>
                      </div>

                      <StudioButton
                        href="/contact"
                        variant={tier.featured ? "primary" : "outline"}
                        size="sm"
                        icon="arrow-up-right"
                        strength={0.25}
                      >
                        {tier.cta}
                      </StudioButton>
                    </div>
                  </div>
                </FluidOpticalGlass>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIGNATURE 3D CHIAROSCURO STAGE (SCULPTING LIGHT & SHADOW)                  */}
        {/* ========================================================================= */}
        <LightingStudioInstallation />

        {/* ========================================================================= */}
        {/* EXTENDED HARDWARE ARCHIVE MONOGRAPH (GEAR LEDGER)                         */}
        {/* ========================================================================= */}
        <section id="gear" className="py-20 sm:py-32 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] bg-[#050507]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] text-xs font-mono text-zinc-500 tracking-wider">
              <span>Extended Optics Portfolio</span>
              <span>Hasselblad • Leica • Zeiss • Profoto</span>
            </div>

            <div className="divide-y divide-white/[0.08] pt-6">
              {gearVault.map((item, idx) => (
                <div
                  key={item.name}
                  className="py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-white/[0.015] px-4 -mx-4 transition-colors"
                >
                  <div className="md:col-span-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  <div className="md:col-span-4 font-mono text-xs text-amber-400/90">
                    <span className="text-zinc-500 block text-[10px] uppercase tracking-widest mb-1">
                      Sensor &amp; Optical Formula
                    </span>
                    {item.spec}
                  </div>

                  <div className="md:col-span-5 text-xs font-light text-zinc-400 leading-relaxed">
                    <span className="text-zinc-300 font-medium block mb-1">{item.role}</span>
                    {item.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CURATOR ACCLAIM: EDITORIAL SPREAD WITH MASSIVE TYPOGRAPHY                 */}
        {/* ========================================================================= */}
        <section id="publications" className="py-28 sm:py-40 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] bg-[#050507]">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono tracking-[0.25em] text-amber-400/90">
                Editorial Acclaim — Patronage &amp; Monograph Reviews
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
                Words from Patrons &amp; Maisons
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="space-y-4">
                <span className="text-5xl font-serif text-white/20 select-none block leading-none">&ldquo;</span>
                <blockquote className="text-lg font-serif italic text-zinc-300 leading-relaxed mt-1">
                  Studioza redefined our global autumn campaign. The medium format depth and sculptural chiaroscuro set a new visual benchmark for our luxury maison.
                </blockquote>
                <div className="pt-4 border-t border-white/[0.08]">
                  <h4 className="text-sm font-serif font-bold text-white">Camille Laurent</h4>
                  <p className="text-xs text-amber-400/80 font-mono mt-0.5">Creative Director, Maison de Soie (Paris)</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-5xl font-serif text-white/20 select-none block leading-none">&ldquo;</span>
                <blockquote className="text-lg font-serif italic text-zinc-300 leading-relaxed mt-1">
                  Their command over brutalist architecture and subtle dusk lighting transformed our monograph into a work of collectible art.
                </blockquote>
                <div className="pt-4 border-t border-white/[0.08]">
                  <h4 className="text-sm font-serif font-bold text-white">Kenzo Takahashi</h4>
                  <p className="text-xs text-amber-400/80 font-mono mt-0.5">Principal Architect, KXA Architects (Tokyo)</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-5xl font-serif text-white/20 select-none block leading-none">&ldquo;</span>
                <blockquote className="text-lg font-serif italic text-zinc-300 leading-relaxed mt-1">
                  The portrait session was effortless yet deeply poetic. The Hahnemühle master print hanging in my residence is treasured every single day.
                </blockquote>
                <div className="pt-4 border-t border-white/[0.08]">
                  <h4 className="text-sm font-serif font-bold text-white">Julianne Ross</h4>
                  <p className="text-xs text-amber-400/80 font-mono mt-0.5">Art Collector &amp; Patron (New York)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CONVERSION: MAGNETIC CALL TO ACTION                                 */}
        {/* ========================================================================= */}
        <section className="py-32 sm:py-44 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <span className="text-xs font-mono tracking-[0.25em] text-amber-400/90">
              Limited Seasonal Calendar — Atelier Sessions
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
              Commission Your Visual Series
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
              We accept a select number of private and editorial commissions each calendar quarter to guarantee our uncompromising devotion to each frame.
            </p>
            <div className="pt-6 flex justify-center">
              <MagneticButton href="/contact" strength={0.4}>
                <div className="inline-flex items-center gap-3 py-4 px-9 rounded-full bg-white text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-amber-300 transition-all shadow-2xl">
                  <span>Inquire Regarding Shoot Dates</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </MagneticButton>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
