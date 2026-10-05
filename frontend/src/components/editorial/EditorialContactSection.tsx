"use client";

import React, { useState, useEffect, useId } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
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

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    scope: "Editorial & Campaign",
    message: initialStyle ? `Inquiring regarding aesthetic style: "${initialStyle}"\n\n` : "",
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cipherCode, setCipherCode] = useState("");

  // Update message if initialStyle arrives
  useEffect(() => {
    if (initialStyle && !formData.message.includes(initialStyle)) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring regarding aesthetic style: "${initialStyle}"\n\n${prev.message}`,
      }));
    }
  }, [initialStyle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields before dispatching.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.scope,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch inquiry");
      }

      setCipherCode(`ATELIER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
      setStatus("success");
    } catch (err: any) {
      console.error("Failed to dispatch inquiry:", err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      email: "",
      scope: "Editorial & Campaign",
      message: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section
      id={id}
      className={cn(
        "py-24 sm:py-36 px-6 sm:px-12 lg:px-16 relative bg-background text-foreground overflow-hidden border-t border-hairline",
        className
      )}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ===================================================================== */}
          {/* LEFT COLUMN: EDITORIAL STATEMENT & CURATORIAL THESIS                  */}
          {/* ===================================================================== */}
          <div className="lg:col-span-5 space-y-8 lg:pr-4">
            <div className="space-y-3">
              <span className="type-meta block">
                [Correspondence // Season 2026]
              </span>

              <h2 className="type-display-section text-ink-primary">
                Let&apos;s create something <br />
                <span className="italic text-copper-600">
                  timeless.
                </span>
              </h2>

              <p className="text-ink-body type-body-base pt-2 max-w-lg">
                Every photograph is an unrepeatable arrest of time. We collaborate with discerning individuals, architects, fashion houses, and cultural institutions who prioritize unhurried art direction, natural light, and archival permanence.
              </p>
            </div>

            {/* Atelier Directives & Telemetry Placard */}
            <div className="pt-4 border-t border-hairline space-y-6 type-body-base text-ink-muted">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-stone-400 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-copper-500" />
                    <span>Direct Dispatch</span>
                  </div>
                  <a
                    href="mailto:commissions@studioza.com"
                    className="text-ink-primary hover:text-copper-600 transition-colors"
                  >
                    commissions@studioza.com
                  </a>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-copper-500" />
                    <span>Response Cadence</span>
                  </div>
                  <span className="text-ink-primary">Within 24 Hours</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-stone-400 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-copper-500" />
                    <span>Bases of Production</span>
                  </div>
                  <span className="text-ink-primary">New York • Paris • Tokyo</span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] uppercase text-stone-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-copper-500" />
                    <span>Annual Quota</span>
                  </div>
                  <span className="text-copper-600 font-semibold">Strictly 12 Commissions</span>
                </div>
              </div>

              {/* Director Sign-Off Stamp */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-ink-muted border-t border-hairline">
                <span>ARYAN PATEL — ART DIRECTOR</span>
                <span className="text-copper-600">REF: 2026-INVITATION</span>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT COLUMN: ARCHITECTURAL CONTACT SALON                             */}
          {/* ===================================================================== */}
          <div className="lg:col-span-7">
            <div className="pt-8">
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Header */}
                  <div className="pb-4 border-b border-hairline flex items-center justify-between">
                    <div>
                      <span className="type-meta text-copper-600 block mb-0.5">
                        Private Correspondence
                      </span>
                      <h3 className="type-body-lead text-ink-primary font-medium">
                        Commission Inquiry Brief
                      </h3>
                    </div>
                    <span className="type-meta">
                      Confidential
                    </span>
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <div role="alert" aria-live="assertive" className="flex items-center gap-3 bg-stone-100 border border-stone-300 text-stone-800 px-4 py-3 rounded-[2px] type-meta">
                      <AlertCircle className="w-4 h-4 text-copper-600 shrink-0" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Field 1: Name */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between type-meta">
                      <label htmlFor={`${formId}-name`} className="text-ink-primary uppercase">
                        01 / Name or Maison Representative
                      </label>
                      <span className="text-stone-400 text-[10px]">Required</span>
                    </div>
                    <input
                      id={`${formId}-name`}
                      type="text"
                      required
                      placeholder="e.g. Julianne Moore or Bottega Veneta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      className="w-full py-3 type-body-base text-ink-primary placeholder:text-stone-400 bg-transparent border-b border-hairline focus:border-copper-500 outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none"
                    />
                  </div>

                  {/* Field 2: Email */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between type-meta">
                      <label htmlFor={`${formId}-email`} className="text-ink-primary uppercase">
                        02 / Direct Email
                      </label>
                      <span className="text-stone-400 text-[10px]">Confidential</span>
                    </div>
                    <input
                      id={`${formId}-email`}
                      type="email"
                      required
                      placeholder="patron@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      className="w-full py-3 type-body-base text-ink-primary placeholder:text-stone-400 bg-transparent border-b border-hairline focus:border-copper-500 outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none"
                    />
                  </div>

                  {/* Field 3: Scope */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between type-meta">
                      <span id={`${formId}-scope-label`} className="text-ink-primary uppercase">
                        03 / Commission Scope
                      </span>
                      <span className="text-copper-600 text-[10px]">
                        {formData.scope}
                      </span>
                    </div>
                    <div role="radiogroup" aria-labelledby={`${formId}-scope-label`} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {COMMISSION_SCOPES.map((scope) => {
                        const isSelected = formData.scope === scope.label;
                        return (
                          <button
                            key={scope.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, scope: scope.label })}
                            className={cn(
                              "text-left py-3 px-3 border-b transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-center rounded-none",
                              isSelected
                                ? "bg-copper-50/60 border-copper-500 text-copper-700"
                                : "bg-stone-50/50 border-stone-200 hover:border-stone-400 text-ink-primary"
                            )}
                          >
                            <span className="text-xs block font-medium">
                              {scope.label}
                            </span>
                            <span className="text-[10px] text-stone-500 block mt-0.5">
                              {scope.spec}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Field 4: Narrative */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between type-meta">
                      <label htmlFor={`${formId}-message`} className="text-ink-primary uppercase">
                        04 / The Vision, Mood &amp; Timeline
                      </label>
                      <span className="text-stone-400 text-[10px]">Unrestricted</span>
                    </div>
                    <textarea
                      id={`${formId}-message`}
                      required
                      rows={4}
                      placeholder="Describe the atmosphere, desired deliverables, production timeline, or lighting intent..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      className="w-full py-3 type-body-base text-ink-primary placeholder:text-stone-400 bg-transparent border-b border-hairline focus:border-copper-500 outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-none resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <StudioButton
                      type="submit"
                      variant="primary"
                      size="md"
                      icon="arrow-right"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {status === "submitting" ? "Dispatching..." : "Dispatch Commission Inquiry"}
                    </StudioButton>

                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                      <Compass className="w-3 h-3 text-copper-500" />
                      <span>Studioza Executive Desk • Confidential</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success View */
                <div className="py-8 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-hairline type-meta">
                    <div className="flex items-center gap-2 text-copper-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-copper-500" />
                      <span>Correspondence Received</span>
                    </div>
                    <span>REF: {cipherCode}</span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="type-display-project text-ink-primary">
                      Your note has reached <br />
                      <span className="italic text-copper-600">the atelier director.</span>
                    </h3>
                    <p className="type-body-base text-ink-body max-w-lg">
                      We protect the deliberate pace of our craft and treat every inquiry with discretion. Our studio director will study your vision and respond with preliminary technical thoughts within 24 business hours.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-hairline space-y-2 text-[11px] text-ink-muted uppercase tracking-widest">
                    <div className="flex justify-between">
                      <span>Patron:</span>
                      <span className="text-ink-primary">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="text-ink-primary">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scope:</span>
                      <span className="text-copper-600">{formData.scope}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <StudioButton
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleResetForm}
                    >
                      Submit Another Note
                    </StudioButton>
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
