import { Link } from "@tanstack/react-router";
import { collections } from "@/data/collections";
import { Countdown } from "./Countdown";

type CollectionsProps = {
  mode?: "preview" | "full";
  showCountdown?: boolean;
};

export function Collections({ mode = "full", showCountdown = true }: CollectionsProps) {
  const items = mode === "preview" ? collections.slice(0, 4) : collections;

  return (
    <section id="COLLECTIONS" className="px-8 py-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[#D4AF37] text-xs tracking-widest">✦ COLLECTIONS</p>
          <h2 className="font-serif text-4xl text-white mt-2">Parcourez Nos Galeries</h2>
        </div>
        {showCountdown && <Countdown />}
      </div>
      <div
        className={
          mode === "preview"
            ? "flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-12 hide-scrollbar"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 pt-12"
        }
      >
        {items.map((c) => (
          <Link
            key={c.title}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className={
              mode === "preview"
                ? "w-[300px] shrink-0 snap-start flex flex-col gap-4"
                : "flex flex-col gap-4"
            }
          >
            <div className="aspect-[3/4] bg-[#171717] rounded-md relative overflow-hidden group">
              <img src={c.img} alt={c.title} width={900} height={1200} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="bg-[#0f0f0f] text-gray-300 text-[10px] px-3 py-1 rounded-full absolute top-4 right-4 tracking-wider">{c.tag}</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
