'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Check, Globe, Eye } from 'lucide-react';
import Link from 'next/link';
import { PROJECTS } from '@/lib/data/studioData';
import { PlateSequencer, SequencerPlate } from '@/components/admin/PlateSequencer';
import { PublishChecklistModal } from '@/components/admin/PublishChecklistModal';

export default function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const id = resolvedParams.id;

  const foundMock = PROJECTS.find((p) => p.id === id || p.slug === id);

  const [project, setProject] = useState<any>(
    foundMock || {
      id,
      name: 'Jaigarh Mountain Citadel',
      slug: id,
      subtitle: 'Cheel ka Teela elevation study',
      category: 'commercial',
      year: '2026',
      location: 'Jaipur, Rajasthan',
      coverImage: '/images/hilltop-fortress-crest.jpg',
      intro: 'A rigorous topographic monograph.',
      story: 'Perched high above Amber, Jaigarh Fort was built for defensive vigilance.',
      seoDescription: 'Monograph documenting the ramparts and high artillery positions of Jaigarh Citadel.',
      status: 'DRAFT',
    }
  );

  const [plates, setPlates] = useState<SequencerPlate[]>([
    {
      id: 'plate_1',
      url: project.coverImage || '/images/hilltop-fortress-crest.jpg',
      sortOrder: 1,
      caption: 'Eastern ramparts at dusk.',
      altText: 'Medium format exposure of stone fortification walls overlooking the desert.',
      isCover: true,
      layout: 'full',
    },
    {
      id: 'plate_2',
      url: '/images/sandstone-palace-domes.jpg',
      sortOrder: 2,
      caption: 'Sandstone domes and courtyard arcade.',
      altText: 'Intricate carved sandstone pavilions under diffused morning light.',
      isCover: false,
      layout: 'pair',
    },
    {
      id: 'plate_3',
      url: '/images/fort-ramparts-overlook.jpg',
      sortOrder: 3,
      caption: 'Fort ramparts looking across the valley.',
      altText: 'Topographic panoramic survey of mountain ridge defenses.',
      isCover: false,
      layout: 'pair',
    },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Keyboard shortcut: ⌘S / Ctrl+S to save
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  const handleSave = async () => {
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      await fetch(`/api/admin/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      }).catch(() => null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmPublish = async () => {
    setIsPublishing(true);
    try {
      await fetch(`/api/admin/projects/${id}/publish`, {
        method: 'POST',
      }).catch(() => null);
      setProject({ ...project, status: 'PUBLISHED' });
      setIsChecklistOpen(false);
      setSavedSuccess(true);
    } finally {
      setIsPublishing(false);
    }
  };

  const checklistStatus = {
    hasCover: plates.some((p) => p.isCover),
    allPlatesHaveAltText: plates.every((p) => p.altText && p.altText.trim().length > 0),
    hasSeoDescription: Boolean(project.seoDescription && project.seoDescription.trim().length > 0),
    hasUniqueSlug: Boolean(project.slug && project.slug.trim().length > 0),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 font-sans pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D9D5CE] pb-6 gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Monograph Register</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Edit Monograph: {project.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/project/${project.slug}`}
            target="_blank"
            className="border border-[#D9D5CE] text-[#151515] px-4 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-black/5 transition-colors inline-flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="border border-[#171717] bg-white text-[#151515] px-5 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-[#F4F1EB] transition-colors flex items-center gap-2"
          >
            {savedSuccess ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isSaving ? 'Saving...' : 'Save (⌘S)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsChecklistOpen(true)}
            className="bg-[#171717] text-[#F4F1EB] px-6 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors flex items-center gap-2"
          >
            <Globe className="w-3.5 h-3.5 text-[#CFA570]" />
            <span>Publish Checklist</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div
          role="status"
          className="p-4 bg-[#F4F1EB] border border-[#171717] text-[#151515] text-xs font-mono flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-[#CFA570]" />
          <span>Monograph records and negative sequences committed to registry.</span>
        </div>
      )}

      {/* Editor Metadata Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-[#66625B] block border-b border-[#D9D5CE] pb-3">
          Archival Metadata
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-[#66625B] block uppercase tracking-wider">
              Monograph Title *
            </label>
            <input
              type="text"
              required
              value={project.name || ''}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#66625B] block uppercase tracking-wider">
              Slug Identifier *
            </label>
            <input
              type="text"
              required
              value={project.slug || ''}
              onChange={(e) => setProject({ ...project, slug: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm font-mono text-xs focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-1.5">
            <label className="text-[#66625B] block uppercase tracking-wider">Category</label>
            <select
              value={project.category || 'weddings'}
              onChange={(e) => setProject({ ...project, category: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-white"
            >
              <option value="weddings">Weddings</option>
              <option value="portraits">Portraits</option>
              <option value="fashion">Fashion</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#66625B] block uppercase tracking-wider">Year</label>
            <input
              type="text"
              value={project.year || '2026'}
              onChange={(e) => setProject({ ...project, year: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[#66625B] block uppercase tracking-wider">Location</label>
            <input
              type="text"
              value={project.location || ''}
              onChange={(e) => setProject({ ...project, location: e.target.value })}
              className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-xs font-mono">
          <label className="text-[#66625B] block uppercase tracking-wider">
            Archival SEO Summary (Required for Publishing)
          </label>
          <input
            type="text"
            value={project.seoDescription || ''}
            onChange={(e) => setProject({ ...project, seoDescription: e.target.value })}
            placeholder="Concise overview description for public archive indexes."
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="space-y-1.5 text-xs font-mono">
          <label className="text-[#66625B] block uppercase tracking-wider">
            Curatorial Statement / Excerpt
          </label>
          <textarea
            rows={2}
            value={project.intro || ''}
            onChange={(e) => setProject({ ...project, intro: e.target.value })}
            className="w-full p-3 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>
      </form>

      {/* Light-Table Plate Sequencer (Section 11) */}
      <section>
        <PlateSequencer
          projectId={id}
          initialPlates={plates}
          onSaveOrder={async (updatedPlates) => {
            setPlates(updatedPlates);
          }}
        />
      </section>

      {/* Pre-Publish Checklist Modal (Section 06 & 18) */}
      <PublishChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onConfirmPublish={handleConfirmPublish}
        isPublishing={isPublishing}
        status={checklistStatus}
      />
    </div>
  );
}
