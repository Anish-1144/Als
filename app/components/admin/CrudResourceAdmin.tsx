"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { AdminField, SaveButton, inputClass } from "./AdminForm";
import {
  AdminAddButton,
  AdminBackLink,
  AdminLoading,
  AdminPageTitle,
  AdminStatus,
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "./AdminTable";

export type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select" | "image";
  options?: { value: string; label: string }[];
  rows?: number;
  imageFolder?: string;
  imageHint?: string;
  aspectClass?: string;
  objectFit?: "cover" | "contain";
};

export default function CrudResourceAdmin({
  title,
  apiPath,
  fields,
  newDefaults,
}: {
  title: string;
  apiPath: string;
  fields: FieldConfig[];
  newDefaults: Record<string, unknown>;
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await clientApi<Record<string, unknown>[]>(apiPath);
    if (res.success && res.data) setItems(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [apiPath]);

  async function save() {
    if (!editing) return;
    setStatus("Saving...");
    const id = editing._id as string | undefined;
    const { _id, ...body } = editing;
    const res = id
      ? await clientApi(`${apiPath}/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        })
      : await clientApi(apiPath, {
          method: "POST",
          body: JSON.stringify(body),
        });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this item?")) return;
    await clientApi(`${apiPath}/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div>
        <AdminBackLink onClick={() => setEditing(null)} />
        <h1 className="text-2xl font-besley font-semibold text-[#1d293d] mb-6">
          {editing._id ? "Edit" : "New"} {title}
        </h1>
        {fields.map((f) => (
          <AdminField key={f.key} label={f.label}>
            {f.type === "textarea" ? (
              <textarea
                className={inputClass()}
                rows={f.rows ?? 4}
                value={String(editing[f.key] ?? "")}
                onChange={(e) =>
                  setEditing({ ...editing, [f.key]: e.target.value })
                }
              />
            ) : f.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={Boolean(editing[f.key])}
                onChange={(e) =>
                  setEditing({ ...editing, [f.key]: e.target.checked })
                }
              />
            ) : f.type === "number" ? (
              <input
                type="number"
                className={inputClass()}
                value={Number(editing[f.key] ?? 0)}
                onChange={(e) =>
                  setEditing({ ...editing, [f.key]: Number(e.target.value) })
                }
              />
            ) : f.type === "select" && f.options ? (
              <select
                className={inputClass()}
                value={String(editing[f.key] ?? "")}
                onChange={(e) =>
                  setEditing({ ...editing, [f.key]: e.target.value })
                }
              >
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : f.type === "image" ? (
              <CloudinaryImageField
                value={String(editing[f.key] ?? "")}
                onChange={(url) => setEditing({ ...editing, [f.key]: url })}
                folder={f.imageFolder ?? "als/team"}
                hint={f.imageHint ?? "Upload a team member photo (JPG, PNG, or WebP)."}
                aspectClass={f.aspectClass ?? "aspect-square max-h-48"}
                objectFit={f.objectFit ?? "cover"}
                compact
              />
            ) : (
              <input
                type="text"
                className={inputClass()}
                value={String(editing[f.key] ?? "")}
                onChange={(e) =>
                  setEditing({ ...editing, [f.key]: e.target.value })
                }
              />
            )}
          </AdminField>
        ))}
        <div className="flex gap-4 items-center mt-6">
          <SaveButton onClick={save} />
          {status && <AdminStatus>{status}</AdminStatus>}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4">
        <AdminPageTitle>{title}</AdminPageTitle>
        <AdminAddButton onClick={() => setEditing({ ...newDefaults })} />
      </div>
      <AdminTable>
        <AdminTableHead>
          <tr>
            <AdminTh>Name</AdminTh>
            <AdminTh>Actions</AdminTh>
          </tr>
        </AdminTableHead>
        <tbody>
          {items.length === 0 ? (
            <AdminTr>
              <AdminTd muted>
                <span className="col-span-2 block py-4 text-center text-gray-500">
                  No items yet. Click &quot;Add new&quot; to create one.
                </span>
              </AdminTd>
              <AdminTd muted>—</AdminTd>
            </AdminTr>
          ) : (
            items.map((item) => (
              <AdminTr key={String(item._id)}>
                <AdminTd>
                  {String(
                    item[fields[0]?.key] ??
                      item.title ??
                      item.name ??
                      item.clientName ??
                      item._id,
                  )}
                </AdminTd>
                <AdminTd>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="font-medium text-[#00a69c] hover:underline"
                      onClick={() => setEditing(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="font-medium text-red-600 hover:underline"
                      onClick={() => remove(String(item._id))}
                    >
                      Delete
                    </button>
                  </div>
                </AdminTd>
              </AdminTr>
            ))
          )}
        </tbody>
      </AdminTable>
    </div>
  );
}
