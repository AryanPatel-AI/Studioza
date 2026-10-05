"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function HeroOpticalInstallation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const title = "STUDIOZA".split("");

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100svh] overflow-hidden bg-background text-foreground flex flex-col justify-between"
    >
      {/* ========================================================================= */}
      {/* 1. CINEMATIC PHOTOGRAPHY BACKGROUND WITH PARALLAX                         */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ y: yImage }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 1.15, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <img
            src="/images/hero-photographer-mountains.jpg"
            alt="Studioza Signature Optical Archive — Photographer on Mountain Summit"
            className="w-full h-full object-cover object-[center_32%] sm:object-center"
            style={{
              filter: "contrast(1.04) saturate(1.08) brightness(0.82)",
            }}
          />
        </motion.div>
        
        {/* Subtle Edge Vignette & Grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/95 pointer-events-none" />
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. TOP METADATA & TELEMETRY (Fades in)                                    */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-32 sm:pt-40 flex justify-between items-start"
      >
        <div className="type-mono-meta text-white/70 space-y-1">
          <p>EST. MMXVIII</p>
          <p>LONDON / MILAN</p>
        </div>
        <div className="hidden sm:block type-mono-meta text-white/70 text-right space-y-1">
          <p>OPTICAL LABORATORY</p>
          <p>ARCHIVAL PLATES</p>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 3. MASSIVE KINETIC TYPOGRAPHY                                             */}
      {/* ========================================================================= */}
      <motion.div 
        style={{ 
          y: yText,
          opacity: opacityText,
          x: mousePosition.x * -1,
        }}
        className="relative z-10 w-full flex-1 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1 className="flex overflow-hidden pb-4">
          <AnimatePresence>
            {isLoaded && title.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: "110%", opacity: 0, rotate: 10 }}
                animate={{ y: "0%", opacity: 1, rotate: 0 }}
                transition={{
                  duration: 1.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3 + index * 0.06,
                }}
                className="type-display-hero text-white tracking-tighter mix-blend-overlay drop-shadow-2xl"
                style={{
                  fontSize: "clamp(4rem, 15vw, 18rem)",
                  lineHeight: "0.8",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </AnimatePresence>
        </h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="type-body-lead text-white/90 max-w-md text-center mt-6 mix-blend-difference"
        >
          Fine Art Direction & Archival Photography
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM ACTION BAR (Fades in)                                           */}
      {/* ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-8"
      >
        <div className="max-w-sm">
          <p className="type-meta text-white/60 mb-2">
            Currently accepting commissions for AW26 campaigns and gallery monographs.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#anthology"
            className="group flex items-center gap-3 type-ui-nav text-white hover:text-copper-400 transition-colors pointer-events-auto"
          >
            <span>View Archives</span>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-copper-400 transition-colors">
              <ArrowDownRight className="w-3.5 h-3.5" />
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
