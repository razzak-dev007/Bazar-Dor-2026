import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-emerald-50/50 to-white py-12 md:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide">
              <span>🌾</span>
              <span>দৈনন্দিন বাজারদর পর্যবেক্ষণ প্ল্যাটফর্ম</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
              নিত্যপ্রয়োজনীয় পণ্যের{" "}
              <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy">
                সঠিক বাজার দর
              </span>{" "}
              জানুন সহজে
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              প্রতিদিনের চাল, ডাল, তেল, সবজি, মাছ ও মাংসের সর্বশেষ নির্ভরযোগ্য পাইকারি ও
              খুচরা বাজার দর এক নজরে যাচাই করুন এবং সেরা দামে কেনাকাটা করুন।
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowDown className="w-5 h-5 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-full max-w-md p-3 bg-white rounded-2xl shadow-xl border border-emerald-100 transform hover:scale-[1.02] transition duration-300">
              <img
                src="/bazar-hero.png"
                alt="বাজার দর হিরো ছবি"
                className="w-full h-auto object-cover rounded-xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="p-4 bg-emerald-50/70 rounded-xl mt-3 flex items-center justify-between text-xs sm:text-sm text-emerald-800 font-medium">
                <span>🛒 রিয়েল-টাইম বাজার আপডেট</span>
                <span className="bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  যাচাইকৃত
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
