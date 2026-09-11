"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  Camera,
  Calendar,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const requestedStyle = searchParams.get("style");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    commissionType: "Editorial & Fashion Campaign",
    studioLocation: "New York Atelier (SoHo)",
    timeline: "Next 1-2 Months",
    message: requestedStyle ? `Inquiring regarding aesthetic style: "${requestedStyle}"\n\n` : "",
  });

  useEffect(() => {
    if (requestedStyle && !formData.message.includes(requestedStyle)) {
      setFormData((prev) => ({
        ...prev,
        message: `Inquiring regarding aesthetic style: "${requestedStyle}"\n\n${prev.message}`,
      }));
    }
  }, [requestedStyle]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const consolidatedMessage = `[Commission: ${formData.commissionType}] [Location: ${formData.studioLocation}] [Timeline: ${formData.timeline}]\n\n${formData.message}`;

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
        setFormData({
          name: "",
          email: "",
          commissionType: "Editorial & Fashion Campaign",
          studioLocation: "New York Atelier (SoHo)",
          timeline: "Next 1-2 Months",
          message: "",
        });
      } else {
        const err = await res.json().catch(() => ({}));
        setErrorMessage(err.error || "Failed to submit commission inquiry. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
      setStatus("error");
    }
  };

  return (
    <main className="flex-1 py-16 md:py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/30 text-xs font-mono text-sky-300 mb-4 shadow-md">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            Studio Inquiries &amp; Commissions
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
            Commission an Atelier Session
          </h1>
          <p className="mt-4 text-blue-200/80 max-w-2xl mx-auto text-base font-light leading-relaxed">
            Share your creative vision, brand dates, or portrait requirements. Our studio director responds within 24 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Atelier Contact Details: TONE 1 (Twilight Blue Hour) */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-blue-400/25 bg-[#0c1734]/85 p-6 backdrop-blur-md shadow-xl shadow-blue-950/40">
              <Mail className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-serif font-bold text-white">Direct Atelier Email</h3>
              <p className="text-xs text-sky-200 font-mono mt-1">commissions@studioza.com</p>
              <p className="text-[11px] text-neutral-400 mt-1">Encrypted correspondence for patrons and agencies.</p>
            </div>

            <div className="rounded-3xl border border-blue-400/25 bg-[#0c1734]/85 p-6 backdrop-blur-md shadow-xl shadow-blue-950/40">
              <MapPin className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-serif font-bold text-white">Global Studio Locations</h3>
              <p className="text-xs text-sky-200 mt-1">New York • Paris • Tokyo • Milan</p>
              <p className="text-[11px] text-neutral-400 mt-1">Available for worldwide on-location productions.</p>
            </div>

            <div className="rounded-3xl border border-blue-400/25 bg-[#0c1734]/85 p-6 backdrop-blur-md shadow-xl shadow-blue-950/40">
              <Clock className="w-5 h-5 text-amber-400 mb-3" />
              <h3 className="text-sm font-serif font-bold text-white">Production Turnaround</h3>
              <p className="text-xs text-sky-200 mt-1">Proofing: 48h • Master Finish: 10 Days</p>
              <p className="text-[11px] text-neutral-400 mt-1">High-resolution digital negatives &amp; museum prints.</p>
            </div>
          </div>

          {/* Commission Booking Form: TONE 2 (Golden Hour Warm Amber Accent) */}
          <div className="lg:col-span-2 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#0c162e]/90 via-[#181926]/90 to-[#2c170a]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            {status === "success" && (
              <div className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 px-5 py-4 rounded-2xl mb-8 text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Thank you! Your shoot commission inquiry has been securely received. Our studio director will be in touch within 24 hours.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 bg-rose-950/60 border border-rose-500/40 text-rose-300 px-5 py-4 rounded-2xl mb-8 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                    Your Name / Representative
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vivienne Westwood"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@maison.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                    Commission Scope
                  </label>
                  <select
                    value={formData.commissionType}
                    onChange={(e) => setFormData({ ...formData, commissionType: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/[0.12] bg-[#0d162d] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm cursor-pointer"
                  >
                    <option value="Editorial & Fashion Campaign">Editorial &amp; Fashion Campaign</option>
                    <option value="Private & Artistic Portraiture">Private &amp; Artistic Portraiture</option>
                    <option value="Architectural & Spatial Archive">Architectural &amp; Spatial Archive</option>
                    <option value="Commercial Still Life & Objects">Commercial Still Life &amp; Objects</option>
                    <option value="Limited Edition Archival Print">Limited Edition Archival Print</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                    Preferred Atelier / Location
                  </label>
                  <select
                    value={formData.studioLocation}
                    onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/[0.12] bg-[#0d162d] text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm cursor-pointer"
                  >
                    <option value="New York Atelier (SoHo)">New York Atelier (SoHo)</option>
                    <option value="Paris Atelier (Le Marais)">Paris Atelier (Le Marais)</option>
                    <option value="Tokyo Atelier (Daikanyama)">Tokyo Atelier (Daikanyama)</option>
                    <option value="Milan Atelier (Brera)">Milan Atelier (Brera)</option>
                    <option value="On-Location (International)">On-Location (International)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                  Creative Brief &amp; Project Description
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your creative vision, preferred styling, number of deliverables, and any specific aesthetic references..."
                  className="w-full px-4 py-3.5 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full font-semibold text-xs text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Send className="w-4 h-4" />
                {status === "loading" ? "Submitting Commission Brief..." : "Submit Shoot Commission Brief"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen text-neutral-100 flex flex-col relative selection:bg-amber-500 selection:text-black">
      <AnimatedBackground />
      <Navbar />
      <Suspense fallback={<div className="flex-1 py-24 text-center text-neutral-500">Loading commission portal...</div>}>
        <ContactFormContent />
      </Suspense>
      <Footer />
    </div>
  );
}
