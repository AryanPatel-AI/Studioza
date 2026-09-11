"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, FolderPlus, Image as ImageIcon, Camera } from "lucide-react";

export default function AdminPortfolioPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [selectedCatId, setSelectedCatId] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemImageUrl, setItemImageUrl] = useState("");

  const loadData = () => {
    fetch("/api/admin/portfolio")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0 && !selectedCatId) {
            setSelectedCatId(data[0].id);
          }
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const res = await fetch("/api/admin/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName }),
    });

    if (res.ok) {
      setNewCatName("");
      loadData();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
          Visual Archive &amp; Series Categories
        </h1>
        <p className="text-sm text-blue-200/80 mt-1">
          Curate showcase plates, archive categories, and technical EXIF details.
        </p>
      </div>

      {/* Category Creation Form */}
      <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#0c162e]/90 via-[#181926]/90 to-[#2b170a]/90 p-8 shadow-2xl backdrop-blur-xl">
        <h3 className="text-base font-serif font-bold text-white mb-4 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-amber-400" />
          Add Visual Archive Category
        </h3>
        <form onSubmit={handleCreateCategory} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            required
            placeholder="e.g. Fine Art Monochromes"
            className="flex-1 px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all whitespace-nowrap cursor-pointer"
          >
            Create Category
          </button>
        </form>
      </div>

      {/* Categories Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-3xl border border-blue-400/20 bg-[#0c162e]/85 p-6 backdrop-blur-md shadow-xl shadow-blue-950/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                {cat.name}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                {cat.items?.length || 0} Plates
              </span>
            </div>

            <div className="space-y-2">
              {(cat.items || []).map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-blue-950/40 border border-blue-400/10 text-xs"
                >
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-[10px] font-mono text-amber-300">Curated</span>
                </div>
              ))}
              {(!cat.items || cat.items.length === 0) && (
                <p className="text-xs text-neutral-400 py-3 italic">
                  No plates uploaded under this category yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
