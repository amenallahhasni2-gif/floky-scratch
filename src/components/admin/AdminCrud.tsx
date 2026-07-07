import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type FieldType = "text" | "textarea" | "number" | "boolean" | "select" | "url" | "datetime";

export type Field = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  step?: string;
};

type Row = Record<string, unknown> & { id: string };

type Props = {
  title: string;
  table: string;
  fields: Field[];
  columns: { key: string; label: string; render?: (v: unknown, row: Row) => React.ReactNode }[];
  orderBy?: { column: string; ascending?: boolean };
  defaultValues?: Record<string, unknown>;
  select?: string;
};

export function AdminCrud({
  title,
  table,
  fields,
  columns,
  orderBy,
  defaultValues,
  select = "*",
}: Props) {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", table, orderBy?.column],
    queryFn: async () => {
      let q = supabase.from(table as never).select(select);
      if (orderBy) q = q.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function openNew() {
    setEditing("new");
    setForm({ ...(defaultValues ?? {}) });
    setErrMsg(null);
  }
  function openEdit(row: Row) {
    setEditing(row);
    setForm({ ...row });
    setErrMsg(null);
  }
  function close() {
    setEditing(null);
    setForm({});
    setErrMsg(null);
  }

  async function save() {
    setSaving(true);
    setErrMsg(null);
    try {
      const payload: Record<string, unknown> = {};
      for (const f of fields) {
        let v = form[f.key];
        if (v === "" || v === undefined) v = null;
        if (f.type === "number" && v !== null) v = Number(v);
        payload[f.key] = v;
      }
      if (editing === "new") {
        const { error } = await supabase.from(table as never).insert(payload as never);
        if (error) throw error;
      } else if (editing) {
        const { error } = await supabase
          .from(table as never)
          .update(payload as never)
          .eq("id", editing.id);
        if (error) throw error;
      }
      await qc.invalidateQueries({ queryKey: ["admin", table] });
      close();
    } catch (e) {
      setErrMsg(e instanceof Error ? e.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    if (!confirm(`Supprimer ${String(row.name ?? row.title ?? row.id)} ?`)) return;
    const { error } = await supabase.from(table as never).delete().eq("id", row.id);
    if (error) alert(error.message);
    else qc.invalidateQueries({ queryKey: ["admin", table] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif tracking-wide">{title}</h1>
          <p className="text-xs text-gray-500 mt-1">
            {data?.length ?? 0} enregistrement{(data?.length ?? 0) > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-[#D4AF37] text-black px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#c49f30]"
        >
          + Nouveau
        </button>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{(error as Error).message}</p>}

      <div className="border border-white/10 rounded-lg overflow-hidden bg-[#171717]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0a0a0a] text-[10px] uppercase tracking-widest text-gray-500">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="text-left px-4 py-3 font-medium">
                    {c.label}
                  </th>
                ))}
                <th className="w-32" />
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                    Chargement...
                  </td>
                </tr>
              )}
              {!isLoading && (data?.length ?? 0) === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                    Aucun enregistrement.
                  </td>
                </tr>
              )}
              {data?.map((row) => (
                <tr key={row.id} className="border-t border-white/5 hover:bg-white/5">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-gray-200">
                      {c.render ? c.render(row[c.key], row) : formatCell(row[c.key])}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openEdit(row)}
                      className="text-xs text-gray-400 hover:text-[#D4AF37] mr-3"
                    >
                      Éditer
                    </button>
                    <button
                      onClick={() => remove(row)}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      Suppr
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="bg-[#171717] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="font-serif text-lg">
                {editing === "new" ? "Nouveau" : "Éditer"} — {title}
              </h2>
              <button onClick={close} className="text-gray-500 hover:text-white text-2xl leading-none">
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">
                    {f.label} {f.required && <span className="text-red-400">*</span>}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={(form[f.key] as string) ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      rows={3}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded px-3 py-2 text-sm focus:border-[#D4AF37] outline-none"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={(form[f.key] as string) ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded px-3 py-2 text-sm focus:border-[#D4AF37] outline-none"
                    >
                      <option value="">—</option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "boolean" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(form[f.key])}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.checked })}
                        className="w-4 h-4 accent-[#D4AF37]"
                      />
                      <span className="text-sm text-gray-300">Activé</span>
                    </label>
                  ) : (
                    <input
                      type={
                        f.type === "number"
                          ? "number"
                          : f.type === "datetime"
                            ? "datetime-local"
                            : f.type === "url"
                              ? "url"
                              : "text"
                      }
                      step={f.step}
                      placeholder={f.placeholder}
                      value={
                        f.type === "datetime" && form[f.key]
                          ? String(form[f.key]).slice(0, 16)
                          : (form[f.key] as string | number) ?? ""
                      }
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full bg-[#0f0f0f] border border-white/10 rounded px-3 py-2 text-sm focus:border-[#D4AF37] outline-none"
                    />
                  )}
                </div>
              ))}
              {errMsg && <p className="text-xs text-red-400">{errMsg}</p>}
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-2">
              <button
                onClick={close}
                className="px-4 py-2 text-xs uppercase tracking-widest text-gray-400 hover:text-white"
              >
                Annuler
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="bg-[#D4AF37] text-black px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded hover:bg-[#c49f30] disabled:opacity-50"
              >
                {saving ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCell(v: unknown): React.ReactNode {
  if (v === null || v === undefined) return <span className="text-gray-600">—</span>;
  if (typeof v === "boolean")
    return v ? <span className="text-green-400">✓</span> : <span className="text-gray-600">·</span>;
  if (typeof v === "string" && v.length > 60) return v.slice(0, 60) + "…";
  if (Array.isArray(v)) return `${v.length} item(s)`;
  return String(v);
}

export function useLookup(table: string, select = "id, name, title, slug") {
  return useQuery({
    queryKey: ["lookup", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table as never).select(select);
      if (error) throw error;
      return (data ?? []) as Array<Record<string, unknown> & { id: string }>;
    },
  });
}
