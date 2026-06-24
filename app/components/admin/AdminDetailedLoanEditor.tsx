"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import {
  mergeDetailedLoanContent,
  type DetailedLoanContent,
  type DetailFeatureGroup,
  type DetailSpotlight,
} from "@/lib/loan-detail-content";
import type { ContentCard } from "@/lib/page-content";
import { LOAN_ICON_NAMES } from "@/app/components/loan/loan-icons";
import {
  AdminField,
  SaveButton,
  inputClass,
  AdminReadOnlyUrlField,
  AdminGhostButton,
} from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminImagePanelShell, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup, AdminSectionFields } from "@/app/components/admin/home/AdminCardGroup";
import SectionVisibilityField from "@/app/components/admin/SectionVisibilityField";

type TabDef = { id: string; label: string; description: string };

function replaceAt<T>(arr: T[], i: number, v: T): T[] {
  return arr.map((x, k) => (k === i ? v : x));
}
function removeAt<T>(arr: T[], i: number): T[] {
  return arr.filter((_, k) => k !== i);
}

function IconSelect({
  value,
  onChange,
  label = "Icon",
}: {
  value?: string;
  onChange: (v: string) => void;
  label?: string;
}) {
  return (
    <AdminField label={label}>
      <select className={inputClass()} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">(none)</option>
        {LOAN_ICON_NAMES.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </AdminField>
  );
}

function LinesField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  rows?: number;
}) {
  return (
    <AdminField label={label}>
      <textarea
        className={inputClass()}
        rows={rows}
        value={(value ?? []).join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
      <p className="mt-1 text-xs text-slate-400">One entry per line.</p>
    </AdminField>
  );
}

/** Editor for a list of { title, description } items (benefits / list / steps). */
function TitleDescListEditor({
  items,
  onChange,
  addLabel = "+ Add item",
  itemNoun = "Item",
}: {
  items: { title: string; description: string }[];
  onChange: (v: { title: string; description: string }[]) => void;
  addLabel?: string;
  itemNoun?: string;
}) {
  return (
    <div className="space-y-4">
      {items.map((it, i) => (
        <AdminCardGroup key={i} index={i} title={it.title || `${itemNoun} ${i + 1}`}>
          <AdminField label="Title">
            <input
              className={inputClass()}
              value={it.title}
              onChange={(e) => onChange(replaceAt(items, i, { ...it, title: e.target.value }))}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={2}
              value={it.description}
              onChange={(e) => onChange(replaceAt(items, i, { ...it, description: e.target.value }))}
            />
          </AdminField>
          <AdminGhostButton onClick={() => onChange(removeAt(items, i))}>Remove</AdminGhostButton>
        </AdminCardGroup>
      ))}
      <AdminGhostButton onClick={() => onChange([...items, { title: "", description: "" }])}>
        {addLabel}
      </AdminGhostButton>
    </div>
  );
}

/** Editor for cards with icon + title + description + bullets (used by "cards" feature groups). */
function FeatureCardsEditor({
  cards,
  onChange,
}: {
  cards: NonNullable<DetailFeatureGroup["cards"]>;
  onChange: (v: NonNullable<DetailFeatureGroup["cards"]>) => void;
}) {
  return (
    <div className="space-y-4">
      {cards.map((card, i) => (
        <AdminCardGroup key={i} index={i} title={card.title || `Card ${i + 1}`}>
          <IconSelect value={card.icon} onChange={(v) => onChange(replaceAt(cards, i, { ...card, icon: v }))} />
          <AdminField label="Title">
            <input
              className={inputClass()}
              value={card.title}
              onChange={(e) => onChange(replaceAt(cards, i, { ...card, title: e.target.value }))}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={2}
              value={card.description ?? ""}
              onChange={(e) => onChange(replaceAt(cards, i, { ...card, description: e.target.value }))}
            />
          </AdminField>
          <LinesField
            label="Bullets"
            value={card.bullets ?? []}
            onChange={(v) => onChange(replaceAt(cards, i, { ...card, bullets: v }))}
          />
          <AdminGhostButton onClick={() => onChange(removeAt(cards, i))}>Remove card</AdminGhostButton>
        </AdminCardGroup>
      ))}
      <AdminGhostButton onClick={() => onChange([...cards, { title: "", description: "", bullets: [] }])}>
        + Add card
      </AdminGhostButton>
    </div>
  );
}

function FeatureGroupsEditor({
  groups,
  onChange,
}: {
  groups: DetailFeatureGroup[];
  onChange: (v: DetailFeatureGroup[]) => void;
}) {
  return (
    <div className="space-y-4">
      {groups.map((group, i) => (
        <AdminCardGroup key={i} index={i} title={group.heading || `Group ${i + 1} (${group.kind})`}>
          <AdminField label="Group type">
            <select
              className={inputClass()}
              value={group.kind}
              onChange={(e) =>
                onChange(replaceAt(groups, i, { ...group, kind: e.target.value as DetailFeatureGroup["kind"] }))
              }
            >
              <option value="cards">Cards (icon + bullets)</option>
              <option value="list">List (checklist)</option>
              <option value="steps">Steps (numbered)</option>
            </select>
          </AdminField>
          <AdminField label="Heading">
            <input
              className={inputClass()}
              value={group.heading ?? ""}
              onChange={(e) => onChange(replaceAt(groups, i, { ...group, heading: e.target.value }))}
            />
          </AdminField>
          {group.kind === "cards" ? (
            <FeatureCardsEditor
              cards={group.cards ?? []}
              onChange={(cards) => onChange(replaceAt(groups, i, { ...group, cards }))}
            />
          ) : (
            <TitleDescListEditor
              items={group.items ?? []}
              onChange={(items) => onChange(replaceAt(groups, i, { ...group, items }))}
            />
          )}
          <div className="pt-2">
            <AdminGhostButton onClick={() => onChange(removeAt(groups, i))}>Remove group</AdminGhostButton>
          </div>
        </AdminCardGroup>
      ))}
      <AdminGhostButton onClick={() => onChange([...groups, { kind: "list", heading: "", items: [] }])}>
        + Add feature group
      </AdminGhostButton>
    </div>
  );
}

function InfoBoxEditor({
  infoBox,
  onChange,
}: {
  infoBox: DetailSpotlight["infoBox"];
  onChange: (v: DetailSpotlight["infoBox"]) => void;
}) {
  if (!infoBox) {
    return (
      <AdminGhostButton
        onClick={() => onChange({ variant: "highlight", title: "", paragraphs: [""] })}
      >
        + Add info box
      </AdminGhostButton>
    );
  }
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-4">
      <AdminField label="Style">
        <select
          className={inputClass()}
          value={infoBox.variant}
          onChange={(e) => onChange({ ...infoBox, variant: e.target.value as "warning" | "highlight" })}
        >
          <option value="highlight">Highlight (teal)</option>
          <option value="warning">Warning (amber)</option>
        </select>
      </AdminField>
      <IconSelect value={infoBox.icon} onChange={(v) => onChange({ ...infoBox, icon: v })} />
      <AdminField label="Title">
        <input
          className={inputClass()}
          value={infoBox.title ?? ""}
          onChange={(e) => onChange({ ...infoBox, title: e.target.value })}
        />
      </AdminField>
      <LinesField
        label="Paragraphs"
        rows={5}
        value={infoBox.paragraphs}
        onChange={(v) => onChange({ ...infoBox, paragraphs: v })}
      />
      <AdminGhostButton onClick={() => onChange(null)}>Remove info box</AdminGhostButton>
    </div>
  );
}

