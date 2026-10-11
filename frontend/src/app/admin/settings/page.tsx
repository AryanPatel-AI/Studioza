"use client";

import React, { useState } from "react";
import { Save, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    studioName: "Studioza Atelier",
    tagline: "Digital Photography Magazine & Creative Atelier",
    notificationEmail: "inquiries@studioza.atelier",
    phone: "+91 98290 12345",
    instagramHandle: "@studioza.atelier",
    jaipurAddress: "C-Scheme, Civil Lines, Jaipur, Rajasthan 302006",
    newYorkAddress: "Tribeca, Manhattan, New York, NY 10013",
    annualQuotaLimit: "12 Commissions",
    metaTitle: "Studioza — Digital Photography Magazine & Creative Atelier",
    metaDescription: "An independent creative atelier delivering medium-format editorial monographs, fine art wedding archives, and architectural studies.",
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">CONFIGURATION</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Studio Settings
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Global studio parameters, contact routing, and search engine metadata.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? "Saved" : "Save Settings"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          ✓ Studio settings and notification routing updated.
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8">
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-[#151515]">Identity &amp; Colophon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">Studio Name</label>
              <input
                type="text"
                value={settings.studioName}
                onChange={(e) => setSettings({ ...settings, studioName: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">Annual Commission Quota</label>
              <input
                type="text"
                value={settings.annualQuotaLimit}
                onChange={(e) => setSettings({ ...settings, annualQuotaLimit: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Core Positioning Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-[#D9D5CE] pt-8">
          <h3 className="font-serif text-2xl text-[#151515]">Contact &amp; Notification Dispatch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">Inquiries Notification Email</label>
              <input
                type="email"
                value={settings.notificationEmail}
                onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">Telephone / WhatsApp</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">Jaipur Studio Base</label>
              <input
                type="text"
                value={settings.jaipurAddress}
                onChange={(e) => setSettings({ ...settings, jaipurAddress: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
            <div className="space-y-2">
              <label className="type-meta text-xs text-[#77736D]">New York Studio Base</label>
              <input
                type="text"
                value={settings.newYorkAddress}
                onChange={(e) => setSettings({ ...settings, newYorkAddress: e.target.value })}
                className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-[#D9D5CE] pt-8">
          <h3 className="font-serif text-2xl text-[#151515]">Search Engine (SEO) Meta</h3>
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Default Page Title</label>
            <input
              type="text"
              value={settings.metaTitle}
              onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
          <div className="space-y-2">
            <label className="type-meta text-xs text-[#77736D]">Default Meta Description</label>
            <textarea
              rows={2}
              value={settings.metaDescription}
              onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
