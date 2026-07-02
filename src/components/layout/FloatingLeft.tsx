import a1 from "@/assets/a1.jpg";
import a2 from "@/assets/a2.jpg";
import a3 from "@/assets/a3.jpg";

export function FloatingLeft() {
  return (
    <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4">
      <div className="flex flex-col -space-y-3">
        <img src={a1} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
        <img src={a2} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
        <img src={a3} alt="" width={40} height={40} loading="lazy" className="w-10 h-10 border-2 border-[#0f0f0f] rounded-full object-cover" />
      </div>
      <button className="w-10 h-10 rounded-full bg-[#171717] border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Lire la vidéo">▶</button>
    </div>
  );
}
