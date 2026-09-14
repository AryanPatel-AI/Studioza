"use client";

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* SVG Film Grain Noise */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-screen pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="film-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-noise)" />
      </svg>

      {/* Organic Light Leak (Warm Amber & Cyan prism flare drifting across lens) */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-[140px] animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.45) 0%, rgba(217, 119, 6, 0.2) 50%, transparent 80%)",
          animationDuration: "14s",
        }}
      />

      <div
        className="absolute top-1/4 -right-32 w-[550px] h-[550px] rounded-full pointer-events-none opacity-30 blur-[150px] animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 190, 140, 0.25) 0%, rgba(160, 90, 45, 0.12) 50%, transparent 80%)",
          animationDuration: "18s",
        }}
      />

      {/* Soft Cinematic Lens Vignette: Warm Velvety Obsidian */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(8, 7, 6, 0.82) 100%)",
        }}
      />
    </div>
  );
}
