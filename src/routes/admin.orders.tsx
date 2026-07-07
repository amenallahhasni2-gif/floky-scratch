import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersAdmin,
});

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;

function OrdersAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) alert(error.message);
    else qc.invalidateQueries({ queryKey: ["admin", "orders"] });
  }

  return (
    <div>
      <h1 className="text-2xl font-serif tracking-wide mb-6">Commandes</h1>
      <div className="border border-white/10 rounded-lg overflow-hidden bg-[#171717]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0a0a0a] text-[10px] uppercase tracking-widest text-gray-500">
              <tr>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Wilaya</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              )}
              {!isLoading && (data?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Aucune commande.
                  </td>
                </tr>
              )}
              {data?.map((o) => (
                <tr key={o.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(o.created_at).toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">
                    <div>{o.customer_name}</div>
                    <div className="text-xs text-gray-500">{o.customer_phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{o.wilaya}</td>
                  <td className="px-4 py-3 text-[#D4AF37] font-semibold">
                    {Number(o.total).toLocaleString("fr-FR")} DA
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="bg-[#0f0f0f] border border-white/10 rounded px-2 py-1 text-xs"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
