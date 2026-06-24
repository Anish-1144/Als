"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import type { ContentCard } from "@/lib/page-content";
import {
  mergeGuidePageContent,
  mergeResourceListPageContent,
  RESOURCE_LIST_SLUGS,
  type GuidePageContent,
  type GuideSection,
  type GuideSubsection,
  type ResourceSlug,
  type ResourceListPageContent,
} from "@/lib/resources-content";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup, AdminSectionFields } from "@/app/components/admin/home/AdminCardGroup";
import SectionVisibilityField from "@/app/components/admin/SectionVisibilityField";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import DocumentsLibraryTab from "@/app/components/admin/resources/DocumentsLibraryTab";

type TabDef = { id: string; label: string; description: string };

const GUIDE_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "intro", label: "Introduction", description: "Opening paragraphs at the top of the guide." },
  { id: "sections", label: "Guide sections", description: "Main content sections with subsections and bullet points." },
  { id: "closing", label: "Closing & extras", description: "Closing block, stats, bottom CTA, and related guides." },
];

const LIST_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "intro", label: "Introduction", description: "Intro heading, description, and top call-to-action buttons." },
  { id: "items", label: "Items", description: "Manage the list items shown on this page." },
  { id: "bottom-cta", label: "Bottom CTA", description: "Call-to-action band at the bottom of the page." },
];

function isListSlug(slug: ResourceSlug): slug is "faq" | "documents" {
  return (RESOURCE_LIST_SLUGS as readonly string[]).includes(slug);
}

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

function CardListEditor({ cards, onChange, showLinks = false }: { cards: ContentCard[]; onChange: (c: ContentCard[]) => void; showLinks?: boolean }) {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <AdminCardGroup key={index} index={index} title={card.title || `Card ${index + 1}`}>
          <AdminField label="Title"><input className={inputClass()} value={card.title} onChange={(e) => onChange(updateAt(cards, index, { title: e.target.value }))} /></AdminField>
          <AdminField label="Description"><textarea className={inputClass()} rows={2} value={card.description} onChange={(e) => onChange(updateAt(cards, index, { description: e.target.value }))} /></AdminField>
          {showLinks && (
            <AdminReadOnlyUrlField label="Link" value={card.link ?? ""} />
          )}
        </AdminCardGroup>
      ))}
      <button type="button" onClick={() => onChange([...cards, { title: "", description: "" }])} className="text-sm text-[#00a69c] hover:underline">+ Add card</button>
    </div>
  );
}

