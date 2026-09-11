import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Sparkles,
  Aperture,
  Compass,
  Eye,
  Sliders,
  Award,
  ChevronRight,
  Maximize2,
  Film,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function AtelierEntrancePage() {
  const disciplines = [
    {
      title: "Editorial & Haute Couture",
      discipline: "High Fashion",
      desc: "Choreographed movement, bold high-contrast palettes, and bespoke styling commissioned for international covers.",
      camera: "Hasselblad H6D • 100mm f/2.2",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
      tag: "Vogue & Harper's",
    },
    {
      title: "Cinematic Portraiture",
      discipline: "Human Essence",
      desc: "Intimate chiaroscuro lighting, emotional depth, and unfiltered character studies capturing legendary icons and rising luminaries.",
      camera: "Leica M11 • Summilux 35mm f/1.4",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
      tag: "Film Monochromes",
    },
    {
      title: "Architectural & Spatial Form",
      discipline: "Spatial Geometry",
      desc: "Medium format perspectives celebrating negative space, brutalist lines, and natural ambient illumination across world capitals.",
      camera: "Fujifilm GFX 100 II • GF 23mm f/4",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
      tag: "Architectural Digest",
    },
    {
      title: "Fine Art Stills & Objects",
      discipline: "Museum Archival",
      desc: "Tactile macro textures, controlled strobes, and museum-grade master prints crafted on heavyweight cotton rag paper.",
      camera: "Zeiss Otus 55mm • f/1.4",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=900&auto=format&fit=crop",
      tag: "Limited Editions",
    },
  ];

  const editorialPublications = [
    "VOGUE",
    "HARPER'S BAZAAR",
    "ARCHITECTURAL DIGEST",
    "GQ GLOBAL",
    "KINFOLK",
    "ELLE INTERNATIONAL",
  ];

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      {/* 2-Tone Optical Bokeh & Motes Canvas Background */}
      <AnimatedBackground />

      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: Dual-Tone Ambient Balance (Blue Hour left, Golden Hour right) */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-36 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Top Pill - Atelier Announcement */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-400/30 text-xs font-mono text-blue-200 backdrop-blur-xl shadow-xl shadow-blue-500/10">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>Studioza Atelier • Fine Photography &amp; Art Direction</span>
                <ChevronRight className="w-3 h-3 text-neutral-400" />
              </div>
            </div>

            {/* Headline with 2-Tone Harmony Accent */}
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-[1.05]">
                Capturing light, emotion, &amp;{" "}
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                  timeless stillness.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="mt-8 text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                A boutique photography atelier delivering medium-format editorial campaigns, iconic portraits, and architectural archives for distinguished brands and patrons.
              </p>

              {/* Dual Action CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/main"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-98"
                >
                  Explore Visual Archive
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-sky-200 hover:text-white bg-blue-950/40 hover:bg-blue-900/60 border border-blue-400/30 hover:border-blue-400/60 backdrop-blur-xl transition-all shadow-lg shadow-blue-950/30"
                >
                  <Camera className="w-4 h-4 text-amber-400" />
                  Commission a Session
                </Link>
              </div>
            </div>

            {/* HERO VISUAL CENTERPIECE: Layered Photography Showcase with EXIF HUD */}
            <div className="mt-16 sm:mt-24 relative max-w-5xl mx-auto">
              {/* Outer 2-Tone Dual Glow Halo (Cyan/Blue on Left, Amber on Right) */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/25 via-indigo-500/15 to-amber-500/25 rounded-3xl blur-2xl -z-10 opacity-80" />

              {/* Main Center Frame */}
              <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.15] bg-[#0b1328]/90 overflow-hidden shadow-2xl backdrop-blur-md group">
                <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
                    alt="Haute Couture Editorial Campaign"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1124] via-transparent to-black/30" />

                  {/* Top EXIF Telemetry Badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium tracking-wide bg-blue-950/70 border border-blue-400/30 text-white backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Aperture className="w-3 h-3 text-amber-400 animate-spin-slow" />
                      HASSELBLAD H6D-100C • HC 100mm f/2.2
                    </span>
                    <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 border border-white/10 text-neutral-300 backdrop-blur-md">
                      1/1000s • f/2.2 • ISO 64
                    </span>
                  </div>

                  {/* Bottom Caption & Curator Credit */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold font-mono">
                        Cover Series • Autumn Collection
                      </span>
                      <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mt-1">
                        Ephemeral Chiaroscuro
                      </h3>
                    </div>
                    <Link
                      href="/main"
                      className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/80 border border-blue-400/30 text-xs font-medium text-white backdrop-blur-md transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      View Series Specs
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Camera Spec Tags with Dual Tone accents */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="p-3.5 rounded-xl bg-[#0d1733]/60 border border-blue-500/20 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-blue-300 uppercase tracking-wider">Medium Format</span>
                  <span className="text-xs font-semibold text-white">100 Megapixel Raw</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#0d1733]/60 border border-blue-500/20 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-blue-300 uppercase tracking-wider">Color Science</span>
                  <span className="text-xs font-semibold text-white">16-Bit Natural Depth</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#24160c]/60 border border-amber-500/20 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-amber-300 uppercase tracking-wider">Optics System</span>
                  <span className="text-xs font-semibold text-white">Leica &amp; Zeiss Prime</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#24160c]/60 border border-amber-500/20 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-amber-300 uppercase tracking-wider">Lighting Precision</span>
                  <span className="text-xs font-semibold text-white">Profoto High-Speed Sync</span>
                </div>
              </div>
            </div>

            {/* Editorial Publication Strips */}
            <div className="mt-20 pt-8 border-t border-white/[0.08] text-center">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-mono font-medium mb-8">
                Works Commissioned &amp; Featured By International Publications
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75">
                {editorialPublications.map((pub) => (
                  <span
                    key={pub}
                    className="text-xs md:text-sm font-serif tracking-[0.2em] font-semibold text-neutral-300 hover:text-amber-300 transition-colors"
                  >
                    {pub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TONE 1 SECTION: Twilight Blue Hour (Disciplines) */}
        <section className="py-24 border-t border-b border-blue-500/20 bg-gradient-to-b from-[#0a142c]/90 via-[#0e1d3d]/85 to-[#0a142c]/90 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-sky-400">
                Atelier Disciplines • Twilight Blue Hour
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-3 tracking-tight">
                Where optical precision meets sculptural vision
              </h2>
              <p className="text-blue-200/80 mt-4 text-base font-light leading-relaxed">
                From high-fashion magazine covers to museum-grade architectural archives, each frame is calibrated to withstand the test of generational aesthetics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {disciplines.map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-3xl bg-[#0d1a38]/80 border border-blue-400/20 overflow-hidden hover:border-sky-400/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a38] via-[#0d1a38]/30 to-transparent" />
                    
                    {/* Discipline Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-medium tracking-wide bg-blue-950/80 border border-blue-400/30 text-sky-200 backdrop-blur-md">
                        {item.tag}
                      </span>
                    </div>

                    {/* Camera Spec Tag */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-[11px] font-mono text-amber-300 bg-black/70 px-2.5 py-1 rounded-lg border border-amber-400/30 backdrop-blur-md">
                      <Camera className="w-3 h-3 text-amber-400" />
                      {item.camera}
                    </div>
                  </div>

                  <div className="p-8">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-sky-400/90">
                      {item.discipline}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1 mb-3 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed font-light">
                      {item.desc}
                    </p>

                    <div className="mt-6 pt-6 border-t border-blue-500/20 flex items-center justify-between">
                      <Link
                        href="/main"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                      >
                        Browse Archive Stills <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/contact"
                        className="text-xs text-sky-300/80 hover:text-white transition-colors"
                      >
                        Inquire Shoot Date →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TONE 2 SECTION: Golden Hour Amber Bronze (Accolades & Metrics) */}
        <section className="py-20 border-t border-b border-amber-500/20 bg-gradient-to-b from-[#221308]/90 via-[#311b0c]/85 to-[#221308]/90 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-amber-400">
                Atelier Benchmark • Golden Hour Warmth
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-2">
                A Legacy of Uncompromising Optical Craft
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#2d180b]/70 backdrop-blur-sm shadow-xl shadow-amber-950/40">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 font-mono">
                  120+
                </p>
                <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mt-2 font-mono">
                  Editorial Covers
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#2d180b]/70 backdrop-blur-sm shadow-xl shadow-amber-950/40">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 font-mono">
                  100MP
                </p>
                <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mt-2 font-mono">
                  Medium Format Native
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#2d180b]/70 backdrop-blur-sm shadow-xl shadow-amber-950/40">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 font-mono">
                  4
                </p>
                <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mt-2 font-mono">
                  Global Ateliers
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-amber-500/30 bg-[#2d180b]/70 backdrop-blur-sm shadow-xl shadow-amber-950/40">
                <p className="text-4xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-400 font-mono">
                  16-Bit
                </p>
                <p className="text-xs uppercase tracking-widest text-amber-300/90 font-medium mt-2 font-mono">
                  Dynamic Color Gamut
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION: Dual-Tone Gradient Bridge */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="p-12 md:p-16 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#0c1736]/90 via-[#161a28]/90 to-[#2c1608]/90 backdrop-blur-2xl shadow-2xl relative">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-md">
                <Sparkles className="w-7 h-7" />
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
                Ready to explore the full visual archive?
              </h2>
              <p className="mt-4 text-neutral-300 max-w-xl mx-auto text-base font-light leading-relaxed">
                Step into our comprehensive gallery of filtered series, equipment vaults, session pricing tiers, and client reviews.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/main"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
                >
                  Enter Visual Archive &amp; Gallery →
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium text-sky-200 hover:text-white bg-blue-950/60 border border-blue-400/30 hover:border-blue-400/60 transition-colors"
                >
                  Inquire Direct
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
