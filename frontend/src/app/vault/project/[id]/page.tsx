"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { VAULT_PROJECTS, VaultPlate, VaultProject } from "@/lib/data/studioData";
import FilmGrain from "@/components/film/FilmGrain";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Download,
  Share2,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Eye,
  SlidersHorizontal,
  Send,
  Layers,
} from "lucide-react";

const VAULT_SLUG_ALIASES: Record<string, string> = {
  "heritage-celebration": "jaipur-royal-citadels",
  "jaigarh-citadel": "jaipur-royal-citadels",
  "estate-monograph": "kashmir-valley-expedition",
  "chittorgarh-citadel": "chittor-fort-monoliths",
  "sheesh-mahal-portraits": "jaipur-royal-citadels",
  "rajasthan-luxury-resort": "bareilly-monograph-series",
};

export default function VaultGalleryDetailPage() {
  const params = useParams();
  const rawSlug = (params?.id as string) || "jaipur-royal-citadels";
  const slug = VAULT_SLUG_ALIASES[rawSlug] || rawSlug;

  // Find project in VAULT_PROJECTS or fallback to first
  const initialProject = useMemo(() => {
    return VAULT_PROJECTS.find((p) => p.slug === slug || p.id === slug) || VAULT_PROJECTS[0];
  }, [slug]);

  const [plates, setPlates] = useState<VaultPlate[]>(initialProject.plates);
  const [filterMode, setFilterMode] = useState<"all" | "favorites" | "comments" | "monochrome">("all");
  const [lightboxPlateIndex, setLightboxPlateIndex] = useState<number | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  // Sync when initialProject changes
  useEffect(() => {
    setPlates(initialProject.plates);
  }, [initialProject]);

  // Favorite toggle
  const toggleFavorite = (plateId: string) => {
    setPlates((prev) =>
      prev.map((plate) => (plate.id === plateId ? { ...plate, isFavorite: !plate.isFavorite } : plate))
    );
  };

  // Add comment
  const handleAddComment = (plateId: string) => {
    if (!newCommentText.trim()) return;
    setPlates((prev) =>
      prev.map((plate) => {
        if (plate.id === plateId) {
          const currentComments = plate.comments || [];
          return {
            ...plate,
            comments: [
              ...currentComments,
              { author: "You", text: newCommentText.trim(), timestamp: "Just now" },
            ],
          };
        }
        return plate;
      })
    );
    setNewCommentText("");
  };

  // Filter plates
  const filteredPlates = useMemo(() => {
    if (filterMode === "favorites") {
      return plates.filter((p) => p.isFavorite);
    }
    if (filterMode === "comments") {
      return plates.filter((p) => p.comments && p.comments.length > 0);
    }
    if (filterMode === "monochrome") {
      return plates.filter((p) => p.isMonochrome);
    }
    return plates;
  }, [plates, filterMode]);

  const favoriteCount = plates.filter((p) => p.isFavorite).length;
  const activeLightboxPlate = lightboxPlateIndex !== null ? plates[lightboxPlateIndex] : null;

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPlateIndex === null) return;
      if (e.key === "Escape") setLightboxPlateIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxPlateIndex((prev) => (prev !== null && prev < plates.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft") {
        setLightboxPlateIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : plates.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPlateIndex, plates.length]);

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F1EB] selection:bg-[#CC5500] selection:text-white relative">
      <FilmGrain />

      {/* Top Gallery Header Bar */}
      <header className="border-b border-white/10 px-6 lg:px-12 py-4 bg-[#1F1F1F]/90 backdrop-blur-md sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/vault"
            className="inline-flex items-center gap-2 type-meta text-xs text-[#A39E96] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Vault Dashboard</span>
          </Link>
          <span className="text-white/20">/</span>
          <div>
            <h1 className="font-serif text-lg text-white font-medium">
              {initialProject.title}
            </h1>
            <span className="type-meta text-[10px] text-[#A39E96] block">
              {initialProject.eventDate} · PASSCODE VERIFIED
            </span>
          </div>
        </div>

        {/* Selection Progress & Submission */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-1.5 rounded-sm type-meta text-xs">
            <Heart className="w-3.5 h-3.5 text-[#CC5500] fill-[#CC5500]" />
            <span className="text-white font-semibold">{favoriteCount}</span>
            <span className="text-[#A39E96]">/ {initialProject.selectionTarget} Monograph Target</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-[#CC5500] text-white px-4 py-2 type-meta text-xs font-semibold hover:bg-white hover:text-black transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit Selections</span>
          </button>
        </div>
      </header>

      {/* Gallery Filter Toolbar */}
      <section className="border-b border-white/10 px-6 lg:px-12 py-3 bg-[#171717] flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2 type-meta text-[11px]">
          <span className="text-[#77736D] mr-2">FILTER PLATES:</span>
          <button
            onClick={() => setFilterMode("all")}
            className={`px-3 py-1 border transition-colors ${
              filterMode === "all"
                ? "bg-white text-black border-white"
                : "border-white/10 text-[#A39E96] hover:border-white/30 hover:text-white"
            }`}
          >
            All Plates ({plates.length})
          </button>
          <button
            onClick={() => setFilterMode("favorites")}
            className={`px-3 py-1 border transition-colors flex items-center gap-1.5 ${
              filterMode === "favorites"
                ? "bg-[#CC5500] text-white border-[#CC5500]"
                : "border-white/10 text-[#A39E96] hover:border-white/30 hover:text-white"
            }`}
          >
            <Heart className="w-3 h-3 fill-current" />
            <span>Favorites ({favoriteCount})</span>
          </button>
          <button
            onClick={() => setFilterMode("comments")}
            className={`px-3 py-1 border transition-colors flex items-center gap-1.5 ${
              filterMode === "comments"
                ? "bg-white text-black border-white"
                : "border-white/10 text-[#A39E96] hover:border-white/30 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            <span>With Notes ({plates.filter((p) => p.comments && p.comments.length > 0).length})</span>
          </button>
          <button
            onClick={() => setFilterMode("monochrome")}
            className={`px-3 py-1 border transition-colors ${
              filterMode === "monochrome"
                ? "bg-white text-black border-white"
                : "border-white/10 text-[#A39E96] hover:border-white/30 hover:text-white"
            }`}
          >
            B&amp;W ({plates.filter((p) => p.isMonochrome).length})
          </button>
        </div>

        <div className="flex items-center gap-3 type-meta text-xs text-[#A39E96]">
          <button
            onClick={() => alert("Packaging all favorited plates into high-resolution ZIP...")}
            className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#9CAF88]" />
            <span>Download Favorites ZIP</span>
          </button>
        </div>
      </section>

      {/* Main Photographic Proofing Grid */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        {filteredPlates.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="font-serif text-2xl text-[#A39E96]">
              No plates match the current filter selection.
            </p>
            <button
              onClick={() => setFilterMode("all")}
              className="type-meta text-xs text-[#CC5500] underline hover:text-white"
            >
              Reset to all plates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlates.map((plate, idx) => {
              const originalIndex = plates.findIndex((p) => p.id === plate.id);
              const commentCount = plate.comments?.length || 0;

              return (
                <div
                  key={plate.id}
                  className="group border border-white/10 bg-[#1F1F1F] flex flex-col justify-between overflow-hidden hover:border-[#CC5500]/50 transition-all"
                >
                  {/* Plate Image Frame */}
                  <div
                    onClick={() => setLightboxPlateIndex(originalIndex)}
                    className="relative aspect-[4/3] bg-black/60 overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={plate.url}
                      alt={plate.title}
                      fill
                      quality={100}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-2 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                      <span className="type-meta text-[10px] bg-black/70 backdrop-blur-md px-2 py-0.5 text-white/90 font-mono border border-white/10">
                        {plate.code}
                      </span>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(plate.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                          plate.isFavorite
                            ? "bg-[#CC5500] text-white"
                            : "bg-black/60 text-white/70 hover:text-white hover:bg-black/90"
                        }`}
                        title={plate.isFavorite ? "Remove favorite" : "Mark favorite"}
                      >
                        <Heart
                          className={`w-4 h-4 ${plate.isFavorite ? "fill-current" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Hover Inspect Prompt */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-xs type-meta flex items-center gap-1.5 text-white">
                        <Maximize2 className="w-3.5 h-3.5 text-[#CC5500]" />
                        <span>Inspect Frame</span>
                      </div>
                    </div>
                  </div>

                  {/* Plate Metadata & Action Footer */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-lg text-white font-normal line-clamp-1">
                          {plate.title}
                        </h4>
                        <span className="type-meta text-[10px] text-[#A39E96] block">
                          {plate.filmOrFormat}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#77736D] font-mono shrink-0">
                        {plate.iso}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs type-meta">
                      <button
                        onClick={() => setLightboxPlateIndex(originalIndex)}
                        className="text-[#A39E96] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>{commentCount > 0 ? `${commentCount} Notes` : "Add Note"}</span>
                      </button>

                      <button
                        onClick={() => alert(`Downloading high-resolution master scan for ${plate.code}...`)}
                        className="text-[#A39E96] hover:text-[#CC5500] flex items-center gap-1 transition-colors"
                        title="Download Master Plate"
                      >
                        <Download className="w-3 h-3" />
                        <span>Master Scan</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* FULLSCREEN LIGHTBOX & ANNOTATION DRAWER */}
      {lightboxPlateIndex !== null && activeLightboxPlate && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between">
          {/* Lightbox Header */}
          <div className="p-5 flex items-center justify-between border-b border-white/10 z-20 bg-black/40">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs type-meta bg-[#CC5500] text-white px-2.5 py-1 font-bold">
                {activeLightboxPlate.code}
              </span>
              <div>
                <h3 className="font-serif text-xl text-white">
                  {activeLightboxPlate.title}
                </h3>
                <span className="type-meta text-[10px] text-[#A39E96]">
                  {activeLightboxPlate.filmOrFormat} · {activeLightboxPlate.iso}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Favorite Toggle in Lightbox */}
              <button
                onClick={() => toggleFavorite(activeLightboxPlate.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm type-meta text-xs transition-colors ${
                  activeLightboxPlate.isFavorite
                    ? "bg-[#CC5500] text-white font-semibold"
                    : "border border-white/20 text-white hover:border-white"
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${activeLightboxPlate.isFavorite ? "fill-current" : ""}`}
                />
                <span>{activeLightboxPlate.isFavorite ? "SELECTED FAVORITE" : "SELECT FOR ALBUM"}</span>
              </button>

              <button
                onClick={() => alert(`Downloading master plate for ${activeLightboxPlate.code}`)}
                className="border border-white/20 text-white px-3 py-1.5 type-meta text-xs hover:border-white transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={() => setLightboxPlateIndex(null)}
                className="w-8 h-8 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Center: Image + Comments Drawer */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Previous Plate Trigger */}
            <button
              onClick={() =>
                setLightboxPlateIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : plates.length - 1))
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#CC5500] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Plate Trigger */}
            <button
              onClick={() =>
                setLightboxPlateIndex((prev) => (prev !== null && prev < plates.length - 1 ? prev + 1 : 0))
              }
              className="absolute right-4 lg:right-[380px] top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#CC5500] hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* High-Res Image Viewport */}
            <div className="flex-1 relative flex items-center justify-center p-6 lg:p-12">
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={activeLightboxPlate.url}
                  alt={activeLightboxPlate.title}
                  fill
                  priority
                  quality={100}
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Comments & Retouching Annotation Drawer */}
            <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-[#1A1A1A] flex flex-col justify-between p-6 z-20">
              <div className="space-y-4 flex-1 overflow-y-auto max-h-[40vh] lg:max-h-none">
                <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                  <span className="type-meta text-xs text-[#CC5500] flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>CURATORIAL NOTES</span>
                  </span>
                  <span className="text-[10px] text-[#77736D]">
                    {activeLightboxPlate.comments?.length || 0} NOTES
                  </span>
                </div>

                {(!activeLightboxPlate.comments || activeLightboxPlate.comments.length === 0) ? (
                  <p className="text-xs text-[#77736D] italic py-6 text-center">
                    No notes added for this frame yet. Add notes for album crop, monochrome preference, or retouching.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeLightboxPlate.comments.map((comm, cIdx) => (
                      <div key={cIdx} className="bg-black/40 border border-white/10 p-3 rounded-sm space-y-1">
                        <div className="flex justify-between items-center text-[10px] type-meta text-[#A39E96]">
                          <span className="font-semibold text-white">{comm.author}</span>
                          <span>{comm.timestamp}</span>
                        </div>
                        <p className="type-small text-xs text-white/90">
                          {comm.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Comment Input */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <label className="type-meta text-[10px] text-[#A39E96] block">
                  LEAVE NOTE FOR MASTER RETOUCHER
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddComment(activeLightboxPlate.id);
                    }}
                    placeholder="e.g. Crop tighter on archway..."
                    className="flex-1 bg-black/60 border border-white/20 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#CC5500]"
                  />
                  <button
                    onClick={() => handleAddComment(activeLightboxPlate.id)}
                    className="bg-[#CC5500] text-white px-3 py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lightbox Footer Bar */}
          <div className="p-4 bg-black/60 border-t border-white/10 text-center text-xs type-meta text-[#77736D] z-20">
            FRAME {lightboxPlateIndex + 1} OF {plates.length} · USE KEYBOARD ARROWS ← → TO NAVIGATE · ESC TO CLOSE
          </div>
        </div>
      )}

      {/* FINAL SUBMISSION CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-[#1F1F1F] border border-white/20 max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-[#A39E96] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submissionCompleted ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#9CAF88] mx-auto" />
                <h3 className="font-serif text-3xl text-white">
                  Selections Received
                </h3>
                <p className="type-small text-[#A39E96]">
                  Your {favoriteCount} chosen monograph plates have been transmitted to Aryan Patel and the atelier darkroom. We will send physical proof spreads within 14 days.
                </p>
                <button
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSubmissionCompleted(false);
                  }}
                  className="bg-[#F4F1EB] text-black px-6 py-2.5 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors"
                >
                  Return to Gallery
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="type-meta text-[10px] text-[#CC5500] tracking-widest block">
                    MONOGRAPH FOLIO SUBMISSION
                  </span>
                  <h3 className="font-serif text-3xl text-white font-normal">
                    Submit Monograph Curation
                  </h3>
                  <p className="type-small text-[#A39E96]">
                    You have currently selected <strong className="text-white">{favoriteCount}</strong> plates out of the target <strong className="text-white">{initialProject.selectionTarget}</strong> plates for your hand-bound volume.
                  </p>
                </div>

                <div className="bg-black/40 border border-white/10 p-4 space-y-2 text-xs type-meta">
                  <div className="flex justify-between">
                    <span className="text-[#A39E96]">COMMISSION:</span>
                    <span className="text-white">{initialProject.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A39E96]">CHOSEN PLATES:</span>
                    <span className="text-[#CC5500] font-semibold">{favoriteCount} Plates Selected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A39E96]">BINDING WORKSHOP:</span>
                    <span className="text-white">Studioza Monograph Atelier, Milan</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSubmissionCompleted(true)}
                    className="flex-1 bg-[#CC5500] text-white py-3 type-meta text-xs font-semibold hover:bg-white hover:text-black transition-colors"
                  >
                    Confirm &amp; Transmit Folio
                  </button>
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="border border-white/20 text-white px-6 py-3 type-meta text-xs hover:border-white transition-colors"
                  >
                    Keep Reviewing
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
