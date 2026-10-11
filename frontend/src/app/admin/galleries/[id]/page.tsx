"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Check, MoveVertical } from "lucide-react";
import { PROJECTS } from "@/lib/data/studioData";

export default function AdminGalleryDetailPlateEditor() {
  const params = useParams();
  const id = params.id as string;
  const project = PROJECTS.find((p) => p.slug === id || p.id === id) || PROJECTS[0];

  const [plates, setPlates] = useState(project.gallery);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleRemovePlate = (plateId: string) => {
    setPlates((prev) => prev.filter((p) => p.id !== plateId));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/galleries"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Galleries</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Curate Plates: {project.name}
          </h1>
          <p className="type-small text-[#77736D]">
            Sequencing {plates.length} active photographic plates for the public monograph layout.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="bg-[#151515] text-[#F4F1EB] px-6 py-2.5 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-2 cursor-pointer"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-emerald-400" /> : <Check className="w-4 h-4" />}
          <span>{savedSuccess ? "Plate Order Saved" : "Save Plate Order"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm">
          ✓ Plate layout and sequencing updated successfully for this monograph.
        </div>
      )}

      {/* Plates Sequence Grid */}
      <div className="space-y-6">
        {plates.map((plate, index) => (
          <div
            key={plate.id || index}
            className="bg-white border border-[#D9D5CE] p-6 flex flex-col md:flex-row items-center gap-6"
          >
            <div className="flex items-center gap-3 text-[#77736D]">
              <MoveVertical className="w-5 h-5 cursor-grab" />
              <span className="font-serif text-2xl text-[#151515] w-8">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="w-36 h-24 relative bg-[#EAE6DE] overflow-hidden shrink-0 border border-[#D9D5CE]">
              <Image
                src={plate.url}
                alt={plate.alt || "Monograph Plate"}
                fill
                quality={100}
                sizes="144px"
                className="object-contain"
              />
            </div>

            <div className="flex-1 space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="type-meta text-[11px] text-[#77736D]">
                  FORMAT: {plate.aspect?.toUpperCase() || "STANDARD"}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePlate(plate.id)}
                  className="text-rose-700 hover:text-rose-900 p-1"
                  title="Remove Plate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                defaultValue={plate.caption || ""}
                placeholder="Plate caption & curatorial notes..."
                className="w-full p-2 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
