import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "À LA UNE", to: "/" as const },
  { label: "COLLECTIONS", to: "/collections" as const },
  { label: "BOUTIQUE", to: "/boutique" as const },
];

export function Navbar() {
  const { count, setOpen } = useCart();

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
            className="text-xs uppercase tracking-wider text-gray-300 hover:text-[#D4AF37] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="relative bg-[#171717] border border-white/10 text-gray-200 hover:text-[#D4AF37] hover:border-[#D4AF37]/40 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-colors"
          aria-label="Ouvrir le panier"
        >
          PANIER
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
