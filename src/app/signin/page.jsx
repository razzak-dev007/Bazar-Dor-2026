"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Basic validation
    if (!email || !password) {
      const err = "অনুগ্রহ করে ইমেইল এবং পাসওয়ার্ড পূরণ করুন";
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        const message = error.message || "ভুল ইমেইল অথবা পাসওয়ার্ড";
        setErrorMsg(message);
        toast.error(message);
      } else {
        toast.success("সফলভাবে লগইন হয়েছে! স্বাগতম।");
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Sign in error:", err);
      const message = "লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।";
      setErrorMsg(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: redirectUrl,
      });
      if (res?.error) {
        toast.error(`${provider} দিয়ে লগইন ব্যর্থ হয়েছে`);
      }
    } catch (err) {
      toast.error(`${provider} সার্ভিস বর্তমানে কনফিগার করা নেই। অনুগ্রহ করে ইমেইল দিয়ে লগইন করুন।`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-emerald-100 text-emerald-700 rounded-full mb-3">
            <LogIn className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            সাইন ইন করুন
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            আপনার অ্যাকাউন্টে লগইন করে নিত্যপ্রয়োজনীয় বাজারদর দেখুন
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2.5 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              ইমেইল অ্যাড্রেস
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <span>লগইন করুন</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200" />
          <span className="px-3 text-xs text-slate-400 uppercase">অথবা</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            disabled={loading}
            className="w-full py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google দিয়ে সাইন ইন</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            disabled={loading}
            className="w-full py-2.5 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-3 text-sm font-semibold text-slate-700 transition"
          >
            <svg className="w-4 h-4 fill-slate-800" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub দিয়ে সাইন ইন</span>
          </button>
        </div>

        {/* Link to Register */}
        <p className="mt-8 text-center text-sm text-slate-600">
          কোনো অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-emerald-600 hover:text-emerald-700 font-bold hover:underline"
          >
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  );
}
