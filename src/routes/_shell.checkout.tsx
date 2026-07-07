import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_shell/checkout")({
  component: CheckoutPage,
});

type Wilaya = { wilaya: string; fee: number; estimated_days: number };

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [wilayas, setWilayas] = useState<Wilaya[]>([]);
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    wilaya: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("delivery_fees")
      .select("wilaya, fee, estimated_days")
      .eq("is_active", true)
      .order("wilaya")
      .then(({ data }) => {
        if (data) setWilayas(data as Wilaya[]);
      });
  }, []);

  const selectedFee = wilayas.find((w) => w.wilaya === form.wilaya);
  const deliveryFee = selectedFee?.fee ?? 0;
  const total = subtotal + Number(deliveryFee);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id ?? null;

      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          user_id: userId,
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          customer_phone: form.customer_phone,
          wilaya: form.wilaya,
          address: form.address,
          notes: form.notes || null,
          subtotal,
          delivery_fee: Number(deliveryFee),
          total,
          status: "pending",
          payment_method: "cod",
        })
        .select("id")
        .single();

      if (orderErr) throw orderErr;

      const orderItems = items.map((i) => ({
        order_id: order!.id,
        product_name: i.name,
        product_image: i.img,
        unit_price: i.price,
        quantity: i.qty,
        subtotal: i.price * i.qty,
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) throw itemsErr;

      clear();
      navigate({ to: "/checkout/success", search: { id: order!.id } });
    } catch (err) {
      setError((err as Error).message ?? "Une erreur est survenue");
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="px-8 py-24 max-w-3xl mx-auto text-center">
        <p className="text-[#D4AF37] text-xs tracking-widest">✦ CHECKOUT</p>
        <h1 className="font-serif text-4xl text-white mt-2 mb-6">Panier vide</h1>
        <Link
          to="/boutique"
          className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors"
        >
          ✦ EXPLORER LA BOUTIQUE
        </Link>
      </section>
    );
  }

  return (
    <section className="px-8 py-24 max-w-5xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ CHECKOUT</p>
      <h1 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-10">Finaliser la commande</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-5">
          <Input label="Nom complet" value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input label="Email" type="email" value={form.customer_email} onChange={(v) => setForm({ ...form, customer_email: v })} required />
            <Input label="Téléphone" value={form.customer_phone} onChange={(v) => setForm({ ...form, customer_phone: v })} required />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Gouvernorat</label>
            <select
              required
              value={form.wilaya}
              onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
              className="w-full bg-[#171717] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="">Choisir un gouvernorat…</option>
              {wilayas.map((w) => (
                <option key={w.wilaya} value={w.wilaya}>
                  {w.wilaya} — {w.fee} TND ({w.estimated_days}j)
                </option>
              ))}
            </select>
          </div>
          <Input label="Adresse complète" value={form.address} onChange={(v) => setForm({ ...form, address: v })} required />
          <div>
            <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">Notes (optionnel)</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-[#171717] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <aside className="bg-[#171717] border border-white/10 rounded-lg p-6 h-fit lg:sticky lg:top-32 space-y-4">
          <h4 className="font-serif text-xl text-white">Résumé</h4>
          <div className="space-y-2 border-b border-white/10 pb-4">
            {items.map((i) => (
              <div key={i.slug} className="flex justify-between text-xs text-gray-400">
                <span className="truncate pr-2">{i.name} × {i.qty}</span>
                <span className="text-white shrink-0">{(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Sous-total</span><span className="text-white">{subtotal.toFixed(2)} TND</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Livraison</span><span className="text-white">{Number(deliveryFee).toFixed(2)} TND</span></div>
          <div className="flex justify-between text-base font-bold border-t border-white/10 pt-4"><span className="text-white">Total</span><span className="text-[#D4AF37]">{total.toFixed(2)} TND</span></div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !form.wilaya}
            className="w-full bg-[#D4AF37] text-black px-6 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "TRAITEMENT…" : "✦ CONFIRMER (COD)"}
          </button>
          <p className="text-[10px] text-gray-500 text-center">Paiement à la livraison. Vous serez contacté pour confirmation.</p>
        </aside>
      </form>
    </section>
  );
}

function Input({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-gray-400 mb-2 block">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#171717] border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
      />
    </div>
  );
}
