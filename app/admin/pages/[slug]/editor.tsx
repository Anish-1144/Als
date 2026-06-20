"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";

export default function AdminEditPageHero({ slug }: { slug: string }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);

  const [form, setForm] = useState({
    label: "",
    path: "",
    heroTitle: "",
    heroSubtitle: "",
    heroBackgroundImage: "",
    seoDescription: "",
    isPublished: true,
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    clientApi<Record<string, unknown>>(`/admin/pages/${slug}`).then((res) => {
      if (res.success && res.data) {
        const d = res.data;
        setForm({
          label: String(d.label ?? ""),
          path: String(d.path ?? ""),
          heroTitle: String(d.heroTitle ?? ""),
          heroSubtitle: String(d.heroSubtitle ?? ""),
          heroBackgroundImage: String(d.heroBackgroundImage ?? ""),
          seoDescription: String(d.seoDescription ?? ""),
          isPublished: d.isPublished !== false,
        });
      } else if (registry) {
        setForm({
          label: registry.label,
          path: registry.path,
          heroTitle: registry.heroTitle,
          heroSubtitle: registry.heroSubtitle,
          heroBackgroundImage: registry.heroBackgroundImage,
          seoDescription: "",
          isPublished: true,
        });
      }
      setLoading(false);
    });
  }, [slug, registry]);

  async function save() {
    setStatus("Saving...");
    const res = await clientApi(`/admin/pages/${slug}`, {
      method: "PUT",
      body: JSON.stringify({
        slug,
        group: registry?.group ?? "General",
        ...form,
      }),
    });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
  }

  if (loading) return <AdminLoading />;

  return (
    <div className="max-w-2xl">
      <Link href="/admin/pages" className="text-sm text-gray-500 hover:underline">
        ← All pages
      </Link>
      <h1 className="text-3xl font-besley text-[#1d293d] mb-6 mt-4">
        Edit: {form.label || slug}
      </h1>
      <CloudinaryImageField
        label="Hero background image"
        value={form.heroBackgroundImage}
        onChange={(url) => setForm({ ...form, heroBackgroundImage: url })}
        folder={`als/pages/${slug}`}
        compact
      />
      <AdminField label="Hero title">
        <input className={inputClass()} value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
      </AdminField>
      <AdminField label="Hero subtitle">
        <textarea className={inputClass()} rows={2} value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
      </AdminField>
      <AdminField label="SEO description">
        <textarea className={inputClass()} rows={3} value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} />
      </AdminField>
      <AdminField label="Published">
        <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
      </AdminField>
      <div className="flex gap-4 items-center mt-6">
        <SaveButton onClick={save} />
        {status && <span className="text-sm text-gray-600">{status}</span>}
      </div>
    </div>
  );
}
