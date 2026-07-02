import { useEffect, useState } from "react";

export function Countdown() {
  const [t, setT] = useState({ h: 48, m: 12, s: 0 });
  useEffect(() => {
    const i = setInterval(() => {
      setT((p) => {
        let s = p.s - 1, m = p.m, h = p.h;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 48; m = 12; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="flex items-center gap-3 text-gray-400 font-mono text-xs tracking-widest">
      <span className="uppercase">Prochain drop dans :</span>
      <span className="text-[#D4AF37] text-base">{pad(t.h)}:{pad(t.m)}:{pad(t.s)}</span>
    </div>
  );
}
