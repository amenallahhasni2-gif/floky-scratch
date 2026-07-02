import quality from "@/assets/quality.jpg";

export function Quality() {
  const data = [
    { label: "TISSU", value: "Coton Biologique" },
    { label: "ORIGINE", value: "Tunisie" },
    { label: "FINITION", value: "Double Couture" },
    { label: "LIVRAISON", value: "7–14 Jours" },
  ];
  return (
    <section id="QUALITÉ" className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-8 py-20 gap-16 max-w-7xl mx-auto">
      <div className="aspect-[4/5] bg-[#171717] rounded-lg overflow-hidden group">
        <img src={quality} alt="Détail du tissu premium FLOKY" width={1024} height={1280} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
      <div>
        <p className="text-xs text-[#D4AF37] mb-4 tracking-widest">✦ QUALITÉ</p>
        <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
          Examinez Chaque Détail. <span className="text-[#D4AF37]">De près.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-lg leading-relaxed">
          Chaque pièce est confectionnée dans nos ateliers tunisiens à partir de matières nobles et durables. Nous refusons le compromis sur la matière, la coupe et la finition.
        </p>
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 max-w-lg">
          {data.map((d) => (
            <div key={d.label}>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{d.label}</div>
              <div className="font-serif text-xl text-[#D4AF37]">{d.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
