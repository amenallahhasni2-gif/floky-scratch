export function DropBanner() {
  return (
    <div className="fixed top-0 w-full z-[60] bg-black text-center py-1.5 border-b border-white/10">
      <div className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-wider text-gray-300">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        DROP 001 : LIVE
      </div>
    </div>
  );
}
