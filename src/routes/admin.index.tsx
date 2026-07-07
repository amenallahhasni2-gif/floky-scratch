import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function useCount(table: string) {
  return useQuery({
    queryKey: ["count", table],
    queryFn: async () => {
      const { count, error } = await supabase
        .from(table as never)
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count ?? 0;
    },
  });
}

function AdminHome() {
  const drops = useCount("drops");
  const collections = useCount("collections");
  const categories = useCount("categories");
  const products = useCount("products");
  const orders = useCount("orders");

  const stats = [
    { label: "Drops", to: "/admin/drops", value: drops.data },
    { label: "Collections", to: "/admin/collections", value: collections.data },
    { label: "Catégories", to: "/admin/categories", value: categories.data },
    { label: "Produits", to: "/admin/products", value: products.data },
    { label: "Commandes", to: "/admin/orders", value: orders.data },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif tracking-wide mb-1">Tableau de bord</h1>
      <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest">FLOKY · Backoffice</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="bg-[#171717] border border-white/10 rounded-lg p-5 hover:border-[#D4AF37]/40 transition-colors"
          >
            <p className="text-[10px] uppercase tracking-widest text-gray-500">{s.label}</p>
            <p className="text-3xl font-serif mt-2 text-[#D4AF37]">
              {s.value ?? <span className="text-gray-600">·</span>}
            </p>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-xs text-gray-500 leading-relaxed max-w-2xl">
        <p>
          Cette console gère la hiérarchie <strong>Drops → Collections → Catégories → Produits</strong>.
          Les changements sont écrits directement dans Supabase et sont soumis aux règles RLS
          (<code className="text-[#D4AF37]">profiles.is_admin = true</code>).
        </p>
      </div>
    </div>
  );
}
