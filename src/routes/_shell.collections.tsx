import { createFileRoute } from "@tanstack/react-router";
import { Collections } from "@/components/sections/Collections";

export const Route = createFileRoute("/_shell/collections")({
  component: CollectionsPage,
});

function CollectionsPage() {
  return <Collections mode="full" />;
}
