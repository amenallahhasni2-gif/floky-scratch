import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud, useLookup } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdmin,
});

function ProductsAdmin() {
  const cats = useLookup("categories", "id, name, slug");
  const drops = useLookup("drops", "id, name, slug");
  const catOpts = (cats.data ?? []).map((c) => ({ value: c.id, label: String(c.name ?? c.slug) }));
  const dropOpts = (drops.data ?? []).map((d) => ({ value: d.id, label: String(d.name ?? d.slug) }));

  return (
    <AdminCrud
      title="Produits"
      table="products"
      orderBy={{ column: "display_order" }}
      defaultValues={{
        is_active: true,
        is_featured: false,
        sold_out: false,
        display_order: 0,
        price: 0,
      }}
      fields={[
        { key: "name", label: "Nom", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "price", label: "Prix (DZD)", type: "number", step: "0.01", required: true },
        { key: "compare_price", label: "Prix barré", type: "number", step: "0.01" },
        { key: "category_id", label: "Catégorie", type: "select", options: catOpts },
        { key: "drop_id", label: "Drop", type: "select", options: dropOpts },
        { key: "is_active", label: "Actif", type: "boolean" },
        { key: "is_featured", label: "Mis en avant", type: "boolean" },
        { key: "sold_out", label: "Épuisé", type: "boolean" },
        { key: "display_order", label: "Ordre", type: "number" },
        { key: "meta_title", label: "SEO title", type: "text" },
        { key: "meta_description", label: "SEO description", type: "textarea" },
      ]}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
        { key: "price", label: "Prix" },
        { key: "is_active", label: "Actif" },
        { key: "sold_out", label: "Épuisé" },
      ]}
    />
  );
}
