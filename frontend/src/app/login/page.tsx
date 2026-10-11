"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, ShieldCheck, ArrowRight, KeyRound } from "lucide-react";
import FilmGrain from "@/components/film/FilmGrain";

// Client proofing vault login page
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("patron@studioza.com");
  const [passcode, setPasscode] = useState("PATRON2026");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authenticating patron vault token
    setTimeout(() => {
      setIsLoading(false);
      router.push("/vault");
    }, 600);
  };

  const handleDemoAccess = () => {
    router.push("/vault");
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F1EB] flex flex-col justify-between selection:bg-[#CC5500] selection:text-white relative">
      <FilmGrain />

      {/* Top Header */}
      <header className="p-6 lg:p-10 flex justify-between items-center z-10 border-b border-white/10">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 rounded-[1px] border border-white/20 bg-black/40 flex items-center justify-center text-[#CC5500]">
            <span className="font-serif italic text-lg">S</span>
          </div>
          <div>
            <span className="font-serif text-lg tracking-wider text-white block">
              STUDIOZA ATELIER
            </span>
            <span className="type-meta text-[9px] text-[#A39E96] block tracking-widest">
              PRIVATE CLIENT VAULT
            </span>
          </div>
        </Link>

        <Link
          href="/"
          className="type-meta text-xs text-[#A39E96] hover:text-white transition-colors"
        >
          ← Return to Public Atelier
        </Link>
      </header>

      {/* Center Auth Card */}
      <main className="max-w-md w-full mx-auto px-6 py-12 z-10">
        <div className="bg-[#1F1F1F] border border-white/10 p-8 sm:p-10 shadow-2xl relative space-y-6">
          <div className="space-y-2 text-center">
            <span className="type-meta text-[10px] text-[#CC5500] tracking-widest block">
              RESTRICTED ARCHIVAL REPOSITORY
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Client Vault Access
            </h1>
            <p className="type-small text-[#A39E96]">
              Enter your commission email and private archival passcode to inspect proofing plates and high-resolution master scans.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {error && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs p-3 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="block type-meta text-[11px] text-[#A39E96]">
                COMMISSION EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-[#CC5500] transition-colors"
                placeholder="patron@domain.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="passcode" className="block type-meta text-[11px] text-[#A39E96]">
                  ARCHIVAL PASSCODE
                </label>
                <span className="text-[10px] text-[#77736D] font-mono">CASE SENSITIVE</span>
              </div>
              <input
                id="passcode"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-[#CC5500] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-[#F4F1EB] text-[#171717] py-3.5 type-meta text-xs hover:bg-[#CC5500] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer font-medium"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isLoading ? "DECRYPTING VAULT..." : "ENTER ARCHIVAL VAULT"}</span>
            </button>
          </form>

          {/* Quick Demo Access Bypass */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-center">
              <span className="text-[11px] text-[#77736D] type-meta">
                EVALUATION / GUEST PREVIEW
              </span>
            </div>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full border border-white/20 text-[#CC5500] hover:border-[#CC5500] py-3 type-meta text-[11px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Instant Access: Demo Patron Session →</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] type-meta text-[#77736D]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9CAF88]" />
            <span>256-Bit Encrypted Proofing System · Studioza Secure</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs type-meta text-[#77736D] border-t border-white/10 z-10">
        STUDIOZA ATELIER // ARCHIVAL REPOSITORY COPYRIGHT MMXXVI
      </footer>
    </div>
  );
}
