import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/_shell/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, setQty, remove } = useCart();

  return (
    <section className="px-8 py-24 max-w-5xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ PANIER</p>
      <h1 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-10">Votre sélection</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 mb-6">Votre panier est vide.</p>
          <Link
            to="/boutique"
            className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors"
          >
            ✦ EXPLORER LA BOUTIQUE
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.slug} className="flex gap-5 border-b border-white/10 pb-6">
                <img src={item.img} alt={item.name} className="w-28 h-28 object-cover rounded bg-[#171717]" />
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-white">{item.name}</h3>
                  <p className="text-[#D4AF37] text-sm mt-1">{item.price} TND</p>
                  <div className="flex items-center gap-3 mt-4">
                    <button onClick={() => setQty(item.slug, item.qty - 1)} className="w-8 h-8 border border-white/10 rounded hover:border-[#D4AF37] hover:text-[#D4AF37]">−</button>
                    <span className="w-8 text-center">{item.qty}</span>
                    <button onClick={() => setQty(item.slug, item.qty + 1)} className="w-8 h-8 border border-white/10 rounded hover:border-[#D4AF37] hover:text-[#D4AF37]">+</button>
                    <button onClick={() => remove(item.slug)} className="ml-auto text-xs tracking-widest text-gray-500 hover:text-red-400 uppercase">Retirer</button>
                  </div>
                </div>
                <div className="text-right text-white font-medium">{(item.price * item.qty).toFixed(2)} TND</div>
              </div>
            ))}
          </div>
          <aside className="bg-[#171717] border border-white/10 rounded-lg p-6 h-fit sticky top-32">
            <h4 className="font-serif text-xl text-white mb-4">Résumé</h4>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Sous-total</span>
              <span className="text-white">{subtotal.toFixed(2)} TND</span>
            </div>
            <p className="text-[10px] text-gray-500 mb-6">Livraison calculée au checkout selon le gouvernorat.</p>
            <Link
              to="/checkout"
              className="block text-center bg-[#D4AF37] text-black px-6 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors"
            >
              ✦ PROCÉDER AU CHECKOUT
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
