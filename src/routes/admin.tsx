import { createFileRoute, Outlet, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

type Status = "loading" | "unauth" | "forbidden" | "ok";

function AdminLayout() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("loading");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data: userData } = await supabase.auth.getUser();
      if (!mounted) return;
      if (!userData.user) {
        setStatus("unauth");
        navigate({ to: "/auth" });
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", userData.user.id)
        .maybeSingle();
      if (!mounted) return;
      setStatus(profile?.is_admin ? "ok" : "forbidden");
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((e) => {
      if (e === "SIGNED_OUT") navigate({ to: "/auth" });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  if (status === "loading" || status === "unauth") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-gray-400 text-sm">
        Chargement...
      </div>
    );
  }

  if (status === "forbidden") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f0f] text-center px-4 gap-4">
        <h1 className="text-2xl font-serif text-[#D4AF37]">Accès refusé</h1>
        <p className="text-sm text-gray-400">Ce compte n'a pas les droits admin.</p>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
          className="text-xs uppercase tracking-widest text-gray-500 hover:text-[#D4AF37]"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Vue" },
    { to: "/admin/drops", label: "Drops" },
    { to: "/admin/collections", label: "Collections" },
    { to: "/admin/categories", label: "Catégories" },
    { to: "/admin/products", label: "Produits" },
    { to: "/admin/orders", label: "Commandes" },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      <header className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-serif text-lg tracking-widest text-[#D4AF37]">
              FLOKY <span className="text-gray-500 text-xs">/ ADMIN</span>
            </Link>
            <nav className="hidden md:flex gap-1">
              {tabs.map((t) => {
                const active =
                  t.to === "/admin" ? pathname === "/admin" : pathname.startsWith(t.to);
                return (
                  <Link
                    key={t.to}
                    to={t.to}
                    className={`px-3 py-1.5 text-xs tracking-widest uppercase rounded transition-colors ${
                      active
                        ? "bg-[#D4AF37] text-black"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {t.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              navigate({ to: "/auth" });
            }}
            className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-[#D4AF37]"
          >
            Déconnexion
          </button>
        </div>
        <nav className="md:hidden overflow-x-auto flex gap-1 px-4 pb-2">
          {tabs.map((t) => {
            const active = t.to === "/admin" ? pathname === "/admin" : pathname.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded whitespace-nowrap ${
                  active ? "bg-[#D4AF37] text-black" : "text-gray-400 bg-white/5"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
