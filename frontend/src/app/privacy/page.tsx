import React from "react";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-36 pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="border-b border-[#D9D5CE] pb-8 space-y-3">
            <span className="type-meta text-[#77736D]">Legal Disclosures</span>
            <h1 className="font-serif text-5xl sm:text-6xl text-[#151515] font-normal">
              Privacy Policy
            </h1>
            <p className="type-meta text-[#77736D] text-xs">
              EFFECTIVE DATE: OCTOBER 2026 · STUDIOZA ATELIER
            </p>
          </div>

          <div className="space-y-8 type-body text-[#77736D] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">01. Client Image Confidentiality</h2>
              <p>
                At Studioza, we hold our clients&apos; privacy with the utmost reverence. Photographs captured during private wedding celebrations, family portrait sittings, or exclusive commercial commissions will never be shared publicly or published to social media without explicit, written bilateral authorization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">02. Archival Data &amp; Digital Storage</h2>
              <p>
                Master raw files, high-resolution TIFF scans, and color-graded negatives are stored on encrypted cold-storage optical drives with physical separation from public networks. We preserve project negatives for a minimum of 10 years as part of our heirloom guarantee.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">03. Direct Correspondence Information</h2>
              <p>
                Contact details submitted through our inquiry or booking portals (including names, addresses, telephone numbers, and email accounts) are utilized solely for commission scheduling and print dispatch. We never sell or license client details to external marketing entities.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">04. Inquiries &amp; Deletion Requests</h2>
              <p>
                To request an audit of your stored data or request negative archive modifications, please contact our studio director directly at{" "}
                <a href="mailto:inquiries@studioza.atelier" className="text-[#151515] underline">
                  inquiries@studioza.atelier
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
