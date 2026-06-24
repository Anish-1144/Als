"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminCardGroup } from "@/app/components/admin/home/AdminCardGroup";
import { AdminLoading } from "@/app/components/admin/AdminTable";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "image";
  rows?: number;
  placeholder?: string;
  required?: boolean;
  imageFolder?: string;
  imageHint?: string;
  aspectClass?: string;
  objectFit?: "cover" | "contain";
};

type AboutCrudTabProps<T extends Record<string, unknown>> = {
  apiPath: string;
  itemLabel: string;
  fields: FieldDef[];
  empty: T;
  getListTitle: (item: T) => string;
  getListSubtitle?: (item: T) => string;
  getListImage?: (item: T) => string | undefined;
  getListImageBorder?: (item: T) => boolean;
  previewImageBorder?: boolean;
  defaultImageFolder?: string;
};

export default function AboutCrudTab<T extends Record<string, unknown> & { _id?: string }>({
  apiPath,
  itemLabel,
  fields,
  empty,
  getListTitle,
  getListSubtitle,
  getListImage,
  getListImageBorder,
  previewImageBorder = false,
  defaultImageFolder = "als/uploads",
}: AboutCrudTabProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<T | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await clientApi<T[]>(apiPath);
    if (res.success && res.data) {
      setItems(
        [...res.data].sort(
          (a, b) => Number(a.order ?? 0) - Number(b.order ?? 0),
        ),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [apiPath]);

  async function save() {
    if (!editing) return;

    for (const field of fields) {
      if (!field.required) continue;
      const value = editing[field.key];
      if (field.type === "checkbox") continue;
      if (value === undefined || value === null || String(value).trim() === "") {
        setStatus(`${field.label} is required`);
        return;
      }
    }

    setSaving(true);
    setStatus("Saving...");
    const id = editing._id;
    const { _id, ...body } = editing;
    const payload = Object.fromEntries(
      Object.entries(body).filter(
        ([key]) => !["__v", "createdAt", "updatedAt", "id"].includes(key),
      ),
    );
    const res = id
      ? await clientApi(`${apiPath}/${id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        })
      : await clientApi(apiPath, {
          method: "POST",
          body: JSON.stringify(payload),
        });
    setSaving(false);
    if (res.success) {
      setStatus("Saved!");
      setEditing(null);
      await load();
    } else {
      setStatus(res.error?.message ?? "Failed to save. Check required fields.");
    }
  }

  async function remove(id: string) {
    if (!confirm(`Delete this ${itemLabel.toLowerCase()}?`)) return;
    await clientApi(`${apiPath}/${id}`, { method: "DELETE" });
    await load();
  }

  function patchField(key: string, value: unknown) {
    setEditing((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="text-sm text-[#00a69c] hover:underline"
        >
          ← Back to list
        </button>

        <AdminCardGroup
          index={0}
          title={editing._id ? `Edit ${itemLabel.toLowerCase()}` : `New ${itemLabel.toLowerCase()}`}
        >
          {fields.map((field) => (
            <AdminField key={field.key} label={field.label}>
              {field.type === "textarea" ? (
                <textarea
                  className={inputClass()}
                  rows={field.rows ?? 4}
                  value={String(editing[field.key] ?? "")}
                  onChange={(e) => patchField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              ) : field.type === "number" ? (
                <input
                  type="number"
                  className={inputClass()}
                  value={Number(editing[field.key] ?? 0)}
                  onChange={(e) => patchField(field.key, Number(e.target.value))}
                />
              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editing[field.key])}
                    onChange={(e) => patchField(field.key, e.target.checked)}
                  />
                  {field.label}
                </label>
              ) : field.type === "image" ? (
                <div
                  className={
                    field.key === "logo" && previewImageBorder
                      ? "rounded-xl ring-2 ring-[#00a69c]"
                      : undefined
                  }
                >
                  <CloudinaryImageField
                    value={String(editing[field.key] ?? "")}
                    onChange={(url) => patchField(field.key, url)}
                    folder={field.imageFolder ?? defaultImageFolder}
                    hint={field.imageHint}
                    aspectClass={field.aspectClass ?? "aspect-square max-h-40"}
                    objectFit={field.objectFit ?? "contain"}
                    compact
                  />
                </div>
              ) : (
                <input
                  className={inputClass()}
                  value={String(editing[field.key] ?? "")}
                  onChange={(e) => patchField(field.key, e.target.value)}
                  placeholder={field.placeholder}
                />
              )}
            </AdminField>
          ))}
        </AdminCardGroup>

        <div className="flex items-center gap-3">
          <SaveButton onClick={save} loading={saving} />
          {status && <span className="text-sm text-slate-600">{status}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {items.length} {itemLabel.toLowerCase()}
          {items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() =>
            setEditing({
              ...empty,
              order: items.length + 1,
            } as T)
          }
          className="rounded-lg bg-[#00a69c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d8a99]"
        >
          Add {itemLabel.toLowerCase()}
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              {getListImage?.(item) && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={getListImage(item)}
                  alt=""
                  className={`h-10 w-10 shrink-0 rounded-lg border border-slate-200 bg-[#1d293d] object-contain p-1 ${
                    getListImageBorder?.(item) ? "ring-2 ring-[#00a69c]" : ""
                  }`}
                />
              )}
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">{getListTitle(item)}</p>
                {getListSubtitle && (
                  <p className="truncate text-sm text-slate-500">{getListSubtitle(item)}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setEditing({ ...item })}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:border-[#00a69c]"
              >
                Edit
              </button>
              {item._id && (
                <button
                  type="button"
                  onClick={() => remove(item._id!)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
