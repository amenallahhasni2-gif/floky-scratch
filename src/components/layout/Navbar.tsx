import { Link } from "@tanstack/react-router";

const navLinks = [
  { label: "À LA UNE", to: "/" as const },
  { label: "QUALITÉ", to: "/" as const, hash: "QUALITÉ" },
  { label: "COLLECTIONS", to: "/collections" as const },
  { label: "BOUTIQUE", to: "/boutique" as const },
];

export function Navbar() {
  return (
    <nav className="fixed top-[30px] w-full flex items-center justify-between px-8 py-4 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/10">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] font-serif text-xl">F</div>
        <div className="flex flex-col leading-tight">
          <span className="font-serif font-bold tracking-wide text-gray-50">FLOKY</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">TUNIS · STREETWEAR</span>
        </div>
      </Link>
      <div className="hidden md:flex gap-8">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            hash={l.hash}
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        to="/boutique"
        className="bg-[#D4AF37] text-black px-6 py-2 rounded-full text-xs font-bold tracking-wide hover:bg-white transition-colors"
      >
        ✦ COMMENCER
      </Link>
    </nav>
  );
}
