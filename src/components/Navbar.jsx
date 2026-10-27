"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { getBanglaDate, API_BASE_URL } from "@/lib/utils";
import toast from "react-hot-toast";
import { User, LogOut, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [categories, setCategories] = useState([]);
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    setBanglaDate(getBanglaDate());

    // Fetch categories
    fetch(`${API_BASE_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        // Fallback default categories if network fails
        setCategories([
          { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
          { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
          { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
          { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
          { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
          { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
          { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
          { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
        ]);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Bangla Date */}
          <Link href="/" className="flex flex-col group">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🛒</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight group-hover:text-emerald-700 transition">
                বাজার দর
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-900 mt-0.5">
              📅 {banglaDate || "আজকের বাজার দর"}
            </span>
          </Link>

          {/* Right-side Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {session?.user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition text-sm font-medium"
                >
                  <User className="w-4 h-4 text-emerald-700" />
                  <span className="max-w-[120px] truncate">
                    {session.user.name || "প্রোফাইল"}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">লগআউট</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition text-sm font-semibold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>সাইন ইন</span>
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition text-sm font-semibold shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>সাইন আপ</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Second Row: Category Navigation Links */}
      <div className="bg-emerald-50/70 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                pathname === "/"
                  ? "bg-emerald-700 text-white shadow-sm font-semibold"
                  : "text-emerald-950 hover:bg-emerald-200 hover:text-emerald-950 font-medium"
              }`}
            >
              🏠 সব পণ্য
            </Link>
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm font-semibold"
                      : "text-emerald-950 hover:bg-emerald-200 hover:text-emerald-950 font-medium"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
