import React from 'react';

interface ContactSheetSkeletonProps {
  count?: number;
  layout?: 'strip' | 'grid' | 'hero';
  aspectRatio?: '3/2' | '4/5' | '1/1';
}

/**
 * Editorial contact-sheet loading state.
 * Emulates physical darkroom proof strips with subtle grease-pencil crop marks in #CFA570.
 * Replaces generic grey shimmer with fixed aspect ratio archival frames to eliminate CLS.
 */
export function ContactSheetSkeleton({
  count = 4,
  layout = 'grid',
  aspectRatio = '3/2',
}: ContactSheetSkeletonProps) {
  const aspectClass =
    aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : 'aspect-[3/2]';

  return (
    <div
      role="status"
      aria-label="Loading archival plates"
      className={
        layout === 'hero'
          ? 'w-full'
          : layout === 'strip'
          ? 'flex gap-6 overflow-hidden'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
      }
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`relative border border-[#D9D5CE] bg-[#F4F1EB] p-3 transition-colors ${aspectClass}`}
        >
          {/* Inner negative frame */}
          <div className="relative h-full w-full bg-[#171717] flex flex-col justify-between p-3 overflow-hidden">
            {/* Film sprockets & frame registration metadata */}
            <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-[#77736D] uppercase select-none">
              <span>EXP. {String(i + 1).padStart(2, '0')}</span>
              <span>120 FILM · 400</span>
            </div>

            {/* Hand-marked grease-pencil crop reticle in studio gold #CFA570 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-75 stroke-[#CFA570]"
              >
                {/* Subtle crop tick marks */}
                <path d="M12 8H8V12" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 8H32V12" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 32H8V28" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 32H32V28" strokeWidth="1.5" strokeLinecap="round" />
                {/* Proof grease dot */}
                <circle cx="20" cy="20" r="1.5" fill="#CFA570" />
              </svg>
            </div>

            {/* Lower edge frame numbering */}
            <div className="flex justify-between items-center text-[9px] font-mono tracking-wider text-[#66625B] select-none">
              <span>PLATE ARCHIVE</span>
              <span>DEV PENDING</span>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Developing monograph plates...</span>
    </div>
  );
}
