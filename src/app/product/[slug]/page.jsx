"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toBengaliNumber, formatUnit, API_BASE_URL } from "@/lib/utils";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Store,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { data: session, isPending: authPending } = useSession();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  // Authentication protection
  useEffect(() => {
    if (!authPending && !session?.user) {
      toast.error("এই পেজটি দেখতে অনুগ্রহ করে প্রথমে লগইন করুন।");
      router.push(`/signin?redirect=/product/${slug}`);
    }
  }, [session, authPending, router, slug]);

  // Fetch product data
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    // First try fetching all products to find by slug or ID
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((allProducts) => {
        if (Array.isArray(allProducts)) {
          const found = allProducts.find(
            (p) => String(p.slug) === String(slug) || String(p.id) === String(slug)
          );

          if (found) {
            // Also fetch single product endpoint if needed for full market data
            fetch(`${API_BASE_URL}/products/${found.id}`)
              .then((r) => r.json())
              .then((singleData) => {
                if (singleData && !singleData.error) {
                  setProduct(singleData);
                } else {
                  setProduct(found);
                }
              })
              .catch(() => {
                setProduct(found);
              });
          } else {
            setIsNotFound(true);
          }
        } else {
          setIsNotFound(true);
        }
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setIsNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Show loading while checking auth or fetching data
  if (authPending || loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-slate-200 rounded w-1/4" />
          <div className="h-44 bg-slate-200 rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-28 bg-slate-200 rounded-xl" />
            <div className="h-28 bg-slate-200 rounded-xl" />
            <div className="h-28 bg-slate-200 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  // If not logged in, show protected placeholder while redirecting
  if (!session?.user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="inline-flex p-4 rounded-full bg-amber-100 text-amber-700 mb-4">
          <ShieldAlert className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">সংরক্ষিত পেজ</h2>
        <p className="text-slate-500 mb-6">
          পণ্যের বাজারভিত্তিক বিস্তারিত দর দেখার জন্য আপনাকে লগইন করতে হবে।
        </p>
        <Link
          href={`/signin?redirect=/product/${slug}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          লগইন পেজে যান
        </Link>
      </div>
    );
  }

  // Not Found State
  if (isNotFound || !product) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="inline-flex p-4 rounded-full bg-rose-100 text-rose-600 mb-4">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-slate-500 mb-6">
          দুঃখিত, আপনি যে পণ্যের তথ্য খুঁজছেন তা পাওয়া যায়নি বা অপসারিত হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // Price calculations from markets array
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    const mins = markets.map((m) => m.min).filter(Boolean);
    const maxs = markets.map((m) => m.max).filter(Boolean);
    if (mins.length > 0) minPrice = Math.min(...mins);
    if (maxs.length > 0) maxPrice = Math.max(...maxs);
    const sum = markets.reduce((acc, m) => acc + ((m.min + m.max) / 2), 0);
    avgPrice = Math.round(sum / markets.length);
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back to Home Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Top — Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-emerald-50 flex items-center justify-center text-5xl sm:text-6xl border border-emerald-100 shrink-0">
            {product.image || product.categoryIcon || "📦"}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                {product.categoryNameBn || "নিত্যপণ্য"}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {formatUnit(product.unit)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              আজকের জাতীয় গড় বাজারদর এবং দেশের প্রধান বাজারসমূহের সর্বশেষ নির্ভরযোগ্য তথ্য
            </p>
          </div>
        </div>

        {/* Change Badge */}
        <div className="flex flex-col md:items-end">
          <span className="text-xs text-slate-400 font-medium">জাতীয় আজকের দর</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-0.5">
            {toBengaliNumber(product.today)}{" "}
            <span className="text-lg font-semibold text-slate-600">টাকা</span>
          </div>
          <div className="mt-2">
            {isUp && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                <TrendingUp className="w-4 h-4" />
                বৃদ্ধি পেয়েছে ▲ {toBengaliNumber(product.change?.pct)}%
              </span>
            )}
            {isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800">
                <TrendingDown className="w-4 h-4" />
                কমেছে ▼ {toBengaliNumber(product.change?.pct)}%
              </span>
            )}
            {!isUp && !isDown && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700">
                <Minus className="w-4 h-4" />
                অপরিবর্তিত — ০.০%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Price Summary Cards (Minimum, Maximum, Average) */}
      <div>
        <h2 className="text-lg font-bold text-slate-800 mb-4">
          📊 বাজারদর পর্যালোচনা
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Minimum Price */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                সর্বনিম্ন দর
              </span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {toBengaliNumber(minPrice)}{" "}
                <span className="text-sm font-semibold text-slate-500">টাকা</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">
                {formatUnit(product.unit)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              📉
            </div>
          </div>

          {/* Average Price */}
          <div className="bg-white rounded-2xl p-5 border border-blue-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                গড় বাজার দর
              </span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {toBengaliNumber(avgPrice)}{" "}
                <span className="text-sm font-semibold text-slate-500">টাকা</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">
                {formatUnit(product.unit)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              ⚖️
            </div>
          </div>

          {/* Maximum Price */}
          <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
                সর্বোচ্চ দর
              </span>
              <div className="text-2xl font-extrabold text-slate-900 mt-1">
                {toBengaliNumber(maxPrice)}{" "}
                <span className="text-sm font-semibold text-slate-500">টাকা</span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">
                {formatUnit(product.unit)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
              📈
            </div>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম (Markets Breakdown) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Store className="w-6 h-6 text-emerald-600" />
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              বিভিন্ন বিভাগ ও আঞ্চলিক পাইকারি বাজারের আজকের সম্ভাব্য মূল্য তালিকা
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-slate-100 rounded-full text-slate-600">
            মোট বাজার: {toBengaliNumber(markets.length)} টি
          </span>
        </div>

        {markets.length === 0 ? (
          <p className="text-slate-500 text-center py-8">
            কোনো আঞ্চলিক বাজারের তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {markets.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-slate-50/50 hover:bg-white transition shadow-xs flex flex-col justify-between"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{m.market}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{m.division} বিভাগ</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    আজকের দর
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">মূল্য পরিসীমা</span>
                    <span className="text-base font-extrabold text-emerald-700">
                      {toBengaliNumber(m.min)} - {toBengaliNumber(m.max)} টাকা
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    {formatUnit(product.unit)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
