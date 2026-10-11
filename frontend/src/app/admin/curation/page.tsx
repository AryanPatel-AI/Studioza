"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Star,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import { CuratedCollection, QAAuditReport } from "@/lib/curation/types";
import { getImagePlateInfo } from "@/lib/data/studioData";

export default function AdminCurationDashboardPage() {
  const [collections, setCollections] = useState<CuratedCollection[]>([]);
  const [auditReport, setAuditReport] = useState<QAAuditReport | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<CuratedCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reprocessing, setReprocessing] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [adminPlateFilter, setAdminPlateFilter] = useState<"all" | "landscape" | "portrait">("all");

  const fetchCurationData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/curation");
      const data = await res.json();
      if (data.success) {
        setCollections(data.collections);
        setAuditReport(data.auditReport);
        if (data.collections.length > 0 && !selectedCollection) {
          setSelectedCollection(data.collections[0]);
        }
      }
    } catch (e) {
      console.error("Failed to load curation data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurationData();
  }, []);

  const handleReprocessPipeline = async () => {
    try {
      setReprocessing(true);
      const res = await fetch("/api/admin/curation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "REPROCESS" }),
      });
      const data = await res.json();
      if (data.success) {
        setCollections(data.data.collections);
        setAuditReport(data.data.auditReport);
        setSelectedCollection(data.data.collections[0]);
        setSuccessMessage("Multi-agent curation pipeline re-executed successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (e) {
      console.error("Failed to reprocess pipeline", e);
    } finally {
      setReprocessing(false);
    }
  };

  const handleOverrideHero = async (collectionId: string, photoId: string) => {
    try {
      const res = await fetch("/api/admin/curation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "OVERRIDE_HERO", collectionId, photoId }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage("Hero cover image updated successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
        await fetchCurationData();
      }
    } catch (e) {
      console.error("Failed to override hero", e);
    }
  };

  const handleTogglePublish = async (collectionId: string, currentStatus: "DRAFT" | "PUBLISHED") => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch("/api/admin/curation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "SET_STATUS", collectionId, status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`Collection ${nextStatus === "PUBLISHED" ? "Published" : "Set to Draft"}`);
        setTimeout(() => setSuccessMessage(null), 3000);
        await fetchCurationData();
      }
    } catch (e) {
      console.error("Failed to update status", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#E0E0E0] p-6 lg:p-12 font-sans selection:bg-[#CFA570] selection:text-black">
      {/* Header bar */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-8">
        <div>
          <span className="text-xs font-mono tracking-widest uppercase text-[#CFA570] block mb-1">
            Studio Desk · Autonomous Intelligence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Multi-Agent Curation Control
          </h1>
          <p className="text-sm text-[#888888] mt-2 max-w-xl">
            Inspect automated location clustering, review hero quality scoring candidates, override covers, and verify publication audits.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/collections"
            target="_blank"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white border border-white/20 px-4 py-2.5 transition-colors"
          >
            <span>Live Archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#CFA570]" />
          </Link>

          <button
            onClick={handleReprocessPipeline}
            disabled={reprocessing}
            className="inline-flex items-center gap-2 bg-[#CFA570] hover:bg-[#B88E5B] text-black font-mono text-xs uppercase tracking-wider px-5 py-2.5 font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${reprocessing ? "animate-spin" : ""}`} />
            <span>{reprocessing ? "Agents Running..." : "Re-Run Pipeline"}</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="max-w-7xl mx-auto mb-6 p-4 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Main Grid: Collections List + Details Inspector */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Collections Roster */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-white/60 mb-2">
            Discovered Location Clusters ({collections.length})
          </h2>

          <div className="space-y-3">
            {collections.map((col) => {
              const isSelected = selectedCollection?.id === col.id;
              return (
                <div
                  key={col.id}
                  onClick={() => setSelectedCollection(col)}
                  className={`p-4 border transition-all cursor-pointer flex gap-4 items-center ${
                    isSelected
                      ? "bg-white/10 border-[#CFA570]"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="relative w-20 h-14 bg-black/60 shrink-0 border border-white/10 overflow-hidden flex items-center justify-center">
                    <Image
                      src={col.coverImage}
                      alt={col.title}
                      fill
                      unoptimized
                      quality={100}
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#CFA570] truncate">
                        {col.location}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 uppercase ${
                          col.status === "PUBLISHED"
                            ? "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50"
                            : "bg-amber-900/50 text-amber-300 border border-amber-700/50"
                        }`}
                      >
                        {col.status}
                      </span>
                    </div>
                    <h3 className="font-serif text-base text-white truncate">{col.title}</h3>
                    <span className="text-[11px] font-mono text-[#888888] block">
                      {col.photographs.length} Approved Plates · {col.coordinates || "Coordinates"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* QA Health Status Box */}
          {auditReport && (
            <div className="mt-8 p-5 bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-white/70 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#CFA570]" />
                  Agent 7 — QA Audit Engine
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 uppercase ${
                    auditReport.passed
                      ? "bg-emerald-900/60 text-emerald-300"
                      : "bg-red-900/60 text-red-300"
                  }`}
                >
                  {auditReport.passed ? "All Passed" : "Needs Review"}
                </span>
              </div>
              <p className="text-xs text-[#888888] font-mono">
                Verified {auditReport.totalCollections} collections and {auditReport.totalPhotographs} total plates with zero broken links or orphaned covers.
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Collection Inspector & Hero Candidate Evaluator */}
        <div className="lg:col-span-7">
          {selectedCollection ? (
            <div className="bg-white/5 border border-white/10 p-6 lg:p-8 space-y-8">
              {/* Top Meta Header */}
              <div className="flex justify-between items-start border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#CFA570] mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedCollection.location} ({selectedCollection.coordinates})</span>
                  </div>
                  <h2 className="font-serif text-3xl text-white font-normal">
                    {selectedCollection.title}
                  </h2>
                  <p className="font-serif italic text-base text-[#AAAAAA] mt-1">
                    {selectedCollection.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleTogglePublish(selectedCollection.id, selectedCollection.status)
                    }
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
                      selectedCollection.status === "PUBLISHED"
                        ? "border-amber-500/50 text-amber-300 hover:bg-amber-500/10"
                        : "border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10"
                    }`}
                  >
                    {selectedCollection.status === "PUBLISHED" ? "Unpublish" : "Publish Live"}
                  </button>

                  <Link
                    href={`/collections/${selectedCollection.slug}`}
                    target="_blank"
                    className="p-2 text-white/60 hover:text-white border border-white/20 transition-colors"
                    title="View Public Collection"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Current Active Hero Cover */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#CFA570] flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-[#CFA570]" />
                  Active Hero Cover Plate
                </span>

                {(() => {
                  const coverPlateInfo = getImagePlateInfo(selectedCollection.coverImage);
                  return (
                    <div className={`relative w-full bg-black/60 border border-white/20 overflow-hidden flex items-center justify-center ${coverPlateInfo.isLandscape ? "aspect-[3/2]" : `${coverPlateInfo.aspectClass || "aspect-[2/3]"} max-w-sm mx-auto`}`}>
                      <Image
                        src={selectedCollection.coverImage}
                        alt={selectedCollection.title}
                        fill
                        unoptimized
                        quality={100}
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90">
                        <span className="text-[#CFA570] block uppercase tracking-wider text-[10px]">
                          Selected Cover Image · {coverPlateInfo.isLandscape ? "Landscape Frame" : "Portrait Frame"}
                        </span>
                        <span className="truncate block font-serif italic text-sm text-white">
                          {selectedCollection.coverImage}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Agent 3: Hero Candidates Evaluator */}
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-white/80 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#CFA570]" />
                    Agent 3 — Hero Quality Candidates & Scores
                  </span>
                  <span className="text-[10px] font-mono text-[#888888]">
                    Click candidate to set as Hero
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCollection.heroCandidates.map((candidate) => {
                    const isCurrent = candidate.url === selectedCollection.coverImage;
                    return (
                      <div
                        key={candidate.photoId}
                        onClick={() => handleOverrideHero(selectedCollection.id, candidate.photoId)}
                        className={`p-3 border transition-all cursor-pointer space-y-2.5 ${
                          isCurrent
                            ? "bg-[#CFA570]/10 border-[#CFA570]"
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        }`}
                      >
                        {(() => {
                          const candInfo = getImagePlateInfo(candidate.url);
                          return (
                            <div className={`relative w-full bg-black/60 overflow-hidden flex items-center justify-center ${candInfo.isLandscape ? "aspect-[3/2]" : `${candInfo.aspectClass || "aspect-[2/3]}"}`}`}>
                              <Image
                                src={candidate.url}
                                alt="Candidate"
                                fill
                                unoptimized
                                quality={100}
                                className="object-contain"
                                sizes="200px"
                              />
                              {isCurrent && (
                                <div className="absolute top-2 right-2 bg-[#CFA570] text-black font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                                  Active Hero
                                </div>
                              )}
                            </div>
                          );
                        })()}

                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-[#CFA570] font-semibold">
                              Score: {candidate.score}/100
                            </span>
                            <span className="text-[#888888] text-[10px]">
                              Sharpness: {candidate.sharpnessScore}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#AAAAAA] font-sans leading-relaxed line-clamp-2">
                            {candidate.rationale}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Gallery Plates List — Separated by Subject: Non-Human in Landscape, Human in Portrait */}
              {(() => {
                const adminLandscapePlates = selectedCollection.photographs.filter(p => !getImagePlateInfo(p.url).hasHuman);
                const adminPortraitPlates = selectedCollection.photographs.filter(p => getImagePlateInfo(p.url).hasHuman);

                return (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-white/80 block">
                        Approved Gallery Plates ({selectedCollection.photographs.length})
                      </span>

                      {/* Orientation switcher */}
                      <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-0.5 text-[10px] font-mono">
                        <button
                          onClick={() => setAdminPlateFilter("all")}
                          className={`px-2 py-0.5 uppercase transition-colors ${
                            adminPlateFilter === "all" ? "bg-[#CFA570] text-black font-semibold" : "text-white/60 hover:text-white"
                          }`}
                        >
                          All ({selectedCollection.photographs.length})
                        </button>
                        {adminLandscapePlates.length > 0 && (
                          <button
                            onClick={() => setAdminPlateFilter("landscape")}
                            className={`px-2 py-0.5 uppercase transition-colors ${
                              adminPlateFilter === "landscape" ? "bg-[#CFA570] text-black font-semibold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            Landscape &amp; Arch ({adminLandscapePlates.length})
                          </button>
                        )}
                        {adminPortraitPlates.length > 0 && (
                          <button
                            onClick={() => setAdminPlateFilter("portrait")}
                            className={`px-2 py-0.5 uppercase transition-colors ${
                              adminPlateFilter === "portrait" ? "bg-[#CFA570] text-black font-semibold" : "text-white/60 hover:text-white"
                            }`}
                          >
                            Portraits ({adminPortraitPlates.length})
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Landscape & Architectural Plates (Original Aspect Ratio) */}
                    {(adminPlateFilter === "all" || adminPlateFilter === "landscape") && adminLandscapePlates.length > 0 && (
                      <div className="space-y-2">
                        {adminPlateFilter === "all" && adminPortraitPlates.length > 0 && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570] block">
                            Landscape &amp; Architectural Studies (Original Framing) · {adminLandscapePlates.length} Plates
                          </span>
                        )}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 items-start">
                          {adminLandscapePlates.map((photo, pIdx) => {
                            const photoInfo = getImagePlateInfo(photo.url);
                            const aspectClass = photoInfo.aspectClass || (photoInfo.isLandscape ? "aspect-[3/2]" : "aspect-[2/3]");
                            return (
                              <div
                                key={photo.id || pIdx}
                                className={`group relative bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center ${aspectClass}`}
                              >
                                <Image
                                  src={photo.url}
                                  alt={photo.altText}
                                  fill
                                  unoptimized
                                  quality={100}
                                  className="object-contain"
                                  sizes="100px"
                                />
                                <div className="absolute bottom-1 left-1 bg-black/80 px-1 py-0.5 text-[9px] font-mono text-white/80">
                                  #{photo.order} · {photoInfo.aspectRatio}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Portrait Plates (Human Sittings in Original Aspect Ratio) */}
                    {(adminPlateFilter === "all" || adminPlateFilter === "portrait") && adminPortraitPlates.length > 0 && (
                      <div className="space-y-2">
                        {adminPlateFilter === "all" && adminLandscapePlates.length > 0 && (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570] block pt-2 border-t border-white/5">
                            Portraits &amp; Human Sittings (Original Framing) · {adminPortraitPlates.length} Plates
                          </span>
                        )}
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 items-start">
                          {adminPortraitPlates.map((photo, pIdx) => {
                            const photoInfo = getImagePlateInfo(photo.url);
                            return (
                              <div
                                key={photo.id || pIdx}
                                className={`group relative bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center ${photoInfo.aspectClass || "aspect-[2/3]"}`}
                              >
                                <Image
                                  src={photo.url}
                                  alt={photo.altText}
                                  fill
                                  unoptimized
                                  quality={100}
                                  className="object-contain"
                                  sizes="100px"
                                />
                                <div className="absolute bottom-1 left-1 bg-black/80 px-1 py-0.5 text-[9px] font-mono text-white/80">
                                  #{photo.order}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-12 border border-white/10 text-center font-serif text-[#666666]">
              Select a collection to inspect
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
