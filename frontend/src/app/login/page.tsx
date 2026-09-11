"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Camera, Lock, ArrowRight, Sparkles } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { setAdminCookie } from "../actions";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
      const res = await fetch(`${apiUrl}/api/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid email or password.");
        return;
      }

      const { token } = await res.json();
      await setAdminCookie(token);

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please verify backend service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-amber-500 selection:text-black">
      {/* 2-Tone Optical Canvas */}
      <AnimatedBackground />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        {/* Studio Brand Mark */}
        <Link href="/" className="inline-flex items-center gap-3 group mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-300 p-0.5 shadow-xl shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#08080a] rounded-[14px] flex items-center justify-center text-amber-400">
              <Camera className="w-6 h-6" />
            </div>
          </div>
          <div className="text-left">
            <span className="font-serif text-2xl tracking-tight text-white font-bold block">
              Studioza
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300/80 font-mono font-medium -mt-1 block">
              Patron &amp; Admin Portal
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
          Authenticated Atelier Access
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-blue-200/80 font-light">
          Sign in to access private master plates, commission telemetry, and inquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="p-8 sm:p-10 rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#0c162e]/90 via-[#161a28]/90 to-[#2b170a]/90 shadow-2xl backdrop-blur-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs p-3.5 rounded-xl text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2"
              >
                Atelier Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
                placeholder="admin@studio.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-300/90 mb-2"
              >
                Access Key / Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-xs text-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                {isLoading ? "Authenticating Session..." : "Authorize Atelier Access"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.08] text-center">
            <Link
              href="/"
              className="text-xs font-mono text-sky-300 hover:text-white transition-colors"
            >
              ← Return to Atelier Overview
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
