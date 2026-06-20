"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import type { ContentCard } from "@/lib/page-content";
import {
  mergeLoanPageContent,
  mergeServicesContent,
  type LoanPageContent,
  type ServiceSlug,
  type ServicesContent,
  type TopicTile,
} from "@/lib/services-content";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup, AdminSectionFields } from "@/app/components/admin/home/AdminCardGroup";
import HomeTeamTab from "@/app/components/admin/home/HomeTeamTab";

type TabDef = { id: string; label: string; description: string };

const SERVICES_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "services", label: "Service cards", description: "All lending service cards shown on the page." },
  { id: "why-us", label: "Why choose us", description: "Benefits of choosing ALS." },
  { id: "team", label: "Team", description: "Team members shown on the services page." },
];

const LOAN_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "topic-tiles", label: "Topic tiles", description: "Three main option cards at the top of the page." },
  { id: "other-solutions", label: "Other solutions", description: "Additional solution cards (if shown)." },
  { id: "spotlight", label: "Detail sections", description: "In-depth sections with title and highlight card." },
  { id: "why-us", label: "Why choose us", description: "Why choose ALS feature cards." },
  { id: "benefits", label: "Benefits", description: "Benefits section cards." },
  { id: "more-services", label: "More services", description: "Additional services at the bottom." },
  { id: "faqs", label: "FAQs", description: "Frequently asked questions." },
];

type HeroForm = {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  isPublished: boolean;
};

function updateCard<T>(arr: T[], index: number, patch: Partial<T>): T[] {
  return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

function CardListEditor({
  cards,
  onChange,
  showLinks = false,
  showAnchor = false,
}: {
  cards: ContentCard[];
  onChange: (cards: ContentCard[]) => void;
  showLinks?: boolean;
  showAnchor?: boolean;
}) {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <AdminCardGroup key={index} index={index} title={card.title || `Card ${index + 1}`}>
          <AdminField label="Title">
            <input className={inputClass()} value={card.title} onChange={(e) => onChange(updateCard(cards, index, { title: e.target.value }))} />
          </AdminField>
          <AdminField label="Description">
            <textarea className={inputClass()} rows={3} value={card.description} onChange={(e) => onChange(updateCard(cards, index, { description: e.target.value }))} />
          </AdminField>
          {showLinks && (
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminReadOnlyUrlField label="Link URL" value={card.link ?? ""} />
              <AdminField label="Link label">
                <input className={inputClass()} value={card.linkLabel ?? ""} onChange={(e) => onChange(updateCard(cards, index, { linkLabel: e.target.value }))} />
              </AdminField>
            </div>
          )}
          {showAnchor && (
            <AdminField label="Scroll anchor ID (optional)">
              <input
                className={inputClass()}
                value={(card as TopicTile).anchorId ?? ""}
                onChange={(e) => onChange(updateCard(cards, index, { anchorId: e.target.value } as Partial<ContentCard>))}
                placeholder="e.g. first-home-section"
              />
            </AdminField>
          )}
        </AdminCardGroup>
      ))}
    </div>
  );
}

