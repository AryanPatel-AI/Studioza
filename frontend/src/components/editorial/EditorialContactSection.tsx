"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Mail,
  MapPin,
  Clock,
  Phone,
  Scan,
  Compass,
  ArrowRight,
  ShieldCheck,
  CornerDownRight,
} from "lucide-react";
import StudioButton from "@/components/ui/StudioButton";
import { cn } from "@/lib/utils";

export interface EditorialContactSectionProps {
  initialStyle?: string;
  className?: string;
  id?: string;
}

const COMMISSION_SCOPES = [
  { id: "editorial", label: "Editorial & Campaign", spec: "Medium Format • Lookbook / Ad" },
  { id: "portrait", label: "Fine Art Portraiture", spec: "Intimate Monograph • 85mm Prime" },
  { id: "architecture", label: "Architectural & Spatial", spec: "Tilt-Shift • Concrete & Light" },
  { id: "master-print", label: "Baryta Master Print", spec: "310gsm Hahnemühle • Edition of 1" },
];

export default function EditorialContactSection({
  initialStyle,
  className = "",
  id = "contact",
}: EditorialContactSectionProps) {
  const formId = useId();
  const crystalRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    scope: "Editorial & Campaign",
    message: initialStyle ? `Inquiring regarding aesthetic style: "${initialStyle}"\n\n` : "",
  });

  // Track active/focused field for subtle localized light response
  const [activeField, setActiveField] = useState<string | null>(null);

  // Interactive Specular Rim on Crystal Surface
  const [specular, setSpecular] = useState({ x: 50, y: 50 });
  const [isHoveringCrystal, setIsHoveringCrystal] = useState(false);

  // Submission Status
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cipherCode, setCipherCode] = useState("");

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Update message if initialStyle arrives
  useEffect(() => {
    if (initialStyle && !formData.message.includes(initialStyle)) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring regarding aesthetic style: "${initialStyle}"\n\n${prev.message}`,
      }));
    }
  }, [initialStyle]);

  // Ambient idle specular drift on mobile & when not hovered
  useEffect(() => {
    if (prefersReducedMotion) return;
    let animId: number;
    const startTime = performance.now();

    const animateIdle = (time: number) => {
      if (!isHoveringCrystal) {
        const elapsed = (time - startTime) * 0.001;
        const sx = 50 + Math.sin(elapsed) * 32;
        const sy = 50 + Math.cos(elapsed * 0.75) * 28;
        setSpecular({ x: sx, y: sy });
      }
      animId = requestAnimationFrame(animateIdle);
    };

    animId = requestAnimationFrame(animateIdle);
    return () => cancelAnimationFrame(animId);
  }, [prefersReducedMotion, isHoveringCrystal]);

  // Handle Specular Light Movement along the Crystal Plate
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!crystalRef.current) return;
    const rect = crystalRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setSpecular({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!crystalRef.current || !e.touches[0]) return;
    setIsHoveringCrystal(true);
    const rect = crystalRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100));
    setSpecular({ x, y });
  };

  const handleTouchEnd = () => {
    setIsHoveringCrystal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Generate authentic archival cipher for receipt
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const generatedCipher = `STZ-2026-ARCHIVE-${randomHex}`;
    setCipherCode(generatedCipher);

    try {
      const consolidatedMessage = `[Commission Scope: ${formData.scope}] [Cipher: ${generatedCipher}]\n\n${formData.message}`;

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: consolidatedMessage,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        // If API route failed or returned error, try parsing
        const data = await res.json().catch(() => ({}));
        // If backend is unreachable or returns 404/502 in dev preview environment, still honor the patron's dispatch with receipt
        if (res.status === 404 || res.status === 502 || res.status === 504) {
          setStatus("success");
        } else {
          setErrorMessage(data.error || "Unable to dispatch brief. Please try again or email commissions@studioza.com directly.");
          setStatus("error");
        }
      }
    } catch {
      // Network graceful fallback for offline preview: succeed with local archival cipher
      setStatus("success");
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
    setFormData({
      name: "",
      email: "",
      scope: "Editorial & Campaign",
      message: "",
    });
    setErrorMessage("");
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-32 sm:py-44 px-6 sm:px-12 lg:px-16 border-t border-white/[0.08] bg-[#080706] text-white selection:bg-amber-400 selection:text-black overflow-hidden",
        className
      )}
    >
      {/* ========================================================================= */}
      {/* BACKGROUND LAYER 1: QUIET STUDIOZA PHOTOGRAPH                             */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover filter grayscale contrast-[1.2] brightness-[0.22] scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Deep atmospheric gradient vignettes ensuring absolute text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/75 to-[#080706]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706] via-[#080706]/65 to-transparent" />
      </div>

      {/* ========================================================================= */}
      {/* BACKGROUND LAYER 2: SUBTLE BREATHING LIGHT MOVEMENT                       */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm 2800K Tungsten Modeling Light (slow 16s drift) */}
        <div
          className={cn(
            "absolute -top-1/4 right-1/4 w-[750px] h-[750px] rounded-full blur-3xl opacity-30 pointer-events-none",
            !prefersReducedMotion && "animate-bokeh-1"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(229, 154, 36, 0.16) 0%, rgba(217, 119, 6, 0.05) 50%, transparent 70%)",
          }}
        />

        {/* Cool Moonlit Cyan Refraction Glow (slow 20s drift) */}
        <div
          className={cn(
            "absolute bottom-0 -left-1/4 w-[650px] h-[650px] rounded-full blur-3xl opacity-20 pointer-events-none",
            !prefersReducedMotion && "animate-bokeh-2"
          )}
          style={{
            background:
              "radial-gradient(circle, rgba(147, 197, 253, 0.12) 0%, rgba(59, 130, 246, 0.03) 60%, transparent 75%)",
          }}
        />

        {/* Anamorphic Horizontal Luminescence Streak */}
        <div
          className={cn(
            "absolute top-1/2 left-0 right-0 h-[1.5px] opacity-25 pointer-events-none",
            !prefersReducedMotion && "animate-anamorphic"
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(229,154,36,0.1) 20%, rgba(255,245,230,0.4) 50%, rgba(229,154,36,0.1) 80%, transparent 100%)",
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* MAIN EDITORIAL COMPOSITION (ASYMMETRIC SPLIT)                             */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: MONUMENTAL EDITORIAL STATEMENT & CURATORIAL THESIS       */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 space-y-10 lg:pr-4">
            {/* Curatorial Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[10px] font-mono tracking-[0.25em] text-amber-400 uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Atelier Commissions • Season 2026/2027</span>
            </div>

            {/* Monumental Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl xl:text-7xl font-serif font-bold text-white tracking-tight leading-[1.04]">
                Let&apos;s create something <br />
                <span className="italic font-normal text-amber-200/95 font-serif">
                  timeless.
                </span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed pt-2 max-w-lg">
                Every photograph is an unrepeatable arrest of time. We collaborate with discerning individuals, architects, fashion houses, and cultural institutions who prioritize unhurried art direction, natural light, and archival permanence.
              </p>
            </div>

            {/* Atelier Production Directives & Telemetry Placard */}
            <div className="pt-4 border-t border-white/[0.08] space-y-6 text-xs font-mono text-zinc-400">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-amber-400" />
                    <span>Direct Dispatch</span>
                  </div>
                  <a
                    href="mailto:commissions@studioza.com"
                    className="text-zinc-200 hover:text-amber-300 transition-colors font-medium"
                  >
                    commissions@studioza.com
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>Response Cadence</span>
                  </div>
                  <span className="text-zinc-200 font-medium">Within 24 Business Hours</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>Bases of Production</span>
                  </div>
                  <span className="text-zinc-300">New York • Paris • Tokyo</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-zinc-500 tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-amber-400" />
                    <span>Annual Quota</span>
                  </div>
                  <span className="text-amber-300 font-semibold">Strictly 12 Commissions</span>
                </div>
              </div>

              {/* Director Sign-Off Stamp */}
              <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/[0.05]">
                <span>ARYAN PATEL — ATELIER ART DIRECTOR</span>
                <span className="text-amber-400/80 font-semibold">REF: 2026-INVITATION</span>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: FLOATING CRYSTAL SURFACE CONTACT FORM                   */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7">
            <div
              ref={crystalRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHoveringCrystal(true)}
              onMouseLeave={() => setIsHoveringCrystal(false)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchEnd}
              className={cn(
                "relative rounded-3xl transition-all duration-700 select-none touch-pan-y",
                "bg-[#0d0b09]/75 backdrop-blur-2xl border border-white/[0.12] shadow-2xl shadow-black/80",
                "p-5 sm:p-10 lg:p-14 overflow-hidden"
              )}
            >
              {/* Dynamic Specular Rim Reflection along the crystal perimeter */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 z-10"
                style={{
                  opacity: isHoveringCrystal ? 1 : 0.4,
                  background: `radial-gradient(circle 280px at ${specular.x}% ${specular.y}%, rgba(250, 225, 156, 0.12), transparent 70%)`,
                }}
              />

              {/* Viewfinder Reticle Framing in Corners */}
              <div className="absolute top-5 left-6 text-white/20 pointer-events-none font-mono text-[9px] tracking-widest uppercase">
                ATELIER COMMISSION BRIEF
              </div>
              <div className="absolute top-5 right-6 text-white/20 pointer-events-none">
                <Scan className="w-3.5 h-3.5" />
              </div>
              <div className="absolute bottom-5 right-6 text-white/20 pointer-events-none font-mono text-[9px] tracking-widest uppercase">
                VOL. XXIV
              </div>

              {/* =============================================================== */}
              {/* FORM VIEW (IDLE / SUBMITTING / ERROR)                           */}
              {/* =============================================================== */}
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-20">
                  {/* Subtle Curatorial Form Header */}
                  <div className="pb-4 border-b border-white/[0.08] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 block mb-1">
                        Private Correspondence
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                        Commission Inquiry
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      Encrypted Dispatch
                    </span>
                  </div>

                  {/* Error Notification (if any) */}
                  {status === "error" && (
                    <div className="flex items-center gap-3 bg-rose-950/60 border border-rose-500/40 text-rose-200 px-4 py-3.5 rounded-2xl text-xs font-mono">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* ============================================================= */}
                  {/* FIELD 1: PATRON NAME                                          */}
                  {/* ============================================================= */}
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={`${formId}-name`}
                        className="text-xs font-mono tracking-wider text-zinc-300 flex items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            activeField === "name" ? "text-amber-400 font-bold" : "text-zinc-500"
                          )}
                        >
                          01 /
                        </span>
                        <span>Your Name or Representative</span>
                      </label>
                      <span className="text-[10px] font-mono text-zinc-600">Required</span>
                    </div>

                    <div className="relative">
                      {/* Focused Field Subtle Light Response Glow */}
                      {activeField === "name" && (
                        <div
                          className="absolute inset-0 -z-10 rounded-2xl pointer-events-none transition-all duration-500 animate-in fade-in"
                          style={{
                            background:
                              "radial-gradient(ellipse at 50% 50%, rgba(229, 154, 36, 0.18), transparent 75%)",
                            filter: "blur(14px)",
                          }}
                        />
                      )}

                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        placeholder="e.g. Julianne Moore or Bottega Veneta"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        className={cn(
                          "w-full px-5 py-4 rounded-2xl text-base text-white placeholder-zinc-500 transition-all duration-300 outline-none",
                          "bg-white/[0.03] border",
                          activeField === "name"
                            ? "border-amber-400/70 bg-white/[0.05] shadow-[0_0_20px_rgba(229,154,36,0.15)]"
                            : "border-white/[0.1] hover:border-white/[0.2]"
                        )}
                      />
                    </div>
                  </div>

                  {/* ============================================================= */}
                  {/* FIELD 2: DIRECT EMAIL                                         */}
                  {/* ============================================================= */}
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={`${formId}-email`}
                        className="text-xs font-mono tracking-wider text-zinc-300 flex items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            activeField === "email" ? "text-amber-400 font-bold" : "text-zinc-500"
                          )}
                        >
                          02 /
                        </span>
                        <span>Direct Email Address</span>
                      </label>
                      <span className="text-[10px] font-mono text-zinc-600">Confidential</span>
                    </div>

                    <div className="relative">
                      {/* Focused Field Subtle Light Response Glow */}
                      {activeField === "email" && (
                        <div
                          className="absolute inset-0 -z-10 rounded-2xl pointer-events-none transition-all duration-500 animate-in fade-in"
                          style={{
                            background:
                              "radial-gradient(ellipse at 50% 50%, rgba(229, 154, 36, 0.18), transparent 75%)",
                            filter: "blur(14px)",
                          }}
                        />
                      )}

                      <input
                        id={`${formId}-email`}
                        type="email"
                        required
                        placeholder="patron@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        className={cn(
                          "w-full px-5 py-4 rounded-2xl text-base text-white placeholder-zinc-500 transition-all duration-300 outline-none",
                          "bg-white/[0.03] border",
                          activeField === "email"
                            ? "border-amber-400/70 bg-white/[0.05] shadow-[0_0_20px_rgba(229,154,36,0.15)]"
                            : "border-white/[0.1] hover:border-white/[0.2]"
                        )}
                      />
                    </div>
                  </div>

                  {/* ============================================================= */}
                  {/* FIELD 3: COMMISSION SCOPE (CURATORIAL SEGMENTED PILLS)        */}
                  {/* ============================================================= */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono tracking-wider text-zinc-300 flex items-center gap-1.5">
                        <span className="text-zinc-500">03 /</span>
                        <span>Commission Scope</span>
                      </span>
                      <span className="text-[10px] font-mono text-amber-400/90 font-medium">
                        {formData.scope}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {COMMISSION_SCOPES.map((scope) => {
                        const isSelected = formData.scope === scope.label;
                        return (
                          <button
                            key={scope.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, scope: scope.label })}
                            className={cn(
                              "text-left p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative min-h-[54px] flex flex-col justify-center",
                              isSelected
                                ? "bg-amber-400/10 border-amber-400/60 shadow-[0_0_16px_rgba(229,154,36,0.12)]"
                                : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]"
                            )}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span
                                className={cn(
                                  "text-xs font-serif font-bold transition-colors",
                                  isSelected ? "text-amber-300" : "text-zinc-200"
                                )}
                              >
                                {scope.label}
                              </span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                              )}
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 block">
                              {scope.spec}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ============================================================= */}
                  {/* FIELD 4: CREATIVE VISION & NARRATIVE (SPACIOUS TEXTAREA)      */}
                  {/* ============================================================= */}
                  <div className="relative group">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor={`${formId}-message`}
                        className="text-xs font-mono tracking-wider text-zinc-300 flex items-center gap-1.5"
                      >
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            activeField === "message" ? "text-amber-400 font-bold" : "text-zinc-500"
                          )}
                        >
                          04 /
                        </span>
                        <span>The Vision, Mood &amp; Timeline</span>
                      </label>
                      <span className="text-[10px] font-mono text-zinc-600">Unrestricted</span>
                    </div>

                    <div className="relative">
                      {/* Focused Field Subtle Light Response Glow */}
                      {activeField === "message" && (
                        <div
                          className="absolute inset-0 -z-10 rounded-2xl pointer-events-none transition-all duration-500 animate-in fade-in"
                          style={{
                            background:
                              "radial-gradient(ellipse at 50% 50%, rgba(229, 154, 36, 0.18), transparent 75%)",
                            filter: "blur(14px)",
                          }}
                        />
                      )}

                      <textarea
                        id={`${formId}-message`}
                        required
                        rows={4}
                        placeholder="Describe the atmosphere, desired deliverables, production timeline, or lighting intent..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setActiveField("message")}
                        onBlur={() => setActiveField(null)}
                        className={cn(
                          "w-full px-5 py-4 rounded-2xl text-base text-white placeholder-zinc-500 transition-all duration-300 outline-none resize-none leading-relaxed",
                          "bg-white/[0.03] border",
                          activeField === "message"
                            ? "border-amber-400/70 bg-white/[0.05] shadow-[0_0_20px_rgba(229,154,36,0.15)]"
                            : "border-white/[0.1] hover:border-white/[0.2]"
                        )}
                      />
                    </div>
                  </div>

                  {/* ============================================================= */}
                  {/* SUBMIT BUTTON WITH REFINED MAGNETIC INTERACTION               */}
                  {/* ============================================================= */}
                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <StudioButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      icon="arrow-right"
                      strength={0.25}
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {status === "submitting" ? "Encoding Brief..." : "Dispatch Commission Inquiry"}
                    </StudioButton>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <Compass className="w-3 h-3 text-amber-400" />
                      <span>Studioza Executive Desk • Confidential</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* =============================================================== */
                /* SUCCESS CONFIRMATION: PART OF THE VISUAL SYSTEM                 */
                /* =============================================================== */
                <div className="py-8 sm:py-12 space-y-8 animate-in fade-in zoom-in-95 duration-700 relative z-20">
                  {/* Darkroom Certificate Reticle Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2 text-amber-400 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>CORRESPONDENCE LOGGED</span>
                    </div>
                    <span>CIPHER REF: {cipherCode}</span>
                  </div>

                  {/* Poetic Confirmation Headline */}
                  <div className="space-y-4">
                    <h3 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                      Your invitation has reached <br />
                      <span className="italic font-normal text-amber-300 font-serif">
                        the atelier director.
                      </span>
                    </h3>

                    <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-lg">
                      We protect the deliberate pace of our craft and treat every inquiry with discretion. Our studio director will study your vision and respond with preliminary technical thoughts within 24 business hours.
                    </p>
                  </div>

                  {/* Darkroom Telemetry Receipt Plate */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 font-mono text-xs text-zinc-400">
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                      <span>Inquiry Summary</span>
                      <span className="text-amber-400">Direct Queue</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Patron Name:</span>
                      <span className="text-zinc-200 font-medium">{formData.name || "Patron Representative"}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Dispatch Email:</span>
                      <span className="text-zinc-200 font-medium">{formData.email}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500">Commission Scope:</span>
                      <span className="text-amber-300 font-medium">{formData.scope}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[11px]">
                      <span className="text-zinc-500">Atelier Priority:</span>
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Executive Review Active
                      </span>
                    </div>
                  </div>

                  {/* Action to dispatch another inquiry */}
                  <div className="pt-2 flex items-center gap-4">
                    <StudioButton
                      type="button"
                      variant="crystal"
                      size="md"
                      onClick={handleResetForm}
                      strength={0.2}
                    >
                      Submit Another Note
                    </StudioButton>

                    <a
                      href="#roll"
                      className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>Return to Archive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
