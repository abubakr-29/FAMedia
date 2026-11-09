function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-stone-800/60 motion-safe:animate-pulse ${className}`}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <div
      className="max-w-6xl mx-auto px-4 md:px-8 pt-30 pb-20 font-inter"
      aria-busy="true"
      aria-label="Loading article"
    >
      <Bone className="h-4 w-28 mb-4" />
      <div className="relative w-full max-w-2xl lg:max-w-3xl mx-auto mt-12">
        <div className="bg-[#1a1a1a] border border-stone-800 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
          {/* Header */}
          <div className="border-b border-stone-800 mb-6 pb-4">
            <Bone className="h-6 w-4/5 mb-3" />
            <Bone className="h-4 w-full mb-2" />
            <Bone className="h-4 w-2/3 mb-4" />
            <div className="flex gap-4">
              <Bone className="h-3 w-24" />
              <Bone className="h-3 w-20" />
              <Bone className="h-3 w-16" />
            </div>
          </div>

          {/* Meta rows */}
          <div className="mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-2 sm:gap-4 py-3 border-b border-stone-800 last:border-b-0"
              >
                <Bone className="h-3 w-16" />
                <Bone className="h-4 w-40" />
              </div>
            ))}
          </div>

          {/* Image + body */}
          <div className="border-t border-stone-800 pt-6">
            <Bone className="h-4 w-24 mb-4" />
            <Bone className="aspect-video w-full rounded-lg mb-6" />
            <div className="space-y-3">
              {["w-full", "w-11/12", "w-full", "w-4/5", "w-full", "w-2/3"].map(
                (w, i) => (
                  <Bone key={i} className={`h-4 ${w}`} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