export default function AdminServicesEditor({ slug }: { slug: ServiceSlug }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const isServicesHub = slug === "services";
  const tabs = isServicesHub ? SERVICES_TABS : LOAN_TABS;
  const title = registry?.label ?? slug;
  const previewPath = registry?.path ?? "/services";
  const adminBase = isServicesHub ? "/admin/services" : `/admin/services/${slug}`;

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = tabs.find((t) => t.id === searchParams.get("section"))?.id ?? tabs[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [servicesContent, setServicesContent] = useState<ServicesContent>(() => mergeServicesContent());
  const [loanContent, setLoanContent] = useState<LoanPageContent>(() => mergeLoanPageContent(slug));
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
      if (isServicesHub) setServicesContent(mergeServicesContent(content as Partial<ServicesContent>));
      else setLoanContent(mergeLoanPageContent(slug, content as Partial<LoanPageContent>));
      setLoading(false);
    });
  }, [slug, registry, isServicesHub]);

  const setTab = useCallback(
    (tab: string) => router.replace(`${adminBase}?section=${tab}`, { scroll: false }),
    [router, adminBase],
  );

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const content = isServicesHub ? servicesContent : loanContent;
    const body = { ...rawPage, slug, group: registry?.group ?? "Services", label: registry?.label ?? slug, path: registry?.path ?? "", ...hero, content };
    const res = await clientApi(`/admin/pages/${slug}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  if (loading) return <AdminLoading />;

  const crudTabs = ["team"];
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

          {isServicesHub && activeTab === "services" && (
            <div className="space-y-6">
              <AdminSectionFields title={servicesContent.servicesList.title} subtitle={servicesContent.servicesList.subtitle ?? ""} onTitleChange={(v) => setServicesContent({ ...servicesContent, servicesList: { ...servicesContent.servicesList, title: v } })} onSubtitleChange={(v) => setServicesContent({ ...servicesContent, servicesList: { ...servicesContent.servicesList, subtitle: v } })} />
              <CardListEditor showLinks cards={servicesContent.servicesList.cards} onChange={(cards) => setServicesContent({ ...servicesContent, servicesList: { ...servicesContent.servicesList, cards } })} />
            </div>
          )}

          {isServicesHub && activeTab === "why-us" && (
            <div className="space-y-6">
              <AdminSectionFields title={servicesContent.whyUs.title} subtitle={servicesContent.whyUs.subtitle ?? ""} onTitleChange={(v) => setServicesContent({ ...servicesContent, whyUs: { ...servicesContent.whyUs, title: v } })} onSubtitleChange={(v) => setServicesContent({ ...servicesContent, whyUs: { ...servicesContent.whyUs, subtitle: v } })} />
              <CardListEditor cards={servicesContent.whyUs.cards} onChange={(cards) => setServicesContent({ ...servicesContent, whyUs: { ...servicesContent.whyUs, cards } })} />
            </div>
          )}

          {isServicesHub && activeTab === "team" && (
            <div className="space-y-6">
              <AdminSectionFields title={servicesContent.teamSection.title} subtitle={servicesContent.teamSection.subtitle ?? ""} onTitleChange={(v) => setServicesContent({ ...servicesContent, teamSection: { ...servicesContent.teamSection, title: v } })} onSubtitleChange={(v) => setServicesContent({ ...servicesContent, teamSection: { ...servicesContent.teamSection, subtitle: v } })} />
              <HomeTeamTab />
            </div>
          )}

          {!isServicesHub && activeTab === "topic-tiles" && (
            <CardListEditor showAnchor cards={loanContent.topicTiles} onChange={(topicTiles) => setLoanContent({ ...loanContent, topicTiles: topicTiles as TopicTile[] })} />
          )}

          {!isServicesHub && activeTab === "other-solutions" && loanContent.otherSolutions && (
            <div className="space-y-6">
              <AdminField label="Section title"><input className={inputClass()} value={loanContent.otherSolutions.title} onChange={(e) => setLoanContent({ ...loanContent, otherSolutions: { ...loanContent.otherSolutions!, title: e.target.value } })} /></AdminField>
              <CardListEditor showLinks cards={loanContent.otherSolutions.cards} onChange={(cards) => setLoanContent({ ...loanContent, otherSolutions: { ...loanContent.otherSolutions!, cards } })} />
            </div>
          )}

          {!isServicesHub && activeTab === "spotlight" && (
            <div className="space-y-4">
              {loanContent.spotlightSections.map((section, index) => (
                <AdminCardGroup key={index} index={index} title={section.title || `Section ${index + 1}`}>
                  <AdminField label="Anchor ID"><input className={inputClass()} value={section.id ?? ""} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { id: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  <AdminField label="Section title"><input className={inputClass()} value={section.title} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { title: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  <AdminField label="Section subtitle"><textarea className={inputClass()} rows={3} value={section.subtitle} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { subtitle: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  <AdminField label="Highlight card title"><input className={inputClass()} value={section.cardTitle} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { cardTitle: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  <AdminField label="Highlight card body"><textarea className={inputClass()} rows={4} value={section.cardBody} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { cardBody: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <AdminReadOnlyUrlField label="Link URL" value={section.link ?? ""} />
                    <AdminField label="Link label"><input className={inputClass()} value={section.linkLabel ?? ""} onChange={(e) => { const spotlightSections = updateCard(loanContent.spotlightSections, index, { linkLabel: e.target.value }); setLoanContent({ ...loanContent, spotlightSections }); }} /></AdminField>
                  </div>
                </AdminCardGroup>
              ))}
              <button type="button" onClick={() => setLoanContent({ ...loanContent, spotlightSections: [...loanContent.spotlightSections, { title: "", subtitle: "", cardTitle: "", cardBody: "" }] })} className="text-sm font-medium text-teal-600 hover:text-teal-700">+ Add section</button>
            </div>
          )}

          {!isServicesHub && activeTab === "why-us" && loanContent.whyUs && (
            <div className="space-y-6">
              <AdminSectionFields title={loanContent.whyUs.title} subtitle={loanContent.whyUs.subtitle ?? ""} onTitleChange={(v) => setLoanContent({ ...loanContent, whyUs: { ...loanContent.whyUs!, title: v } })} onSubtitleChange={(v) => setLoanContent({ ...loanContent, whyUs: { ...loanContent.whyUs!, subtitle: v } })} />
              <CardListEditor cards={loanContent.whyUs.cards} onChange={(cards) => setLoanContent({ ...loanContent, whyUs: { ...loanContent.whyUs!, cards } })} />
            </div>
          )}

          {!isServicesHub && activeTab === "benefits" && (
            <div className="space-y-6">
              <AdminSectionFields title={loanContent.benefits.title} subtitle={loanContent.benefits.subtitle ?? ""} onTitleChange={(v) => setLoanContent({ ...loanContent, benefits: { ...loanContent.benefits, title: v } })} onSubtitleChange={(v) => setLoanContent({ ...loanContent, benefits: { ...loanContent.benefits, subtitle: v } })} />
              <CardListEditor cards={loanContent.benefits.cards} onChange={(cards) => setLoanContent({ ...loanContent, benefits: { ...loanContent.benefits, cards } })} />
            </div>
          )}

          {!isServicesHub && activeTab === "more-services" && (
            <div className="space-y-6">
              <AdminSectionFields title={loanContent.moreServices.title} subtitle={loanContent.moreServices.subtitle ?? ""} onTitleChange={(v) => setLoanContent({ ...loanContent, moreServices: { ...loanContent.moreServices, title: v } })} onSubtitleChange={(v) => setLoanContent({ ...loanContent, moreServices: { ...loanContent.moreServices, subtitle: v } })} />
              <CardListEditor cards={loanContent.moreServices.cards} onChange={(cards) => setLoanContent({ ...loanContent, moreServices: { ...loanContent.moreServices, cards } })} />
            </div>
          )}

          {!isServicesHub && activeTab === "faqs" && (
            <div className="space-y-6">
              <AdminSectionFields title={loanContent.faqs.title} subtitle={loanContent.faqs.subtitle ?? ""} onTitleChange={(v) => setLoanContent({ ...loanContent, faqs: { ...loanContent.faqs, title: v } })} onSubtitleChange={(v) => setLoanContent({ ...loanContent, faqs: { ...loanContent.faqs, subtitle: v } })} />
              <div className="space-y-4">
                {loanContent.faqs.items.map((faq, index) => (
                  <AdminCardGroup key={index} index={index} title={faq.question || `FAQ ${index + 1}`}>
                    <AdminField label="Question"><input className={inputClass()} value={faq.question} onChange={(e) => { const items = updateCard(loanContent.faqs.items, index, { question: e.target.value }); setLoanContent({ ...loanContent, faqs: { ...loanContent.faqs, items } }); }} /></AdminField>
                    <AdminField label="Answer"><textarea className={inputClass()} rows={4} value={faq.answer} onChange={(e) => { const items = updateCard(loanContent.faqs.items, index, { answer: e.target.value }); setLoanContent({ ...loanContent, faqs: { ...loanContent.faqs, items } }); }} /></AdminField>
                  </AdminCardGroup>
                ))}
                <button type="button" onClick={() => setLoanContent({ ...loanContent, faqs: { ...loanContent.faqs, items: [...loanContent.faqs.items, { question: "", answer: "" }] } })} className="text-sm font-medium text-teal-600 hover:text-teal-700">+ Add FAQ</button>
              </div>
            </div>
          )}
    </AdminEditorShell>
  );
}
