"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileBox,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Clock,
  HardDrive,
  Sparkles,
} from "lucide-react";
import { deleteAsset } from "@/app/actions/assets";
import { formatBytes, formatDate } from "@/lib/utils";

interface AssetItem {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: Date;
  project?: { name: string; slug: string } | null;
}

interface AssetsClientProps {
  assets: AssetItem[];
}

export default function AssetsClient({ assets }: AssetsClientProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/assets/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to upload file.");
        return;
      }

      router.refresh();
    } catch {
      setError("An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete asset "${name}"? This cannot be undone.`)) {
      await deleteAsset(id);
      router.refresh();
    }
  };

  const totalSize = assets.reduce((acc, a) => acc + a.size, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Assets &amp; Media</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Store, preview, and manage project images, documents, and creative files.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 py-2 px-3.5 rounded-xl font-medium text-xs text-black bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all cursor-pointer w-fit">
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? "Uploading file..." : "Upload New Asset"}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            accept="image/*,application/pdf"
          />
        </label>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs">
          {error}
        </div>
      )}

      {/* Storage Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#101014] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Total Assets</p>
            <p className="text-xl font-bold text-white mt-1">{assets.length}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <FileBox className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#101014] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Storage Used</p>
            <p className="text-xl font-bold text-white mt-1">{formatBytes(totalSize)}</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
            <HardDrive className="w-4 h-4" />
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#101014] flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-400">Supported Formats</p>
            <p className="text-xs font-mono text-zinc-300 mt-1">PNG, JPG, WEBP, SVG, PDF</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      {assets.length === 0 ? (
        <div className="p-12 rounded-2xl border border-dashed border-white/[0.1] bg-[#101014]/40 text-center space-y-3">
          <FileBox className="w-8 h-8 text-zinc-500 mx-auto" />
          <h3 className="text-sm font-semibold text-white">No assets stored yet</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Upload images and project documents to use across your workspace.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="p-3 rounded-2xl border border-white/[0.08] bg-[#101014] flex flex-col justify-between group hover:border-amber-500/30 transition-all shadow-sm"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-square rounded-xl bg-black/40 overflow-hidden border border-white/[0.06] flex items-center justify-center relative">
                  {asset.mimeType.startsWith("image/") ? (
                    <img
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="text-zinc-500 flex flex-col items-center gap-1">
                      <FileBox className="w-8 h-8 text-zinc-400" />
                      <span className="text-[9px] uppercase font-mono">{asset.mimeType.split("/")[1]}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs font-medium text-white truncate mt-2.5" title={asset.name}>
                  {asset.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>{formatBytes(asset.size)}</span>
                  <span>{formatDate(asset.createdAt)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2.5 mt-2.5 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  onClick={() => handleCopyUrl(asset.url, asset.id)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                  title="Copy URL"
                >
                  {copiedId === asset.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="text-[10px]">{copiedId === asset.id ? "Copied" : "Copy"}</span>
                </button>

                <div className="flex items-center gap-1">
                  <a
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded-lg text-zinc-400 hover:text-white"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(asset.id, asset.name)}
                    className="p-1 rounded-lg text-zinc-500 hover:text-rose-400"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
