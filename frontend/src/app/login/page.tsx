"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowRight, Layers, ShieldCheck } from "lucide-react";
import { loginUser } from "@/app/actions/auth";

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
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await loginUser(formData);
      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-black">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Mark */}
        <Link href="/" className="inline-flex items-center gap-3 group mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#08080a] rounded-[14px] flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-left">
            <span className="font-semibold text-xl tracking-tight text-white block">
              Studio
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-mono block">
              Digital Workspace
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-zinc-400 font-normal">
          Enter your credentials to access your Studio workspace.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-8 sm:p-10 rounded-2xl border border-white/[0.08] bg-[#101014] shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs p-3.5 rounded-xl text-center">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-zinc-300 mb-1.5"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-black bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                {isLoading ? "Authenticating..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.08] text-center text-xs text-zinc-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Create an account
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Server-authoritative authentication &amp; encrypted sessions</span>
        </div>
      </div>
    </div>
  );
}
