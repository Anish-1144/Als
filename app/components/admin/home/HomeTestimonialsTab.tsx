"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminCardGroup } from "@/app/components/admin/home/AdminCardGroup";
import { AdminLoading } from "@/app/components/admin/AdminTable";

type TestimonialItem = {
  _id?: string;
  clientName: string;
  clientTitle: string;
  testimonial: string;
  rating: number;
  order: number;
  isActive: boolean;
};

const EMPTY: TestimonialItem = {
  clientName: "",
  clientTitle: "",
  testimonial: "",
  rating: 5,
  order: 0,
  isActive: true,
};

export default function HomeTestimonialsTab({
  onDirty,
}: {
  onDirty?: () => void;
}) {
  const [items, setItems] = useState<TestimonialItem[]>([]);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await clientApi<TestimonialItem[]>("/admin/testimonials");
    if (res.success && res.data) {
      setItems(
        [...res.data].sort(
          (a, b) => (a.order ?? 0) - (b.order ?? 0),
        ),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function startEdit(item: TestimonialItem) {
    setEditing({ ...item });
    setStatus("");
  }

  function startNew() {
    setEditing({
      ...EMPTY,
      order: items.length + 1,
    });
    setStatus("");
  }

  async function save() {
    if (!editing) return;
    setSaving(true);
    setStatus("Saving...");
    const id = editing._id;
    const { _id, ...body } = editing;
    const res = id
      ? await clientApi(`/admin/testimonials/${id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        })
      : await clientApi("/admin/testimonials", {
          method: "POST",
          body: JSON.stringify(body),
        });
    setSaving(false);
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      await load();
      onDirty?.();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    await clientApi(`/admin/testimonials/${id}`, { method: "DELETE" });
    await load();
    onDirty?.();
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

        <AdminCardGroup index={0} title={editing._id ? "Edit testimonial" : "New testimonial"}>
          <AdminField label="Quote">
            <textarea
              className={inputClass()}
              rows={5}
              value={editing.testimonial}
              onChange={(e) =>
                setEditing({ ...editing, testimonial: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Client name">
            <input
              className={inputClass()}
              value={editing.clientName}
              onChange={(e) =>
                setEditing({ ...editing, clientName: e.target.value })
              }
            />
          </AdminField>
          <AdminField label="Client title / role">
            <input
              className={inputClass()}
              value={editing.clientTitle}
              onChange={(e) =>
                setEditing({ ...editing, clientTitle: e.target.value })
              }
              placeholder="e.g. First Home Buyers"
            />
          </AdminField>
          <div className="grid sm:grid-cols-2 gap-4">
            <AdminField label="Rating (1–5)">
              <input
                type="number"
                min={1}
                max={5}
                className={inputClass()}
                value={editing.rating}
                onChange={(e) =>
                  setEditing({ ...editing, rating: Number(e.target.value) })
                }
              />
            </AdminField>
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
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={editing.isActive}
              onChange={(e) =>
                setEditing({ ...editing, isActive: e.target.checked })
              }
              className="w-4 h-4 rounded border-gray-300 text-[#00a69c]"
            />
            Active on homepage
          </label>
        </AdminCardGroup>

        <div className="flex items-center gap-3">
          <SaveButton onClick={save} loading={saving} />
          {status && <span className="text-sm text-gray-600">{status}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-gray-600">
          {items.length} testimonial{items.length !== 1 ? "s" : ""} on the homepage
        </p>
        <button
          type="button"
          onClick={startNew}
          className="text-sm font-medium px-4 py-2 bg-[#00a69c] text-white rounded-lg hover:bg-[#0d8a99]"
        >
          Add testimonial
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item._id ?? index}
            className="rounded-xl border border-gray-200 bg-white p-4 hover:border-[#00a69c]/40 transition-colors"
          >
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">
              &ldquo;{item.testimonial}&rdquo;
            </p>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1d293d]">
                  {item.clientName}
                </p>
                <p className="text-xs text-gray-500">{item.clientTitle}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#00a69c] hover:text-[#00a69c]"
                >
                  Edit
                </button>
                {item._id && (
                  <button
                    type="button"
                    onClick={() => remove(item._id!)}
                    className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
