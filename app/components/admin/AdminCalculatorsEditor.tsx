"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import type { ContentCard } from "@/lib/page-content";
import {
  mergeCalculatorPageContent,
  mergeCalculatorsHubContent,
  type CalculatorPageContent,
  type CalculatorSlug,
  type CalculatorsHubContent,
  type FactorCard,
  type InfoBlock,
  type StrategyItem,
} from "@/lib/calculator-content";
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
import { AdminImagePanelShell, GenericImagePanel, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import HomeTeamTab from "@/app/components/admin/home/HomeTeamTab";

type TabDef = { id: string; label: string; description: string };

const HUB_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "calculators", label: "Calculator cards", description: "Cards linking to each calculator tool." },
  { id: "founder", label: "Founder spotlight", description: "Featured founder card on the calculators page." },
  { id: "team", label: "Team", description: "Team members shown below the founder card." },
];

const TOOL_TABS: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "calculator", label: "Calculator", description: "Page heading and embedded calculator iframe." },
  { id: "disclaimer", label: "Disclaimer", description: "Important information notice below the calculator." },
  { id: "info", label: "Info section", description: "Educational content, factor cards, and tips." },
  { id: "resources", label: "Resources", description: "Helpful guide links shown on the page." },
  { id: "sidebar", label: "Sidebar", description: "Government benefits and special offer cards." },
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

function CardListEditor({
  cards,
  onChange,
  showLinks = false,
}: {
  cards: ContentCard[];
  onChange: (cards: ContentCard[]) => void;
  showLinks?: boolean;
}) {
  return (
    <div className="space-y-4">
      {cards.map((card, index) => (
        <AdminCardGroup key={index} index={index} title={card.title || `Card ${index + 1}`}>
          <AdminField label="Title">
            <input className={inputClass()} value={card.title} onChange={(e) => onChange(updateAt(cards, index, { title: e.target.value }))} />
          </AdminField>
          <AdminField label="Description">
            <textarea className={inputClass()} rows={3} value={card.description} onChange={(e) => onChange(updateAt(cards, index, { description: e.target.value }))} />
          </AdminField>
          {showLinks && (
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminReadOnlyUrlField label="Link URL" value={card.link ?? ""} />
              <AdminField label="Link label">
                <input className={inputClass()} value={card.linkLabel ?? ""} onChange={(e) => onChange(updateAt(cards, index, { linkLabel: e.target.value }))} />
              </AdminField>
            </div>
          )}
        </AdminCardGroup>
      ))}
      <button type="button" onClick={() => onChange([...cards, { title: "", description: "" }])} className="text-sm text-[#00a69c] hover:underline">+ Add card</button>
    </div>
  );
}

