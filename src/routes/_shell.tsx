import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DropBanner } from "@/components/layout/DropBanner";
import { FloatingRight } from "@/components/layout/FloatingRight";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <CartProvider>
      <div className="bg-[#0f0f0f] text-gray-50 min-h-screen font-sans">
        <DropBanner />
        <Navbar />
        <FloatingRight />
        <CartDrawer />
        <main className="pt-[30px]">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
