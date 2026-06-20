"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
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
} from "@/app/components/admin/AdminTable";

type Job = {
  _id?: string;
  title: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  salaryRange: string;
  closingDate: string;
  order: number;
  isActive: boolean;
};

function richToText(value: unknown): string {
  if (typeof value === "string") return value;
  if (!value) return "";
  return JSON.stringify(value, null, 2);
}

export default function AdminCareersPage() {
  const [items, setItems] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await clientApi<Record<string, unknown>[]>("/admin/careers/postings");
    if (res.success && res.data) {
      setItems(
        res.data.map((j) => ({
          _id: String(j._id),
          title: String(j.title ?? ""),
          location: String(j.location ?? ""),
          type: String(j.type ?? "full-time"),
          description: richToText(j.description),
          responsibilities: richToText(j.responsibilities),
          requirements: richToText(j.requirements),
          benefits: richToText(j.benefits),
          salaryRange: String(j.salaryRange ?? ""),
          closingDate: String(j.closingDate ?? ""),
          order: Number(j.order ?? 0),
          isActive: j.isActive !== false,
        })),
      );
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!editing) return;
    setStatus("Saving...");
    const body = {
      title: editing.title,
      location: editing.location,
      type: editing.type,
      description: editing.description,
      responsibilities: editing.responsibilities,
      requirements: editing.requirements,
      benefits: editing.benefits,
      salaryRange: editing.salaryRange,
      closingDate: editing.closingDate,
      order: editing.order,
      isActive: editing.isActive,
    };
    const res = editing._id
      ? await clientApi(`/admin/careers/postings/${editing._id}`, {
          method: "PUT",
          body: JSON.stringify(body),
        })
      : await clientApi("/admin/careers/postings", {
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
    if (!confirm("Delete this job posting?")) return;
    await clientApi(`/admin/careers/postings/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  if (editing) {
    return (
      <div className="max-w-2xl">
        <AdminBackLink onClick={() => setEditing(null)} />
        <h1 className="text-2xl font-besley font-semibold text-[#1d293d] mb-6">
          {editing._id ? "Edit" : "New"} job posting
        </h1>
        <AdminField label="Title"><input className={inputClass()} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></AdminField>
        <AdminField label="Location"><input className={inputClass()} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></AdminField>
        <AdminField label="Type">
          <select className={inputClass()} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })}>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
        </AdminField>
        <AdminField label="Description"><textarea className={inputClass()} rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></AdminField>
        <AdminField label="Responsibilities"><textarea className={inputClass()} rows={4} value={editing.responsibilities} onChange={(e) => setEditing({ ...editing, responsibilities: e.target.value })} /></AdminField>
        <AdminField label="Requirements"><textarea className={inputClass()} rows={4} value={editing.requirements} onChange={(e) => setEditing({ ...editing, requirements: e.target.value })} /></AdminField>
        <AdminField label="Benefits"><textarea className={inputClass()} rows={3} value={editing.benefits} onChange={(e) => setEditing({ ...editing, benefits: e.target.value })} /></AdminField>
        <AdminField label="Salary range"><input className={inputClass()} value={editing.salaryRange} onChange={(e) => setEditing({ ...editing, salaryRange: e.target.value })} /></AdminField>
        <AdminField label="Closing date"><input type="date" className={inputClass()} value={editing.closingDate?.slice(0, 10) ?? ""} onChange={(e) => setEditing({ ...editing, closingDate: e.target.value })} /></AdminField>
        <AdminField label="Order"><input type="number" className={inputClass()} value={editing.order} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} /></AdminField>
        <AdminField label="Active"><input type="checkbox" checked={editing.isActive} onChange={(e) => setEditing({ ...editing, isActive: e.target.checked })} /></AdminField>
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
        <AdminPageTitle>Careers</AdminPageTitle>
        <AdminAddButton
          label="Add job"
          onClick={() =>
            setEditing({
              title: "",
              location: "",
              type: "full-time",
              description: "",
              responsibilities: "",
              requirements: "",
              benefits: "",
              salaryRange: "",
              closingDate: "",
              order: 0,
              isActive: true,
            })
          }
        />
      </div>
      <AdminTable>
        <AdminTableHead>
          <tr>
            <AdminTh>Title</AdminTh>
            <AdminTh>Location</AdminTh>
            <AdminTh>Actions</AdminTh>
          </tr>
        </AdminTableHead>
        <tbody>
          {items.map((item) => (
            <AdminTr key={item._id}>
              <AdminTd>{item.title}</AdminTd>
              <AdminTd muted>{item.location}</AdminTd>
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
                    onClick={() => item._id && remove(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </AdminTd>
            </AdminTr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
