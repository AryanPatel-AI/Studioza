"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Save, Check } from "lucide-react";
import { SERVICES } from "@/lib/data/studioData";

export default function AdminEditServicePage() {
  const params = useParams();
  const id = params.id as string;
  const service = SERVICES.find((s) => s.slug === id || s.id === id) || SERVICES[0];

  const [formData, setFormData] = useState(service);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Services</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Edit Discipline: {formData.name}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? "Saved Successfully" : "Save Changes"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          ✓ Discipline pricing, deliverables, and philosophy updated.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Discipline Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Starting Price</label>
            <input
              type="text"
              value={formData.startingPrice}
              onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Core Philosophy</label>
          <textarea
            rows={3}
            value={formData.philosophy}
            onChange={(e) => setFormData({ ...formData, philosophy: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-2">
          <label className="type-meta text-xs text-[#77736D]">Inclusions (One per line)</label>
          <textarea
            rows={5}
            value={formData.included.join("\n")}
            onChange={(e) => setFormData({ ...formData, included: e.target.value.split("\n").filter(Boolean) })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] font-mono text-xs"
          />
        </div>
      </form>
    </div>
  );
}
