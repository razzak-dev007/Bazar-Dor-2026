import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-100 shadow-lg p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-6">
          <SearchX className="w-10 h-10" />
        </div>
        <span className="text-5xl font-black text-rose-500 tracking-wider">
          ৪০৪
        </span>
        <h1 className="text-2xl font-bold text-slate-800 mt-2 mb-2">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          দুঃখিত, আপনি যে লিংক বা ঠিকানায় যাওয়ার চেষ্টা করছেন তা বিদ্যমান নেই অথবা অপসারিত হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
