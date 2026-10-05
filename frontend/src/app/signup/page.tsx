"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, ShieldCheck } from "lucide-react";
import { registerUser } from "@/app/actions/auth";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
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
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const result = await registerUser(formData);
      if (result.error) {
        setError(result.error);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center py-14 px-4 sm:px-6 lg:px-8 selection:bg-copper-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Mark */}
        <Link href="/" className="inline-flex items-center gap-3 group mb-6">
          <div className="w-8 h-8 rounded-[2px] border border-stone-300 bg-white flex items-center justify-center text-copper-600 transition-colors group-hover:border-copper-500">
            <span className="italic font-semibold text-sm">S</span>
          </div>
          <div className="text-left">
            <span className="text-lg text-ink-primary block">
              Studioza
            </span>
            <span className="text-[9px] uppercase text-ink-muted block mt-0.5">
              Atelier Vault
            </span>
          </div>
        </Link>

        <h1 className="text-2xl sm:text-3xl text-ink-primary">
          Create Workspace
        </h1>
        <p className="mt-2 type-meta text-ink-muted">
          From negative to exhibition monograph in one studio space.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="p-8 sm:p-10 rounded-[2px] border border-stone-200 bg-white shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-stone-100 border border-stone-300 text-stone-800 type-meta p-3 rounded-[2px] text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block type-meta text-ink-primary"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[2px] border border-stone-200 bg-stone-50/80 text-ink-primary placeholder:text-stone-400 focus:outline-none focus:border-copper-500 focus:bg-white text-sm transition-colors"
                placeholder="Aryan Patel"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block type-meta text-ink-primary"
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
                className="w-full px-3.5 py-2.5 rounded-[2px] border border-stone-200 bg-stone-50/80 text-ink-primary placeholder:text-stone-400 focus:outline-none focus:border-copper-500 focus:bg-white text-sm transition-colors"
                placeholder="patron@domain.com"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block type-meta text-ink-primary"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-[2px] border border-stone-200 bg-stone-50/80 text-ink-primary placeholder:text-stone-400 focus:outline-none focus:border-copper-500 focus:bg-white text-sm transition-colors"
                placeholder="At least 6 characters"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-editorial-primary text-[10px]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isLoading ? "Creating workspace..." : "Create Workspace"}</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-hairline text-center type-meta text-ink-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-copper-600 hover:text-copper-700 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 type-meta">
          <ShieldCheck className="w-3 h-3 text-copper-500" />
          <span>Server-authoritative encrypted session</span>
        </div>
      </div>
    </div>
  );
}
