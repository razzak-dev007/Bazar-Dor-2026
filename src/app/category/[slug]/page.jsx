"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { API_BASE_URL, toBengaliNumber } from "@/lib/utils";
import { ChevronDown, ArrowLeft, AlertCircle } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default"); // default, lowToHigh, highToLow
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setIsNotFound(false);

    // Fetch category metadata and products in parallel
    Promise.all([
      fetch(`${API_BASE_URL}/categories/${slug}`).then((r) => r.json()),
      fetch(`${API_BASE_URL}/products?category=${slug}`).then((r) => r.json()),
    ])
      .then(([catData, prodData]) => {
        // If category is not found or error
        if (catData?.error || (!Array.isArray(prodData) && prodData?.error)) {
          setIsNotFound(true);
          return;
        }

        setCategory(catData);

        if (Array.isArray(prodData)) {
          if (prodData.length === 0 && !catData?.nameBn) {
            setIsNotFound(true);
          } else {
            setProducts(prodData);
          }
        } else {
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setIsNotFound(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Sort products based on selected option (sorting by numeric value)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "lowToHigh") {
      return (Number(a.today) || 0) - (Number(b.today) || 0);
    }
    if (sortBy === "highToLow") {
      return (Number(b.today) || 0) - (Number(a.today) || 0);
    }
    return 0; // default order
  });

  // Empty State / 404 state
  if (!loading && (isNotFound || (products.length === 0 && !category?.nameBn))) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex p-4 rounded-full bg-rose-100 text-rose-600 mb-4">
          <AlertCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">
          ক্যাটাগরি বা পণ্য পাওয়া যায়নি
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          দুঃখিত! আপনি যে ক্যাটাগরিটি খুঁজছেন তা পাওয়া যায়নি অথবা এই ক্যাটাগরিতে কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{category?.icon || "🛒"}</span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {category?.nameBn || "ক্যাটাগরি"}
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            মোট পণ্য: {toBengaliNumber(products.length)} টি
          </p>
        </div>

        {/* Sort Dropdown (Challenge C1) */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-sm font-semibold text-slate-600">
            সাজান:
          </label>
          <div className="relative inline-block">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 hover:border-emerald-500 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition cursor-pointer shadow-sm"
            >
              <option value="default">ডিফল্ট</option>
              <option value="lowToHigh">দাম: কম থেকে বেশি</option>
              <option value="highToLow">দাম: বেশি থেকে কম</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-xl font-bold text-slate-700 mb-2">এই ক্যাটাগরিতে পণ্য পাওয়া যায়নি</p>
          <p className="text-sm text-slate-500 mb-6">অন্য কোনো ক্যাটাগরি দেখতে পারেন</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
