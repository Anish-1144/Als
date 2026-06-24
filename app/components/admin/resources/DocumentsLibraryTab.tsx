"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import CloudinaryDocumentField from "@/app/components/admin/CloudinaryDocumentField";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminCardGroup } from "@/app/components/admin/home/AdminCardGroup";
import { AdminLoading } from "@/app/components/admin/AdminTable";

export const DOCUMENT_CATEGORIES = [
  { value: "home-loans", label: "Home Loans" },
  { value: "refinancing", label: "Refinancing" },
  { value: "commercial-loans", label: "Commercial Loans" },
  { value: "car-financing", label: "Car Financing" },
  { value: "smsf-financing", label: "SMSF Financing" },
  { value: "application-forms", label: "Application Forms" },
  { value: "guides-resources", label: "Guides & Resources" },
  { value: "general", label: "General" },
] as const;

type DocumentItem = {
  _id?: string;
  title: string;
  description?: string;
  link: string;
  category: string;
  order: number;
  isActive: boolean;
};

const EMPTY: DocumentItem = {
  title: "",
  description: "",
  link: "",
  category: "general",
  order: 0,
  isActive: true,
};

function categoryLabel(value: string) {
  return DOCUMENT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export default function DocumentsLibraryTab() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [editing, setEditing] = useState<DocumentItem | null>(null);
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await clientApi<DocumentItem[]>("/admin/documents");
    if (res.success && res.data) {
      setItems(
        [...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    if (!editing.link?.trim()) {
      setStatus("Please upload a document file.");
      return;
    }

    setSaving(true);
    setStatus("Saving...");
    const id = editing._id;
    const { _id, ...body } = editing;
    const res = id
      ? await clientApi(`/admin/documents/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        })
      : await clientApi("/admin/documents", {
          method: "POST",
          body: JSON.stringify(body),
        });
    setSaving(false);
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      setFileName("");
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this document?")) return;
    await clientApi(`/admin/documents/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setFileName("");
            setStatus("");
          }}
          className="text-sm text-[#00a69c] hover:underline"
        >
          ← Back to list
        </button>

        <AdminCardGroup
          index={0}
          title={editing._id ? "Edit document" : "New document"}
        >
          <AdminField label="Title">
            <input
              className={inputClass()}
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              placeholder="Home Loan Application Form"
            />
          </AdminField>

          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={3}
              value={editing.description ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
              placeholder="Short description shown on the documents page"
            />
          </AdminField>

          <CloudinaryDocumentField
            value={editing.link}
            fileName={fileName}
            onChange={(url, name) => {
              setEditing({ ...editing, link: url });
              if (name) setFileName(name);
              setStatus("");
            }}
          />

          <AdminField label="Category">
            <select
              className={inputClass()}
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            >
              {DOCUMENT_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </AdminField>

          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Display order">
              <input
                type="number"
                className={inputClass()}
                value={editing.order}
                onChange={(e) =>
                  setEditing({ ...editing, order: Number(e.target.value) })
                }
              />
            </AdminField>
            <AdminField label="Active">
              <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.isActive}
                  onChange={(e) =>
                    setEditing({ ...editing, isActive: e.target.checked })
                  }
                />
                Show on public documents page
              </label>
            </AdminField>
          </div>
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
      <p className="text-sm text-slate-600">
        Upload PDFs and forms here. Files are stored on Cloudinary and appear on
        the public documents page.
      </p>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">
          {items.length} document{items.length === 1 ? "" : "s"}
        </p>
        <button
          type="button"
          onClick={() =>
            setEditing({
              ...EMPTY,
              order: items.length + 1,
            })
          }
          className="rounded-lg bg-[#00a69c] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d8a99]"
        >
          Add document
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No documents yet. Click &quot;Add document&quot; to upload your first file.
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div className="min-w-0">
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500">
                  {categoryLabel(item.category)}
                  {!item.isActive && " · Hidden"}
                </p>
                {item.link && item.link !== "#" && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-[#00a69c] hover:underline"
                  >
                    View file
                  </a>
                )}
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  className="text-sm font-medium text-[#00a69c] hover:underline"
                  onClick={() => {
                    setEditing(item);
                    setFileName("");
                    setStatus("");
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="text-sm font-medium text-red-600 hover:underline"
                  onClick={() => item._id && remove(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
