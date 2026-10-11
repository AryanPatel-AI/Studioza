'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  ArrowUp,
  ArrowDown,
  Layout,
  FileText,
  Save,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';

export interface SequencerPlate {
  id: string;
  url: string;
  sortOrder: number;
  caption?: string;
  altText: string;
  isCover: boolean;
  layout: 'full' | 'pair';
}

interface PlateSequencerProps {
  projectId: string;
  initialPlates: SequencerPlate[];
  onSaveOrder?: (plates: SequencerPlate[]) => Promise<void>;
}

/**
 * Light-Table Plate Sequencer Component (Section 11 of Build Plan)
 * Darkroom aesthetic (--bg-dark, gold accents), drag/button accessible ordering,
 * per-plate caption/alt drawer, cover star toggle, and atomic single-PATCH persistence.
 */
export function PlateSequencer({
  projectId,
  initialPlates,
  onSaveOrder,
}: PlateSequencerProps) {
  const [plates, setPlates] = useState<SequencerPlate[]>(initialPlates);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeDrawerPlate, setActiveDrawerPlate] = useState<SequencerPlate | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Move plate up in order
  const movePlate = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= plates.length) return;

    const newPlates = [...plates];
    const [moved] = newPlates.splice(index, 1);
    newPlates.splice(targetIndex, 0, moved);

    // Re-index sortOrder
    const reindexed = newPlates.map((p, i) => ({ ...p, sortOrder: i + 1 }));
    setPlates(reindexed);
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Designate single cover plate
  const setCover = (plateId: string) => {
    const updated = plates.map((p) => ({
      ...p,
      isCover: p.id === plateId,
    }));
    setPlates(updated);
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Toggle plate layout between 'full' and 'pair'
  const toggleLayout = (plateId: string) => {
    const updated = plates.map((p) => {
      if (p.id !== plateId) return p;
      return {
        ...p,
        layout: (p.layout === 'full' ? 'pair' : 'full') as 'full' | 'pair',
      };
    });
    setPlates(updated);
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Update caption or alt text
  const updatePlateMetadata = (
    plateId: string,
    caption: string,
    altText: string
  ) => {
    const updated = plates.map((p) => {
      if (p.id !== plateId) return p;
      return { ...p, caption, altText };
    });
    setPlates(updated);
    setActiveDrawerPlate(null);
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
  };

  // Save full order in one atomic PATCH
  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSaveOrder) {
        await onSaveOrder(plates);
      } else {
        await fetch(`/api/admin/projects/${projectId}/plates`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plates }),
        }).catch(() => null);
      }
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#171717] text-[#F4F1EB] p-6 sm:p-8 border border-[#171717] font-sans">
      {/* Light-Table Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570] block">
            Darkroom Light-Table
          </span>
          <h2 className="font-serif text-2xl text-white">Plate Sequencer</h2>
        </div>

        <div className="flex items-center gap-4">
          {hasUnsavedChanges ? (
            <span className="text-xs font-mono text-[#CFA570] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#CFA570] animate-pulse" />
              Unsaved changes
            </span>
          ) : saveSuccess ? (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Plate sequence saved
            </span>
          ) : (
            <span className="text-xs font-mono text-[#77736D]">Sequence synchronized</span>
          )}

          <button
            type="button"
            disabled={!hasUnsavedChanges || isSaving}
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#F4F1EB] text-[#151515] text-xs font-mono uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-40 inline-flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Commit Sequence'}</span>
          </button>
        </div>
      </div>

      {/* Negative Proofing Frames Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {plates.map((plate, index) => {
          const isCover = plate.isCover;
          const hasMissingAlt = !plate.altText || plate.altText.trim() === '';

          return (
            <div
              key={plate.id}
              className={`group relative bg-[#0D0D0D] border transition-all p-2 flex flex-col justify-between ${
                isCover
                  ? 'border-[#CFA570] ring-1 ring-[#CFA570]'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              {/* Negative Frame Image */}
              <div className="relative aspect-[3/2] w-full bg-[#1A1A1A] overflow-hidden mb-2">
                <Image
                  src={plate.url}
                  alt={plate.altText || `Plate ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  quality={100}
                  className="object-cover"
                />

                {/* Cover Badge */}
                {isCover && (
                  <span className="absolute top-1.5 left-1.5 bg-[#CFA570] text-[#151515] text-[9px] font-mono uppercase px-1.5 py-0.5 font-bold tracking-wider">
                    Cover
                  </span>
                )}

                {/* Alt-text alert */}
                {hasMissingAlt && (
                  <span
                    title="Missing alt text (blocks publication)"
                    className="absolute top-1.5 right-1.5 bg-red-950/80 text-red-200 border border-red-500/50 p-1 rounded-[1px]"
                  >
                    <AlertCircle className="w-3 h-3 text-red-400" />
                  </span>
                )}
              </div>

              {/* Plate Index & Metadata */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/80 font-medium">
                    Plate {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-[#77736D] uppercase">
                    {plate.layout}
                  </span>
                </div>

                {/* Frame Action Controls */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                  {/* Star Cover Button */}
                  <button
                    type="button"
                    title={isCover ? 'Current Monograph Cover' : 'Set as Cover Plate'}
                    onClick={() => setCover(plate.id)}
                    className={`p-1 transition-colors ${
                      isCover
                        ? 'text-[#CFA570]'
                        : 'text-white/40 hover:text-[#CFA570]'
                    }`}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  {/* Layout Toggle (full vs pair) */}
                  <button
                    type="button"
                    title={`Layout: ${plate.layout} (Click to toggle)`}
                    onClick={() => toggleLayout(plate.id)}
                    className="p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <Layout className="w-3.5 h-3.5" />
                  </button>

                  {/* Metadata Drawer Opener */}
                  <button
                    type="button"
                    title="Edit Caption & Alt Text"
                    onClick={() => setActiveDrawerPlate(plate)}
                    className="p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                  </button>

                  {/* Reorder Buttons (Accessible Alternative to Drag) */}
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => movePlate(index, 'up')}
                      title="Move Plate Earlier"
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={index === plates.length - 1}
                      onClick={() => movePlate(index, 'down')}
                      title="Move Plate Later"
                      className="p-1 text-white/40 hover:text-white disabled:opacity-20 transition-colors"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Caption & Alt Text Drawer Modal */}
      {activeDrawerPlate && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#171717] border border-white/20 p-6 sm:p-8 max-w-lg w-full space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570] block">
                  Plate Inspection
                </span>
                <h3 className="font-serif text-2xl text-white">
                  Plate {String(activeDrawerPlate.sortOrder).padStart(2, '0')} Metadata
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveDrawerPlate(null)}
                className="text-white/40 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const caption = (form.elements.namedItem('caption') as HTMLInputElement).value;
                const altText = (form.elements.namedItem('altText') as HTMLInputElement).value;
                updatePlateMetadata(activeDrawerPlate.id, caption, altText);
              }}
              className="space-y-4 text-xs font-mono"
            >
              <div className="space-y-1">
                <label className="text-[#77736D] block uppercase">
                  Accessibility Alt Text * (Required for Publication)
                </label>
                <textarea
                  name="altText"
                  required
                  rows={3}
                  defaultValue={activeDrawerPlate.altText}
                  placeholder="Describe optical subjects, natural light direction, and architectural environment."
                  className="w-full p-3 bg-[#0D0D0D] border border-white/20 text-white focus:outline-hidden focus:border-[#CFA570]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#77736D] block uppercase">
                  Curator&apos;s Caption (Optional)
                </label>
                <input
                  type="text"
                  name="caption"
                  defaultValue={activeDrawerPlate.caption || ''}
                  placeholder="e.g. Early twilight exposure across the western colonnade."
                  className="w-full p-3 bg-[#0D0D0D] border border-white/20 text-white focus:outline-hidden focus:border-[#CFA570]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveDrawerPlate(null)}
                  className="px-4 py-2 border border-white/20 text-white hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#F4F1EB] text-[#151515] uppercase tracking-wider hover:bg-white font-medium"
                >
                  Save Plate Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
