"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminLoading } from "@/app/components/admin/AdminTable";

type TeamItem = {
  _id?: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  experience: string;
  phone: string;
  email: string;
  order: number;
  isActive: boolean;
};

const EMPTY_TEAM: TeamItem = {
  name: "",
  title: "",
  image: "",
  bio: "",
  experience: "",
  phone: "",
  email: "",
  order: 0,
  isActive: true,
};

export default function HomeTeamTab() {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [editing, setEditing] = useState<TeamItem | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await clientApi<TeamItem[]>("/admin/team");
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
      ? await clientApi(`/admin/team/${id}`, { method: "PUT", body: JSON.stringify(body) })
      : await clientApi("/admin/team", { method: "POST", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success) {
      setEditing(null);
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this team member?")) return;
    await clientApi(`/admin/team/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="space-y-4">
        <button type="button" onClick={() => setEditing(null)} className="text-sm text-[#00a69c] hover:underline">
          ← Back to list
        </button>
        <AdminField label="Name">
          <input className={inputClass()} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
        </AdminField>
        <AdminField label="Title">
          <input className={inputClass()} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
        </AdminField>
        <AdminField label="Image URL">
          <input className={inputClass()} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
        </AdminField>
        <AdminField label="Bio">
          <textarea className={inputClass()} rows={4} value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} />
        </AdminField>
        <AdminField label="Experience">
          <input className={inputClass()} value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} />
        </AdminField>
        <div className="grid sm:grid-cols-2 gap-4">
          <AdminField label="Phone">
            <input className={inputClass()} value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
          </AdminField>
          <AdminField label="Email">
            <input className={inputClass()} value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
          </AdminField>
        </div>
        <AdminField label="Display order">
          <input type="number" className={inputClass()} value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} />
        </AdminField>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} />
          Active
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
        <p className="text-sm text-gray-600">{items.length} team members</p>
        <button type="button" onClick={() => setEditing({ ...EMPTY_TEAM, order: items.length + 1 })} className="text-sm font-medium px-4 py-2 bg-[#00a69c] text-white rounded-lg hover:bg-[#0d8a99]">
          Add member
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="rounded-xl border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-[#1d293d]">{item.name}</p>
              <p className="text-sm text-gray-500">{item.title}</p>
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
