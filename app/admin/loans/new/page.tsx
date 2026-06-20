"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";

export default function AdminNewLoanPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    heroImage: "",
    isPublished: true,
  });
  const [error, setError] = useState("");

  async function save() {
    const res = await clientApi("/admin/loans", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.success && res.data) {
      router.push(`/admin/loans/${(res.data as { _id: string })._id}`);
    } else {
      setError(res.error?.message ?? "Create failed");
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-besley text-[#1d293d] mb-6">New loan</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <AdminField label="Title"><input className={inputClass()} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></AdminField>
      <AdminField label="Slug"><input className={inputClass()} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></AdminField>
      <AdminField label="Subtitle"><input className={inputClass()} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></AdminField>
      <AdminField label="Hero image URL"><input className={inputClass()} value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} /></AdminField>
      <AdminField label="Description"><textarea className={inputClass()} rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></AdminField>
      <AdminField label="Published"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /></AdminField>
      <SaveButton onClick={save} label="Create loan" />
    </div>
  );
}
