import React from 'react';
import Link from 'next/link';
import {
  Users,
  CalendarCheck,
  FolderKanban,
  Clock,
  ArrowUpRight,
  Plus,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  BellOff,
  Flame,
} from 'lucide-react';
import { INITIAL_INQUIRIES, INITIAL_BOOKINGS } from '@/lib/data/studioData';

export const dynamic = 'force-dynamic';

export default function AdminDashboardPage() {
  const recentInquiries = INITIAL_INQUIRIES.slice(0, 4);
  const upcomingBookings = INITIAL_BOOKINGS;

  return (
    <div className="space-y-10 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#66625B] block mb-1">
            Studio Desk // Operational Command
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Dashboard
          </h1>
          <p className="text-sm text-[#66625B] mt-1">
            Prioritized by urgency across correspondence, commissions, and monograph drafts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="bg-[#171717] text-[#F4F1EB] px-5 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Monograph</span>
          </Link>
          <Link
            href="/admin/stories/new"
            className="border border-[#171717] text-[#171717] px-5 py-2.5 text-xs font-mono uppercase tracking-wider hover:bg-black/5 transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Dispatch</span>
          </Link>
        </div>
      </div>

      {/* SECTION 10: "Needs attention" Urgency Queue */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#CFA570]" />
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#151515] font-semibold">
            Needs Attention (Ordered by Urgency)
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: New inquiries > 48h */}
          <Link
            href="/admin/inquiries?filter=urgent"
            className="bg-[#171717] text-[#F4F1EB] p-6 border border-[#171717] hover:border-[#CFA570] transition-colors group space-y-3"
          >
            <div className="flex items-center justify-between text-[#77736D]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#CFA570]">
                SLA Alert
              </span>
              <AlertCircle className="w-4 h-4 text-[#CFA570]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl text-[#F4F1EB] font-normal">3</span>
            </div>
            <p className="text-xs text-[#77736D] group-hover:text-[#F4F1EB] transition-colors">
              New inquiries &gt; 48h
            </p>
          </Link>

          {/* Card 2: Awaiting confirmation */}
          <Link
            href="/admin/bookings?status=REQUESTED"
            className="bg-[#171717] text-[#F4F1EB] p-6 border border-[#171717] hover:border-[#CFA570] transition-colors group space-y-3"
          >
            <div className="flex items-center justify-between text-[#77736D]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736D]">
                Pending Review
              </span>
              <Clock className="w-4 h-4 text-[#77736D]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl text-[#F4F1EB] font-normal">2</span>
            </div>
            <p className="text-xs text-[#77736D] group-hover:text-[#F4F1EB] transition-colors">
              Awaiting confirmation
            </p>
          </Link>

          {/* Card 3: Drafts in review */}
          <Link
            href="/admin/projects?status=REVIEW"
            className="bg-[#171717] text-[#F4F1EB] p-6 border border-[#171717] hover:border-[#CFA570] transition-colors group space-y-3"
          >
            <div className="flex items-center justify-between text-[#77736D]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#77736D]">
                Editorial Gate
              </span>
              <FolderKanban className="w-4 h-4 text-[#77736D]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl text-[#F4F1EB] font-normal">4</span>
            </div>
            <p className="text-xs text-[#77736D] group-hover:text-[#F4F1EB] transition-colors">
              Drafts in review
            </p>
          </Link>

          {/* Card 4: Failed notifications */}
          <div className="bg-[#171717] text-[#F4F1EB] p-6 border border-[#171717] space-y-3">
            <div className="flex items-center justify-between text-[#77736D]">
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400">
                Outbox Nominal
              </span>
              <BellOff className="w-4 h-4 text-[#77736D]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl text-[#F4F1EB] font-normal">0</span>
            </div>
            <p className="text-xs text-[#77736D]">
              Failed notifications
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: This Week's Shoots & Active Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inquiries Pipeline Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 border border-[#D9D5CE] space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-4">
            <div>
              <h3 className="font-serif text-2xl text-[#151515]">Recent Correspondence</h3>
              <p className="text-xs text-[#66625B]">Incoming client commissions needing triage</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-mono uppercase tracking-wider text-[#151515] hover:text-[#CFA570] flex items-center gap-1"
            >
              <span>View Kanban</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#D9D5CE]/60">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#151515] text-sm">{inq.name}</span>
                    <span className="text-[11px] font-mono text-[#66625B]">({inq.service})</span>
                  </div>
                  <p className="text-xs text-[#66625B] line-clamp-1">{inq.message}</p>
                  <span className="text-[10px] font-mono text-[#77736D] block">
                    {inq.createdAt} · {inq.location}
                  </span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-mono tracking-wider px-2 py-0.5 border ${
                      inq.status === 'NEW'
                        ? 'border-[#CFA570] text-[#151515] bg-[#F4F1EB]'
                        : 'border-[#D9D5CE] text-[#66625B]'
                    }`}
                  >
                    {inq.status}
                  </span>
                  <Link
                    href={`/admin/inquiries/${inq.id}`}
                    className="p-1 hover:text-[#CFA570] transition-colors"
                    title="Inspect Dossier"
                  >
                    <ArrowRight className="w-4 h-4 text-[#77736D]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Week's Production Shoots (5 cols) */}
        <div className="lg:col-span-5 bg-white p-8 border border-[#D9D5CE] space-y-6">
          <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-4">
            <div>
              <h3 className="font-serif text-2xl text-[#151515]">This Week</h3>
              <p className="text-xs text-[#66625B]">Production shoots on the call sheet</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-mono uppercase tracking-wider text-[#151515] hover:text-[#CFA570] flex items-center gap-1"
            >
              <span>Calendar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#D9D5CE]/60">
            {upcomingBookings.slice(0, 3).map((bk) => (
              <div key={bk.id} className="py-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-[#151515]">{bk.clientName}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#CFA570]">
                    {bk.service}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#66625B]">
                  <span>{bk.location}</span>
                  <span className="font-mono">{bk.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
