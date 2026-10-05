"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
];

export default function SpiralScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track the scroll progress of this specific component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress to a full 360-degree rotation (or multiple turns)
  // Negative to twist down into the screen.
  const twistRotation = useTransform(scrollYProgress, [0, 1], [0, -720]);
  
  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-sage-100 h-[400vh]" // extremely tall so we can scroll
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center perspective-[1200px]">
        {/* Header Text Overlay */}
        <div className="absolute top-20 left-1/2 -transtone-x-1/2 z-50 text-center pointer-events-none mix-blend-difference">
          <h2 className="text-4xl sm:text-6xl text-foreground er">
            Spiral Archive
          </h2>
          <p className="text-foreground-muted mt-2 text-sm uppercase">
            Scroll to descend
          </p>
        </div>

        {/* The rotating spiral container */}
        <motion.div 
          style={{
            rotateZ: twistRotation,
            transformStyle: "preserve-3d"
          }}
          className="relative w-full max-w-4xl aspect-square flex items-center justify-center"
        >
          {IMAGES.map((src, i) => {
            // Distribute images evenly around a circle
            const angle = (i / IMAGES.length) * 360;
            // Radius of the circle (how far out they are)
            const radius = 400; 
            
            return (
              <motion.div
                key={i}
                className="absolute w-64 aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-sage-300/40"
                style={{
                  transformOrigin: "center center",
                  transform: `rotateZ(${angle}deg) translateY(-${radius}px) rotateX(15deg)`,
                }}
              >
                <img 
                  src={src} 
                  alt={`Archive photo ${i + 1}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 cursor-pointer"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
