/**
 * CurvedScrollWrapper Component
 * Applies a cinematic parabolic arc trajectory to page scroll using Framer Motion springs and non-linear transforms.
 */
"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function CurvedScrollWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Damped spring physics for smooth interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.05,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Curved horizontal shift along scroll
  const x = useTransform(smoothProgress, [0, 0.4, 0.8, 1], ["0vw", "8vw", "22vw", "35vw"]);

  // Accompanying angular tilt along the curve
  const rotate = useTransform(smoothProgress, [0, 0.4, 0.8, 1], [0, 1.5, 3, 5]);

  return (
    <div ref={containerRef} className="w-full relative overflow-visible">
      <motion.div style={{ x, rotateZ: rotate }} className="w-full origin-[50%_50%]">
        {children}
      </motion.div>
    </div>
  );
}
