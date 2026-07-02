import { Link } from "@tanstack/react-router";

export function Footer() {
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
            <li><Link to="/" className="hover:text-[#D4AF37]">À la une</Link></li>
            <li><Link to="/collections" className="hover:text-[#D4AF37]">Collections</Link></li>
            <li><Link to="/boutique" className="hover:text-[#D4AF37]">Boutique</Link></li>
            <li><Link to="/" hash="QUALITÉ" className="hover:text-[#D4AF37]">Qualité</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">INFORMATIONS</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Livraison</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Retours</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">CGV</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Confidentialité</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-4">RÉSEAUX</div>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Instagram</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">TikTok</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">YouTube</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Pinterest</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-gray-500 text-xs">
        © 2026 FLOKY — Tunisie. Tous droits réservés.
      </div>
    </footer>
  );
}
