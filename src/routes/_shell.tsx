import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DropBanner } from "@/components/layout/DropBanner";
import { FloatingLeft } from "@/components/layout/FloatingLeft";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <div className="bg-[#0f0f0f] text-gray-50 min-h-screen font-sans">
      <DropBanner />
      <Navbar />
      <FloatingLeft />
      <main className="pt-[30px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
