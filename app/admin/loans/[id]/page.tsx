"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminLoading, AdminStatus } from "@/app/components/admin/AdminTable";

export default function AdminEditLoanPage() {
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    heroImage: "",
    interestRateFrom: "",
    minimumDeposit: "",
    isPublished: true,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    clientApi<Record<string, unknown>>(`/admin/loans/${id}`).then((res) => {
      if (res.success && res.data) {
        const d = res.data;
        setForm({
          title: String(d.title ?? ""),
          slug: String(d.slug ?? ""),
          subtitle: String(d.subtitle ?? ""),
          description: String(d.description ?? ""),
          heroImage: String(d.heroImage ?? ""),
          interestRateFrom: String(d.interestRateFrom ?? ""),
          minimumDeposit: String(d.minimumDeposit ?? ""),
          isPublished: d.isPublished !== false,
        });
      }
      setLoading(false);
    });
  }, [id]);

  async function save() {
    setStatus("Saving...");
    const res = await clientApi(`/admin/loans/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
  }

  if (loading) return <AdminLoading />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-besley text-[#1d293d] mb-6">Edit loan</h1>
      <AdminField label="Title"><input className={inputClass()} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></AdminField>
      <AdminField label="Slug"><input className={inputClass()} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></AdminField>
      <AdminField label="Subtitle"><input className={inputClass()} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></AdminField>
      <AdminField label="Hero image">
        <CloudinaryImageField
          value={form.heroImage}
          onChange={(url) => setForm({ ...form, heroImage: url })}
          folder="als/loans"
          hint="Upload a hero banner for this loan page."
          aspectClass="aspect-[16/9] max-h-48"
          compact
        />
      </AdminField>
      <AdminField label="Description"><textarea className={inputClass()} rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></AdminField>
      <AdminField label="Rate from"><input className={inputClass()} value={form.interestRateFrom} onChange={(e) => setForm({ ...form, interestRateFrom: e.target.value })} /></AdminField>
      <AdminField label="Min deposit"><input className={inputClass()} value={form.minimumDeposit} onChange={(e) => setForm({ ...form, minimumDeposit: e.target.value })} /></AdminField>
      <AdminField label="Published"><input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /></AdminField>
      <div className="flex gap-4 items-center mt-6">
        <SaveButton onClick={save} />
        {status && <span className="text-sm text-gray-600">{status}</span>}
      </div>
    </div>
  );
}
