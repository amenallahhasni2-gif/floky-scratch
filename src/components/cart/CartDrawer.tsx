import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export function CartDrawer() {
  const { open, setOpen, items, setQty, remove, subtotal, count } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70]"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-[#0f0f0f] border-l border-white/10 z-[80] flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div>
                <p className="text-[10px] tracking-widest text-[#D4AF37]">✦ VOTRE PANIER</p>
                <h3 className="font-serif text-xl text-white mt-1">{count} article{count !== 1 ? "s" : ""}</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 && (
                <p className="text-gray-500 text-sm text-center pt-10">Votre panier est vide.</p>
              )}
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3 border-b border-white/5 pb-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded bg-[#171717]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.name}</p>
                    <p className="text-[#D4AF37] text-xs mt-1">{item.price} TND</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setQty(item.slug, item.qty - 1)}
                        className="w-6 h-6 border border-white/10 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded"
                      >
                        −
                      </button>
                      <span className="text-white text-sm w-6 text-center">{item.qty}</span>
                      <button
                        onClick={() => setQty(item.slug, item.qty + 1)}
                        className="w-6 h-6 border border-white/10 text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => remove(item.slug)}
                        className="ml-auto text-[10px] uppercase tracking-widest text-gray-500 hover:text-red-400"
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Sous-total</span>
                <span className="text-white font-medium">{subtotal.toFixed(2)} TND</span>
              </div>
              <p className="text-[10px] text-gray-500">Livraison calculée à l'étape suivante.</p>
              <Link
                to="/checkout"
                onClick={() => setOpen(false)}
                className={`block text-center bg-[#D4AF37] text-black px-6 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors ${items.length === 0 ? "opacity-40 pointer-events-none" : ""}`}
              >
                ✦ COMMANDER
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
