"use client";

import { useEffect, useState } from "react";
import { MessageSquare, RefreshCw, Mail, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadInquiries = () => {
    setIsLoading(true);
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setInquiries(data);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const updateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "NEW" ? "CONTACTED" : "NEW";
    const res = await fetch(`/api/admin/inquiries/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setInquiries(
        inquiries.map((inq) =>
          inq.id === id ? { ...inq, status: newStatus } : inq
        )
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
            Client Shoot Inquiries
          </h1>
          <p className="text-sm text-blue-200/80 mt-1">
            Review incoming commission requests and update outreach status.
          </p>
        </div>
        <button
          onClick={loadInquiries}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Registry
        </button>
      </div>

      <div className="bg-[#0c162e]/90 border border-blue-400/20 rounded-3xl overflow-hidden shadow-2xl shadow-blue-950/40">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-blue-500/20 text-left">
            <thead className="bg-[#091024]/80 text-xs font-mono font-semibold uppercase tracking-wider text-sky-300">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Patron Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Commission Brief</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-500/10 text-sm">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-neutral-400 font-light">
                    {isLoading ? "Loading inquiries from database..." : "No commission inquiries recorded yet."}
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-blue-900/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-neutral-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
                      {inq.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-sky-300">
                      {inq.email}
                    </td>
                    <td className="px-6 py-4 text-xs text-neutral-300 max-w-xs truncate">
                      {inq.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider ${
                          inq.status === "NEW"
                            ? "bg-amber-400/15 text-amber-300 border border-amber-400/30"
                            : "bg-emerald-400/15 text-emerald-300 border border-emerald-400/30"
                        }`}
                      >
                        {inq.status === "NEW" ? (
                          <Clock className="w-3 h-3" />
                        ) : (
                          <CheckCircle2 className="w-3 h-3" />
                        )}
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                      <button
                        onClick={() => updateStatus(inq.id, inq.status)}
                        className="px-3 py-1.5 rounded-lg font-mono text-xs text-sky-300 hover:text-white bg-blue-950/60 hover:bg-blue-900/60 border border-blue-400/20 transition-colors cursor-pointer"
                      >
                        Mark as {inq.status === "NEW" ? "Contacted" : "New"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
