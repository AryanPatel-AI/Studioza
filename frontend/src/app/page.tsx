import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import {
  HeroOpticalInstallation,
  HorizontalGallery,
  FullWidthBreakout,
  VisualArchiveExhibition,
  LightingStudioInstallation,
  AtelierProcessTimeline,
  EditorialContactSection,
} from "@/components/editorial";

export default function AtelierEntrancePage() {

  return (
    <div className="min-h-screen bg-[#080706] text-white selection:bg-amber-400 selection:text-black font-sans relative overflow-x-hidden">
      {/* 1. Subtle Analog Film Grain & Optical Light Leak Texture */}
      <FilmGrain />

      {/* 2. Floating Crystal Glass Ribbon Navigation */}
      <Navbar />

      <main>
        {/* ========================================================================= */}
        {/* HERO: CINEMATIC PHOTOGRAPHY INSTALLATION WITH LAYERED CRYSTAL OPTICS      */}
        {/* ========================================================================= */}
        <HeroOpticalInstallation />

        {/* ========================================================================= */}
        {/* SECTION 2: CURATED VISUAL ARCHIVE (PHYSICAL PHOTOGRAPHY EXHIBITION)       */}
        {/* ========================================================================= */}
        <VisualArchiveExhibition />

        {/* ========================================================================= */}
        {/* SECTION 3: CONTINUOUS HORIZONTAL FILM ROLL GALLERY                        */}
        {/* ========================================================================= */}
        <section id="roll" className="border-t border-white/[0.08] bg-[#040406]">
          <HorizontalGallery />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FULL-WIDTH BREAKOUT (100VW MONOLITH & ANALOG IMPERFECTIONS)    */}
        {/* ========================================================================= */}
        <FullWidthBreakout />

        {/* ========================================================================= */}
        {/* SECTION 5: EDITORIAL MANIFESTO (ASYMMETRIC MONOGRAPH SPREAD)              */}
        {/* ========================================================================= */}
        <section id="curation" className="py-28 sm:py-36 px-6 sm:px-12 lg:px-16 bg-[#060609] border-t border-white/[0.08] relative overflow-hidden">
          {/* Subtle Ambient Radial Light */}
          <div
            className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 blur-[140px] pointer-events-none opacity-10"
            style={{
              background: "radial-gradient(circle, rgba(245, 158, 11, 0.4), transparent 70%)",
            }}
          />

          <div className="max-w-7xl mx-auto relative z-10 space-y-16">
            {/* Monograph Chapter Telemetry Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.06] text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500">
              <div className="flex items-center gap-2 text-amber-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Chapter 02 • Atelier Philosophy</span>
              </div>
              <span>The Archival Codes • Vol. XXIV</span>
            </div>

            {/* Asymmetric Monograph Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Monumental Editorial Thesis (7 cols) */}
              <div className="lg:col-span-7 space-y-8">
                <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-zinc-100 leading-[1.12] tracking-tight">
                  &ldquo;We eliminate noise to let light and structure speak. Every photograph is a deliberate arrest of time.&rdquo;
                </blockquote>
                <p className="text-zinc-400 font-light text-base sm:text-lg leading-relaxed max-w-2xl">
                  Studioza operates not as a content factory, but as a classical darkroom and optical laboratory. We balance medium-format digital capture with silver halide discipline, creating imagery meant to outlast the ephemeral feeds of the present day.
                </p>

                <div className="pt-4 flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <div className="w-8 h-[1px] bg-amber-400/50" />
                  <span className="text-amber-300 font-medium tracking-wider">
                    Aryan Patel — Atelier Founder &amp; Art Director
                  </span>
                </div>
              </div>

              {/* Right Column: The Three Archival Tenets (5 cols) */}
              <div className="lg:col-span-5 p-8 rounded-3xl border border-white/[0.08] bg-black/40 backdrop-blur-md space-y-8">
                <div className="border-b border-white/[0.06] pb-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                  <span>Atelier Codes</span>
                  <span className="text-amber-400/80">Discipline</span>
                </div>

                <div className="space-y-6 text-xs font-light">
                  <div className="space-y-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 block">
                      01 / Material Authenticity
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      Zero synthetic smoothing or generative hallucination. We preserve skin pores, linen weave, and concrete texture in uncompressed 16-bit tonal depth.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-white/[0.04] pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 block">
                      02 / Optical Chiaroscuro
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      Single-point tungsten and sculpting bounce. Light is treated as a physical substance that carves mass from shadow rather than flat illumination.
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-white/[0.04] pt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 block">
                      03 / Archival Permanence
                    </span>
                    <p className="text-zinc-300 leading-relaxed">
                      Master negatives certified and printed on 310gsm Hahnemühle Photo Rag Baryta with archival mineral pigment inks rated for 150+ years.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span>DARKROOM SPECIFICATION</span>
                  <span className="text-zinc-400">BENCH VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: THE CREATIVE PROCESS & ATELIER METHODOLOGY (LIGHT PATH RAIL)   */}
        {/* ========================================================================= */}
        <AtelierProcessTimeline />

        {/* ========================================================================= */}
        {/* SECTION 6.5: SIGNATURE 3D CHIAROSCURO STAGE (SCULPTING LIGHT & SHADOW)    */}
        {/* ========================================================================= */}
        <LightingStudioInstallation />

        {/* ========================================================================= */}
        {/* SECTION 7: ATELIER COMMISSIONS & EDITORIAL INVITATION (THE FINALE)        */}
        {/* ========================================================================= */}
        <EditorialContactSection id="contact" />
      </main>

      <Footer />
    </div>
  );
}