export default function AdminCalculatorsEditor({ slug }: { slug: CalculatorSlug }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const isHub = slug === "calculator";
  const tabs = isHub ? HUB_TABS : TOOL_TABS;
  const title = registry?.label ?? slug;
  const previewPath = registry?.path ?? "/calculator";
  const adminBase = isHub ? "/admin/calculators" : `/admin/calculators/${slug}`;

  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = tabs.find((t) => t.id === searchParams.get("section"))?.id ?? tabs[0].id;

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [hubContent, setHubContent] = useState<CalculatorsHubContent>(() => mergeCalculatorsHubContent());
  const [toolContent, setToolContent] = useState<CalculatorPageContent>(() => mergeCalculatorPageContent(slug));
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
      if (isHub) setHubContent(mergeCalculatorsHubContent(content as Partial<CalculatorsHubContent>));
      else setToolContent(mergeCalculatorPageContent(slug, content as Partial<CalculatorPageContent>));
      setLoading(false);
    });
  }, [slug, registry, isHub]);

  const setTab = useCallback(
    (tab: string) => router.replace(`${adminBase}?section=${tab}`, { scroll: false }),
    [router, adminBase],
  );

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const content = isHub ? hubContent : toolContent;
    const body = { ...rawPage, slug, group: registry?.group ?? "Tools", label: registry?.label ?? slug, path: registry?.path ?? "", ...hero, content };
    const res = await clientApi(`/admin/pages/${slug}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  function updateFactorCards(factorCards: FactorCard[]) {
    setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, factorCards } });
  }

  function updateStrategies(strategies: StrategyItem[]) {
    setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, strategies } });
  }

  function updateExtraBlocks(extraBlocks: InfoBlock[]) {
    setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, extraBlocks } });
  }

  if (loading) return <AdminLoading />;

  const crudTabs = ["team"];
  const showSaveBar = !crudTabs.includes(activeTab);

  const imagePanel =
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
    ) : isHub && activeTab === "founder" ? (
      <AdminImagePanelShell
        title="Founder photo"
        description="Photo shown in the founder spotlight section."
        onSave={save}
        saving={saving}
        status={status}
      >
        <GenericImagePanel
          label="Photo"
          value={hubContent.founderSpotlight.imageUrl}
          onChange={(url) =>
            setHubContent({
              ...hubContent,
              founderSpotlight: { ...hubContent.founderSpotlight, imageUrl: url },
            })
          }
          folder="als/team"
          aspectClass="aspect-[3/4]"
          hint="Portrait photo. Recommended 600×800."
        />
      </AdminImagePanelShell>
    ) : undefined;

  return (
    <AdminEditorShell
      title={title}
      previewHref={previewPath}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setTab}
      imagePanel={imagePanel}
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

          {isHub && activeTab === "calculators" && (
            <>
              <SectionVisibilityField visible={hubContent.calculatorCardsSection.isVisible !== false} onChange={(v) => setHubContent({ ...hubContent, calculatorCardsSection: { ...hubContent.calculatorCardsSection, isVisible: v } })} />
              <CardListEditor showLinks cards={hubContent.calculatorCards} onChange={(calculatorCards) => setHubContent({ ...hubContent, calculatorCards })} />
            </>
          )}

          {isHub && activeTab === "founder" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={hubContent.founderSpotlight.isVisible !== false} onChange={(v) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, isVisible: v } })} />
              <AdminField label="Badge"><input className={inputClass()} value={hubContent.founderSpotlight.badge} onChange={(e) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, badge: e.target.value } })} /></AdminField>
              <AdminField label="Name"><input className={inputClass()} value={hubContent.founderSpotlight.name} onChange={(e) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, name: e.target.value } })} /></AdminField>
              <AdminField label="Role"><input className={inputClass()} value={hubContent.founderSpotlight.role} onChange={(e) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, role: e.target.value } })} /></AdminField>
              <AdminField label="Bio"><textarea className={inputClass()} rows={4} value={hubContent.founderSpotlight.bio} onChange={(e) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, bio: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="CTA label"><input className={inputClass()} value={hubContent.founderSpotlight.ctaLabel} onChange={(e) => setHubContent({ ...hubContent, founderSpotlight: { ...hubContent.founderSpotlight, ctaLabel: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="CTA link" value={hubContent.founderSpotlight.ctaLink} />
              </div>
            </div>
          )}

          {isHub && activeTab === "team" && (
            <div className="space-y-6">
              <SectionVisibilityField visible={hubContent.teamSection.isVisible !== false} onChange={(v) => setHubContent({ ...hubContent, teamSection: { ...hubContent.teamSection, isVisible: v } })} />
              <AdminSectionFields title={hubContent.teamSection.title} subtitle={hubContent.teamSection.subtitle ?? ""} onTitleChange={(v) => setHubContent({ ...hubContent, teamSection: { ...hubContent.teamSection, title: v } })} onSubtitleChange={(v) => setHubContent({ ...hubContent, teamSection: { ...hubContent.teamSection, subtitle: v } })} />
              <HomeTeamTab />
            </div>
          )}

          {!isHub && activeTab === "calculator" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={toolContent.pageHeader.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, pageHeader: { ...toolContent.pageHeader, isVisible: v } })} />
              <AdminField label="Page title"><input className={inputClass()} value={toolContent.pageHeader.title} onChange={(e) => setToolContent({ ...toolContent, pageHeader: { ...toolContent.pageHeader, title: e.target.value } })} /></AdminField>
              <AdminField label="Page subtitle"><textarea className={inputClass()} rows={3} value={toolContent.pageHeader.subtitle} onChange={(e) => setToolContent({ ...toolContent, pageHeader: { ...toolContent.pageHeader, subtitle: e.target.value } })} /></AdminField>
              <AdminField label="Iframe URL"><input className={inputClass()} value={toolContent.iframe.src} onChange={(e) => setToolContent({ ...toolContent, iframe: { ...toolContent.iframe, src: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Iframe title"><input className={inputClass()} value={toolContent.iframe.title} onChange={(e) => setToolContent({ ...toolContent, iframe: { ...toolContent.iframe, title: e.target.value } })} /></AdminField>
                <AdminField label="Iframe height"><input className={inputClass()} value={toolContent.iframe.height} onChange={(e) => setToolContent({ ...toolContent, iframe: { ...toolContent.iframe, height: e.target.value } })} placeholder="700px" /></AdminField>
              </div>
            </div>
          )}

          {!isHub && activeTab === "disclaimer" && (
            <div className="space-y-4">
              <SectionVisibilityField visible={toolContent.disclaimer.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, disclaimer: { ...toolContent.disclaimer, isVisible: v } })} />
              <AdminField label="Title"><input className={inputClass()} value={toolContent.disclaimer.title} onChange={(e) => setToolContent({ ...toolContent, disclaimer: { ...toolContent.disclaimer, title: e.target.value } })} /></AdminField>
              <AdminField label="Body"><textarea className={inputClass()} rows={5} value={toolContent.disclaimer.body} onChange={(e) => setToolContent({ ...toolContent, disclaimer: { ...toolContent.disclaimer, body: e.target.value } })} /></AdminField>
            </div>
          )}

          {!isHub && activeTab === "info" && (
            <div className="space-y-6">
              <SectionVisibilityField visible={toolContent.infoSection.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, isVisible: v } })} />
              <AdminField label="Section title"><input className={inputClass()} value={toolContent.infoSection.title} onChange={(e) => setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, title: e.target.value } })} /></AdminField>
              <AdminField label="Intro"><textarea className={inputClass()} rows={4} value={toolContent.infoSection.intro} onChange={(e) => setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, intro: e.target.value } })} /></AdminField>

              <div className="space-y-4">
                <h3 className="font-semibold text-[#1d293d]">Factor cards</h3>
                {toolContent.infoSection.factorCards.map((card, index) => (
                  <AdminCardGroup key={index} index={index} title={card.title || `Factor card ${index + 1}`}>
                    <AdminField label="Title"><input className={inputClass()} value={card.title} onChange={(e) => updateFactorCards(updateAt(toolContent.infoSection.factorCards, index, { title: e.target.value }))} /></AdminField>
                    <AdminField label="Bullet points (one per line)">
                      <textarea className={inputClass()} rows={5} value={itemsToLines(card.items)} onChange={(e) => updateFactorCards(updateAt(toolContent.infoSection.factorCards, index, { items: linesToItems(e.target.value) }))} />
                    </AdminField>
                  </AdminCardGroup>
                ))}
                <button type="button" onClick={() => updateFactorCards([...toolContent.infoSection.factorCards, { title: "", items: [] }])} className="text-sm text-[#00a69c] hover:underline">+ Add factor card</button>
              </div>

              {(toolContent.infoSection.strategies || toolContent.infoSection.strategiesTitle) && (
                <div className="space-y-4">
                  <AdminField label="Tips / strategies title"><input className={inputClass()} value={toolContent.infoSection.strategiesTitle ?? ""} onChange={(e) => setToolContent({ ...toolContent, infoSection: { ...toolContent.infoSection, strategiesTitle: e.target.value } })} /></AdminField>
                  {(toolContent.infoSection.strategies ?? []).map((item, index) => (
                    <AdminCardGroup key={index} index={index} title={item.title || item.description.slice(0, 40) || `Tip ${index + 1}`}>
                      <AdminField label="Title (optional)"><input className={inputClass()} value={item.title} onChange={(e) => updateStrategies(updateAt(toolContent.infoSection.strategies ?? [], index, { title: e.target.value }))} /></AdminField>
                      <AdminField label="Description"><textarea className={inputClass()} rows={2} value={item.description} onChange={(e) => updateStrategies(updateAt(toolContent.infoSection.strategies ?? [], index, { description: e.target.value }))} /></AdminField>
                    </AdminCardGroup>
                  ))}
                  <button type="button" onClick={() => updateStrategies([...(toolContent.infoSection.strategies ?? []), { title: "", description: "" }])} className="text-sm text-[#00a69c] hover:underline">+ Add tip</button>
                </div>
              )}

              {(toolContent.infoSection.extraBlocks ?? []).length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#1d293d]">Extra info blocks</h3>
                  {(toolContent.infoSection.extraBlocks ?? []).map((block, index) => (
                    <AdminCardGroup key={index} index={index} title={block.title || `Block ${index + 1}`}>
                      <AdminField label="Title"><input className={inputClass()} value={block.title} onChange={(e) => updateExtraBlocks(updateAt(toolContent.infoSection.extraBlocks ?? [], index, { title: e.target.value }))} /></AdminField>
                      <AdminField label="Intro (optional)"><textarea className={inputClass()} rows={2} value={block.intro ?? ""} onChange={(e) => updateExtraBlocks(updateAt(toolContent.infoSection.extraBlocks ?? [], index, { intro: e.target.value }))} /></AdminField>
                      <AdminField label="Items (one per line)">
                        <textarea className={inputClass()} rows={5} value={itemsToLines(block.items)} onChange={(e) => updateExtraBlocks(updateAt(toolContent.infoSection.extraBlocks ?? [], index, { items: linesToItems(e.target.value) }))} />
                      </AdminField>
                    </AdminCardGroup>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isHub && activeTab === "resources" && (
            <div className="space-y-6">
              <SectionVisibilityField visible={toolContent.resourcesSection.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, resourcesSection: { ...toolContent.resourcesSection, isVisible: v } })} />
              <AdminSectionFields title={toolContent.resourcesSection.title} subtitle={toolContent.resourcesSection.subtitle ?? ""} onTitleChange={(v) => setToolContent({ ...toolContent, resourcesSection: { ...toolContent.resourcesSection, title: v } })} onSubtitleChange={(v) => setToolContent({ ...toolContent, resourcesSection: { ...toolContent.resourcesSection, subtitle: v } })} />
              <CardListEditor showLinks cards={toolContent.resourcesSection.cards} onChange={(cards) => setToolContent({ ...toolContent, resourcesSection: { ...toolContent.resourcesSection, cards } })} />
            </div>
          )}

          {!isHub && activeTab === "sidebar" && (
            <div className="space-y-8">
              <SectionVisibilityField visible={toolContent.governmentBenefits.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, isVisible: v } })} />
              <div className="space-y-4">
                <h3 className="font-semibold text-[#1d293d]">Government benefits</h3>
                <AdminField label="Card title"><input className={inputClass()} value={toolContent.governmentBenefits.title} onChange={(e) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, title: e.target.value } })} /></AdminField>
                <AdminField label="Card subtitle"><input className={inputClass()} value={toolContent.governmentBenefits.subtitle} onChange={(e) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, subtitle: e.target.value } })} /></AdminField>
                <AdminField label="Section heading"><input className={inputClass()} value={toolContent.governmentBenefits.sectionTitle} onChange={(e) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, sectionTitle: e.target.value } })} /></AdminField>
                <AdminField label="Benefit items (one per line)">
                  <textarea className={inputClass()} rows={6} value={itemsToLines(toolContent.governmentBenefits.items)} onChange={(e) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, items: linesToItems(e.target.value) } })} />
                </AdminField>
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="CTA label"><input className={inputClass()} value={toolContent.governmentBenefits.ctaLabel} onChange={(e) => setToolContent({ ...toolContent, governmentBenefits: { ...toolContent.governmentBenefits, ctaLabel: e.target.value } })} /></AdminField>
                  <AdminReadOnlyUrlField label="CTA link" value={toolContent.governmentBenefits.ctaLink} />
                </div>
              </div>
              <SectionVisibilityField visible={toolContent.specialOffer.isVisible !== false} onChange={(v) => setToolContent({ ...toolContent, specialOffer: { ...toolContent.specialOffer, isVisible: v } })} />
              <div className="space-y-4 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-[#1d293d]">Special offer</h3>
                <AdminField label="Title"><input className={inputClass()} value={toolContent.specialOffer.title} onChange={(e) => setToolContent({ ...toolContent, specialOffer: { ...toolContent.specialOffer, title: e.target.value } })} /></AdminField>
                <AdminField label="Body"><textarea className={inputClass()} rows={3} value={toolContent.specialOffer.body} onChange={(e) => setToolContent({ ...toolContent, specialOffer: { ...toolContent.specialOffer, body: e.target.value } })} /></AdminField>
                <div className="grid sm:grid-cols-2 gap-4">
                  <AdminField label="CTA label"><input className={inputClass()} value={toolContent.specialOffer.ctaLabel} onChange={(e) => setToolContent({ ...toolContent, specialOffer: { ...toolContent.specialOffer, ctaLabel: e.target.value } })} /></AdminField>
                  <AdminReadOnlyUrlField label="CTA link" value={toolContent.specialOffer.ctaLink} />
                </div>
              </div>
            </div>
          )}
    </AdminEditorShell>
  );
}
