"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { VAULT_PROJECTS } from "@/lib/data/studioData";
import FilmGrain from "@/components/film/FilmGrain";
import {
  Lock,
  ArrowRight,
  Download,
  Heart,
  CheckCircle2,
  Clock,
  Sparkles,
  LogOut,
  FolderLock,
  Layers,
} from "lucide-react";

export default function VaultDashboardPage() {
  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F1EB] selection:bg-[#CC5500] selection:text-white relative flex flex-col justify-between">
      <FilmGrain />

      {/* Top Vault Nav */}
      <header className="border-b border-white/10 px-6 lg:px-12 py-5 flex items-center justify-between z-10 bg-black/30 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[1px] border border-white/20 bg-black/60 flex items-center justify-center text-[#CC5500]">
              <span className="font-serif italic text-base">S</span>
            </div>
            <span className="font-serif text-lg tracking-wider text-white hidden sm:inline">
              STUDIOZA ATELIER
            </span>
          </Link>
          <span className="text-white/20 text-xs">/</span>
          <span className="type-meta text-xs text-[#9CAF88] flex items-center gap-1.5">
            <FolderLock className="w-3.5 h-3.5" />
            <span>CLIENT PROOFING VAULT</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <span className="type-meta text-[10px] text-[#A39E96] block">AUTHENTICATED PATRON</span>
            <span className="text-xs text-white font-medium">Private Heritage Patron</span>
          </div>
          <Link
            href="/login"
            className="type-meta text-xs text-[#A39E96] hover:text-white transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1.5 rounded-sm"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Sign Out</span>
          </Link>
        </div>
      </header>

      {/* Main Vault Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 w-full z-10 space-y-12">
        {/* Welcome Patron Banner */}
        <section className="border-b border-white/10 pb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="type-meta text-[#CC5500] text-xs block mb-1">
                PATRON DOSSIER // REF: STZ-CL-8921
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-white font-normal tracking-tight">
                Welcome to your Archival Vault
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="type-meta text-xs bg-white/10 px-3 py-1.5 text-white/90 border border-white/15">
                TIER I: MASTER RAW ARCHIVE
              </span>
            </div>
          </div>
          <p className="type-body text-[#A39E96] max-w-3xl">
            Select preferred plates for your bespoke hand-bound monograph, leave specific retouching annotations, and download high-resolution print masters directly to your local drive.
          </p>
        </section>

        {/* Status Metrics Bar */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div className="border border-white/10 bg-[#1F1F1F] p-6 space-y-2">
            <span className="type-meta text-[10px] text-[#A39E96] block">TOTAL CAPTURED PLATES</span>
            <p className="font-serif text-4xl text-white">512</p>
            <span className="text-[11px] text-[#77736D] block">Medium Format RAW Scans</span>
          </div>
          <div className="border border-white/10 bg-[#1F1F1F] p-6 space-y-2">
            <span className="type-meta text-[10px] text-[#A39E96] block">ACTIVE PROOFING GALLERIES</span>
            <p className="font-serif text-4xl text-[#CC5500]">02</p>
            <span className="text-[11px] text-[#77736D] block">Open for Curatorial Review</span>
          </div>
          <div className="border border-white/10 bg-[#1F1F1F] p-6 space-y-2">
            <span className="type-meta text-[10px] text-[#A39E96] block">MONOGRAPH SELECTIONS</span>
            <p className="font-serif text-4xl text-white">36 / 50</p>
            <span className="text-[11px] text-[#77736D] block">14 Remaining for Monograph</span>
          </div>
          <div className="border border-white/10 bg-[#1F1F1F] p-6 space-y-2">
            <span className="type-meta text-[10px] text-[#A39E96] block">ARCHIVAL DOWNLOADS</span>
            <p className="font-serif text-4xl text-white">Unlimited</p>
            <span className="text-[11px] text-[#77736D] block">150MP TIFF & High-Res JPG</span>
          </div>
        </section>

        {/* Assigned Proofing Projects */}
        <section className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Your Commission Galleries
            </h2>
            <span className="type-meta text-xs text-[#A39E96]">
              {VAULT_PROJECTS.length} GALLERIES ASSIGNED
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {VAULT_PROJECTS.map((project) => {
              const isOpen = project.status === "PROOFING_OPEN";
              return (
                <article
                  key={project.id}
                  className="border border-white/10 bg-[#1F1F1F] overflow-hidden group hover:border-[#CC5500]/60 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] bg-black/60 overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      quality={100}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain transition-opacity duration-700 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span
                        className={`type-meta text-[10px] px-2.5 py-1 uppercase tracking-widest ${
                          isOpen
                            ? "bg-[#CC5500] text-white font-semibold"
                            : "bg-white/20 text-white backdrop-blur-md"
                        }`}
                      >
                        {isOpen ? "PROOFING OPEN" : "IN PRINT REVIEW"}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <span className="type-meta text-[10px] text-white/80 block mb-1">
                        {project.eventDate}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 type-meta text-xs border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[#77736D] block text-[10px] mb-0.5">ARCHIVED PLATES</span>
                          <span className="text-white font-medium">{project.totalPlates} Plates</span>
                        </div>
                        <div>
                          <span className="text-[#77736D] block text-[10px] mb-0.5">ALBUM SELECTIONS</span>
                          <span className="text-[#CC5500] font-medium">Target: {project.selectionTarget} Plates</span>
                        </div>
                      </div>

                      <p className="type-small text-[#A39E96]">
                        {isOpen
                          ? "Review candidate plates, mark your favorites (♥), and submit your final monograph folio before binding begins."
                          : "Curatorial review complete. Monograph plates currently in darkroom pigment printing in Milan."}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/vault/project/${project.slug}`}
                        className="bg-[#F4F1EB] text-[#171717] px-6 py-3 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors flex items-center gap-2 font-medium"
                      >
                        <span>OPEN PROOFING GALLERY</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => alert(`Initiating full archival download for ${project.title}`)}
                        className="border border-white/20 text-white px-5 py-3 type-meta text-xs hover:border-white transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#9CAF88]" />
                        <span>DOWNLOAD ALL</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Atelier Monograph Binding Support */}
        <section className="border border-white/10 bg-black/40 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="type-meta text-xs text-[#CC5500] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATELIER PRINT CONSULTATION</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Need custom 16x20&rdquo; museum cotton prints or leather album revisions?
            </h3>
            <p className="type-small text-[#A39E96]">
              Aryan Patel and our master darkroom atelier are available for private print consultation and bespoke frame selection.
            </p>
          </div>
          <Link
            href="/contact"
            className="border border-[#CC5500] text-[#CC5500] hover:bg-[#CC5500] hover:text-white transition-colors px-6 py-3 type-meta text-xs shrink-0"
          >
            CONSULT MASTER PRINTMAKER →
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 p-6 text-center text-xs type-meta text-[#77736D] z-10">
        STUDIOZA ATELIER // CLIENT VAULT // ALL ARCHIVES REPRODUCED UNDER PATRON AGREEMENT
      </footer>
    </div>
  );
}
