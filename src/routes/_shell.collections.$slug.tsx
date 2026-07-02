import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCollectionBySlug } from "@/data/collections";
import { getProductsByCollectionSlug } from "@/data/products";
import { Boutique } from "@/components/sections/Boutique";

export const Route = createFileRoute("/_shell/collections/$slug")({
  component: CollectionDetailPage,
});

function CollectionDetailPage() {
  const { slug } = Route.useParams();
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    throw notFound();
  }

  const collectionProducts = getProductsByCollectionSlug(slug);

  return (
    <>
      <section className="px-8 py-20 max-w-7xl mx-auto">
        <Link to="/collections" className="text-xs uppercase tracking-wider text-gray-400 hover:text-[#D4AF37] transition-colors">
          ← Collections
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-8">
          <div className="aspect-[3/4] bg-[#171717] rounded-lg overflow-hidden">
            <img src={collection.img} alt={collection.title} width={900} height={1200} loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-[#D4AF37] text-xs tracking-widest">✦ COLLECTION</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white mt-2 mb-4">{collection.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{collection.sub}</p>
            <span className="inline-block bg-[#0f0f0f] text-gray-300 text-[10px] px-3 py-1 rounded-full tracking-wider border border-white/10">{collection.tag}</span>
          </div>
        </div>
      </section>
      <Boutique mode="full" items={collectionProducts} />
    </>
  );
}
