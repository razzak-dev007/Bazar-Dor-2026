"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Calendar, Edit3, LogOut, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে লগইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে লগআউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-4">
          <div className="w-24 h-24 rounded-full bg-slate-200 mx-auto" />
          <div className="h-6 bg-slate-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-slate-200 rounded w-1/3 mx-auto" />
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8">
        {/* Profile Header */}
        <div className="text-center pb-8 border-b border-gray-100">
          <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-4xl font-extrabold mx-auto shadow-inner">
            {user.name ? user.name.charAt(0).toUpperCase() : "👤"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-4">
            {user.name || "সম্মানিত ব্যবহারকারী"}
          </h1>
          <p className="text-sm text-slate-500 mt-1 flex items-center justify-center gap-1.5">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>{user.email}</span>
          </p>
        </div>

        {/* User Information Details */}
        <div className="py-6 space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">নাম</span>
                <span className="text-sm font-bold text-slate-800">
                  {user.name || "নাম সেট করা হয়নি"}
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-semibold">
              সক্রিয়
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">ইমেইল</span>
                <span className="text-sm font-bold text-slate-800">
                  {user.email}
                </span>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-semibold">
              যাচাইকৃত
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <span className="text-xs text-slate-400 block font-medium">অ্যাকাউন্ট স্ট্যাটাস</span>
                <span className="text-sm font-bold text-slate-800">
                  নিয়মিত মেম্বার
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions: Update button (C3) & Sign Out */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href="/profile/update"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
