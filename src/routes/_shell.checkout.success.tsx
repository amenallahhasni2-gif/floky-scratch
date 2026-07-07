import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_shell/checkout/success")({
  validateSearch: z.object({ id: z.string().optional() }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id } = Route.useSearch();
  return (
    <section className="px-8 py-32 max-w-2xl mx-auto text-center">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ CONFIRMATION</p>
      <h1 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-4">Commande confirmée</h1>
      <p className="text-gray-400 mb-2">Merci — nous vous contacterons pour organiser la livraison.</p>
      {id && <p className="text-gray-500 text-xs mb-8">Réf : {id.slice(0, 8).toUpperCase()}</p>}
      <Link
        to="/"
        className="inline-block bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors"
      >
        ✦ RETOUR ACCUEIL
      </Link>
    </section>
  );
}
