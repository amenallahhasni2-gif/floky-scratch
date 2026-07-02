import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-32 relative">
      <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-xs text-[#D4AF37] mb-6 tracking-widest">✦ TENDANCE</motion.p>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-serif text-5xl md:text-7xl text-white mb-6 max-w-4xl leading-tight">
        L'Art de la Rue. <br /> L'Âme de la Tunisie.
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="font-sans text-gray-400 max-w-2xl text-base md:text-lg mb-10">
        Découvrez notre collection capsule de streetwear premium. Des pièces uniques qui fusionnent l'héritage tunisien avec l'avant-garde urbaine.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
        <Link to="/collections" className="bg-[#D4AF37] text-black px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors">✦ EXPLORER LES COLLECTIONS</Link>
        <Link to="/" hash="QUALITÉ" className="border border-white/40 text-gray-50 px-8 py-3 rounded-full text-xs font-bold tracking-wide hover:border-white hover:bg-white/5 transition-colors">VOIR LA QUALITÉ</Link>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 tracking-widest uppercase">DÉFILER ⌄</div>
    </section>
  );
}
