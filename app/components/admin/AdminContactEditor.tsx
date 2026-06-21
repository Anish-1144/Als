"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { mergeContactContent, type ContactPageContent } from "@/lib/contact-content";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import SectionVisibilityField from "@/app/components/admin/SectionVisibilityField";

const SLUG = "contact";

const TABS = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "contact-info", label: "Contact info", description: "Phone, email, address, and business hours." },
  { id: "map", label: "Map", description: "Google Maps embed for your office location." },
  { id: "why-us", label: "Why choose us", description: "Bullet points shown beside the contact form." },
  { id: "form", label: "Contact form", description: "Form heading, description, and submit button label." },
];

type HeroForm = { heroTitle: string; heroSubtitle: string; heroBackgroundImage: string; isPublished: boolean };

function linesToItems(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function itemsToLines(items: string[]): string {
  return items.join("\n");
}

export default function AdminContactEditor() {
  const registry = PAGE_REGISTRY.find((p) => p.slug === SLUG);
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = TABS.find((t) => t.id === searchParams.get("section"))?.id ?? TABS[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [content, setContent] = useState<ContactPageContent>(() => mergeContactContent());
  const [rawPage, setRawPage] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Record<string, unknown>>(`/admin/pages/${SLUG}`).then((res) => {
      const d = res.success && res.data ? res.data : null;
      const base = d ?? {
        slug: SLUG,
        label: registry?.label ?? "Contact",
        path: registry?.path ?? "/contact",
        heroTitle: registry?.heroTitle ?? "",
        heroSubtitle: registry?.heroSubtitle ?? "",
        heroBackgroundImage: registry?.heroBackgroundImage ?? "",
        isPublished: true,
        content: {},
      };
      setRawPage(base);
      setHero({
        heroTitle: String(base.heroTitle ?? ""),
        heroSubtitle: String(base.heroSubtitle ?? ""),
        heroBackgroundImage: String(base.heroBackgroundImage ?? ""),
        isPublished: base.isPublished !== false,
      });
      setContent(mergeContactContent((base.content as Partial<ContactPageContent>) ?? {}));
      setLoading(false);
    });
  }, [registry]);

  const setTab = useCallback((tab: string) => router.replace(`/admin/contact?section=${tab}`, { scroll: false }), [router]);

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const body = {
      ...rawPage,
      slug: SLUG,
      group: registry?.group ?? "Company",
      label: registry?.label ?? "Contact",
      path: registry?.path ?? "/contact",
      ...hero,
      content,
    };
    const res = await clientApi(`/admin/pages/${SLUG}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  if (loading) return <AdminLoading />;

  return (
    <AdminEditorShell
      title="Contact"
      previewHref="/contact"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setTab}
      imagePanel={
        activeTab === "hero" ? (
          <AdminImagePanelShell title="Hero background" onSave={save} saving={saving} status={status}>
            <PageHeroImagePanel
              slug={SLUG}
              value={hero.heroBackgroundImage}
              onChange={(url) => {
                setHero({ ...hero, heroBackgroundImage: url });
                setStatus("");
              }}
            />
          </AdminImagePanelShell>
        ) : undefined
      }
      footer={
        <AdminEditorSaveBar>
          <AdminPublishedToggle
            checked={hero.isPublished}
            onChange={(v) => {
              setHero({ ...hero, isPublished: v });
              setStatus("");
            }}
          />
          <div className="flex items-center gap-3">
            <AdminSaveStatus status={status} />
            <SaveButton onClick={save} loading={saving} />
          </div>
        </AdminEditorSaveBar>
      }
    >
          {activeTab === "hero" && (
            <div className="space-y-1">
              <AdminField label="Hero title"><input className={inputClass()} value={hero.heroTitle} onChange={(e) => { setHero({ ...hero, heroTitle: e.target.value }); setStatus(""); }} /></AdminField>
              <AdminField label="Hero subtitle"><textarea className={inputClass()} rows={2} value={hero.heroSubtitle} onChange={(e) => { setHero({ ...hero, heroSubtitle: e.target.value }); setStatus(""); }} /></AdminField>
            </div>
          )}

          {activeTab === "contact-info" && (
            <div className="space-y-6">
              <SectionVisibilityField visible={content.infoSection.isVisible !== false} onChange={(v) => setContent({ ...content, infoSection: { ...content.infoSection, isVisible: v } })} />
              <AdminField label="Section title"><input className={inputClass()} value={content.infoSection.title} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, title: e.target.value } })} /></AdminField>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-gray-800">Phone</p>
                <AdminField label="Label"><input className={inputClass()} value={content.infoSection.phone.title} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, phone: { ...content.infoSection.phone, title: e.target.value } } })} /></AdminField>
                <AdminField label="Number"><input className={inputClass()} value={content.infoSection.phone.value} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, phone: { ...content.infoSection.phone, value: e.target.value } } })} /></AdminField>
                <AdminReadOnlyUrlField label="Link (tel:...)" value={content.infoSection.phone.link ?? ""} hint="Generated from phone number — cannot be changed here." />
                <AdminField label="Note"><input className={inputClass()} value={content.infoSection.phone.note ?? ""} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, phone: { ...content.infoSection.phone, note: e.target.value } } })} /></AdminField>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-gray-800">Email</p>
                <AdminField label="Label"><input className={inputClass()} value={content.infoSection.email.title} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, email: { ...content.infoSection.email, title: e.target.value } } })} /></AdminField>
                <AdminField label="Address"><input className={inputClass()} value={content.infoSection.email.value} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, email: { ...content.infoSection.email, value: e.target.value } } })} /></AdminField>
                <AdminReadOnlyUrlField label="Link (mailto:...)" value={content.infoSection.email.link ?? ""} hint="Generated from email address — cannot be changed here." />
                <AdminField label="Note"><input className={inputClass()} value={content.infoSection.email.note ?? ""} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, email: { ...content.infoSection.email, note: e.target.value } } })} /></AdminField>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-gray-800">Office address</p>
                <AdminField label="Label"><input className={inputClass()} value={content.infoSection.address.title} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, address: { ...content.infoSection.address, title: e.target.value } } })} /></AdminField>
                <AdminField label="Address lines (one per line)"><textarea className={inputClass()} rows={4} value={itemsToLines(content.infoSection.address.lines)} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, address: { ...content.infoSection.address, lines: linesToItems(e.target.value) } } })} /></AdminField>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                <p className="font-medium text-gray-800">Business hours</p>
                <AdminField label="Label"><input className={inputClass()} value={content.infoSection.hours.title} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, hours: { ...content.infoSection.hours, title: e.target.value } } })} /></AdminField>
                <AdminField label="Hours lines (one per line)"><textarea className={inputClass()} rows={4} value={itemsToLines(content.infoSection.hours.lines)} onChange={(e) => setContent({ ...content, infoSection: { ...content.infoSection, hours: { ...content.infoSection.hours, lines: linesToItems(e.target.value) } } })} /></AdminField>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={content.map.isVisible !== false} onChange={(v) => setContent({ ...content, map: { ...content.map, isVisible: v } })} />
              <AdminField label="Map section title"><input className={inputClass()} value={content.map.title} onChange={(e) => setContent({ ...content, map: { ...content.map, title: e.target.value } })} /></AdminField>
              <AdminField label="Google Maps embed URL"><textarea className={inputClass()} rows={4} value={content.map.embedUrl} onChange={(e) => setContent({ ...content, map: { ...content.map, embedUrl: e.target.value } })} /></AdminField>
            </div>
          )}

          {activeTab === "why-us" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={content.whyUs.isVisible !== false} onChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, isVisible: v } })} />
              <AdminField label="Title"><input className={inputClass()} value={content.whyUs.title} onChange={(e) => setContent({ ...content, whyUs: { ...content.whyUs, title: e.target.value } })} /></AdminField>
              <AdminField label="Bullet points (one per line)"><textarea className={inputClass()} rows={6} value={itemsToLines(content.whyUs.items)} onChange={(e) => setContent({ ...content, whyUs: { ...content.whyUs, items: linesToItems(e.target.value) } })} /></AdminField>
            </div>
          )}

          {activeTab === "form" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={content.formSection.isVisible !== false} onChange={(v) => setContent({ ...content, formSection: { ...content.formSection, isVisible: v } })} />
              <AdminField label="Form title"><input className={inputClass()} value={content.formSection.title} onChange={(e) => setContent({ ...content, formSection: { ...content.formSection, title: e.target.value } })} /></AdminField>
              <AdminField label="Form subtitle"><textarea className={inputClass()} rows={3} value={content.formSection.subtitle} onChange={(e) => setContent({ ...content, formSection: { ...content.formSection, subtitle: e.target.value } })} /></AdminField>
              <AdminField label="Submit button text"><input className={inputClass()} value={content.formSection.submitButtonText} onChange={(e) => setContent({ ...content, formSection: { ...content.formSection, submitButtonText: e.target.value } })} /></AdminField>
            </div>
          )}
    </AdminEditorShell>
  );
}
