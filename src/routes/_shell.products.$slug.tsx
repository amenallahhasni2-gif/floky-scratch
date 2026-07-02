import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProductBySlug } from "@/data/products";
import { getCollectionBySlug } from "@/data/collections";

export const Route = createFileRoute("/_shell/products/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    throw notFound();
  }

  const collection = getCollectionBySlug(product.collectionSlug);

  return (
    <section className="px-8 py-20 max-w-7xl mx-auto">
      <Link to="/boutique" className="text-xs uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors">
        ← Boutique
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mt-8">
        <div className="aspect-square bg-[#171717] rounded-lg overflow-hidden relative">
          <img src={product.img} alt={product.name} width={800} height={800} loading="lazy" className={`w-full h-full object-cover ${product.soldOut ? "opacity-50" : ""}`} />
          {product.soldOut && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-black/80 text-[#D4AF37] border border-[#D4AF37] px-6 py-2 text-xs font-bold tracking-[0.3em]">ÉPUISÉ</span>
            </div>
          )}
        </div>
        <div>
          {collection && (
            <Link
              to="/collections/$slug"
              params={{ slug: collection.slug }}
              className="text-[#D4AF37] text-xs tracking-widest hover:underline"
            >
              ✦ {collection.title}
            </Link>
          )}
          <h1 className="font-serif text-4xl md:text-5xl text-white mt-4 mb-4">{product.name}</h1>
          <p className={`font-sans text-xl mb-8 ${product.soldOut ? "text-gray-500 line-through" : "text-[#D4AF37]"}`}>
            À partir de {product.price}
          </p>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
            Pièce premium confectionnée dans nos ateliers tunisiens. Matières nobles, coupe soignée et finitions irréprochables — l'essence du streetwear FLOKY.
          </p>
          <button
            disabled={product.soldOut}
            className="bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#D4AF37]"
          >
            {product.soldOut ? "ÉPUISÉ" : "✦ AJOUTER AU PANIER"}
          </button>
        </div>
      </div>
    </section>
  );
}
