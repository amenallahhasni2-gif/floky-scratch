import { Link } from "@tanstack/react-router";
import { products, type Product } from "@/data/products";

type BoutiqueProps = {
  mode?: "preview" | "full";
  items?: Product[];
};

export function Boutique({ mode = "full", items }: BoutiqueProps) {
  const displayProducts = items ?? (mode === "preview" ? products.slice(0, 6) : products);

  return (
    <section id="BOUTIQUE" className="px-8 py-20 max-w-7xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ BOUTIQUE VIRTUELLE</p>
      <h2 className="font-serif text-4xl text-white mt-2">Sélection Curatée</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {displayProducts.map((p) => (
          <Link
            key={p.name}
            to="/products/$slug"
            params={{ slug: p.slug }}
            className="group cursor-pointer"
          >
            <div className="aspect-square bg-[#171717] mb-4 overflow-hidden relative">
              <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className={`w-full h-full object-cover transition-transform duration-700 ${p.soldOut ? "opacity-50" : "group-hover:scale-105"}`} />
              {p.soldOut && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-black/80 text-[#D4AF37] border border-[#D4AF37] px-6 py-2 text-xs font-bold tracking-[0.3em]">ÉPUISÉ</span>
                </div>
              )}
            </div>
            <h3 className="font-serif text-lg text-white mb-1">{p.name}</h3>
            <p className={`font-sans text-sm ${p.soldOut ? "text-gray-500 line-through" : "text-gray-400"}`}>À partir de {p.price}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
