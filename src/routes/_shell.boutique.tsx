import { createFileRoute } from "@tanstack/react-router";
import { Boutique } from "@/components/sections/Boutique";

export const Route = createFileRoute("/_shell/boutique")({
  component: BoutiquePage,
});

function BoutiquePage() {
  return <Boutique mode="full" />;
}
