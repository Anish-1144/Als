"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { AuthPagesConfig } from "@/lib/auth-pages-content";

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors";

export default function SignInPageClient({
  config,
  pageHero,
}: {
  config: AuthPagesConfig;
  pageHero: { heroTitle: string; heroSubtitle: string; heroBackgroundImage: string };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/v1/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (json.success) {
        router.push("/");
        router.refresh();
      } else {
        setError(json.error?.message ?? "Sign in failed");
      }
    } catch {
      setError("Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const { signIn } = config;

  return (
    <div className="font-sans">
      <PageHero
        slug="sign-in"
        fallback={getPageHeroFallback("sign-in", { height: "h-72" })}
        initialData={pageHero}
      />

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-md mx-auto">
          <div className="bg-[#2d3544] rounded-2xl p-8 shadow-lg border border-gray-600">
            <h2 className="text-2xl font-besley font-semibold text-white mb-6 text-center">
              {signIn.heroTitle}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Email <span className="text-[#00a69c]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-1.5">
                  Password <span className="text-[#00a69c]">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Your password"
                  className={inputClass}
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00a69c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d8a99] transition-colors disabled:opacity-60"
              >
                {loading ? "Signing in..." : signIn.submitLabel}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              {signIn.footerText}{" "}
              <Link href="/register" className="text-[#00a69c] font-medium hover:underline">
                {signIn.registerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
