"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    company: "", 
    projectType: "", 
    budget: "", 
    timeline: "", 
    reference: "", 
    message: "" 
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
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const projectTypeOptions = [
    { label: "Select Project Type", value: "" },
    { label: "Digital Platform / Web", value: "digital_platform" },
    { label: "Brand Identity", value: "brand_identity" },
    { label: "Spatial Photography", value: "spatial_photography" },
    { label: "Architectural Visuals", value: "architectural_visuals" },
    { label: "Other", value: "other" }
  ];

  const budgetOptions = [
    { label: "Select Budget Range", value: "" },
    { label: "$10k - $25k", value: "10k-25k" },
    { label: "$25k - $50k", value: "25k-50k" },
    { label: "$50k - $100k", value: "50k-100k" },
    { label: "$100k+", value: "100k+" }
  ];

  const timelineOptions = [
    { label: "Select Timeline", value: "" },
    { label: "ASAP", value: "asap" },
    { label: "1-3 Months", value: "1-3_months" },
    { label: "3-6 Months", value: "3-6_months" },
    { label: "6+ Months", value: "6+_months" }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-deep-night)] text-[var(--ink-inverse)] relative font-sans selection:bg-[var(--accent-muted-gold)] selection:text-[var(--bg-near-black)] flex flex-col">
      <FilmGrain />
      <Navbar />

      <main className="flex-1 pt-40 pb-32 px-6 lg:px-12 flex flex-col justify-center items-center">
        <div className="max-w-[100rem] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="md:col-span-5 flex flex-col justify-between"
          >
            <div>
              <span className="type-meta text-[var(--accent-muted-gold)] mb-6 block">04 / DISPATCH</span>
              <h1 className="type-display-title text-[var(--bg-warm-ivory)] mb-6 leading-[1.1]">
                COMMISSION <br /> AN INQUIRY
              </h1>
              <p className="type-body-base text-[var(--ink-inverse-muted)] max-w-sm">
                We operate on a strictly curated project schedule. Please provide structural details of your inquiry, and our dispatch will reach out if the alignment is mutual.
              </p>
            </div>
            
            <div className="mt-16 pt-8 border-t border-[rgba(247,245,240,0.15)]">
              <p className="type-meta text-[var(--ink-inverse-muted)] mb-2">Direct Correspondence</p>
              <a href="mailto:atelier@studioza.com" className="type-body-base hover:text-[var(--accent-muted-gold)] transition-colors duration-400">
                atelier@studioza.com
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
            className="md:col-span-7 bg-[var(--bg-midnight-blue)] p-8 lg:p-12 border border-[rgba(247,245,240,0.1)] relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="h-full min-h-[400px] flex flex-col justify-center items-center text-center space-y-6"
                >
                  <div className="w-16 h-px bg-[var(--accent-muted-gold)]" />
                  <h2 className="type-display-statement text-[var(--bg-warm-ivory)]">
                    DISPATCH RECEIVED
                  </h2>
                  <p className="type-body-base text-[var(--ink-inverse-muted)] max-w-xs">
                    Your inquiry has been logged into our architectural archive. We will review and respond accordingly.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-10"
                >
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="name" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Identification
                        </label>
                        <Input 
                          id="name"
                          type="text" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Full Name" 
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)] placeholder:text-[var(--ink-inverse-muted)]/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Company / Entity
                        </label>
                        <Input 
                          id="company"
                          type="text" 
                          required 
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Company Name" 
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)] placeholder:text-[var(--ink-inverse-muted)]/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label htmlFor="email" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Transmission Origin
                        </label>
                        <Input 
                          id="email"
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="Email Address" 
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)] placeholder:text-[var(--ink-inverse-muted)]/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="reference" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Website / Reference URL
                        </label>
                        <Input 
                          id="reference"
                          type="url" 
                          value={formData.reference}
                          onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                          placeholder="https://..." 
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)] placeholder:text-[var(--ink-inverse-muted)]/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <label htmlFor="projectType" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Project Type
                        </label>
                        <Select 
                          id="projectType"
                          required
                          value={formData.projectType}
                          onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                          options={projectTypeOptions}
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)]"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Budget Range
                        </label>
                        <Select 
                          id="budget"
                          required
                          value={formData.budget}
                          onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                          options={budgetOptions}
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)]"
                        />
                      </div>
                      <div>
                        <label htmlFor="timeline" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                          Timeline
                        </label>
                        <Select 
                          id="timeline"
                          required
                          value={formData.timeline}
                          onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                          options={timelineOptions}
                          className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="type-meta text-[var(--ink-inverse-muted)] mb-2 block">
                        Project Thesis
                      </label>
                      <Textarea 
                        id="message"
                        required 
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Detail the parameters of your inquiry..." 
                        className="text-[var(--ink-inverse)] border-[rgba(247,245,240,0.2)] focus-visible:border-[var(--accent-muted-gold)] placeholder:text-[var(--ink-inverse-muted)]/50 min-h-[120px] resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="type-meta text-[var(--ink-inverse-muted)]">
                      {status === "error" && <span className="text-red-400">Transmission Failed. Retry.</span>}
                    </span>
                    <MagneticButton 
                      variant="primary" 
                      type="submit" 
                      disabled={status === "loading"}
                      className="bg-[var(--accent-muted-gold)] text-[var(--bg-near-black)] border-[var(--accent-muted-gold)] hover:bg-[var(--accent-dark-bronze)] hover:border-[var(--accent-dark-bronze)] disabled:opacity-50 disabled:cursor-wait"
                    >
                      {status === "loading" ? "Transmitting..." : "Initiate Dispatch"}
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
