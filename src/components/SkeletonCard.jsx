export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col justify-between animate-pulse shadow-sm">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-slate-200" />
          <div className="w-16 h-5 rounded-md bg-slate-200" />
        </div>
        <div className="w-3/4 h-6 rounded bg-slate-200 mb-2" />
        <div className="w-1/3 h-4 rounded bg-slate-100" />
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
        <div className="space-y-1">
          <div className="w-16 h-3 rounded bg-slate-100" />
          <div className="w-24 h-6 rounded bg-slate-200" />
        </div>
        <div className="w-16 h-6 rounded-lg bg-slate-200" />
      </div>
    </div>
  );
}
