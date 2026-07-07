import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/admin/drops")({
  component: DropsAdmin,
});

function DropsAdmin() {
  return (
    <AdminCrud
      title="Drops"
      table="drops"
      orderBy={{ column: "sort_order" }}
      defaultValues={{ status: "upcoming", sort_order: 0, is_live: false, is_archived: false }}
      fields={[
        { key: "name", label: "Nom", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true, placeholder: "drop-001" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "cover_image", label: "Image de couverture (URL)", type: "url" },
        {
          key: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "upcoming", label: "À venir" },
            { value: "live", label: "En direct" },
            { value: "paused", label: "En pause" },
            { value: "ended", label: "Terminé" },
          ],
        },
        { key: "starts_at", label: "Début", type: "datetime" },
        { key: "ends_at", label: "Fin", type: "datetime" },
        { key: "sort_order", label: "Ordre", type: "number" },
      ]}
      columns={[
        { key: "name", label: "Nom" },
        { key: "slug", label: "Slug" },
        { key: "status", label: "Statut" },
        { key: "sort_order", label: "Ordre" },
      ]}
    />
  );
}
