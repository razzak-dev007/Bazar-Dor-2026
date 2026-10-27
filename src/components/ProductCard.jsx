import Link from "next/link";
import { toBengaliNumber, formatUnit } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const pct = product.change?.pct;

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Emoji & Category Tag */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            {product.image || product.categoryIcon || "📦"}
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
            {product.categoryNameBn || "সাধারণ"}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-1">
          {product.nameBn}
        </h3>

        {/* Unit Line */}
        <p className="text-xs text-slate-500 mt-0.5">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price Row & Change Badge */}
      <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
        <div>
          <span className="text-xs text-slate-400 block font-medium">আজকের দাম</span>
          <span className="text-xl font-extrabold text-slate-900">
            {toBengaliNumber(product.today)} <span className="text-sm font-semibold text-slate-600">টাকা</span>
          </span>
        </div>

        {/* Change Badge */}
        <div>
          {isUp && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
              <ArrowUpRight className="w-3.5 h-3.5" />
              ▲ {toBengaliNumber(pct)}%
            </span>
          )}
          {isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg bg-rose-100 text-rose-800 border border-rose-200">
              <ArrowDownRight className="w-3.5 h-3.5" />
              ▼ {toBengaliNumber(pct)}%
            </span>
          )}
          {!isUp && !isDown && (
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-gray-100 text-gray-600 border border-gray-200">
              <Minus className="w-3.5 h-3.5" />
              — ০.০%
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
