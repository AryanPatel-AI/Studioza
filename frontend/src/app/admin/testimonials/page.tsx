"use client";

import React, { useState } from "react";
import { Plus, Trash2, Star, Check } from "lucide-react";
import { TESTIMONIALS, TestimonialData } from "@/lib/data/studioData";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(TESTIMONIALS);
  const [showAdd, setShowAdd] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newQuote, setNewQuote] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item: TestimonialData = {
      id: `test-${Date.now()}`,
      clientName: newClient,
      clientRole: newRole,
      quote: newQuote,
      eventOrProject: "Commission Monograph",
      location: newLocation,
      year: "2026",
    };
    setTestimonials([item, ...testimonials]);
    setNewClient("");
    setNewRole("");
    setNewLocation("");
    setNewQuote("");
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">CLIENT VOICES &amp; PRAISE</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Testimonials &amp; Press
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Curate verified quotes from wedding patrons, art directors, and international curators.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowAdd(!showAdd)}
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showAdd ? "Cancel" : "Add Testimonial"}</span>
          </button>
        </div>
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white p-8 border border-[#D9D5CE] space-y-4 animate-in fade-in duration-300">
          <h3 className="font-serif text-2xl text-[#151515]">New Testimonial</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Patron Name (e.g. Radhika & Sidharth)"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <input
              type="text"
              required
              placeholder="Role / Event (e.g. Jaipur Royal Wedding)"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <input
              type="text"
              placeholder="Location (e.g. Umaid Bhawan, Jodhpur)"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
          <textarea
            required
            rows={3}
            placeholder="Quote text..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
          <button
            type="submit"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors"
          >
            Save Testimonial
          </button>
        </form>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white p-8 border border-[#D9D5CE] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-[#CC5500]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-serif italic text-lg text-[#151515] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-[#D9D5CE] flex items-center justify-between">
              <div>
                <span className="font-medium text-sm text-[#151515] block">{t.clientName}</span>
                <span className="type-meta text-[#77736D] text-[10px]">{t.clientRole} • {t.location}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="text-rose-700 hover:text-rose-900 p-1"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
