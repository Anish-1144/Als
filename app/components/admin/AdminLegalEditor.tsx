"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import {
  mergeLegalPageContent,
  type LegalPageContent,
  type LegalSection,
  type LegalSlug,
} from "@/lib/legal-content";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup } from "@/app/components/admin/home/AdminCardGroup";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";

const TABS = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "intro", label: "Introduction", description: "Last updated date and opening paragraphs." },
  { id: "sections", label: "Content sections", description: "Legal sections with headings, text, and bullet points." },
  { id: "footer", label: "Footer note", description: "Optional note shown at the bottom of the page." },
];

type HeroForm = { heroTitle: string; heroSubtitle: string; heroBackgroundImage: string; isPublished: boolean };

function updateAt<T>(arr: T[], index: number, patch: Partial<T>): T[] {
  return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

function linesToItems(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function itemsToLines(items: string[]): string {
  return items.join("\n");
}

export default function AdminLegalEditor({ slug }: { slug: LegalSlug }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const previewPath = registry?.path ?? `/legal/${slug}`;
  const adminBase = `/admin/legal/${slug}`;

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = TABS.find((t) => t.id === searchParams.get("section"))?.id ?? TABS[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [content, setContent] = useState<LegalPageContent>(() => mergeLegalPageContent(slug));
  const [rawPage, setRawPage] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Record<string, unknown>>(`/admin/pages/${slug}`).then((res) => {
      const d = res.success && res.data ? res.data : null;
      const base = d ?? {
        slug,
        label: registry?.label ?? slug,
        path: registry?.path ?? `/legal/${slug}`,
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
      setContent(mergeLegalPageContent(slug, (base.content as Partial<LegalPageContent>) ?? {}));
      setLoading(false);
    });
  }, [slug, registry]);

  const setTab = useCallback((tab: string) => router.replace(`${adminBase}?section=${tab}`, { scroll: false }), [router, adminBase]);

  function updateSections(sections: LegalSection[]) {
    setContent({ ...content, sections });
  }

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const body = {
      ...rawPage,
      slug,
      group: registry?.group ?? "Legal",
      label: registry?.label ?? slug,
      path: registry?.path ?? `/legal/${slug}`,
      ...hero,
      content,
    };
    const res = await clientApi(`/admin/pages/${slug}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  if (loading) return <AdminLoading />;

  const title = registry?.label ?? slug;

  return (
    <AdminEditorShell
      title={title}
      previewHref={previewPath}
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={setTab}
      imagePanel={
        activeTab === "hero" ? (
          <AdminImagePanelShell title="Hero background" onSave={save} saving={saving} status={status}>
            <PageHeroImagePanel
              slug={slug}
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

          {activeTab === "intro" && (
            <div className="space-y-4">
              <AdminField label="Last updated"><input className={inputClass()} value={content.lastUpdated} onChange={(e) => setContent({ ...content, lastUpdated: e.target.value })} placeholder="e.g. June 2025" /></AdminField>
              <AdminField label="Introduction paragraphs (separate with blank lines)">
                <textarea className={inputClass()} rows={8} value={content.introParagraphs.join("\n\n")} onChange={(e) => setContent({ ...content, introParagraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) })} />
              </AdminField>
            </div>
          )}

          {activeTab === "sections" && (
            <div className="space-y-4">
              {content.sections.map((section, index) => (
                <AdminCardGroup key={index} index={index} title={section.title || `Section ${index + 1}`}>
                  <AdminField label="Section title"><input className={inputClass()} value={section.title} onChange={(e) => updateSections(updateAt(content.sections, index, { title: e.target.value }))} /></AdminField>
                  <AdminField label="Paragraphs (separate with blank lines)"><textarea className={inputClass()} rows={5} value={section.paragraphs.join("\n\n")} onChange={(e) => updateSections(updateAt(content.sections, index, { paragraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) }))} /></AdminField>
                  <AdminField label="Bullet points (one per line, optional)"><textarea className={inputClass()} rows={4} value={itemsToLines(section.bullets ?? [])} onChange={(e) => updateSections(updateAt(content.sections, index, { bullets: linesToItems(e.target.value) }))} /></AdminField>
                </AdminCardGroup>
              ))}
              <button type="button" onClick={() => updateSections([...content.sections, { title: "", paragraphs: [] }])} className="text-sm font-medium text-teal-600 hover:text-teal-700">+ Add section</button>
            </div>
          )}

          {activeTab === "footer" && (
            <AdminField label="Footer note">
              <textarea className={inputClass()} rows={4} value={content.footerNote ?? ""} onChange={(e) => setContent({ ...content, footerNote: e.target.value })} />
            </AdminField>
          )}
    </AdminEditorShell>
  );
}
