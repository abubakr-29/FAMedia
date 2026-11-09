function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-md bg-stone-800/60 motion-safe:animate-pulse ${className}`}
    />
  );
}

export default function BlogsLoading() {
  return (
    <div className="pt-30 pb-20" aria-busy="true" aria-label="Loading blogs">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="mb-10 pt-8">
          <Bone className="h-14 md:h-16 w-3/4 max-w-xl mb-6" />
          <Bone className="h-5 w-full max-w-2xl mb-2" />
          <Bone className="h-5 w-2/3 max-w-xl mb-8" />
          <Bone className="h-9 w-full max-w-sm rounded-lg" />
        </div>

        {/* Category chips */}
        <div className="flex gap-2 pb-2 mb-10 border-b border-stone-800/50">
          {[72, 96, 80, 110, 88].map((w, i) => (
            <div key={i} style={{ width: w }}>
              <Bone className="h-7 rounded-full" />
            </div>
          ))}
        </div>

        {/* Featured */}
        <div className="mb-12 bg-[#1a1a1a] border border-stone-800 rounded-2xl grid md:grid-cols-2 overflow-hidden">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <Bone className="h-3 w-20 mb-5" />
            <Bone className="h-9 w-full mb-3" />
            <Bone className="h-9 w-4/5 mb-6" />
            <Bone className="h-4 w-full mb-2" />
            <Bone className="h-4 w-5/6 mb-8" />
            <div className="flex items-center gap-3">
              <Bone className="w-8 h-8 rounded-full" />
              <div className="flex flex-col gap-1.5">
                <Bone className="h-3 w-24" />
                <Bone className="h-2.5 w-32" />
              </div>
            </div>
          </div>
          <div className="relative min-h-[300px] border-l border-stone-800/50">
            <Bone className="absolute inset-6 rounded-lg" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col">
              <Bone className="aspect-4/3 w-full rounded-xl mb-5" />
              <Bone className="h-3 w-32 mb-3" />
              <Bone className="h-6 w-full mb-2" />
              <Bone className="h-6 w-3/4 mb-4" />
              <Bone className="h-4 w-full mb-2" />
              <Bone className="h-4 w-5/6 mb-6" />
              <div className="flex items-center gap-2">
                <Bone className="w-5 h-5 rounded-full" />
                <Bone className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
