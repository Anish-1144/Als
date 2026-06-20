"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import {
  mergeHowItWorksContent,
  type HowItWorksContent,
  type ProcessStep,
} from "@/lib/how-it-works-content";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup, AdminSectionFields } from "@/app/components/admin/home/AdminCardGroup";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";

const SLUG = "how-it-works";

const TABS = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "process", label: "Process steps", description: "Section heading and the five process step cards." },
  { id: "step-cta", label: "Step detail CTA", description: "Buttons shown in the expanded step detail panel." },
  { id: "faqs", label: "FAQs", description: "Frequently asked questions accordion." },
];

type HeroForm = {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  isPublished: boolean;
};

function updateAt<T>(arr: T[], index: number, patch: Partial<T>): T[] {
  return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

function linesToItems(text: string): string[] {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function itemsToLines(items: string[]): string {
  return items.join("\n");
}

export default function AdminHowItWorksEditor() {
  const registry = PAGE_REGISTRY.find((p) => p.slug === SLUG);
  const previewPath = registry?.path ?? "/how-it-works";

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = TABS.find((t) => t.id === searchParams.get("section"))?.id ?? TABS[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [content, setContent] = useState<HowItWorksContent>(() => mergeHowItWorksContent());
  const [rawPage, setRawPage] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Record<string, unknown>>(`/admin/pages/${SLUG}`).then((res) => {
      const d = res.success && res.data ? res.data : null;
      const base = d ?? {
        slug: SLUG,
        label: registry?.label ?? "How It Works",
        path: registry?.path ?? "/how-it-works",
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
      setContent(mergeHowItWorksContent((base.content as Partial<HowItWorksContent>) ?? {}));
      setLoading(false);
    });
  }, [registry]);

  const setTab = useCallback(
    (tab: string) => router.replace(`/admin/how-it-works?section=${tab}`, { scroll: false }),
    [router],
  );

  function updateSteps(steps: ProcessStep[]) {
    setContent({ ...content, steps });
  }

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const body = {
      ...rawPage,
      slug: SLUG,
      group: registry?.group ?? "Company",
      label: registry?.label ?? "How It Works",
      path: registry?.path ?? "/how-it-works",
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
      title="How It Works"
      previewHref={previewPath}
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

          {activeTab === "process" && (
            <div className="space-y-6">
              <AdminSectionFields
                title={content.processSection.title}
                subtitle={content.processSection.subtitle ?? ""}
                onTitleChange={(v) => setContent({ ...content, processSection: { ...content.processSection, title: v } })}
                onSubtitleChange={(v) => setContent({ ...content, processSection: { ...content.processSection, subtitle: v } })}
              />
              <AdminField label="Section badge">
                <input className={inputClass()} value={content.processSection.badge ?? ""} onChange={(e) => setContent({ ...content, processSection: { ...content.processSection, badge: e.target.value } })} />
              </AdminField>

              <div className="space-y-4">
                {content.steps.map((step, index) => (
                  <AdminCardGroup key={index} index={index} title={step.shortTitle || step.title || `Step ${index + 1}`}>
                    <AdminField label="Step ID (anchor)">
                      <input className={inputClass()} value={step.id} onChange={(e) => updateSteps(updateAt(content.steps, index, { id: e.target.value }))} />
                    </AdminField>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <AdminField label="Short title (card)">
                        <input className={inputClass()} value={step.shortTitle} onChange={(e) => updateSteps(updateAt(content.steps, index, { shortTitle: e.target.value }))} />
                      </AdminField>
                      <AdminField label="Full title (detail)">
                        <input className={inputClass()} value={step.title} onChange={(e) => updateSteps(updateAt(content.steps, index, { title: e.target.value }))} />
                      </AdminField>
                    </div>
                    <AdminField label="Description">
                      <textarea className={inputClass()} rows={3} value={step.description} onChange={(e) => updateSteps(updateAt(content.steps, index, { description: e.target.value }))} />
                    </AdminField>
                    <AdminField label="Detail bullet points (one per line)">
                      <textarea className={inputClass()} rows={6} value={itemsToLines(step.details)} onChange={(e) => updateSteps(updateAt(content.steps, index, { details: linesToItems(e.target.value) }))} />
                    </AdminField>
                  </AdminCardGroup>
                ))}
                <button type="button" onClick={() => updateSteps([...content.steps, { id: `step-${content.steps.length + 1}`, title: "", shortTitle: "", description: "", details: [] }])} className="text-sm text-[#00a69c] hover:underline">+ Add step</button>
              </div>
            </div>
          )}

          {activeTab === "step-cta" && (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Primary button label">
                  <input className={inputClass()} value={content.stepDetailCta.primaryLabel} onChange={(e) => setContent({ ...content, stepDetailCta: { ...content.stepDetailCta, primaryLabel: e.target.value } })} />
                </AdminField>
                <AdminReadOnlyUrlField label="Primary button link" value={content.stepDetailCta.primaryLink} />
              </div>
              <AdminField label="Back button label">
                <input className={inputClass()} value={content.stepDetailCta.secondaryLabel} onChange={(e) => setContent({ ...content, stepDetailCta: { ...content.stepDetailCta, secondaryLabel: e.target.value } })} />
              </AdminField>
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="space-y-6">
              <AdminSectionFields
                title={content.faqs.title}
                subtitle={content.faqs.subtitle ?? ""}
                onTitleChange={(v) => setContent({ ...content, faqs: { ...content.faqs, title: v } })}
                onSubtitleChange={(v) => setContent({ ...content, faqs: { ...content.faqs, subtitle: v } })}
              />
              <AdminField label="Section badge">
                <input className={inputClass()} value={content.faqs.badge ?? ""} onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, badge: e.target.value } })} />
              </AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="View all label">
                  <input className={inputClass()} value={content.faqs.viewAllLabel} onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, viewAllLabel: e.target.value } })} />
                </AdminField>
                <AdminReadOnlyUrlField label="View all link" value={content.faqs.viewAllLink} />
              </div>
              <div className="space-y-4">
                {content.faqs.items.map((faq, index) => (
                  <AdminCardGroup key={index} index={index} title={faq.question || `FAQ ${index + 1}`}>
                    <AdminField label="Question">
                      <input className={inputClass()} value={faq.question} onChange={(e) => { const items = updateAt(content.faqs.items, index, { question: e.target.value }); setContent({ ...content, faqs: { ...content.faqs, items } }); }} />
                    </AdminField>
                    <AdminField label="Answer">
                      <textarea className={inputClass()} rows={4} value={faq.answer} onChange={(e) => { const items = updateAt(content.faqs.items, index, { answer: e.target.value }); setContent({ ...content, faqs: { ...content.faqs, items } }); }} />
                    </AdminField>
                  </AdminCardGroup>
                ))}
                <button type="button" onClick={() => setContent({ ...content, faqs: { ...content.faqs, items: [...content.faqs.items, { question: "", answer: "" }] } })} className="text-sm text-[#00a69c] hover:underline">+ Add FAQ</button>
              </div>
            </div>
          )}
    </AdminEditorShell>
  );
}
