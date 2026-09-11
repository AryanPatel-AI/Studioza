"use client";

import { useEffect, useState } from "react";
import { Plus, Tag, DollarSign, CheckCircle2, Briefcase } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadServices = () => {
    fetch("/api/admin/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/admin/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        isActive: true,
      }),
    });
    if (res.ok) {
      const newService = await res.json();
      setServices([newService, ...services]);
      setName("");
      setDescription("");
      setPrice("");
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
          Session Tiers &amp; Commissions
        </h1>
        <p className="text-sm text-blue-200/80 mt-1">
          Add and manage photography commission packages, deliverable scopes, and pricing.
        </p>
      </div>

      {/* Creation form: TONE 2 Golden Hour Warm Amber Accent */}
      <div className="bg-gradient-to-br from-[#0c162e]/90 via-[#181926]/90 to-[#2b170a]/90 border border-amber-400/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
        <h2 className="text-base font-serif font-bold text-white mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-400" />
          Create New Photography Session Scope
        </h2>
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                Session Package Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Fine Art Silver-Gelatin Portraiture"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
                Baseline Investment ($ USD)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="2400"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2">
              Deliverable Description &amp; Equipment Specifications
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Shot on medium-format digital back, includes lighting schematic, 15 retouched master plates, and commercial rights..."
              className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Saving Session..." : "Publish Session Scope"}
          </button>
        </form>
      </div>

      {/* Services List: TONE 1 Twilight Blue Hour */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="rounded-3xl border border-blue-400/20 bg-[#0c162e]/85 p-6 backdrop-blur-md flex flex-col justify-between shadow-xl shadow-blue-950/30"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                  Active Tier
                </span>
                <span className="text-xl font-serif font-bold text-amber-400 font-mono">
                  ${svc.price}
                </span>
              </div>
              <h3 className="text-lg font-serif font-bold text-white mb-2">{svc.name}</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">{svc.description}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-blue-500/20 text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Live on Client Directory
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
