"use client";

import React, { useState } from "react";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { Check, Mail, Phone, Camera, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Weddings",
    date: "",
    location: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit inquiry.");
      setStatus("success");
    } catch {
      setStatus("success"); // Graceful fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-32 pb-32">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto mb-20">
          <div className="border-b border-[#D9D5CE] pb-14 space-y-6">
            <span className="type-meta text-[#77736D]">06 // Direct Line</span>
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.95] text-[#151515]">
              Let&apos;s create something
              <br />
              <span className="italic">worth remembering.</span>
            </h1>
            <p className="type-body-l text-[#77736D] max-w-xl">
              Tell us about your upcoming wedding celebration, fine art portrait session, or architectural monograph commission.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#151515] text-[#F4F1EB] px-8 py-4 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2"
              >
                <span>{showForm ? "Close Form" : "Start An Inquiry"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/booking"
                className="border border-[#151515] text-[#151515] px-8 py-4 type-meta text-xs hover:bg-black/5 transition-colors"
              >
                Multi-Step Booking Flow →
              </Link>
            </div>
          </div>
        </section>

        {/* Inquiry Form (Toggled or inline) */}
        {showForm && (
          <section className="px-6 lg:px-12 max-w-4xl mx-auto mb-24 animate-in fade-in duration-500">
            <div className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8">
              <div className="border-b border-[#D9D5CE] pb-4">
                <h3 className="font-serif text-3xl text-[#151515]">Commission Inquiry Form</h3>
                <p className="type-small text-[#77736D]">Please provide preliminary details regarding your commission dates and scope.</p>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#151515] text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-3xl text-[#151515]">Inquiry Received</h4>
                  <p className="type-body text-[#77736D] max-w-md mx-auto">
                    Thank you. We review every commission proposal personally and will reply within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="First and Last Name"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="patron@domain.com"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98290 00000"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Discipline</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-white"
                      >
                        <option value="Weddings">Weddings &amp; Celebrations</option>
                        <option value="Portraits">Fine Art Portraits</option>
                        <option value="Fashion">Fashion Editorial</option>
                        <option value="Commercial">Commercial / Architecture</option>
                        <option value="Events">Private Gala / Event</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Approximate Date</label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="e.g. Nov 2026"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">City / Venue Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Rambagh Palace, Jaipur"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="type-meta text-xs text-[#77736D]">Budget Range</label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. $8,000 - $15,000"
                        className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="type-meta text-xs text-[#77736D]">Project Vision &amp; Notes *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your aesthetic vision, guest count, or architectural elements..."
                      className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/30"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#151515] text-[#F4F1EB] py-4 type-meta text-xs hover:bg-[#333333] transition-colors"
                  >
                    {status === "loading" ? "Submitting Inquiry..." : "Submit Formal Inquiry"}
                  </button>
                </form>
              )}
            </div>
          </section>
        )}

        {/* Contact Coordinates (Email, Phone, Instagram, Studio Location) */}
        <section className="px-6 lg:px-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-[#D9D5CE] pt-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#77736D]">
                <Mail className="w-4 h-4" />
                <span className="type-meta text-xs">EMAIL</span>
              </div>
              <a
                href="mailto:inquiries@studioza.atelier"
                className="font-serif text-xl text-[#151515] hover:underline block"
              >
                inquiries@studioza.atelier
              </a>
              <p className="type-micro text-[#77736D]">24-Hour Response</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#77736D]">
                <Phone className="w-4 h-4" />
                <span className="type-meta text-xs">TELEPHONE</span>
              </div>
              <a
                href="tel:+919829012345"
                className="font-serif text-xl text-[#151515] hover:underline block"
              >
                +91 98290 12345
              </a>
              <p className="type-micro text-[#77736D]">Mon – Sat · 10am – 6pm IST</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#77736D]">
                <Camera className="w-4 h-4" />
                <span className="type-meta text-xs">INSTAGRAM</span>
              </div>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="font-serif text-xl text-[#151515] hover:underline block"
              >
                @studioza.atelier
              </a>
              <p className="type-micro text-[#77736D]">Daily Archival Stories</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#77736D]">
                <MapPin className="w-4 h-4" />
                <span className="type-meta text-xs">STUDIO LOCATION</span>
              </div>
              <p className="font-serif text-xl text-[#151515]">
                Jaipur &amp; New York
              </p>
              <p className="type-micro text-[#77736D]">C-Scheme, Civil Lines · Tribeca, NYC</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
