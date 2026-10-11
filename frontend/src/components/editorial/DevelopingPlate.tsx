'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useReveal } from '@/lib/useReveal';
import { getImagePlateInfo } from '@/lib/data/studioData';

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
  decorative?: boolean;
}

export interface ProjectPlateProps {
  image: ImageProps;
  caption?: string;
  credit?: string;
  plateNo: number;
  total: number;
  layout?: 'full' | 'pair';
  priority?: boolean;
  className?: string;
}

/**
 * DevelopingPlate Component
 * Implements the developing reveal effect (scale 1.04 -> 1, blur placeholder fade)
 * Preserves authentic frame: if portrait mode, renders in portrait frame; if landscape, renders in landscape frame.
 * Captions plate as 'Plate 07 / 24' adhering to the Studioza Editorial standard.
 */
export function DevelopingPlate({
  image,
  caption,
  credit,
  plateNo,
  total,
  layout = 'full',
  priority = false,
  className = '',
}: ProjectPlateProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useReveal<HTMLDivElement>('image');

  const plateInfo = getImagePlateInfo(image.src);
  const isLandscape = plateInfo.isLandscape;

  // Authentic aspect framing: portrait uses portrait frame (2:3 or 3:4), landscape uses landscape frame (3:2 or 4:3)
  const aspectClass = plateInfo.aspectClass || (isLandscape ? 'aspect-[3/2]' : 'aspect-[2/3]');
  
  // Container width constraint: wide for landscape, focused archival frame for portrait
  const widthConstraint = layout === 'full'
    ? (isLandscape ? 'w-full max-w-6xl mx-auto' : 'w-full max-w-2xl mx-auto')
    : 'w-full';

  const formattedPlate = `Plate ${String(plateNo).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <figure
      ref={containerRef}
      className={`group relative flex flex-col ${
        layout === 'full' ? 'w-full items-center' : 'w-full md:max-w-[48%]'
      } ${className}`}
    >
      {/* Archival Negative Mat */}
      <div className={`relative ${widthConstraint} overflow-hidden bg-[#171717] zoomable border border-[#D9D5CE]/40 shadow-sm`}>
        <div className={`relative w-full ${aspectClass} flex items-center justify-center`}>
          {/* Developing Reveal: blur placeholder transitioning to crisp negative */}
          {image.blurDataUrl && !isLoaded && (
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-xl scale-105 transition-opacity duration-1000"
              style={{ backgroundImage: `url(${image.blurDataUrl})` }}
              aria-hidden="true"
            />
          )}

          <Image
            src={image.src}
            alt={image.decorative ? '' : image.alt}
            aria-hidden={image.decorative ? 'true' : undefined}
            fill
            sizes={
              layout === 'full'
                ? isLandscape ? '100vw' : '(max-width: 768px) 100vw, 800px'
                : '(min-width: 1024px) 50vw, 100vw'
            }
            priority={priority}
            unoptimized
            quality={100}
            className={`object-contain transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
            }`}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>

      {/* Curator's Plate Placard */}
      <figcaption className={`mt-3 ${widthConstraint} flex items-baseline justify-between border-b border-[#D9D5CE] pb-2 text-[12px] text-[#66625B]`}>
        <span className="font-mono uppercase tracking-widest text-[#151515] font-medium">
          {formattedPlate}
        </span>
        {caption && (
          <span className="ml-4 truncate max-w-[60%] font-serif italic text-[#77736D]">
            {caption}
          </span>
        )}
        {credit && (
          <span className="ml-auto font-mono text-[10px] tracking-wider uppercase text-[#77736D]">
            {credit}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
