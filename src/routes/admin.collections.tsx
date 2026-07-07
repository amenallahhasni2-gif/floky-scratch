import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud, useLookup } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/admin/collections")({
  component: CollectionsAdmin,
});

function CollectionsAdmin() {
  const drops = useLookup("drops", "id, name, slug");
  const dropOptions = (drops.data ?? []).map((d) => ({
    value: d.id,
    label: String(d.name ?? d.slug),
  }));

  return (
    <AdminCrud
      title="Collections"
      table="collections"
      orderBy={{ column: "sort_order" }}
      defaultValues={{ sort_order: 0 }}
      fields={[
        { key: "title", label: "Titre", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "subtitle", label: "Sous-titre", type: "text" },
        { key: "image_url", label: "Image (URL)", type: "url" },
        { key: "drop_id", label: "Drop parent", type: "select", options: dropOptions },
        { key: "sort_order", label: "Ordre", type: "number" },
      ]}
      columns={[
        { key: "title", label: "Titre" },
        { key: "slug", label: "Slug" },
        { key: "subtitle", label: "Sous-titre" },
        { key: "sort_order", label: "Ordre" },
      ]}
    />
  );
}
