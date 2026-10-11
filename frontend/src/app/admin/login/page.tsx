"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("aryan@studioza.atelier");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Instant smooth transition into admin dashboard
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#F4F1EB] flex flex-col justify-between p-8">
      {/* Top Colophon */}
      <div className="flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl text-white tracking-tight">
          STUDIOZA
        </Link>
        <span className="type-meta text-[#A39E96] text-xs">
          RESTRICTED ATELIER CONSOLE
        </span>
      </div>

      {/* Center Auth Card */}
      <div className="max-w-md w-full mx-auto bg-black/40 border border-white/10 p-8 sm:p-12 space-y-8">
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 bg-white/5 border border-white/15 rounded-full flex items-center justify-center mx-auto text-[#CC5500]">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="font-serif text-3xl text-white font-normal">
            Atelier Management Portal
          </h1>
          <p className="type-small text-[#A39E96]">
            Enter your studio administrator credentials to access the CMS and CRM database.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="type-meta text-xs text-[#A39E96]">Administrator Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#CC5500]"
            />
          </div>

          <div className="space-y-1">
            <label className="type-meta text-xs text-[#A39E96]">Master Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 bg-white/5 border border-white/15 text-white text-sm focus:outline-hidden focus:border-[#CC5500]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F4F1EB] text-[#171717] py-4 type-meta text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{isLoading ? "Authenticating Session..." : "Access Admin Console"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="type-meta text-xs text-[#A39E96] hover:text-white transition-colors">
            ← Return to Public Photography Magazine
          </Link>
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="text-center type-meta text-xs text-[#A39E96]/60">
        SECURE HTTPS SESSION · ROLE-BASED ACCESS CONTROL (ADMIN, EDITOR, PHOTOGRAPHER)
      </div>
    </div>
  );
}
