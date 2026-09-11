"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    if (motionQuery.matches) {
      return () => {
        window.removeEventListener("resize", handleResize);
        motionQuery.removeEventListener("change", handleMotionChange);
      };
    }

    // 2-Tone Optical Bokeh Discs:
    // Tone 1: Twilight Blue / Cyan
    // Tone 2: Golden Hour Amber / Honey
    const bokehCount = Math.min(Math.floor(width / 90), 20);
    const bokehs: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      dAlpha: number;
      tone: "blue" | "amber";
    }[] = [];

    const blueColors = [
      "rgba(14, 165, 233, ",  // Sky Cyan
      "rgba(59, 130, 246, ",  // Sapphire Blue
      "rgba(99, 102, 241, ",  // Twilight Indigo
    ];

    const amberColors = [
      "rgba(245, 158, 11, ",  // Warm Amber
      "rgba(217, 119, 6, ",   // Deep Golden Bronze
      "rgba(251, 191, 36, ",  // Honey Gold
    ];

    for (let i = 0; i < bokehCount; i++) {
      const isAmber = i % 2 === 0;
      const palette = isAmber ? amberColors : blueColors;
      // Position blue towards the left/top, amber towards the right/bottom
      const initialX = isAmber
        ? width * 0.4 + Math.random() * (width * 0.6)
        : Math.random() * (width * 0.6);
      const initialY = isAmber
        ? height * 0.3 + Math.random() * (height * 0.7)
        : Math.random() * (height * 0.7);

      bokehs.push({
        x: initialX,
        y: initialY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 110 + 50,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.12 + 0.05,
        dAlpha: (Math.random() - 0.5) * 0.003,
        tone: isAmber ? "amber" : "blue",
      });
    }

    // Optical Dust Motes with dual-tone lighting
    const moteCount = Math.min(Math.floor(width / 26), 55);
    const motes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      dAlpha: number;
      color: string;
    }[] = [];

    for (let i = 0; i < moteCount; i++) {
      const isAmber = i % 2 === 0;
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.4 - 0.1,
        radius: Math.random() * 2 + 0.9,
        alpha: Math.random() * 0.6 + 0.25,
        dAlpha: (Math.random() - 0.5) * 0.01,
        color: isAmber ? "245, 158, 11" : "56, 189, 248",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Soft Bokeh Discs
      for (let i = 0; i < bokehs.length; i++) {
        const b = bokehs[i];
        b.x += b.vx;
        b.y += b.vy;
        b.alpha += b.dAlpha;

        if (b.alpha <= 0.03 || b.alpha >= 0.16) {
          b.dAlpha = -b.dAlpha;
        }

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.radius
        );
        gradient.addColorStop(0, `${b.color}${b.alpha * 1.8})`);
        gradient.addColorStop(0.5, `${b.color}${b.alpha * 0.9})`);
        gradient.addColorStop(1, `${b.color}0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw subtle light threads between nearby motes
      for (let i = 0; i < motes.length; i++) {
        for (let j = i + 1; j < motes.length; j++) {
          const dx = motes[i].x - motes[j].x;
          const dy = motes[i].y - motes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * 0.18;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180, 190, 220, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(motes[i].x, motes[i].y);
            ctx.lineTo(motes[j].x, motes[j].y);
            ctx.stroke();
          }
        }
      }

      // Render Luminous Studio Dust Motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha += m.dAlpha;

        if (m.alpha <= 0.2 || m.alpha >= 0.85) {
          m.dAlpha = -m.dAlpha;
        }

        if (m.x < 0) m.x = width;
        if (m.x > width) m.x = 0;
        if (m.y < 0) m.y = height;
        if (m.y > height) m.y = 0;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.color}, ${m.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${m.color}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* 1. DISTINCT 2-TONE SPLIT BASE: Twilight Blue (Top-Left) + Golden Amber (Bottom-Right) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 10% 15%, #0f1c3f 0%, #09122a 45%, transparent 75%),
            radial-gradient(ellipse at 90% 85%, #351c0e 0%, #201108 45%, transparent 75%),
            linear-gradient(135deg, #0a1124 0%, #111522 50%, #1f140e 100%)
          `,
        }}
      />

      {/* 2. TONE 1: Radiant Twilight Blue Glowing Aura (Top Left & Center) */}
      <div
        className="absolute -top-24 -left-20 w-[750px] h-[750px] rounded-full blur-[140px] opacity-75 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.45) 0%, rgba(37, 99, 235, 0.3) 40%, rgba(15, 23, 42, 0) 75%)",
          animationDuration: "10s",
        }}
      />

      {/* 3. TONE 2: Radiant Golden Hour Amber Glowing Aura (Bottom Right & Mid Right) */}
      <div
        className="absolute top-1/2 -right-24 w-[780px] h-[780px] rounded-full blur-[150px] opacity-70 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.42) 0%, rgba(217, 119, 6, 0.28) 45%, rgba(24, 15, 8, 0) 75%)",
          animationDuration: "12s",
        }}
      />

      {/* 4. Secondary Tone 1 Highlight (Lower Left Sapphire Wash) */}
      <div
        className="absolute -bottom-24 left-1/4 w-[600px] h-[600px] rounded-full blur-[130px] opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(30, 58, 138, 0.5) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 80%)",
        }}
      />

      {/* 5. Dual-Spectrum Anamorphic Lens Flare (Cyan to Amber across the horizon) */}
      <div
        className="absolute top-1/3 -left-1/4 w-[150%] h-[3px] opacity-60 blur-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.7) 25%, rgba(59, 130, 246, 0.5) 45%, rgba(245, 158, 11, 0.8) 65%, transparent 100%)",
        }}
      />

      {/* 6. Viewfinder Alignment Mesh Grid with Dual-Tone Glow */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14, 165, 233, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 158, 11, 0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      {/* 7. Active 2-Tone Bokeh & Motes Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 8. Soft Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, transparent 50%, rgba(8, 12, 22, 0.6) 100%)",
        }}
      />
    </div>
  );
}
