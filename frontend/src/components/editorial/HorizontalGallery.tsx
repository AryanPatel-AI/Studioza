"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface GalleryItem {
  id: string;
  plateNumber: string;
  title: string;
  caption: string;
  medium: string;
  location: string;
  image: string;
  aspect: string;
  widthClass: string;
}

export default function HorizontalGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const items: GalleryItem[] = [
    {
      id: "h-1",
      plateNumber: "PL. 01/05",
      title: "Choreography in Shadow",
      caption: "Single tungsten spotlight sculpting raw wool and silk crepe. Shot on 6x7 medium-format negative.",
      medium: "Phase One IQ4 150MP • Schneider 80mm",
      location: "SoHo Atelier, New York",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
      aspect: "aspect-[16/10]",
      widthClass: "w-[85vw] sm:w-[620px] lg:w-[760px]",
    },
    {
      id: "h-2",
      plateNumber: "PL. 02/05",
      title: "The Solitary Brutalist",
      caption: "Cast concrete surfaces bathed in morning sea-fog. Zero distortion perspective correction.",
      medium: "Fujifilm GFX 100 II • GF 23mm f/4",
      location: "Cantabrian Coast, Spain",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      aspect: "aspect-[3/4]",
      widthClass: "w-[75vw] sm:w-[440px] lg:w-[480px]",
    },
    {
      id: "h-3",
      plateNumber: "PL. 03/05",
      title: "Monochrome Study in Silver",
      caption: "Micro-texture study capturing the stillness between breath. Natural northern skylight.",
      medium: "Leica M11 • Summilux 35mm f/1.4",
      location: "Le Marais, Paris",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
      aspect: "aspect-[4/5]",
      widthClass: "w-[75vw] sm:w-[460px] lg:w-[500px]",
    },
    {
      id: "h-4",
      plateNumber: "PL. 04/05",
      title: "Basalt Horizon & Geothermal Drift",
      caption: "Panoramic vista across black volcanic sands. Long exposure capturing tidal retreat.",
      medium: "Hasselblad H6D-100c • 100mm f/2.2",
      location: "Vík í Mýrdal, Iceland",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85",
      aspect: "aspect-[16/10] sm:aspect-[21/9]",
      widthClass: "w-[85vw] sm:w-[740px] lg:w-[900px]",
    },
    {
      id: "h-5",
      plateNumber: "PL. 05/05",
      title: "Silk Incline & Kinetic Drapery",
      caption: "High-speed strobe freezing suspended duchess satin fabric in mid-flight.",
      medium: "Broncolor Scoro 3200 • 1/8000s Sync",
      location: "Studioza Atelier Milan",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
      aspect: "aspect-[3/4]",
      widthClass: "w-[75vw] sm:w-[440px] lg:w-[480px]",
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      const progress = scrollLeft / maxScroll;
      setScrollProgress(progress);
      const idx = Math.min(items.length - 1, Math.max(0, Math.round(progress * (items.length - 1))));
      setActiveItem(idx);
    }
  };

  const scrollBy = (offset: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="py-24 sm:py-36 relative overflow-hidden bg-background">
      {/* Section Typography Header: Editorial Layout */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
        <div>
          <span className="type-meta block mb-3">
            Sequence 01 — The Horizontal Anthology
          </span>
          <h2 className="type-display-section text-ink-primary">
            The Continuous Roll
          </h2>
        </div>

        {/* Navigation Controls, Counter & Hairline Progress Bar */}
        <div className="flex items-center justify-between sm:justify-end gap-5 w-full md:w-auto">
          {/* Mobile Current Plate Badge */}
          <div className="sm:hidden flex items-center gap-2 text-[10px] text-copper-500 px-3 py-1 border-b border-hairline">
            <span className="w-1 h-1 rounded-full bg-copper-500" />
            <span>PLATE 0{activeItem + 1}</span>
            <span className="text-stone-400">/</span>
            <span className="text-stone-500">0{items.length}</span>
          </div>

          <div className="hidden sm:flex flex-col gap-1.5 w-36">
            <div className="h-px w-full bg-stone-200 overflow-hidden">
              <div
                className="h-full bg-copper-500 transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
              />
            </div>
            <div className="flex justify-between type-meta">
              <span>01</span>
              <span>Scroll</span>
              <span>05</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollBy(-450)}
              className="w-9 h-9 border border-hairline text-ink-primary hover:border-stone-400 hover:text-ink-primary flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-95 bg-transparent"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollBy(450)}
              className="w-9 h-9 border border-hairline text-ink-primary hover:border-stone-400 hover:text-ink-primary flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer active:scale-95 bg-transparent"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 sm:gap-12 overflow-x-auto scrollbar-none px-6 sm:px-12 lg:px-16 scroll-smooth cursor-grab active:cursor-grabbing pb-8 select-none snap-x snap-mandatory touch-pan-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, idx) => (
          <div
            key={item.id}
            className={`shrink-0 ${item.widthClass} flex flex-col justify-between group transition-all duration-500 snap-center sm:snap-align-none`}
          >
            {/* Film Frame Header: Negative Film Rebate Markings */}
            <div className="flex items-center justify-between text-[11px] text-ink-muted mb-3">
              <span className="text-copper-500">{item.plateNumber}</span>
              <span className="uppercase text-stone-400">ILFORD HP5 PLUS • {20 + idx}A</span>
              <span className="hidden sm:inline-block text-stone-400">{item.location}</span>
            </div>

            {/* Asymmetric Image Container */}
            <div className={`relative overflow-hidden ${item.aspect} bg-stone-100 border border-hairline`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>

            {/* Editorial Caption Footnote (Art Gallery Placard Style) */}
            <div className="pt-6 space-y-2">
              <h3 className="type-display-project text-ink-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-ink-muted max-w-lg leading-relaxed">
                {item.caption}
              </p>
              <div className="pt-2 text-[11px] text-stone-400">
                {item.medium}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
