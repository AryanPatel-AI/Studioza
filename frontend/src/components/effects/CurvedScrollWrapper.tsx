"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function CurvedScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll on the entire document
  const { scrollYProgress } = useScroll();
  
  // Smooth out the scroll progress for a buttery cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.05,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  // "come from down left and goes in curve to top right"
  // When you scroll down, viewport moves down.
  // To make content look like it's entering from bottom-left and exiting top-right:
  // The content itself needs to shift to the RIGHT as you scroll down.
  // If it shifts RIGHT, a static viewport sees it moving from left to right.
  // Combined with upward scroll motion, the resultant vector is bottom-left -> top-right.
  // We use an accelerating curve for X so it arcs rather than moving in a straight diagonal.
  const x = useTransform(
    smoothProgress, 
    [0, 0.4, 0.8, 1], 
    ["0vw", "8vw", "22vw", "35vw"]
  );
  
  // A subtle rotation accentuates the feeling of moving along a curved path
  const rotate = useTransform(
    smoothProgress,
    [0, 0.4, 0.8, 1],
    [0, 1.5, 3, 5]
  );

  return (
    <div ref={containerRef} className="w-full relative overflow-visible">
      <motion.div 
        style={{ x, rotateZ: rotate }} 
        className="w-full origin-[50%_50%]"
      >
        {children}
      </motion.div>
    </div>
  );
}
