"use client";

import React from "react";
import { TrendingUp, Users, Eye, ArrowUpRight } from "lucide-react";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D9D5CE] pb-6 space-y-1">
        <span className="type-meta text-[#77736D] block">AUDIENCE &amp; INQUIRY TELEMETRY</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#151515]">
          Magazine Analytics
        </h1>
        <p className="type-body text-[#77736D]">
          Visitor readership, inquiry conversion funnel, and most engaging photographic monographs.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D]">MONTHLY READERS</span>
          <p className="font-serif text-4xl text-[#151515]">18,420</p>
          <span className="type-micro text-emerald-600 block">+14% vs previous month</span>
        </div>

        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D]">MONOGRAPH VIEWS</span>
          <p className="font-serif text-4xl text-[#151515]">42,910</p>
          <span className="type-micro text-emerald-600 block">Avg. 3.4 min read</span>
        </div>

        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D]">COMMISSION CONVERSION</span>
          <p className="font-serif text-4xl text-[#151515]">4.8%</p>
          <span className="type-micro text-[#CC5500] block">High qualified intent</span>
        </div>

        <div className="bg-white p-6 border border-[#D9D5CE] space-y-2">
          <span className="type-meta text-xs text-[#77736D]">LEAD PIPELINE</span>
          <p className="font-serif text-4xl text-[#151515]">24</p>
          <span className="type-micro text-[#77736D] block">Active inquiries</span>
        </div>
      </div>

      {/* Two Column Layout: Top Monographs + Geographic Traffic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-8 border border-[#D9D5CE] space-y-6">
          <h2 className="font-serif text-2xl text-[#151515]">Most Engaging Monographs</h2>
          <div className="space-y-4">
            {[
              { name: "Royal Heritage Celebration", cat: "Weddings", views: "14,280", engagement: "94%" },
              { name: "Jaigarh Mountain Citadel", cat: "Commercial", views: "11,140", engagement: "88%" },
              { name: "Echoes in Convex Glass", cat: "Portraits", views: "9,650", engagement: "91%" },
              { name: "Raw Silk & Sandstone", cat: "Fashion", views: "7,840", engagement: "82%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between border-b border-[#D9D5CE]/50 pb-3">
                <div>
                  <h4 className="font-serif text-xl text-[#151515]">{item.name}</h4>
                  <span className="type-meta text-[10px] text-[#77736D]">{item.cat}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-sm text-[#151515] block">{item.views} views</span>
                  <span className="type-micro text-emerald-600">{item.engagement} completion</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-8 border border-[#D9D5CE] space-y-6">
          <h2 className="font-serif text-2xl text-[#151515]">Top Patron Demographics</h2>
          <div className="space-y-4">
            {[
              { region: "India (Mumbai, Delhi, Jaipur)", share: "48%" },
              { region: "United States (New York, LA)", share: "26%" },
              { region: "United Kingdom (London)", share: "14%" },
              { region: "Europe (Milan, Paris)", share: "12%" },
            ].map((geo, i) => (
              <div key={i} className="flex items-center justify-between border-b border-[#D9D5CE]/50 pb-3">
                <span className="type-small text-[#151515]">{geo.region}</span>
                <span className="font-serif text-lg font-bold text-[#151515]">{geo.share}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
