"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { API_BASE_URL } from "@/lib/utils";
import { TrendingUp, TrendingDown, LayoutGrid } from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Top 6 Risers (দাম বেড়েছে)
  const risers = [...products]
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে)
  const fallers = [...products]
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Section A: আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                আজ দাম বেড়েছে <span className="text-emerald-600">▲</span>
              </h2>
              <p className="text-sm text-slate-500">
                যেসব পণ্যের দাম আজকের বাজারে সবচেয়ে বেশি বৃদ্ধি পেয়েছে (শীর্ষ ৬টি)
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {risers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section B: আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <div className="p-2 bg-rose-100 text-rose-700 rounded-lg">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                আজ দাম কমেছে <span className="text-rose-600">▼</span>
              </h2>
              <p className="text-sm text-slate-500">
                যেসব পণ্যের দাম আজকের বাজারে কমে সাশ্রয়ী হয়েছে (শীর্ষ ৬টি)
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {fallers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <LayoutGrid className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                সব পণ্য
              </h2>
              <p className="text-sm text-slate-500">
                দৈনন্দিন বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের আপডেটেড তালিকা
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
