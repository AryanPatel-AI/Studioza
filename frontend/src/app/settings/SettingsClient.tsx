"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Shield, KeyRound, Clock, CheckCircle2, Check } from "lucide-react";
import { updateUserProfile } from "@/app/actions/auth";
import { formatDate } from "@/lib/utils";

interface SettingsClientProps {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    avatarUrl: string | null;
    role: string;
    createdAt: Date;
  };
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("avatarUrl", avatarUrl);

      const res = await updateUserProfile(formData);
      if (res.error) {
        setMessage({ text: res.error, type: "error" });
      } else {
        setMessage({ text: "Profile updated successfully.", type: "success" });
        router.refresh();
      }
    } catch {
      setMessage({ text: "Failed to update profile.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Manage your personal profile, credentials, and workspace preferences.
        </p>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 ${
            message.type === "success"
              ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
              : "bg-rose-950/60 border-rose-500/40 text-rose-300"
          }`}
        >
          {message.type === "success" && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Profile Details Card */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 text-amber-300 flex items-center justify-center font-bold text-2xl shadow-lg overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span>{name ? name[0].toUpperCase() : "U"}</span>
            )}
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">{name || "Studio User"}</h2>
            <p className="text-xs text-zinc-400">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Shield className="w-3 h-3" />
                {user.role}
              </span>
              <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                Email Address (Read-only)
              </label>
              <input
                type="email"
                value={user.email || ""}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01] text-zinc-400 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Avatar Image URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Security & System Info */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#101014] space-y-4">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-amber-400" />
          <span>Security &amp; Authorization</span>
        </h3>
        <p className="text-xs text-zinc-400">
          Your session is protected with server-authoritative authentication tokens and encrypted HTTP-only cookies.
        </p>
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Server-side verification active for all queries and mutations.</span>
        </div>
      </div>
    </div>
  );
}
