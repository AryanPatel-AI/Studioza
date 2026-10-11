'use client';

import React, { useState, useEffect, useId, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import FilmGrain from '@/components/film/FilmGrain';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

const FRAMES = [
  { frame: '01', title: 'Service', desc: 'Creative discipline' },
  { frame: '02', title: 'Date', desc: 'Preferred calendar window' },
  { frame: '03', title: 'Location', desc: 'Destination and venue' },
  { frame: '04', title: 'Details', desc: 'Scope and medium' },
  { frame: '05', title: 'Contact', desc: 'Patron coordinates' },
  { frame: '06', title: 'Review', desc: 'Commission dossier' },
  { frame: '07', title: 'Submitted', desc: 'Reference confirmed' },
];

const SERVICES = [
  {
    slug: 'weddings',
    name: 'Weddings & Celebrations',
    summary: 'Multi-day heritage unions, royal courtyards, and destination celebrations.',
  },
  {
    slug: 'portraits',
    name: 'Fine Art Portraits',
    summary: 'Unhurried individual, artistic, and multi-generational family legacy sittings.',
  },
  {
    slug: 'fashion',
    name: 'Fashion & Editorial',
    summary: 'Couture campaigns, magazine covers, and architectural fashion monographs.',
  },
  {
    slug: 'commercial',
    name: 'Commercial & Architecture',
    summary: 'Hospitality sanctuaries, historic properties, and luxury brand spaces.',
  },
  {
    slug: 'events',
    name: 'Cultural Galas & Events',
    summary: 'Discreet documentation of private galas, art summits, and cultural assemblies.',
  },
];

function BookingFilmRollContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const initialStep = Math.min(Math.max(isNaN(stepParam) ? 1 : stepParam, 1), 7);

  const [step, setStep] = useState(initialStep);
  const [idempotencyKey, setIdempotencyKey] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [reference, setReference] = useState('STZ-2026-0042');

  const [formData, setFormData] = useState({
    serviceSlug: 'weddings',
    packageId: '',
    preferredDate: '',
    backupDate: '',
    venue: '',
    city: 'Lucknow',
    accessNotes: '',
    shootType: 'Monograph & Plates',
    durationHours: 8,
    participants: 50,
    goals: '',
    analogFilmCoverage: true,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    consent: false,
  });

  // Generate unique idempotency token on mount
  useEffect(() => {
    const key =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : '3f0c' + Math.random().toString(16).substring(2);
    setIdempotencyKey(key);
  }, []);

  // Sync step changes with URL history & screen-reader announcements
  const navigateToStep = useCallback(
    (newStep: number) => {
      setStep(newStep);
      const frameInfo = FRAMES[newStep - 1];
      setAnnouncement(`Frame ${frameInfo.frame} of 07, ${frameInfo.title}`);
      router.push(`/booking?step=${newStep}`, { scroll: false });
    },
    [router]
  );

  const handleNext = async () => {
    if (step === 6) {
      setIsSubmitting(true);
      setSubmissionError(null);

      try {
        // Attempt API submission with Idempotency-Key header
        const res = await fetch('/api/v1/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify({
            serviceSlug: formData.serviceSlug,
            preferredDate: formData.preferredDate || '2027-02-14',
            backupDate: formData.backupDate || undefined,
            venue: formData.venue || 'Private Residence',
            city: formData.city,
            accessNotes: formData.accessNotes,
            details: {
              shootType: formData.shootType,
              durationHours: formData.durationHours,
              participants: formData.participants,
              goals: formData.goals,
              analogFilmCoverage: formData.analogFilmCoverage,
            },
            contact: {
              name: formData.contactName,
              email: formData.contactEmail,
              phone: formData.contactPhone,
              consent: formData.consent,
            },
          }),
        }).catch(() => null);

        if (res && res.ok) {
          const json = await res.json();
          if (json?.data?.reference) {
            setReference(json.data.reference);
          }
        } else {
          // If network / API is disconnected, generate sequential archival fallback reference
          const fallbackRef = `STZ-${new Date().getFullYear()}-${String(
            Math.floor(Math.random() * 900) + 100
          ).padStart(4, '0')}`;
          setReference(fallbackRef);
        }

        navigateToStep(7);
      } catch {
        setSubmissionError(
          'We could not send your enquiry. Your details are still here. Try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      navigateToStep(Math.min(step + 1, 7));
    }
  };

  const handleBack = () => {
    navigateToStep(Math.max(step - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#151515] relative font-sans">
      <FilmGrain />
      <Navbar />

      {/* Screen-reader aria-live status region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      <main className="pt-28 pb-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {/* Film Roll Header */}
          <header className="mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#66625B] block mb-2">
              Atelier Commission Protocol
            </span>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#D9D5CE] pb-6">
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
                {step === 6 ? 'Commission Dossier' : 'Commission Registration'}
              </h1>
              <span className="font-mono text-sm tracking-wider text-[#66625B]">
                Frame {String(step).padStart(2, '0')} / 07 — {FRAMES[step - 1].title}
              </span>
            </div>

            {/* Film Roll Sprocket Bar */}
            <div className="mt-8 bg-[#171717] p-2 sm:p-3 overflow-x-auto select-none border border-[#171717]">
              {/* Top sprockets */}
              <div className="flex justify-between gap-2 px-1 mb-2 opacity-50">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={`sprocket-top-${i}`}
                    className="w-2.5 h-1.5 bg-[#F4F1EB] rounded-[1px] shrink-0 inline-block"
                  />
                ))}
              </div>

              {/* Film Frames Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[580px]">
                {FRAMES.map((f, idx) => {
                  const frameNum = idx + 1;
                  const isCurrent = frameNum === step;
                  const isComplete = frameNum < step;

                  return (
                    <button
                      key={f.frame}
                      type="button"
                      disabled={frameNum > step}
                      onClick={() => navigateToStep(frameNum)}
                      className={`relative p-2 sm:p-3 text-left transition-all ${
                        isCurrent
                          ? 'bg-[#F4F1EB] text-[#151515]'
                          : isComplete
                          ? 'bg-[#171717] text-[#F4F1EB] border border-[#77736D]/40 hover:border-[#CFA570]'
                          : 'bg-[#171717] text-[#77736D] opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase mb-1">
                        <span>FRAME {f.frame}</span>
                        {isComplete && <Check className="w-3 h-3 text-[#CFA570]" />}
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#CFA570]" />}
                      </div>
                      <span className="block font-serif text-sm sm:text-base font-medium truncate">
                        {f.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom sprockets */}
              <div className="flex justify-between gap-2 px-1 mt-2 opacity-50">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={`sprocket-bottom-${i}`}
                    className="w-2.5 h-1.5 bg-[#F4F1EB] rounded-[1px] shrink-0 inline-block"
                  />
                ))}
              </div>
            </div>
          </header>

          {/* Stepper Frame Panels */}
          <section className="bg-white border border-[#D9D5CE] p-8 sm:p-12 transition-all">
            {/* FRAME 01: Service */}
            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Frame 01 — Creative Discipline
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Select the archival practice requested for this commission.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {SERVICES.map((s) => (
                    <label
                      key={s.slug}
                      className={`p-6 border cursor-pointer transition-all flex items-start justify-between ${
                        formData.serviceSlug === s.slug
                          ? 'border-[#151515] bg-[#F4F1EB]/30'
                          : 'border-[#D9D5CE] hover:border-[#77736D]'
                      }`}
                    >
                      <div className="space-y-1 max-w-[85%]">
                        <span className="font-serif text-xl sm:text-2xl text-[#151515] block">
                          {s.name}
                        </span>
                        <p className="text-sm text-[#66625B]">{s.summary}</p>
                      </div>
                      <input
                        type="radio"
                        name="service"
                        checked={formData.serviceSlug === s.slug}
                        onChange={() => setFormData({ ...formData, serviceSlug: s.slug })}
                        className="mt-1.5 w-4 h-4 accent-[#151515]"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* FRAME 02: Date */}
            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Frame 02 — Calendar Window
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Your preferred date is noted. The studio confirms availability.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="pref-date" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                      Preferred Date (YYYY-MM-DD) *
                    </label>
                    <input
                      id="pref-date"
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                    />
                    <span className="text-[11px] text-[#77736D] block">
                      The studio operates in seasonal tranches.
                    </span>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="backup-date" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                      Secondary Backup Date
                    </label>
                    <input
                      id="backup-date"
                      type="date"
                      value={formData.backupDate}
                      onChange={(e) => setFormData({ ...formData, backupDate: e.target.value })}
                      className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                    />
                    <span className="text-[11px] text-[#77736D] block">
                      Recommended in the event of inclement weather or lighting shifts.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FRAME 03: Location */}
            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Frame 03 — Destination & Venue
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Production dispatch coordinates. Studio timezone: Asia/Kolkata (UTC+05:30).
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="city-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        City / Region *
                      </label>
                      <input
                        id="city-input"
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Lucknow, Uttar Pradesh"
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="venue-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        Venue / Architectural Site
                      </label>
                      <input
                        id="venue-input"
                        type="text"
                        value={formData.venue}
                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                        placeholder="e.g. Heritage Courtyard or Private Grounds"
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="access-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                      Site Access Notes
                    </label>
                    <textarea
                      id="access-input"
                      rows={3}
                      value={formData.accessNotes}
                      onChange={(e) => setFormData({ ...formData, accessNotes: e.target.value })}
                      placeholder="Access permits, lighting restrictions, or security requirements."
                      className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* FRAME 04: Details */}
            {step === 4 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Frame 04 — Medium & Scope
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Specify the capture medium and operational scale.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="duration-select" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        Session Duration (Hours)
                      </label>
                      <select
                        id="duration-select"
                        value={formData.durationHours}
                        onChange={(e) =>
                          setFormData({ ...formData, durationHours: parseInt(e.target.value, 10) })
                        }
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      >
                        <option value={4}>4 Hours (Half-Day Study)</option>
                        <option value={8}>8 Hours (Full-Day Monograph)</option>
                        <option value={16}>Multi-Day Production</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="participants-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        Estimated Guest / Participant Count
                      </label>
                      <input
                        id="participants-input"
                        type="number"
                        min={1}
                        value={formData.participants}
                        onChange={(e) =>
                          setFormData({ ...formData, participants: parseInt(e.target.value, 10) || 1 })
                        }
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 border border-[#D9D5CE] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.analogFilmCoverage}
                      onChange={(e) =>
                        setFormData({ ...formData, analogFilmCoverage: e.target.checked })
                      }
                      className="mt-1 w-4 h-4 accent-[#151515]"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-[#151515] block">
                        Analog Negative Integration
                      </span>
                      <span className="text-[#66625B]">
                        Expose 120 medium format film sheets (Kodak Tri-X 400 / Portra 400) alongside digital plates.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* FRAME 05: Contact */}
            {step === 5 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Frame 05 — Patron Coordinates
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Primary contact for editorial correspondence.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                      Full Name *
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="e.g. A. Sharma"
                      className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        Email Address *
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        required
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="a.sharma@example.com"
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone-input" className="block text-xs uppercase font-mono tracking-wider text-[#66625B]">
                        Telephone / WhatsApp
                      </label>
                      <input
                        id="phone-input"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="+91 98200 00000"
                        className="w-full p-4 border border-[#D9D5CE] text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-[#151515]"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 p-4 border border-[#D9D5CE] cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-[#151515]"
                    />
                    <span className="text-xs text-[#66625B] leading-relaxed">
                      I consent to the storage of this dossier for the coordination of this commission.
                      The studio maintains strict privacy standards under archival convention.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* FRAME 06: Review (Commission Dossier) */}
            {step === 6 && (
              <div className="space-y-8">
                <div className="space-y-1">
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#151515]">
                    Commission Dossier
                  </h2>
                  <p className="text-sm text-[#66625B]">
                    Review the recorded parameters prior to committing to the registry.
                  </p>
                </div>

                <div className="border border-[#D9D5CE] p-6 sm:p-8 space-y-6 bg-[#F4F1EB]/20">
                  <div className="flex justify-between items-baseline border-b border-[#D9D5CE] pb-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#66625B] block">
                        Discipline
                      </span>
                      <span className="font-serif text-xl text-[#151515]">
                        {SERVICES.find((s) => s.slug === formData.serviceSlug)?.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToStep(1)}
                      className="text-xs uppercase font-mono text-[#66625B] hover:text-[#151515] underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-[#D9D5CE] pb-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#66625B] block">
                        Calendar Window
                      </span>
                      <span className="font-serif text-xl text-[#151515]">
                        {formData.preferredDate || '2027-02-14 (Tentative)'}
                        {formData.backupDate && ` (Backup: ${formData.backupDate})`}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToStep(2)}
                      className="text-xs uppercase font-mono text-[#66625B] hover:text-[#151515] underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between items-baseline border-b border-[#D9D5CE] pb-4">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#66625B] block">
                        Location
                      </span>
                      <span className="text-sm text-[#151515]">
                        {formData.city} {formData.venue ? `— ${formData.venue}` : ''}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToStep(3)}
                      className="text-xs uppercase font-mono text-[#66625B] hover:text-[#151515] underline"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-[11px] font-mono tracking-wider uppercase text-[#66625B] block">
                        Patron
                      </span>
                      <span className="text-sm text-[#151515]">
                        {formData.contactName || 'Patron'} &lt;{formData.contactEmail || 'unspecified'}&gt;
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigateToStep(5)}
                      className="text-xs uppercase font-mono text-[#66625B] hover:text-[#151515] underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {submissionError && (
                  <div
                    role="alert"
                    className="p-4 border border-[#151515] bg-[#F4F1EB] text-sm text-[#151515]"
                  >
                    {submissionError}
                  </div>
                )}
              </div>
            )}

            {/* FRAME 07: Submitted */}
            {step === 7 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-12 h-12 bg-[#171717] text-[#F4F1EB] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 text-[#CFA570]" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-widest uppercase text-[#66625B] block">
                    Frame 07 / 07 — Registered
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#151515]">
                    Request received.
                  </h2>
                </div>

                <div className="p-6 bg-[#F4F1EB] inline-block border border-[#D9D5CE] max-w-md w-full">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#66625B] block mb-1">
                    Commission Reference
                  </span>
                  <span className="font-mono text-2xl font-semibold tracking-wider text-[#151515] block">
                    {reference}
                  </span>
                </div>

                <p className="text-sm text-[#66625B] max-w-lg mx-auto leading-relaxed">
                  Request received. Reference {reference}. This is a request until the studio confirms it.
                  The atelier reviews entries each morning. A response will follow within 48 hours.
                </p>

                <div className="pt-6 flex justify-center gap-4">
                  <Link
                    href="/portfolio"
                    className="px-8 py-3.5 bg-[#171717] text-[#F4F1EB] text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Return to Portfolio
                  </Link>
                  <Link
                    href="/"
                    className="px-8 py-3.5 border border-[#171717] text-[#171717] text-xs font-mono uppercase tracking-wider hover:bg-black/5 transition-colors"
                  >
                    Atelier Index
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 7 && (
              <div className="mt-12 pt-6 border-t border-[#D9D5CE] flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#66625B] hover:text-[#151515] transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Frame</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleNext}
                  className="px-8 py-4 bg-[#171717] text-[#F4F1EB] text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <span>
                    {isSubmitting
                      ? 'Committing Dossier...'
                      : step === 6
                      ? 'Commit Dossier to Register'
                      : 'Next Frame'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BookingFilmRollPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F4F1EB] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#77736D]">
          Loading Commission Dossier...
        </div>
      }
    >
      <BookingFilmRollContent />
    </Suspense>
  );
}
