import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import quality from "@/assets/quality.jpg";
import pHoodie from "@/assets/p-hoodie.jpg";
import pTshirt from "@/assets/p-tshirt.jpg";
import pJacket from "@/assets/p-jacket.jpg";
import pSneakers from "@/assets/p-sneakers.jpg";
import pCap from "@/assets/p-cap.jpg";
import pBag from "@/assets/p-bag.jpg";
import cNoir from "@/assets/c-noir.jpg";
import cSahara from "@/assets/c-sahara.jpg";
import cMedina from "@/assets/c-medina.jpg";
import cAtelier from "@/assets/c-atelier.jpg";
import a1 from "@/assets/a1.jpg";
import a2 from "@/assets/a2.jpg";
import a3 from "@/assets/a3.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = ["À LA UNE", "QUALITÉ", "COLLECTIONS", "BOUTIQUE", "AVIS"];

const collections = [
  { title: "Essentiels Noir", sub: "12 pièces · Automne 26", tag: "7-14 JOURS", img: cNoir },
  { title: "Sahara Warm", sub: "8 pièces · Édition limitée", tag: "NOUVEAU", img: cSahara },
  { title: "Medina Blue", sub: "10 pièces · Capsule d'été", tag: "7-14 JOURS", img: cMedina },
  { title: "Atelier Doré", sub: "6 pièces · Numérotées", tag: "EXCLUSIF", img: cAtelier },
];

const products = [
  { name: "Hoodie Signature", price: "89 TND", img: pHoodie },
  { name: "T-shirt Premium", price: "49 TND", img: pTshirt },
  { name: "Veste Urbaine", price: "149 TND", img: pJacket },
  { name: "Sneakers Édition", price: "129 TND", img: pSneakers },
  { name: "Casquette Iconique", price: "39 TND", img: pCap },
  { name: "Sac Tech", price: "79 TND", img: pBag },
];

const reviews = [
  { q: "La qualité dépasse largement le prix. Les coutures sont irréprochables et le tissu tombe parfaitement.", n: "Yassine B.", l: "Tunis" },
  { q: "Enfin une marque tunisienne qui rivalise avec l'international. Le hoodie est devenu mon uniforme.", n: "Amel K.", l: "Sousse" },
  { q: "Livraison rapide, packaging soigné, produit fidèle aux photos. FLOKY tient ses promesses.", n: "Mehdi R.", l: "Sfax" },
];

function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif text-xl">F</div>
        <div className="flex flex-col leading-tight">
          <span className="font-serif font-bold tracking-wide text-gray-50">FLOKY</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">TUNIS · STREETWEAR</span>
        </div>
      </div>
      <div className="hidden md:flex gap-8">
        {navLinks.map((l) => (
          <a key={l} href={`#${l}`} className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors">{l}</a>
        ))}
      </div>
      <button className="bg-[#D4AF37] text-black px-6 py-2 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors">✦ COMMENCER</button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-24 relative">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs text-[#D4AF37] mb-6 tracking-widest">✦ TENDANCE</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl md:text-7xl text-white mb-6 max-w-4xl leading-tight">
        L'Art de la Rue. <br /> L'Âme de la Tunisie.
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="font-sans text-gray-400 max-w-2xl text-base md:text-lg mb-10">
        Découvrez notre collection capsule de streetwear premium. Des pièces uniques qui fusionnent l'héritage tunisien avec l'avant-garde urbaine.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
        <button className="bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors">✦ EXPLORER LES COLLECTIONS</button>
        <button className="border border-white/40 text-gray-50 px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:border-white hover:bg-white/5 transition-colors">VOIR LA QUALITÉ</button>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 tracking-widest uppercase">DÉFILER ⌄</div>
    </section>
  );
}

function Quality() {
  const data = [
    { label: "TISSU", value: "Coton Biologique" },
    { label: "ORIGINE", value: "Tunisie" },
    { label: "FINITION", value: "Double Couture" },
    { label: "LIVRAISON", value: "7–14 Jours" },
  ];
  return (
    <section id="QUALITÉ" className="grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-8 py-20 gap-16 relative max-w-7xl mx-auto">
      <div className="aspect-[4/5] bg-[#171717] rounded-lg overflow-hidden relative group">
        <img src={quality} alt="Détail du tissu premium FLOKY" width={1024} height={1280} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="relative">
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
      <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <div className="flex flex-col -space-y-3">
          <img src={a1} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
          <img src={a2} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
          <img src={a3} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
        </div>
        <button className="w-10 h-10 rounded-full bg-[#171717] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Lire la vidéo">▶</button>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="COLLECTIONS" className="px-8 py-20 max-w-7xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ COLLECTIONS</p>
      <h2 className="font-serif text-4xl text-white mt-2">Parcourez Nos Galeries</h2>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-12 hide-scrollbar">
        {collections.map((c) => (
          <div key={c.title} className="w-[300px] shrink-0 snap-start flex flex-col gap-4">
            <div className="aspect-[3/4] bg-[#171717] rounded-md relative overflow-hidden group">
              <img src={c.img} alt={c.title} width={900} height={1200} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <span className="bg-[#0f0f0f] text-gray-300 text-[10px] px-3 py-1 rounded-full absolute top-4 right-4 tracking-wider">{c.tag}</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-white">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Boutique() {
  return (
    <section id="BOUTIQUE" className="px-8 py-20 max-w-7xl mx-auto">
      <p className="text-[#D4AF37] text-xs tracking-widest">✦ BOUTIQUE VIRTUELLE</p>
      <h2 className="font-serif text-4xl text-white mt-2">Sélection Curatée</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
        {products.map((p) => (
          <div key={p.name} className="group cursor-pointer">
            <div className="aspect-square bg-[#171717] mb-4 overflow-hidden">
              <img src={p.img} alt={p.name} width={800} height={800} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="font-serif text-lg text-white mb-1">{p.name}</h3>
            <p className="font-sans text-sm text-gray-400">À partir de {p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
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

function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif text-xl">F</div>
            <span className="font-serif font-bold tracking-wide text-gray-50">FLOKY</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">FLOKY est une marque de streetwear premium née à Tunis, dédiée à ceux qui portent leur héritage avec fierté.</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">LIENS</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#D4AF37]">À la une</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Collections</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Boutique</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Qualité</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">INFORMATIONS</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#D4AF37]">Livraison</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Retours</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">CGV</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Confidentialité</a></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">RÉSEAUX</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-[#D4AF37]">Instagram</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">TikTok</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">YouTube</a></li>
            <li><a href="#" className="hover:text-[#D4AF37]">Pinterest</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-xs">
        © 2026 FLOKY — Tunisie. Tous droits réservés.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="bg-[#0f0f0f] text-gray-50 min-h-screen font-sans">
      <Navbar />
      <main>
        <Hero />
        <Quality />
        <Collections />
        <Boutique />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
