"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Camera,
  Aperture,
  Sliders,
  Maximize2,
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sun,
  Layers,
  Award,
  Shield,
  Clock,
  ChevronRight,
  Info,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

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
}

export default function MainStudioArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All Works");
  const [inspectedPhoto, setInspectedPhoto] = useState<PhotoItem | null>(null);

  const categories = [
    "All Works",
    "Editorial & Fashion",
    "Cinematic Portraiture",
    "Architecture & Spaces",
    "Fine Art & Monochrome",
    "Commercial Stills",
  ];

  const archivePhotos: PhotoItem[] = [
    {
      id: "photo-1",
      title: "Haute Chiaroscuro",
      category: "Editorial & Fashion",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
      camera: "Hasselblad H6D-100c",
      lens: "HC 100mm f/2.2 Orange Dot",
      settings: "1/800s • f/2.8 • ISO 64",
      lighting: "Key: Profoto Pro-11 with 5-ft Octabox 45° left; Rim: Profoto B10X with 1x4 strip softbox.",
      location: "Studioza Atelier SoHo, New York",
      client: "Vogue International",
      description: "Autumn Haute Couture collection study emphasizing dramatic folds, tactile wool textures, and sculptural lighting.",
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
    },
    {
      id: "photo-3",
      title: "Monolithic Cantilever",
      category: "Architecture & Spaces",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      camera: "Fujifilm GFX 100 II",
      lens: "GF 23mm f/4 R LM WR Tilt-Shift",
      settings: "1/30s • f/11 • ISO 50 (Tripod Mounted)",
      lighting: "Golden hour dusk ambient balanced with interior 2700K warm architectural illumination.",
      location: "Brutalist Residence, Tokyo",
      client: "Architectural Digest Japan",
      description: "Geometric balance between concrete brutalism and twilight warmth, shot with zero perspective distortion.",
    },
    {
      id: "photo-4",
      title: "Velvet Movement",
      category: "Editorial & Fashion",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
      camera: "Phase One XF IQ4",
      lens: "Schneider Kreuznach 80mm LS f/2.8",
      settings: "1/1600s • f/4.0 • ISO 100",
      lighting: "High-speed sync twin Profoto Pro-Head packs freezing flowing silk fabrics in mid-air.",
      location: "Studioza Atelier, Milan",
      client: "Harper's Bazaar Italy",
      description: "Capturing kinetic fluidity in draped crimson satin during an athletic haute couture choreography.",
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
    },
    {
      id: "photo-6",
      title: "Horological Still Life",
      category: "Commercial Stills",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      camera: "Hasselblad H6D-100c",
      lens: "HC Macro 120mm f/4 II",
      settings: "1/125s • f/16 • ISO 64 (Focus Stacked 14 Plates)",
      lighting: "Diffusion cone with three fiber-optic micro-spots highlighting bevelled sapphire crystal.",
      location: "Geneva Watch Lab",
      client: "Swiss Haute Horlogerie",
      description: "Sub-millimeter macro reproduction of an openworked perpetual calendar tourbillon movement.",
    },
    {
      id: "photo-7",
      title: "Dusk in the Concrete Canyon",
      category: "Architecture & Spaces",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      camera: "Fujifilm GFX 100 II",
      lens: "GF 30mm f/5.6 T/S",
      settings: "2.5s • f/8.0 • ISO 100",
      lighting: "Civil twilight ambient light with long exposure light trails.",
      location: "Midtown Manhattan, New York",
      client: "Foster & Partners Archival",
      description: "Symmetrical perspective capturing the steel and glass convergence of contemporary skyscraper architecture.",
    },
    {
      id: "photo-8",
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
    },
  ];

  const filteredPhotos =
    activeCategory === "All Works"
      ? archivePhotos
      : archivePhotos.filter((p) => p.category === activeCategory);

  const sessionTiers = [
    {
      name: "Private & Artistic Portraiture",
      tag: "Individual & Luminaries",
      price: "1,850",
      duration: "3-Hour Atelier Session",
      deliverables: [
        "Pre-session creative direction & styling consultation",
        "Shot on Leica M11 Rangefinder & Medium Format",
        "3 Wardrobe changes with dedicated hair/makeup artist",
        "20 Master retouched high-resolution deliverables",
        "One 16x20 Archival Silver-Gelatin Hahnemühle Master Print",
      ],
      cta: "Book Portrait Session",
    },
    {
      name: "Editorial Cover & Brand Campaign",
      tag: "Most Requested • Atelier Full Suite",
      price: "3,600",
      featured: true,
      duration: "Full-Day Atelier or On-Location",
      deliverables: [
        "Comprehensive moodboarding & lighting schematic design",
        "100MP Hasselblad Medium Format digital capture",
        "Full studio production team: Gaffers, Digi-Tech, MUA & Stylist",
        "High-Speed Profoto Pro-11 lighting ecosystem",
        "Commercial usage rights & international print licensing",
        "40 Master finished plates delivered via encrypted gallery",
      ],
      cta: "Commission Campaign",
    },
    {
      name: "Architectural & Spatial Archive",
      tag: "Developers & Architects",
      price: "4,800",
      duration: "2-Day Golden Hour & Twilight Coverage",
      deliverables: [
        "Fujifilm GFX 100 II Medium Format Tilt-Shift systems",
        "Zero-distortion interior & exterior architectural perspectives",
        "Ambient dusk balancing & advanced architectural retouching",
        "Ultra-high resolution suitable for billboard & monograph printing",
        "Full worldwide licensing rights for PR & architectural press",
      ],
      cta: "Commission Architectural Shoot",
    },
  ];

  const gearVault = [
    {
      name: "Hasselblad H6D-100c",
      category: "Medium Format Camera",
      spec: "100MP 53.4 x 40.0mm CMOS Sensor • 16-Bit Dynamic Range",
      desc: "Our flagship medium format camera delivering museum-grade chromatic depth and rendering micro-textures invisible to standard 35mm cameras.",
      tone: "blue",
    },
    {
      name: "Leica M11 & M-Monochrom",
      category: "Rangefinder System",
      spec: "60MP BSI CMOS Sensor • Triple Resolution Technology",
      desc: "Inconspicuous, whisper-quiet rangefinder for authentic human intimacy and street-level editorial portraiture with legendary Leica color science.",
      tone: "blue",
    },
    {
      name: "Zeiss Otus & Leica Noctilux Primes",
      category: "Reference Optics",
      spec: "Apochromatic correction • f/1.25 & f/1.4 aperture speeds",
      desc: "Optics crafted without compromise. Virtually zero chromatic aberration, yielding creamy three-dimensional bokeh and edge-to-edge micro-contrast.",
      tone: "amber",
    },
    {
      name: "Profoto Pro-11 Lighting System",
      category: "Studio Strobe Ecosystem",
      spec: "2400Ws Strobe Power • 1/80,000s Freeze Pulse Duration",
      desc: "The gold standard in commercial fashion lighting, capable of freezing fabric movement and water droplets with surgical repeatability.",
      tone: "amber",
    },
  ];

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* 2-Tone Optical Ambient Canvas */}
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1">
        {/* ARCHIVE HEADER & GALLERY: TONE 1 (Twilight Blue Hour) */}
        <section className="py-20 md:py-28 border-b border-blue-500/20 bg-gradient-to-b from-[#09132b]/95 via-[#0e1d3e]/90 to-[#09132b]/95 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/30 text-xs font-mono text-sky-300 mb-4 shadow-md">
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  Visual Archive • Tone 1 Twilight Blue
                </div>
                <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                  Curated Plates &amp; Works
                </h1>
                <p className="text-blue-200/80 mt-3 max-w-2xl text-base font-light leading-relaxed">
                  Inspect selected medium-format series, camera telemetry specifications, studio commission tiers, and our precision optical equipment vault.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
                >
                  Book a Session
                </Link>
                <Link
                  href="/"
                  className="px-5 py-3.5 rounded-full text-xs font-medium text-sky-200 hover:text-white bg-blue-950/60 border border-blue-400/30 hover:border-blue-400/60 transition-colors shadow-sm"
                >
                  ← Return to Overview
                </Link>
              </div>
            </div>

            {/* Interactive Category Filter Tabs */}
            <div className="mt-12 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/25 scale-102"
                        : "bg-blue-950/50 text-blue-200 hover:text-white hover:bg-blue-900/60 border border-blue-400/20"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid within Blue Hour atmosphere */}
            <div className="mt-14">
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-blue-300">
                  Displaying {filteredPhotos.length} Master Plates in &ldquo;{activeCategory}&rdquo;
                </span>
                <span className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Click any plate to inspect EXIF &amp; lighting details
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setInspectedPhoto(photo)}
                    className="group relative rounded-2xl md:rounded-3xl border border-blue-400/20 bg-[#0d1a38]/80 overflow-hidden hover:border-sky-400/50 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a38] via-transparent to-black/20" />

                      {/* Camera Spec Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide bg-blue-950/80 border border-blue-400/30 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                          <Camera className="w-3 h-3 text-amber-400" />
                          {photo.camera}
                        </span>
                      </div>

                      {/* Inspect Button Indicator on Hover */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="p-2 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md flex items-center justify-center">
                          <Maximize2 className="w-4 h-4 text-amber-300" />
                        </span>
                      </div>

                      {/* Bottom Metadata Bar */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-amber-400 font-medium">
                            {photo.category}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-white mt-0.5 group-hover:text-amber-300 transition-colors">
                            {photo.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Lower Details */}
                    <div className="p-5 border-t border-blue-500/20 bg-[#0d1a38]">
                      <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                        <span>{photo.settings}</span>
                        <span className="text-sky-300/80 font-sans">{photo.client}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PHOTO LIGHTBOX INSPECTOR MODAL */}
        {inspectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setInspectedPhoto(null)}
          >
            <div
              className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl border border-blue-400/30 bg-[#0b1428] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
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

              {/* Photo View */}
              <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[380px]">
                <img
                  src={inspectedPhoto.image}
                  alt={inspectedPhoto.title}
                  className="w-full h-full max-h-[75vh] object-contain"
                />
              </div>

              {/* EXIF Telemetry & Story Panel */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-blue-500/20 bg-[#0c162e]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-400/10 border border-amber-400/30 text-amber-300">
                      {inspectedPhoto.category}
                    </span>
                    <span className="text-xs text-blue-200 font-mono">
                      Client: {inspectedPhoto.client}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {inspectedPhoto.title}
                  </h3>

                  <p className="text-xs text-neutral-300 mt-3 leading-relaxed font-light">
                    {inspectedPhoto.description}
                  </p>

                  {/* Technical Telemetry Section */}
                  <div className="mt-6 pt-6 border-t border-blue-500/20 space-y-3.5">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-sky-300 font-semibold flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      Optical &amp; Exposure Telemetry
                    </h4>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between p-2 rounded-lg bg-blue-950/50 border border-blue-400/20">
                        <span className="text-neutral-400">Camera Body:</span>
                        <span className="text-sky-200 font-medium">{inspectedPhoto.camera}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-blue-950/50 border border-blue-400/20">
                        <span className="text-neutral-400">Optics / Glass:</span>
                        <span className="text-sky-200 font-medium">{inspectedPhoto.lens}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-blue-950/50 border border-blue-400/20">
                        <span className="text-neutral-400">Exposure:</span>
                        <span className="text-amber-400 font-medium">{inspectedPhoto.settings}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-blue-950/50 border border-blue-400/20">
                        <span className="text-neutral-400">Location:</span>
                        <span className="text-neutral-200 font-medium">{inspectedPhoto.location}</span>
                      </div>
                    </div>

                    {/* Lighting Notes */}
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                      <span className="block font-mono text-[10px] text-amber-400 uppercase tracking-wider font-semibold mb-1">
                        Lighting Schematic
                      </span>
                      <p className="text-amber-100/90 text-[11px] leading-relaxed font-light">
                        {inspectedPhoto.lighting}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal CTA */}
                <div className="mt-8 pt-4 border-t border-blue-500/20">
                  <Link
                    href={`/contact?style=${encodeURIComponent(inspectedPhoto.title)}`}
                    onClick={() => setInspectedPhoto(null)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20"
                  >
                    Inquire Regarding This Shoot Style <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SESSION TIERS: TONE 2 (Golden Hour Amber Bronze) */}
        <section id="services" className="py-24 border-t border-b border-amber-500/20 bg-gradient-to-b from-[#24140a]/95 via-[#351e0e]/90 to-[#24140a]/95 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
                Atelier Commissions • Tone 2 Golden Hour
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2">
                Session Tiers &amp; Deliverables
              </h2>
              <p className="text-amber-200/80 mt-3 text-sm font-light leading-relaxed">
                Clear scope, dedicated principal photographer, medium format resolution, and comprehensive commercial rights.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {sessionTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 ${
                    tier.featured
                      ? "border-2 border-amber-400 bg-[#361e0e]/95 shadow-2xl shadow-amber-500/20 relative"
                      : "border border-amber-500/30 bg-[#28160b]/75 hover:border-amber-400/60 shadow-xl shadow-amber-950/30"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                      Recommended
                    </div>
                  )}

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                      {tier.tag}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-mono mb-6">
                      Duration: {tier.duration}
                    </p>

                    <div className="mb-8">
                      <span className="text-[11px] uppercase tracking-wider text-amber-200/80 font-mono font-semibold">
                        Included Deliverables:
                      </span>
                      <ul className="mt-3 space-y-2.5 text-xs text-neutral-200 font-light">
                        {tier.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-amber-500/25">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs text-amber-400/80 font-mono">Commission Investment</span>
                      <span className="text-3xl font-serif font-bold text-white">
                        ${tier.price}
                      </span>
                    </div>
                    <Link
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                        tier.featured
                          ? "text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/25"
                          : "text-amber-200 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/30"
                      }`}
                    >
                      {tier.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STUDIO GEAR & OPTICS VAULT: DUAL TONE SHOWCASE */}
        <section id="gear" className="py-24 border-b border-white/[0.1] bg-gradient-to-b from-[#0a1228]/90 via-[#141824]/90 to-[#221309]/90 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-400">
                Precision Hardware • Dual-Tone Optics
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2">
                Studio Gear &amp; Optics Vault
              </h2>
              <p className="text-neutral-300 mt-3 text-sm font-light leading-relaxed">
                We invest in uncompromising medium format and prime optics to guarantee unparalleled tonal fidelity, micro-contrast, and color reproduction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {gearVault.map((item) => {
                const isBlue = item.tone === "blue";
                return (
                  <div
                    key={item.name}
                    className={`rounded-3xl p-8 backdrop-blur-md transition-all group ${
                      isBlue
                        ? "border border-blue-400/20 bg-[#0d1a38]/70 hover:border-sky-400/50 shadow-lg shadow-blue-950/30"
                        : "border border-amber-500/25 bg-[#28160b]/70 hover:border-amber-400/60 shadow-lg shadow-amber-950/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-[10px] uppercase font-mono tracking-widest font-semibold ${
                          isBlue ? "text-sky-400" : "text-amber-400"
                        }`}
                      >
                        {item.category}
                      </span>
                      <Camera
                        className={`w-5 h-5 transition-colors ${
                          isBlue ? "text-blue-400 group-hover:text-sky-300" : "text-amber-400 group-hover:text-amber-300"
                        }`}
                      />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs font-mono text-neutral-300 mt-1 mb-4">
                      {item.spec}
                    </p>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* REVIEWS & EDITORIAL TESTIMONIALS */}
        <section id="publications" className="py-24 border-b border-white/[0.08] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
                Curator Acclaim
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
                Patron &amp; Editorial Words
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl border border-blue-400/20 bg-[#0d1a38]/60 backdrop-blur-sm flex flex-col justify-between shadow-lg">
                <p className="text-sm text-neutral-200 font-light italic leading-relaxed">
                  &ldquo;Studioza redefined our global autumn campaign. The medium format depth and cinematic lighting set a new visual standard for our luxury maison.&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-blue-500/20">
                  <h4 className="text-sm font-serif font-bold text-white">Camille Laurent</h4>
                  <p className="text-xs text-sky-300 font-mono">Creative Director, Maison de Soie (Paris)</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-amber-500/25 bg-[#29170b]/60 backdrop-blur-sm flex flex-col justify-between shadow-lg">
                <p className="text-sm text-neutral-200 font-light italic leading-relaxed">
                  &ldquo;Their command over brutalist architecture and subtle dusk lighting transformed our monograph into a work of collectible art.&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-amber-500/20">
                  <h4 className="text-sm font-serif font-bold text-white">Kenzo Takahashi</h4>
                  <p className="text-xs text-amber-300 font-mono">Principal Architect, KXA Architects (Tokyo)</p>
                </div>
              </div>

              <div className="p-8 rounded-3xl border border-blue-400/20 bg-[#0d1a38]/60 backdrop-blur-sm flex flex-col justify-between shadow-lg">
                <p className="text-sm text-neutral-200 font-light italic leading-relaxed">
                  &ldquo;The portrait session was effortless yet deeply poetic. The Hahnemühle print hanging in my residence is treasured every single day.&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-blue-500/20">
                  <h4 className="text-sm font-serif font-bold text-white">Julianne Ross</h4>
                  <p className="text-xs text-sky-300 font-mono">Art Collector &amp; Patron (New York)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CONVERSION CTA */}
        <section className="py-24 text-center relative">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Ready to commission your visual series?
            </h2>
            <p className="text-neutral-300 mt-4 text-base font-light leading-relaxed">
              We accept a limited number of private and editorial commissions each calendar quarter to guarantee our uncompromising devotion to each frame.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
              >
                Inquire Regarding Shoot Dates →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
