import { reviews } from "@/data/reviews";

export function Reviews() {
  return (
    <section id="AVIS" className="px-8 py-20 max-w-7xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ AVIS</p>
      <h2 className="font-serif text-4xl text-white mt-2 mb-12">Ils Portent FLOKY</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.n} className="bg-[#171717] p-8 rounded-lg border border-white/5">
            <div className="text-[#D4AF37] mb-4 tracking-widest">★★★★★</div>
            <p className="italic text-gray-300 leading-relaxed mb-6">"{r.q}"</p>
            <div className="text-sm text-gray-50 font-medium">{r.n}</div>
            <div className="text-xs text-gray-500">{r.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
