"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toBengaliNumber, formatUnit, API_BASE_URL } from "@/lib/utils";

export default function PriceTicker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products for price ticker
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching ticker products:", err);
      });
  }, []);

  if (!products || products.length === 0) {
    return null;
  }

  // Duplicate items to ensure smooth infinite marquee scroll
  const displayItems = [...products, ...products];

  return (
    <div className="bg-emerald-950 text-white border-y border-emerald-900/50 py-2 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center px-4">
        <span className="bg-emerald-600 text-white text-xs px-2.5 py-1 rounded-md font-bold uppercase tracking-wider shrink-0 mr-4 z-10 shadow">
          লাইভ দর
        </span>
        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee gap-8 items-center text-sm">
            {displayItems.map((item, idx) => {
              const isUp = item.change?.dir === "up";
              const isDown = item.change?.dir === "down";
              return (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/product/${item.slug || item.id}`}
                  className="flex items-center gap-1.5 whitespace-nowrap hover:text-emerald-300 transition-colors"
                >
                  <span className="text-base">{item.image || "📦"}</span>
                  <span className="font-medium text-emerald-100">{item.nameBn}</span>
                  <span className="text-emerald-400 font-semibold">
                    {toBengaliNumber(item.today)} টাকা/{formatUnit(item.unit).replace("প্রতি ", "")}
                  </span>
                  {isUp && (
                    <span className="text-emerald-400 font-bold text-xs bg-emerald-900/80 px-1.5 py-0.5 rounded">
                      ▲ {toBengaliNumber(item.change.pct)}%
                    </span>
                  )}
                  {isDown && (
                    <span className="text-rose-400 font-bold text-xs bg-rose-950/80 px-1.5 py-0.5 rounded">
                      ▼ {toBengaliNumber(item.change.pct)}%
                    </span>
                  )}
                  {!isUp && !isDown && (
                    <span className="text-gray-400 font-medium text-xs bg-gray-800 px-1.5 py-0.5 rounded">
                      — ০.০%
                    </span>
                  )}
                  <span className="text-emerald-700 mx-2">•</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
