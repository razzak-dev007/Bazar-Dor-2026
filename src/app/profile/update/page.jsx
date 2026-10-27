"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("অনুগ্রহ করে প্রথমে লগইন করুন");
      router.push("/signin");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      const err = "নামের ক্ষেত্রটি খালি রাখা যাবে না";
      setErrorMsg(err);
      toast.error(err);
      return;
    }

    setLoading(true);

    try {
      // Challenge C3: Update user name via Better Auth
      const { data, error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        const msg = error.message || "তথ্য আপডেট করতে ব্যর্থ হয়েছে";
        setErrorMsg(msg);
        toast.error(msg);
      } else {
        toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      console.error("Update profile error:", err);
      const msg = "তথ্য আপডেট করতে সমস্যা হয়েছে";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/2 mx-auto" />
          <div className="h-12 bg-slate-200 rounded" />
          <div className="h-10 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8">
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-800">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি ব্যবহার করুন
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2.5 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              আপনার নাম (Name)
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নতুন নাম লিখুন"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Information</span>
                </>
              )}
            </button>
            <Link
              href="/profile"
              className="py-3 px-5 border border-gray-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold text-sm transition text-center"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
