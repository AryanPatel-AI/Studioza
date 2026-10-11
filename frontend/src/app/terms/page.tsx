import React from "react";
import Navbar from "@/components/core/Navbar";
import Footer from "@/components/core/Footer";
import FilmGrain from "@/components/film/FilmGrain";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative">
      <FilmGrain />
      <Navbar />

      <main className="pt-36 pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-12">
          <div className="border-b border-[#D9D5CE] pb-8 space-y-3">
            <span className="type-meta text-[#77736D]">Terms of Engagement</span>
            <h1 className="font-serif text-5xl sm:text-6xl text-[#151515] font-normal">
              Terms of Commission
            </h1>
            <p className="type-meta text-[#77736D] text-xs">
              STUDIOZA ATELIER · JAIPUR &amp; NEW YORK
            </p>
          </div>

          <div className="space-y-8 type-body text-[#77736D] leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">01. Commission Quota &amp; Booking Retainer</h2>
              <p>
                To maintain uncompromising artistic discipline, Studioza accepts a maximum of 12 wedding monographs and 8 commercial campaigns annually. A non-refundable 50% reservation retainer is required to secure calendar dates and initiate location scouting.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">02. Copyright &amp; Usage Rights</h2>
              <p>
                Unless explicitly transferred by separate buyout agreement, Studioza retains worldwide moral copyright in all original negatives and plates. Wedding and portrait clients receive perpetual, royalty-free personal reproduction rights for non-commercial display, family gifting, and personal heirloom duplication.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">03. Archival Print &amp; Monograph Production</h2>
              <p>
                Every hand-bound monograph album is produced by master bookbinders using museum-grade 100% cotton rag paper. Physical production commences immediately following final client digital proof approval and requires 6 to 8 weeks for hand-binding and embossing.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl text-[#151515]">04. Force Majeure &amp; Weather Contingencies</h2>
              <p>
                In the rare event of severe weather or unforeseen historical monument closures, our team works in close consultation with local venue liaisons to deploy indoor chiaroscuro setups or reschedule portrait hours to optimal morning/evening windows.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
