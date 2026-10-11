"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, ArrowRight, Clock, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { INITIAL_INQUIRIES, InquiryItem } from "@/lib/data/studioData";

const PIPELINE_STATUSES = [
  "ALL",
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "PROPOSAL",
  "BOOKED",
  "COMPLETED",
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>(INITIAL_INQUIRIES);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setInquiries(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      (inq.service && inq.service.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "REVIEWING":
        return "bg-sky-100 text-sky-900 border-sky-300";
      case "CONTACTED":
        return "bg-indigo-100 text-indigo-900 border-indigo-300";
      case "PROPOSAL":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "BOOKED":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "COMPLETED":
        return "bg-stone-200 text-stone-800 border-stone-300";
      default:
        return "bg-stone-100 text-stone-700 border-stone-300";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D9D5CE] pb-6">
        <div>
          <span className="type-meta text-[#77736D] block mb-1">CLIENT COMMISSION PIPELINE</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
            Inquiries CRM
          </h1>
          <p className="type-body text-[#77736D] mt-1">
            Pipeline: NEW → REVIEWING → CONTACTED → PROPOSAL → BOOKED → COMPLETED
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 border border-[#D9D5CE]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#77736D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patron name, email, or service..."
            className="w-full pl-9 pr-4 py-2 border border-[#D9D5CE] text-sm focus:outline-hidden focus:border-[#151515]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-[#77736D] shrink-0" />
          {PIPELINE_STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`type-meta text-[10px] px-2.5 py-1.5 transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? "bg-[#151515] text-[#F4F1EB]"
                  : "bg-[#F4F1EB] text-[#77736D] hover:text-[#151515]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-[#D9D5CE] divide-y divide-[#D9D5CE]">
        {filtered.map((inq) => (
          <div
            key={inq.id}
            className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-[#F4F1EB]/30 transition-colors"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-serif text-2xl text-[#151515]">{inq.name}</span>
                <span className="type-meta text-xs bg-[#F4F1EB] px-2 py-0.5 border border-[#D9D5CE]">
                  {inq.service}
                </span>

                {/* Status Dropdown to advance in pipeline */}
                <select
                  value={inq.status}
                  onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                  className={`type-meta text-[10px] px-2 py-0.5 font-bold border rounded-xs cursor-pointer focus:outline-none ${getBadgeStyle(
                    inq.status
                  )}`}
                >
                  <option value="NEW">NEW</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="PROPOSAL">PROPOSAL</option>
                  <option value="BOOKED">BOOKED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>

                <span className="text-xs text-[#77736D] font-mono">{inq.createdAt}</span>
              </div>

              <p className="type-small text-[#77736D] line-clamp-1">
                &ldquo;{inq.message}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#77736D] pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{inq.email}</span>
                </span>
                {inq.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{inq.phone}</span>
                  </span>
                )}
                {inq.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{inq.location}</span>
                  </span>
                )}
                {inq.budget && <span>Budget: {inq.budget}</span>}
              </div>
            </div>

            <div className="self-end md:self-auto shrink-0 flex items-center gap-3">
              <Link
                href={`/admin/inquiries/${inq.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#151515] text-[#F4F1EB] type-meta text-xs hover:bg-[#333333] transition-colors"
              >
                <span>Inspect Lead</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
