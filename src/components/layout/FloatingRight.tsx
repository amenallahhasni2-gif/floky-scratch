import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Drop = {
  id: string;
  slug: string;
  title: string;
  status: string;
  cover_image: string | null;
};

const FALLBACK: Drop[] = [
  { id: "f1", slug: "drop-001", title: "DROP 001", status: "live", cover_image: null },
  { id: "f2", slug: "drop-002", title: "DROP 002", status: "upcoming", cover_image: null },
];

export function FloatingRight() {
  const [drops, setDrops] = useState<Drop[]>(FALLBACK);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("drops")
      .select("id, slug, title, status, cover_image")
      .in("status", ["live", "upcoming", "paused"])
      .order("sort_order", { ascending: true })
      .limit(5)
      .then(({ data }) => {
        if (mounted && data && data.length) setDrops(data as Drop[]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 bg-[#171717]/90 backdrop-blur border border-white/10 px-3 py-2 rounded-full text-[10px] font-mono tracking-widest text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 transition-colors"
        aria-label="Voir les drops"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
        </span>
        DROPS · {drops.length}
        <span className="text-gray-500 group-hover:text-[#D4AF37]">{open ? "▸" : "◂"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 w-56 bg-[#0f0f0f]/95 backdrop-blur border border-white/10 rounded-lg p-3 shadow-2xl"
          >
            <p className="text-[10px] tracking-widest text-[#D4AF37] px-1 pb-1 border-b border-white/5">
              ✦ LIMITED DROPS
            </p>
            {drops.map((d) => (
              <div
                key={d.id}
                className="flex items-center gap-3 p-1.5 rounded hover:bg-white/5 transition-colors cursor-default"
              >
                <div className="w-9 h-9 rounded overflow-hidden bg-[#171717] flex items-center justify-center text-[9px] font-bold text-[#D4AF37] shrink-0">
                  {d.cover_image ? (
                    <img
                      src={d.cover_image}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    d.slug.slice(-3).toUpperCase()
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-gray-100 truncate">{d.title}</p>
                  <p className="text-[9px] uppercase tracking-wider text-gray-500">
                    {d.status === "live" ? (
                      <span className="text-red-400">● LIVE</span>
                    ) : d.status === "upcoming" ? (
                      "Bientôt"
                    ) : (
                      d.status
                    )}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
