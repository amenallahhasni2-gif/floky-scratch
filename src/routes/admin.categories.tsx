import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud, useLookup } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/admin/categories")({
  component: CategoriesAdmin,
});

function CategoriesAdmin() {
  const collections = useLookup("collections", "id, title, slug");
  const options = (collections.data ?? []).map((c) => ({
    value: c.id,
    label: String(c.title ?? c.slug),
  }));

  return (
    <AdminCrud
      title="Catégories"
      table="categories"
      orderBy={{ column: "sort_order" }}
      defaultValues={{ sort_order: 0, display_order: 0 }}
      fields={[
        { key: "name", label: "Nom", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "title", label: "Titre affiché", type: "text" },
        { key: "collection_id", label: "Collection parent", type: "select", options },
        { key: "sort_order", label: "Ordre", type: "number" },
        { key: "display_order", label: "Ordre d'affichage", type: "number" },
      ]}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
        { key: "sort_order", label: "Ordre" },
      ]}
    />
  );
}
