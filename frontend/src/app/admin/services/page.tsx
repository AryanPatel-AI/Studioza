"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Edit, CheckCircle2, ArrowRight } from "lucide-react";
import { SERVICES, ServiceData } from "@/lib/data/studioData";

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceData[]>(SERVICES);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const created: ServiceData = {
      id: `serv-${Date.now()}`,
      slug,
      name: newName,
      tagline: newTagline,
      coverImage: "/images/palace-arch-courtyard.jpg",
      philosophy: "Crafted with unhurried reverence.",
      startingPrice: newPrice || "From $5,000",
      included: ["Master medium format capture", "Archival digital gallery"],
      process: [{ step: "01", title: "Consultation", description: "Discovery and alignment" }],
      faqs: [],
      portfolioSlugs: [],
    };
    setServices([...services, created]);
    setNewName("");
    setNewTagline("");
    setNewPrice("");
    setShowCreate(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">COMMISSIONS &amp; TIERS</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Studio Services &amp; Packages
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Manage commission offerings, deliverable scopes, pricing baselines, and booking questionnaires.
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowCreate(!showCreate)}
            className="bg-[#151515] text-[#F4F1EB] px-6 py-3 type-meta text-xs hover:bg-[#333333] transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showCreate ? "Cancel" : "Add Service Discipline"}</span>
          </button>
        </div>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="bg-white p-8 border border-[#D9D5CE] space-y-4 animate-in fade-in duration-300">
          <h3 className="font-serif text-2xl text-[#151515]">Add New Service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              required
              placeholder="Service Name (e.g. Fine Art Jewelry)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <input
              type="text"
              required
              placeholder="Tagline / Brief description"
              value={newTagline}
              onChange={(e) => setNewTagline(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
            <input
              type="text"
              required
              placeholder="Starting Price (e.g. From $4,500)"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors"
          >
            Save Discipline
          </button>
        </form>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, idx) => (
          <div
            key={s.slug}
            className="bg-white p-8 border border-[#D9D5CE] space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="type-meta text-xs text-[#77736D]">0{idx + 1} // ACTIVE</span>
                <span className="type-meta text-xs text-[#CC5500] font-semibold">{s.startingPrice}</span>
              </div>
              <h3 className="font-serif text-3xl text-[#151515]">{s.name}</h3>
              <p className="type-small text-[#77736D] leading-relaxed">{s.tagline}</p>
              <div className="pt-2 text-xs text-[#151515] space-y-1">
                <span className="type-meta text-[10px] text-[#77736D] block">INCLUDED HIGHLIGHTS:</span>
                {s.included.slice(0, 3).map((inc, i) => (
                  <p key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9CAF88] shrink-0" />
                    <span>{inc}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#D9D5CE] flex items-center justify-between">
              <Link
                href={`/admin/services/${s.slug}`}
                className="type-meta text-xs text-[#151515] hover:underline flex items-center gap-1.5 font-semibold"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Scope &amp; Deliverables</span>
              </Link>
              <Link
                href={`/services/${s.slug}`}
                target="_blank"
                className="type-meta text-xs text-[#77736D] hover:text-[#151515] flex items-center gap-1"
              >
                <span>Live Public Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
