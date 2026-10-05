"use client";

import React from "react";

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {/* 
        Subtle Archival Film Grain Texture:
        Emulates traditional 35mm silver-gelatin & 310gsm baryta paper micro-texture.
        Kept at ultra-low opacity (0.028) for quiet luxury without visual noise.
      */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.028] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="studioza-baryta-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#studioza-baryta-grain)" />
      </svg>
    </div>
  );
}
