'use client';

import React from 'react';
import { Check, X, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';

interface ChecklistItem {
  key: string;
  label: string;
  passed: boolean;
  helpText: string;
}

interface PublishChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPublish: () => Promise<void>;
  isPublishing?: boolean;
  status: {
    hasCover: boolean;
    allPlatesHaveAltText: boolean;
    hasSeoDescription: boolean;
    hasUniqueSlug: boolean;
  };
}

/**
 * Pre-Publish Checklist Modal (Section 06 & 18 of Build Plan)
 * Gates publishing with strict archival validation:
 * 1. Exactly one cover plate selected
 * 2. Alt text present on every single plate
 * 3. SEO description configured
 * 4. Slug uniqueness validated
 */
export function PublishChecklistModal({
  isOpen,
  onClose,
  onConfirmPublish,
  isPublishing = false,
  status,
}: PublishChecklistModalProps) {
  if (!isOpen) return null;

  const items: ChecklistItem[] = [
    {
      key: 'cover',
      label: 'Primary Cover Plate Designated',
      passed: status.hasCover,
      helpText: 'The monograph must possess a designated cover image for the public index.',
    },
    {
      key: 'altText',
      label: 'Plate Accessibility Descriptions',
      passed: status.allPlatesHaveAltText,
      helpText: 'Every plate must contain descriptive accessibility text for archival compliance.',
    },
    {
      key: 'seo',
      label: 'Archival SEO Description',
      passed: status.hasSeoDescription,
      helpText: 'A summary meta description is required for public search engine registration.',
    },
    {
      key: 'slug',
      label: 'Unique Monograph Identifier',
      passed: status.hasUniqueSlug,
      helpText: 'The issue slug must be distinct and unreserved in the database register.',
    },
  ];

  const allPassed = items.every((i) => i.passed);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="publish-checklist-title"
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 font-sans"
    >
      <div className="bg-[#171717] text-[#F4F1EB] border border-[#D9D5CE]/30 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570] block">
              Curatorial Verification Gate
            </span>
            <h2 id="publish-checklist-title" className="font-serif text-2xl text-white">
              Publication Checklist
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verification Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.key}
              className={`p-4 border transition-colors ${
                item.passed
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : 'border-red-500/30 bg-red-950/20'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  {item.passed ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  {item.label}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider ${
                    item.passed ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {item.passed ? 'Passed' : 'Blocked'}
                </span>
              </div>
              <p className="text-xs text-[#77736D] leading-relaxed pl-6">
                {item.helpText}
              </p>
            </div>
          ))}
        </div>

        {/* Gate Status Message */}
        <div className="p-3 bg-white/5 border border-white/10 text-xs font-mono text-[#77736D]">
          {allPassed ? (
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>All publication criteria verified. Monograph ready for public register.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-red-300">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>Resolve highlighted deficiencies before issuing publication command.</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:bg-white/5 transition-colors"
          >
            Return to Editor
          </button>
          <button
            type="button"
            disabled={!allPassed || isPublishing}
            onClick={onConfirmPublish}
            className="px-6 py-2.5 bg-[#CFA570] text-[#151515] text-xs font-mono uppercase tracking-wider hover:bg-[#dfb580] transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-semibold inline-flex items-center gap-2"
          >
            {isPublishing && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isPublishing ? 'Publishing...' : 'Publish Monograph'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
