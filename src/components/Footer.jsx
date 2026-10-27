export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Text */}
          <div className="flex items-center gap-2">
            <span className="text-xl">🛒</span>
            <p className="text-sm sm:text-base font-semibold text-white">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Text */}
          <div>
            <p className="text-xs sm:text-sm text-slate-400 italic">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} বাজার দর | সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
