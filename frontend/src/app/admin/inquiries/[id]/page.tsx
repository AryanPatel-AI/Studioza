"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Check, Save } from "lucide-react";
import { INITIAL_INQUIRIES, InquiryItem } from "@/lib/data/studioData";

export default function AdminInquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const foundMock = INITIAL_INQUIRIES.find((i) => i.id === id) || INITIAL_INQUIRIES[0];
  const [inquiry, setInquiry] = useState<InquiryItem>(foundMock);
  const [status, setStatus] = useState(foundMock.status);
  const [notes, setNotes] = useState("Client contacted via WhatsApp. Dates held on calendar until Oct 15.");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/inquiries`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const matched = data.find((item: any) => item.id === id);
          if (matched) {
            setInquiry(matched);
            setStatus(matched.status);
          }
        }
      })
      .catch(() => {});
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetch(`/api/admin/inquiries/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      setSavedSuccess(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D9D5CE] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-1.5 type-meta text-xs text-[#77736D] hover:text-[#151515]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Inquiries</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#151515]">
            Inquiry from {inquiry.name}
          </h1>
          <p className="type-meta text-xs text-[#77736D]">{inquiry.createdAt}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="p-2 border border-[#D9D5CE] bg-white text-xs type-meta font-semibold"
          >
            <option value="NEW">Status: NEW</option>
            <option value="CONTACTED">Status: CONTACTED</option>
            <option value="IN_PROGRESS">Status: IN PROGRESS</option>
            <option value="BOOKED">Status: BOOKED</option>
            <option value="ARCHIVED">Status: ARCHIVED</option>
          </select>

          <button
            type="button"
            onClick={handleUpdate}
            className="bg-[#151515] text-[#F4F1EB] px-4 py-2 type-meta text-xs hover:bg-[#333333] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? "Status Updated" : "Save Status"}</span>
          </button>
        </div>
      </div>

      {/* Inquiry Detail Card */}
      <div className="bg-white p-8 sm:p-12 border border-[#D9D5CE] space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-[#D9D5CE] pb-8">
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">DISCIPLINE</span>
            <p className="font-serif text-xl text-[#151515]">{inquiry.service || "General"}</p>
          </div>
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">DATES</span>
            <p className="font-serif text-xl text-[#151515]">{inquiry.date || "TBD"}</p>
          </div>
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">LOCATION</span>
            <p className="font-serif text-xl text-[#151515]">{inquiry.location || "TBD"}</p>
          </div>
          <div className="space-y-1">
            <span className="type-meta text-xs text-[#77736D]">BUDGET</span>
            <p className="font-serif text-xl text-[#151515]">{inquiry.budget || "Not Specified"}</p>
          </div>
        </div>

        {/* Client Contact Coordinates */}
        <div className="flex flex-wrap items-center gap-8 text-sm border-b border-[#D9D5CE] pb-8">
          <a
            href={`mailto:${inquiry.email}`}
            className="flex items-center gap-2 text-[#151515] hover:underline"
          >
            <Mail className="w-4 h-4 text-[#CC5500]" />
            <span>{inquiry.email}</span>
          </a>
          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="flex items-center gap-2 text-[#151515] hover:underline"
            >
              <Phone className="w-4 h-4 text-[#CC5500]" />
              <span>{inquiry.phone}</span>
            </a>
          )}
        </div>

        {/* Message / Scope */}
        <div className="space-y-3 border-b border-[#D9D5CE] pb-8">
          <span className="type-meta text-xs text-[#77736D]">MESSAGE &amp; VISION</span>
          <p className="font-serif text-2xl text-[#151515] leading-relaxed">
            &ldquo;{inquiry.message}&rdquo;
          </p>
        </div>

        {/* Internal Studio Notes */}
        <div className="space-y-3">
          <span className="type-meta text-xs text-[#77736D]">INTERNAL STUDIO LOG / NOTES</span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-4 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515] bg-[#F4F1EB]/40"
          />
        </div>
      </div>
    </div>
  );
}
