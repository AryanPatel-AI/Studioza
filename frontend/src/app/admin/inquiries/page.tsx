"use client";

import { useEffect, useState } from "react";
import { RefreshCw, CheckCircle2, Clock, Inbox, PlayCircle, Archive } from "lucide-react";

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

  const updateStatus = async (id: string, newStatus: string) => {
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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "NEW": return <Clock className="w-3 h-3" />;
      case "CONTACTED": return <Inbox className="w-3 h-3" />;
      case "IN PROGRESS": return <PlayCircle className="w-3 h-3" />;
      case "COMPLETED": return <CheckCircle2 className="w-3 h-3" />;
      case "ARCHIVED": return <Archive className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Client Shoot Inquiries
          </h1>
          <p className="text-sm text-stone-200/80 mt-1">
            Review incoming commission requests and update outreach status.
          </p>
        </div>
        <button
          onClick={loadInquiries}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none type-body-base font-semibold text-copper-50 bg-gradient-to-r from-copper-300 to-copper-500 hover:from-copper-400 hover:to-copper-600 shadow-md shadow-copper-500/20 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Registry
        </button>
      </div>

      <div className="bg-black border border-stone-800 rounded-none overflow-hidden shadow-2xl shadow-stone-950/40">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-500/20 text-left">
            <thead className="bg-black type-body-base font-semibold text-[var(--accent-muted-gold)]">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Patron Details</th>
                <th className="px-6 py-4">Project Info</th>
                <th className="px-6 py-4">Commission Brief</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-500/10 text-sm">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-stone-500">
                    {isLoading ? "Loading inquiries from database..." : "No commission inquiries recorded yet."}
                  </td>
                </tr>
              ) : (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-900/20 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap type-body-base text-stone-500 align-top">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <div className="text-white font-medium">{inq.name}</div>
                      <div className="type-body-base text-[var(--accent-muted-gold)]">{inq.email}</div>
                      {inq.company && <div className="text-stone-400 text-xs mt-1">Company: {inq.company}</div>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top text-stone-400 text-xs space-y-1">
                      <div>Budget: {inq.budget || "N/A"}</div>
                      <div>Timeline: {inq.timeline || "N/A"}</div>
                      <div>Ref: {inq.reference || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 type-body-base text-white max-w-xs truncate align-top whitespace-pre-wrap">
                      {inq.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap align-top">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full type-body-base font-semibold uppercase ${
                          inq.status === "NEW" ? "bg-copper-500/15 text-copper-600 border border-copper-500/30" :
                          inq.status === "COMPLETED" ? "bg-green-950 text-green-500 border border-green-900" :
                          inq.status === "ARCHIVED" ? "bg-stone-900 text-stone-500 border border-stone-800" :
                          "bg-blue-950 text-blue-500 border border-blue-900"
                        }`}
                      >
                        {getStatusIcon(inq.status)}
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right type-body-base align-top">
                      <select 
                        className="px-3 py-1.5 rounded-lg type-body-base text-white bg-stone-950 border border-stone-800 focus:outline-none"
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value)}
                      >
                        <option value="NEW">New</option>
                        <option value="CONTACTED">Contacted</option>
                        <option value="IN PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
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
