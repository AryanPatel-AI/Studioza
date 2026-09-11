import { prisma } from "@/lib/prisma";
import { MessageSquare, Briefcase, Camera, Sparkles, TrendingUp } from "lucide-react";

export default async function AdminDashboardPage() {
  const totalInquiries = await prisma.inquiry.count();
  const newInquiries = await prisma.inquiry.count({ where: { status: "NEW" } });
  const totalServices = await prisma.service.count();
  const totalPortfolioItems = await prisma.portfolioItem.count();

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-400/30 text-xs font-mono text-sky-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Atelier Telemetry &amp; Database
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-blue-200/80 mt-1">
          Real-time inquiries, active service scopes, and visual archive items recorded in Supabase PostgreSQL.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Tone 1 Blue */}
        <div className="bg-[#0c162e]/85 border border-blue-400/20 rounded-2xl p-6 shadow-lg shadow-blue-950/30 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sky-300 text-xs font-mono font-semibold uppercase tracking-wider">
              Total Inquiries
            </h3>
            <MessageSquare className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white mt-3 font-mono">{totalInquiries}</p>
          <p className="text-xs text-neutral-400 mt-1">Recorded commissions</p>
        </div>

        {/* Card 2: Tone 2 Amber (Highlighted) */}
        <div className="bg-[#2a170b]/85 border border-amber-500/30 rounded-2xl p-6 shadow-lg shadow-amber-950/40 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              New Inquiries
            </h3>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <p className="text-3xl font-serif font-bold text-amber-300 mt-3 font-mono">{newInquiries}</p>
          <p className="text-xs text-amber-200/70 mt-1">Awaiting director response</p>
        </div>

        {/* Card 3: Tone 1 Blue */}
        <div className="bg-[#0c162e]/85 border border-blue-400/20 rounded-2xl p-6 shadow-lg shadow-blue-950/30 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-sky-300 text-xs font-mono font-semibold uppercase tracking-wider">
              Active Session Tiers
            </h3>
            <Briefcase className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white mt-3 font-mono">{totalServices}</p>
          <p className="text-xs text-neutral-400 mt-1">Live client packages</p>
        </div>

        {/* Card 4: Tone 2 Amber */}
        <div className="bg-[#2a170b]/85 border border-amber-500/30 rounded-2xl p-6 shadow-lg shadow-amber-950/40 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h3 className="text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
              Archive Plates
            </h3>
            <Camera className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-serif font-bold text-white mt-3 font-mono">{totalPortfolioItems}</p>
          <p className="text-xs text-neutral-400 mt-1">Showcased works</p>
        </div>
      </div>
    </div>
  );
}
