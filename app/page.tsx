"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ForceLight from "@/components/theme/force-light";
import { useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMsg(error.message);
      setSubmitting(false);
      return;
    }
    const userRes = await supabase.auth.getUser();
    const uid = userRes.data.user?.id;
    if (!uid) {
      setErrorMsg("Unable to load user");
      setSubmitting(false);
      return;
    }
    const { data: profile, error: pErr } = await supabase
      .from("admin_profile")
      .select("id, email, role, first_name, last_name")
      .eq("user_id", uid)
      .single();
    if (pErr || !profile) {
      await supabase.auth.signOut();
      setErrorMsg("Access restricted");
      setSubmitting(false);
      return;
    }
    try {
      if (typeof document !== "undefined") {
        document.cookie =
          "aq_logged_in=1; Path=/; Max-Age=604800; SameSite=Lax";
      }
    } catch {}
    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <ForceLight />
      <div className="hidden md:block relative">
        <Image
          src="/globe.svg"
          alt="Cover"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-lg ring-1 ring-zinc-200 dark:bg-zinc-900 dark:ring-zinc-800">
          <div className="px-6 py-8">
            <div className="mb-8 flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]" />
              <h1 className="text-2xl font-semibold">Admin Portal</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-[var(--color-primary)] dark:bg-zinc-950 dark:border-zinc-700"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-[var(--color-primary)] dark:bg-zinc-950 dark:border-zinc-700"
                  placeholder="••••••••"
                />
              </div>
              {errorMsg ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errorMsg}
                </p>
              ) : null}
              <div className="flex items-center justify-between">
                <div />
                <Link href="#" className="text-sm text-[var(--color-primary)]">
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-md px-4 py-2 text-sm font-medium btn-primary hover:opacity-90"
              >
                {submitting ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