/** Cards with icon + title + description (why-us / benefits / more-services). */
function IconCardsEditor({
  cards,
  onChange,
}: {
  cards: ContentCard[];
  onChange: (v: ContentCard[]) => void;
}) {
  return (
    <div className="space-y-4">
      {cards.map((card, i) => (
        <AdminCardGroup key={i} index={i} title={card.title || `Card ${i + 1}`}>
          <IconSelect value={card.icon} onChange={(v) => onChange(replaceAt(cards, i, { ...card, icon: v }))} />
          <AdminField label="Title">
            <input
              className={inputClass()}
              value={card.title}
              onChange={(e) => onChange(replaceAt(cards, i, { ...card, title: e.target.value }))}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={3}
              value={card.description}
              onChange={(e) => onChange(replaceAt(cards, i, { ...card, description: e.target.value }))}
            />
          </AdminField>
        </AdminCardGroup>
      ))}
    </div>
  );
}

const TABS_BASE: TabDef[] = [
  { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
  { id: "topic-tiles", label: "Topic tiles", description: "Three option cards at the top of the page." },
  { id: "spotlight", label: "Detail sections", description: "In-depth sections with benefits, features, and callouts." },
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

export default function AdminDetailedLoanEditor({ slug }: { slug: string }) {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const title = registry?.label ?? slug;
  const previewPath = registry?.path ?? `/${slug}`;
  const adminBase = `/admin/services/${slug}`;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [hero, setHero] = useState<HeroForm>({ heroTitle: "", heroSubtitle: "", heroBackgroundImage: "", isPublished: true });
  const [content, setContent] = useState<DetailedLoanContent>(() => mergeDetailedLoanContent(slug));
  const [rawPage, setRawPage] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const tabs: TabDef[] = content.otherSolutions
    ? [
        TABS_BASE[0],
        TABS_BASE[1],
        { id: "other-solutions", label: "Other solutions", description: "Additional solution cards under the tiles." },
        ...TABS_BASE.slice(2),
      ]
    : TABS_BASE;
  const activeTab = tabs.find((t) => t.id === searchParams.get("section"))?.id ?? tabs[0].id;

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
      const raw = (base.content as Record<string, unknown>) ?? {};
      setContent(mergeDetailedLoanContent(slug, raw as Partial<DetailedLoanContent>));
      setLoading(false);
    });
  }, [slug, registry]);

  const setTab = useCallback(
    (tab: string) => router.replace(`${adminBase}?section=${tab}`, { scroll: false }),
    [router, adminBase],
  );

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const body = {
      ...rawPage,
      slug,
      group: registry?.group ?? "Services",
      label: registry?.label ?? slug,
      path: registry?.path ?? "",
      ...hero,
      content,
    };
    const res = await clientApi(`/admin/pages/${slug}`, { method: "PUT", body: JSON.stringify(body) });
    setSaving(false);
    setStatus(res.success ? "All changes saved" : (res.error?.message ?? "Save failed"));
    if (res.success) setRawPage(body);
  }

  if (loading) return <AdminLoading />;

  const clear = () => setStatus("");
  const updateSpotlight = (i: number, patch: Partial<DetailSpotlight>) => {
    setContent({
      ...content,
      spotlightSections: replaceAt(content.spotlightSections, i, { ...content.spotlightSections[i], ...patch }),
    });
    clear();
  };

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
                clear();
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
              clear();
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
          <AdminField label="Hero title">
            <input
              className={inputClass()}
              value={hero.heroTitle}
              onChange={(e) => {
                setHero({ ...hero, heroTitle: e.target.value });
                clear();
              }}
            />
          </AdminField>
          <AdminField label="Hero subtitle">
            <textarea
              className={inputClass()}
              rows={2}
              value={hero.heroSubtitle}
              onChange={(e) => {
                setHero({ ...hero, heroSubtitle: e.target.value });
                clear();
              }}
            />
          </AdminField>
        </div>
      )}

      {activeTab === "topic-tiles" && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.topicTilesSection.isVisible !== false}
            onChange={(v) => setContent({ ...content, topicTilesSection: { ...content.topicTilesSection, isVisible: v } })}
          />
          <div className="space-y-4">
            {content.topicTiles.map((tile, i) => (
              <AdminCardGroup key={i} index={i} title={tile.title || `Tile ${i + 1}`}>
                <IconSelect
                  value={tile.icon}
                  onChange={(v) => setContent({ ...content, topicTiles: replaceAt(content.topicTiles, i, { ...tile, icon: v }) })}
                />
                <AdminField label="Title">
                  <input
                    className={inputClass()}
                    value={tile.title}
                    onChange={(e) => setContent({ ...content, topicTiles: replaceAt(content.topicTiles, i, { ...tile, title: e.target.value }) })}
                  />
                </AdminField>
                <AdminField label="Description">
                  <textarea
                    className={inputClass()}
                    rows={2}
                    value={tile.description}
                    onChange={(e) => setContent({ ...content, topicTiles: replaceAt(content.topicTiles, i, { ...tile, description: e.target.value }) })}
                  />
                </AdminField>
                <AdminField label="Scroll anchor ID">
                  <input
                    className={inputClass()}
                    value={tile.anchorId ?? ""}
                    onChange={(e) => setContent({ ...content, topicTiles: replaceAt(content.topicTiles, i, { ...tile, anchorId: e.target.value }) })}
                  />
                </AdminField>
                <AdminField label="Link label">
                  <input
                    className={inputClass()}
                    value={tile.linkLabel ?? ""}
                    onChange={(e) => setContent({ ...content, topicTiles: replaceAt(content.topicTiles, i, { ...tile, linkLabel: e.target.value }) })}
                  />
                </AdminField>
              </AdminCardGroup>
            ))}
          </div>
        </div>
      )}

      {activeTab === "other-solutions" && content.otherSolutions && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.otherSolutions.isVisible !== false}
            onChange={(v) => setContent({ ...content, otherSolutions: { ...content.otherSolutions!, isVisible: v } })}
          />
          <AdminField label="Section title">
            <input
              className={inputClass()}
              value={content.otherSolutions.title}
              onChange={(e) => setContent({ ...content, otherSolutions: { ...content.otherSolutions!, title: e.target.value } })}
            />
          </AdminField>
          <div className="space-y-4">
            {content.otherSolutions.cards.map((card, i) => (
              <AdminCardGroup key={i} index={i} title={card.title || `Card ${i + 1}`}>
                <AdminField label="Title">
                  <input
                    className={inputClass()}
                    value={card.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        otherSolutions: { ...content.otherSolutions!, cards: replaceAt(content.otherSolutions!.cards, i, { ...card, title: e.target.value }) },
                      })
                    }
                  />
                </AdminField>
                <AdminField label="Description">
                  <textarea
                    className={inputClass()}
                    rows={2}
                    value={card.description}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        otherSolutions: { ...content.otherSolutions!, cards: replaceAt(content.otherSolutions!.cards, i, { ...card, description: e.target.value }) },
                      })
                    }
                  />
                </AdminField>
                <AdminReadOnlyUrlField label="Link URL" value={card.link ?? ""} />
                <AdminField label="Link label">
                  <input
                    className={inputClass()}
                    value={card.linkLabel ?? ""}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        otherSolutions: { ...content.otherSolutions!, cards: replaceAt(content.otherSolutions!.cards, i, { ...card, linkLabel: e.target.value }) },
                      })
                    }
                  />
                </AdminField>
              </AdminCardGroup>
            ))}
          </div>
        </div>
      )}

      {activeTab === "spotlight" && (
        <div className="space-y-6">
          {content.spotlightSections.map((section, i) => (
            <AdminCardGroup key={i} index={i} title={section.title || `Section ${i + 1}`}>
              <SectionVisibilityField
                visible={section.isVisible !== false}
                onChange={(v) => updateSpotlight(i, { isVisible: v })}
              />
              <AdminField label="Anchor ID">
                <input className={inputClass()} value={section.id ?? ""} onChange={(e) => updateSpotlight(i, { id: e.target.value })} />
              </AdminField>
              <AdminField label="Section title">
                <input className={inputClass()} value={section.title} onChange={(e) => updateSpotlight(i, { title: e.target.value })} />
              </AdminField>
              <AdminField label="Section subtitle">
                <textarea className={inputClass()} rows={3} value={section.subtitle} onChange={(e) => updateSpotlight(i, { subtitle: e.target.value })} />
              </AdminField>
              <IconSelect label="Highlight card icon" value={section.cardIcon} onChange={(v) => updateSpotlight(i, { cardIcon: v })} />
              <AdminField label="Highlight card title">
                <input className={inputClass()} value={section.cardTitle} onChange={(e) => updateSpotlight(i, { cardTitle: e.target.value })} />
              </AdminField>
              <AdminField label="Highlight card paragraph (used when there are no benefit items)">
                <textarea className={inputClass()} rows={3} value={section.cardBody ?? ""} onChange={(e) => updateSpotlight(i, { cardBody: e.target.value })} />
              </AdminField>

              <p className="mb-2 mt-4 text-[13px] font-semibold text-slate-700">Benefit items (checkmark grid)</p>
              <TitleDescListEditor
                items={section.benefits ?? []}
                onChange={(benefits) => updateSpotlight(i, { benefits })}
                addLabel="+ Add benefit"
                itemNoun="Benefit"
              />

              <p className="mb-2 mt-6 text-[13px] font-semibold text-slate-700">Feature groups</p>
              <FeatureGroupsEditor
                groups={section.featureGroups ?? []}
                onChange={(featureGroups) => updateSpotlight(i, { featureGroups })}
              />

              <p className="mb-2 mt-6 text-[13px] font-semibold text-slate-700">Info / callout box</p>
              <InfoBoxEditor infoBox={section.infoBox} onChange={(infoBox) => updateSpotlight(i, { infoBox })} />
            </AdminCardGroup>
          ))}
        </div>
      )}

      {activeTab === "why-us" && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.whyUs.isVisible !== false}
            onChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, isVisible: v } })}
          />
          <AdminSectionFields
            title={content.whyUs.title}
            subtitle={content.whyUs.subtitle ?? ""}
            onTitleChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, title: v } })}
            onSubtitleChange={(v) => setContent({ ...content, whyUs: { ...content.whyUs, subtitle: v } })}
          />
          <IconCardsEditor cards={content.whyUs.cards} onChange={(cards) => setContent({ ...content, whyUs: { ...content.whyUs, cards } })} />
        </div>
      )}

      {activeTab === "benefits" && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.benefits.isVisible !== false}
            onChange={(v) => setContent({ ...content, benefits: { ...content.benefits, isVisible: v } })}
          />
          <AdminSectionFields
            title={content.benefits.title}
            subtitle={content.benefits.subtitle ?? ""}
            onTitleChange={(v) => setContent({ ...content, benefits: { ...content.benefits, title: v } })}
            onSubtitleChange={(v) => setContent({ ...content, benefits: { ...content.benefits, subtitle: v } })}
          />
          <IconCardsEditor cards={content.benefits.cards} onChange={(cards) => setContent({ ...content, benefits: { ...content.benefits, cards } })} />
        </div>
      )}

      {activeTab === "more-services" && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.moreServices.isVisible !== false}
            onChange={(v) => setContent({ ...content, moreServices: { ...content.moreServices, isVisible: v } })}
          />
          <AdminSectionFields
            title={content.moreServices.title}
            subtitle={content.moreServices.subtitle ?? ""}
            onTitleChange={(v) => setContent({ ...content, moreServices: { ...content.moreServices, title: v } })}
            onSubtitleChange={(v) => setContent({ ...content, moreServices: { ...content.moreServices, subtitle: v } })}
          />
          <IconCardsEditor cards={content.moreServices.cards} onChange={(cards) => setContent({ ...content, moreServices: { ...content.moreServices, cards } })} />
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="space-y-6">
          <SectionVisibilityField
            visible={content.faqs.isVisible !== false}
            onChange={(v) => setContent({ ...content, faqs: { ...content.faqs, isVisible: v } })}
          />
          <AdminSectionFields
            title={content.faqs.title}
            subtitle={content.faqs.subtitle ?? ""}
            onTitleChange={(v) => setContent({ ...content, faqs: { ...content.faqs, title: v } })}
            onSubtitleChange={(v) => setContent({ ...content, faqs: { ...content.faqs, subtitle: v } })}
          />
          <div className="space-y-4">
            {content.faqs.items.map((faq, i) => (
              <AdminCardGroup key={i} index={i} title={faq.question || `FAQ ${i + 1}`}>
                <AdminField label="Question">
                  <input
                    className={inputClass()}
                    value={faq.question}
                    onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, items: replaceAt(content.faqs.items, i, { ...faq, question: e.target.value }) } })}
                  />
                </AdminField>
                <AdminField label="Answer">
                  <textarea
                    className={inputClass()}
                    rows={4}
                    value={faq.answer}
                    onChange={(e) => setContent({ ...content, faqs: { ...content.faqs, items: replaceAt(content.faqs.items, i, { ...faq, answer: e.target.value }) } })}
                  />
                </AdminField>
                <AdminGhostButton onClick={() => setContent({ ...content, faqs: { ...content.faqs, items: removeAt(content.faqs.items, i) } })}>
                  Remove FAQ
                </AdminGhostButton>
              </AdminCardGroup>
            ))}
            <AdminGhostButton onClick={() => setContent({ ...content, faqs: { ...content.faqs, items: [...content.faqs.items, { question: "", answer: "" }] } })}>
              + Add FAQ
            </AdminGhostButton>
          </div>
        </div>
      )}
    </AdminEditorShell>
  );
}
