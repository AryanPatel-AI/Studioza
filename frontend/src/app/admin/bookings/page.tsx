"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, Plus, MapPin, Clock, ArrowRight } from "lucide-react";
import { INITIAL_BOOKINGS, BookingItem } from "@/lib/data/studioData";

export default function AdminBookingsPage() {
  const [bookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">CALENDAR &amp; PRODUCTION PIPELINE</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Bookings &amp; Production Calendar
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Scheduled photography expeditions, confirmed wedding monographs, and upcoming field commissions.
          </p>
        </div>

        <div>
          <Link
            href="/admin/inquiries"
            className="border border-[#151515] text-[#151515] px-6 py-3 type-meta text-xs hover:bg-black/5 transition-colors inline-flex items-center gap-2"
          >
            <span>Review Pending Inquiries</span>
          </Link>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#F4F1EB]/30 transition-colors"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-[#151515]">{b.clientName}</span>
                <span className="type-meta text-xs bg-[#F4F1EB] px-2 py-0.5 border border-[#D9D5CE]">
                  {b.service}
                </span>
                <span
                  className={`type-meta text-[10px] px-2 py-0.5 font-bold ${
                    b.status === "CONFIRMED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              <p className="type-small text-[#77736D]">
                {b.details}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs text-[#77736D]">
                <span className="flex items-center gap-1.5 font-medium text-[#151515]">
                  <Calendar className="w-3.5 h-3.5 text-[#CC5500]" />
                  <span>{b.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#CC5500]" />
                  <span>{b.location}</span>
                </span>
                <span>Contact: {b.clientEmail}</span>
              </div>
            </div>

            <div className="self-end md:self-auto shrink-0">
              <Link
                href={`/admin/bookings/${b.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#151515] text-[#F4F1EB] type-meta text-xs hover:bg-[#333333] transition-colors"
              >
                <span>View Booking Dossier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