export default function AdminResourcesEditor({ slug }: { slug: ResourceSlug }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const isList = isListSlug(slug);
  const tabs = isList ? LIST_TABS : GUIDE_TABS;
  const title = registry?.label ?? slug;
  const previewPath = registry?.path ?? `/resources/${slug}`;
  const adminBase = `/admin/resources/${slug}`;

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = tabs.find((t) => t.id === searchParams.get("section"))?.id ?? tabs[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [guideContent, setGuideContent] = useState<GuidePageContent>(() => mergeGuidePageContent(slug));
  const [listContent, setListContent] = useState<ResourceListPageContent>(() => mergeResourceListPageContent(slug as "faq" | "documents"));
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
        path: registry?.path ?? "",
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
      const content = (base.content as Record<string, unknown>) ?? {};
      if (isList) setListContent(mergeResourceListPageContent(slug, content as Partial<ResourceListPageContent>));
      else setGuideContent(mergeGuidePageContent(slug, content as Partial<GuidePageContent>));
      setLoading(false);
    });
  }, [slug, registry, isList]);

  const setTab = useCallback((tab: string) => router.replace(`${adminBase}?section=${tab}`, { scroll: false }), [router, adminBase]);

  function updateSections(sections: GuideSection[]) {
    setGuideContent({ ...guideContent, sections });
  }

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const content = isList ? listContent : guideContent;
    const body = { ...rawPage, slug, group: registry?.group ?? "Resources", label: registry?.label ?? slug, path: registry?.path ?? "", ...hero, content };
    const res = await clientApi(`/admin/pages/${slug}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  if (loading) return <AdminLoading />;

  const crudTabs = ["items"];
  const showSaveBar = !crudTabs.includes(activeTab);

  return (
    <AdminEditorShell
      title={title}
      previewHref={previewPath}
      tabs={tabs}
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
        showSaveBar ? (
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
        ) : undefined
      }
    >
          {activeTab === "hero" && (
            <div className="space-y-1">
              <AdminField label="Hero title"><input className={inputClass()} value={hero.heroTitle} onChange={(e) => { setHero({ ...hero, heroTitle: e.target.value }); setStatus(""); }} /></AdminField>
              <AdminField label="Hero subtitle"><textarea className={inputClass()} rows={2} value={hero.heroSubtitle} onChange={(e) => { setHero({ ...hero, heroSubtitle: e.target.value }); setStatus(""); }} /></AdminField>
            </div>
          )}

          {!isList && activeTab === "intro" && (
            <>
              <SectionVisibilityField visible={guideContent.introSection?.isVisible !== false} onChange={(v) => setGuideContent({ ...guideContent, introSection: { ...guideContent.introSection, isVisible: v } })} />
              <AdminField label="Introduction paragraphs (one per line block — use blank line between paragraphs)">
              <textarea className={inputClass()} rows={10} value={guideContent.introParagraphs.join("\n\n")} onChange={(e) => setGuideContent({ ...guideContent, introParagraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) })} />
            </AdminField>
            </>
          )}

          {!isList && activeTab === "sections" && (
            <div className="space-y-6">
              {guideContent.sections.map((section, sIndex) => (
                <AdminCardGroup key={sIndex} index={sIndex} title={section.title || `Section ${sIndex + 1}`}>
                  <SectionVisibilityField visible={section.isVisible !== false} onChange={(v) => updateSections(updateAt(guideContent.sections, sIndex, { isVisible: v }))} />
                  <AdminField label="Section title"><input className={inputClass()} value={section.title} onChange={(e) => updateSections(updateAt(guideContent.sections, sIndex, { title: e.target.value }))} /></AdminField>
                  <AdminField label="Section intro (optional, paragraphs separated by blank lines)">
                    <textarea className={inputClass()} rows={4} value={(section.introParagraphs ?? []).join("\n\n")} onChange={(e) => updateSections(updateAt(guideContent.sections, sIndex, { introParagraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) }))} />
                  </AdminField>
                  <div className="space-y-4 pt-2">
                    <p className="text-sm font-medium text-gray-700">Subsections</p>
                    {section.subsections.map((sub, subIndex) => (
                      <div key={subIndex} className="border border-gray-200 rounded-lg p-4 space-y-3">
                        <AdminField label="Subsection title (optional)"><input className={inputClass()} value={sub.title ?? ""} onChange={(e) => { const subsections = updateAt(section.subsections, subIndex, { title: e.target.value }); updateSections(updateAt(guideContent.sections, sIndex, { subsections })); }} /></AdminField>
                        <AdminField label="Paragraphs (blank line between)"><textarea className={inputClass()} rows={4} value={sub.paragraphs.join("\n\n")} onChange={(e) => { const subsections = updateAt(section.subsections, subIndex, { paragraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) }); updateSections(updateAt(guideContent.sections, sIndex, { subsections })); }} /></AdminField>
                        <AdminField label="Bullet points (one per line)"><textarea className={inputClass()} rows={4} value={itemsToLines(sub.bullets ?? [])} onChange={(e) => { const subsections = updateAt(section.subsections, subIndex, { bullets: linesToItems(e.target.value) }); updateSections(updateAt(guideContent.sections, sIndex, { subsections })); }} /></AdminField>
                      </div>
                    ))}
                    <button type="button" onClick={() => { const subsections: GuideSubsection[] = [...section.subsections, { paragraphs: [] }]; updateSections(updateAt(guideContent.sections, sIndex, { subsections })); }} className="text-sm text-[#00a69c] hover:underline">+ Add subsection</button>
                  </div>
                  <AdminField label="Section-level bullets (one per line)"><textarea className={inputClass()} rows={4} value={itemsToLines(section.bullets ?? [])} onChange={(e) => updateSections(updateAt(guideContent.sections, sIndex, { bullets: linesToItems(e.target.value) }))} /></AdminField>
                </AdminCardGroup>
              ))}
              <button type="button" onClick={() => updateSections([...guideContent.sections, { title: "", subsections: [] }])} className="text-sm text-[#00a69c] hover:underline">+ Add section</button>
            </div>
          )}

          {!isList && activeTab === "closing" && (
            <div className="space-y-8">
              {guideContent.closingBlock && (
                <div className="space-y-4">
                  <SectionVisibilityField visible={guideContent.closingBlock.isVisible !== false} onChange={(v) => setGuideContent({ ...guideContent, closingBlock: { ...guideContent.closingBlock!, isVisible: v } })} />
                  <h3 className="font-semibold text-[#1d293d]">Closing block</h3>
                  <AdminField label="Title"><input className={inputClass()} value={guideContent.closingBlock.title} onChange={(e) => setGuideContent({ ...guideContent, closingBlock: { ...guideContent.closingBlock!, title: e.target.value } })} /></AdminField>
                  <AdminField label="Paragraphs"><textarea className={inputClass()} rows={5} value={guideContent.closingBlock.paragraphs.join("\n\n")} onChange={(e) => setGuideContent({ ...guideContent, closingBlock: { ...guideContent.closingBlock!, paragraphs: e.target.value.split("\n\n").map((p) => p.trim()).filter(Boolean) } })} /></AdminField>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <AdminField label="Primary button"><input className={inputClass()} value={guideContent.closingBlock.primaryLabel} onChange={(e) => setGuideContent({ ...guideContent, closingBlock: { ...guideContent.closingBlock!, primaryLabel: e.target.value } })} /></AdminField>
                    <AdminReadOnlyUrlField label="Primary link" value={guideContent.closingBlock.primaryLink} />
                    <AdminField label="Secondary button"><input className={inputClass()} value={guideContent.closingBlock.secondaryLabel} onChange={(e) => setGuideContent({ ...guideContent, closingBlock: { ...guideContent.closingBlock!, secondaryLabel: e.target.value } })} /></AdminField>
                    <AdminReadOnlyUrlField label="Secondary link" value={guideContent.closingBlock.secondaryLink} />
                  </div>
                </div>
              )}
              {guideContent.statsSection && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <SectionVisibilityField visible={guideContent.statsSection.isVisible !== false} onChange={(v) => setGuideContent({ ...guideContent, statsSection: { ...guideContent.statsSection!, isVisible: v } })} />
                  <h3 className="font-semibold text-[#1d293d]">Stats section</h3>
                  <AdminSectionFields title={guideContent.statsSection.title} subtitle={guideContent.statsSection.subtitle ?? ""} onTitleChange={(v) => setGuideContent({ ...guideContent, statsSection: { ...guideContent.statsSection!, title: v } })} onSubtitleChange={(v) => setGuideContent({ ...guideContent, statsSection: { ...guideContent.statsSection!, subtitle: v } })} />
                  <CardListEditor cards={guideContent.statsSection.cards} onChange={(cards) => setGuideContent({ ...guideContent, statsSection: { ...guideContent.statsSection!, cards } })} />
                </div>
              )}
              {guideContent.bottomCta && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <SectionVisibilityField visible={guideContent.bottomCta.isVisible !== false} onChange={(v) => setGuideContent({ ...guideContent, bottomCta: { ...guideContent.bottomCta!, isVisible: v } })} />
                  <h3 className="font-semibold text-[#1d293d]">Bottom CTA</h3>
                  <AdminField label="Title"><input className={inputClass()} value={guideContent.bottomCta.title} onChange={(e) => setGuideContent({ ...guideContent, bottomCta: { ...guideContent.bottomCta!, title: e.target.value } })} /></AdminField>
                  <AdminField label="Subtitle"><textarea className={inputClass()} rows={2} value={guideContent.bottomCta.subtitle} onChange={(e) => setGuideContent({ ...guideContent, bottomCta: { ...guideContent.bottomCta!, subtitle: e.target.value } })} /></AdminField>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <AdminField label="Primary button"><input className={inputClass()} value={guideContent.bottomCta.primaryLabel} onChange={(e) => setGuideContent({ ...guideContent, bottomCta: { ...guideContent.bottomCta!, primaryLabel: e.target.value } })} /></AdminField>
                    <AdminReadOnlyUrlField label="Primary link" value={guideContent.bottomCta.primaryLink} />
                    <AdminField label="Secondary button"><input className={inputClass()} value={guideContent.bottomCta.secondaryLabel} onChange={(e) => setGuideContent({ ...guideContent, bottomCta: { ...guideContent.bottomCta!, secondaryLabel: e.target.value } })} /></AdminField>
                    <AdminReadOnlyUrlField label="Secondary link" value={guideContent.bottomCta.secondaryLink} />
                  </div>
                </div>
              )}
              {guideContent.relatedGuides && (
                <div className="space-y-4 pt-6 border-t border-gray-100">
                  <SectionVisibilityField visible={guideContent.relatedGuides.isVisible !== false} onChange={(v) => setGuideContent({ ...guideContent, relatedGuides: { ...guideContent.relatedGuides!, isVisible: v } })} />
                  <AdminField label="Related guides title"><input className={inputClass()} value={guideContent.relatedGuides.title} onChange={(e) => setGuideContent({ ...guideContent, relatedGuides: { ...guideContent.relatedGuides!, title: e.target.value } })} /></AdminField>
                  <CardListEditor showLinks cards={guideContent.relatedGuides.cards} onChange={(cards) => setGuideContent({ ...guideContent, relatedGuides: { ...guideContent.relatedGuides!, cards } })} />
                </div>
              )}
            </div>
          )}

          {isList && activeTab === "intro" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={listContent.intro.isVisible !== false} onChange={(v) => setListContent({ ...listContent, intro: { ...listContent.intro, isVisible: v } })} />
              <AdminField label="Badge"><input className={inputClass()} value={listContent.intro.badge ?? ""} onChange={(e) => setListContent({ ...listContent, intro: { ...listContent.intro, badge: e.target.value } })} /></AdminField>
              <AdminSectionFields title={listContent.intro.title} subtitle={listContent.intro.subtitle ?? ""} onTitleChange={(v) => setListContent({ ...listContent, intro: { ...listContent.intro, title: v } })} onSubtitleChange={(v) => setListContent({ ...listContent, intro: { ...listContent.intro, subtitle: v } })} />
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Primary CTA label"><input className={inputClass()} value={listContent.intro.primaryCtaLabel} onChange={(e) => setListContent({ ...listContent, intro: { ...listContent.intro, primaryCtaLabel: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Primary CTA link" value={listContent.intro.primaryCtaLink} />
                <AdminField label="Secondary CTA label"><input className={inputClass()} value={listContent.intro.secondaryCtaLabel ?? ""} onChange={(e) => setListContent({ ...listContent, intro: { ...listContent.intro, secondaryCtaLabel: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Secondary CTA link" value={listContent.intro.secondaryCtaLink ?? ""} />
              </div>
            </div>
          )}

          {isList && activeTab === "items" && slug === "documents" && (
            <DocumentsLibraryTab />
          )}

          {isList && activeTab === "items" && slug === "faq" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                FAQ questions and answers are managed in the FAQ library.
              </p>
              <Link href="/admin/faqs" className="inline-flex items-center gap-2 text-sm font-medium text-[#00a69c] hover:text-[#0d8a99]">
                Open FAQ manager <span aria-hidden>↗</span>
              </Link>
            </div>
          )}

          {isList && activeTab === "bottom-cta" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={listContent.bottomCta.isVisible !== false} onChange={(v) => setListContent({ ...listContent, bottomCta: { ...listContent.bottomCta, isVisible: v } })} />
              <AdminField label="Title"><input className={inputClass()} value={listContent.bottomCta.title} onChange={(e) => setListContent({ ...listContent, bottomCta: { ...listContent.bottomCta, title: e.target.value } })} /></AdminField>
              <AdminField label="Body"><textarea className={inputClass()} rows={3} value={listContent.bottomCta.body} onChange={(e) => setListContent({ ...listContent, bottomCta: { ...listContent.bottomCta, body: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Primary label"><input className={inputClass()} value={listContent.bottomCta.primaryLabel} onChange={(e) => setListContent({ ...listContent, bottomCta: { ...listContent.bottomCta, primaryLabel: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Primary link" value={listContent.bottomCta.primaryLink} />
                <AdminField label="Secondary label"><input className={inputClass()} value={listContent.bottomCta.secondaryLabel} onChange={(e) => setListContent({ ...listContent, bottomCta: { ...listContent.bottomCta, secondaryLabel: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Secondary link" value={listContent.bottomCta.secondaryLink} />
              </div>
            </div>
          )}
    </AdminEditorShell>
  );
}
