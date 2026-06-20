"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminLoading } from "@/app/components/admin/AdminTable";

type JobItem = {
  _id?: string;
  title: string;
  location: string;
  type: string;
  description: string;
  order: number;
  isActive: boolean;
};

const EMPTY: JobItem = {
  title: "",
  location: "",
  type: "Full-time",
  description: "",
  order: 0,
  isActive: true,
};

export default function HomeJobsTab() {
  const [items, setItems] = useState<JobItem[]>([]);
  const [editing, setEditing] = useState<JobItem | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await clientApi<JobItem[]>("/admin/careers/postings");
    if (res.success && res.data) {
      setItems([...res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setSaving(true);
    setStatus("Saving...");
    const id = editing._id;
    const { _id, ...body } = editing;
    const res = id
      ? await clientApi(`/admin/careers/postings/${id}`, { method: "PUT", body: JSON.stringify(body) })
      : await clientApi("/admin/careers/postings", { method: "POST", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this job posting?")) return;
    await clientApi(`/admin/careers/postings/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setEditing(null)} className="text-sm text-[#00a69c] hover:underline">
          ← Back to list
        </button>
        <AdminField label="Job title">
          <input className={inputClass()} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Location">
            <input className={inputClass()} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
          </AdminField>
          <AdminField label="Type">
            <input className={inputClass()} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} />
          </AdminField>
        </div>
        <AdminField label="Description">
          <textarea className={inputClass()} rows={5} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
        </AdminField>
        <AdminField label="Display order">
          <input type="number" className={inputClass()} value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} />
        </AdminField>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
          Active listing
        </label>
        <div className="flex items-center gap-3">
          <SaveButton onClick={save} loading={saving} />
          {status && <span className="text-sm text-gray-600">{status}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{items.length} job posting{items.length !== 1 ? "s" : ""}</p>
        <button type="button" onClick={() => setEditing({ ...EMPTY, order: items.length + 1 })} className="text-sm font-medium px-4 py-2 bg-[#00a69c] text-white rounded-lg hover:bg-[#0d8a99]">
          Add job
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#1d293d]">{item.title}</p>
              <p className="text-sm text-gray-500">{item.location} · {item.type}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setEditing({ ...item })} className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#00a69c]">Edit</button>
              {item._id && (
                <button type="button" onClick={() => remove(item._id!)} className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600">Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
