"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Mail, Phone, Check, Clock } from "lucide-react";
import { INITIAL_BOOKINGS } from "@/lib/data/studioData";

export default function AdminBookingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const booking = INITIAL_BOOKINGS.find((b) => b.id === id) || INITIAL_BOOKINGS[0];

  const [status, setStatus] = useState(booking.status);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/bookings"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Bookings</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Booking Dossier: {booking.clientName}
          </h1>
          <p className="type-meta text-xs text-[#77736D]">{booking.createdAt}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="p-2 border border-[#D9D5CE] bg-white text-xs type-meta font-semibold"
          >
            <option value="CONFIRMED">Status: CONFIRMED</option>
            <option value="PENDING">Status: PENDING</option>
            <option value="COMPLETED">Status: COMPLETED</option>
          </select>

          <button
            type="button"
            onClick={handleSave}
            className="bg-[#151515] text-[#F4F1EB] px-4 py-2 type-meta text-xs hover:bg-[#333333] transition-colors"
          >
            {saved ? "Saved" : "Update Status"}
          </button>
        </div>
      </div>

      {/* Dossier Card */}
      <div className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-b border-[#D9D5CE] pb-8">
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">DISCIPLINE</span>
            <p className="font-serif text-2xl text-[#151515]">{booking.service}</p>
          </div>
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">PRODUCTION DATES</span>
            <p className="font-serif text-2xl text-[#151515]">{booking.date}</p>
          </div>
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">LOCATION / VENUE</span>
            <p className="font-serif text-2xl text-[#151515]">{booking.location}</p>
          </div>
        </div>

        <div className="space-y-2 border-b border-[#D9D5CE] pb-8">
          <span className="type-meta text-xs text-[#77736D]">PRODUCTION BRIEF &amp; SCOPE</span>
          <p className="font-serif text-xl text-[#151515] leading-relaxed">
            {booking.details}
          </p>
        </div>

        <div className="space-y-4">
          <span className="type-meta text-xs text-[#77736D]">CLIENT COORDINATES</span>
          <div className="flex flex-wrap items-center gap-8 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#CC5500]" />
              <span>{booking.clientEmail}</span>
            </span>
            {booking.clientPhone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CC5500]" />
                <span>{booking.clientPhone}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
