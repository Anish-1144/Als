"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import {
  DEFAULT_CTA,
  DEFAULT_FEATURE_CARDS,
  DEFAULT_HOW_IT_WORKS_STEPS,
  DEFAULT_SERVICE_CARDS,
  DEFAULT_STATS,
  mergeCta,
  mergeFeatureCards,
  mergeServiceCards,
  mergeStats,
  mergeSteps,
  type FeatureCard,
  type HomeCta,
  type HowItWorksStep,
  type ServiceCard,
  type StatItem,
} from "@/lib/homepage-content";
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
import HomeTestimonialsTab from "@/app/components/admin/home/HomeTestimonialsTab";
import {
  AdminImagePanelShell,
  HomeHeroImagePanel,
  WhyChooseUsImagePanel,
} from "@/app/components/admin/AdminEditorImagePanel";

const TABS = [
  { id: "hero", label: "Hero", description: "Main headline visitors see first." },
  {
    id: "services",
    label: "Lending solutions",
    description: "Section heading and service cards (Buy a Home, Investment, Refinance).",
  },
  {
    id: "why-choose-us",
    label: "Why choose us",
    description: "Section heading, side image, feature cards, and stats.",
  },
  {
    id: "how-it-works",
    label: "How it works",
    description: "Step-by-step process cards on the homepage.",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    description: "Client quotes shown on the homepage.",
  },
  {
    id: "cta",
    label: "Contact CTA",
    description: "Call-to-action banner at the bottom of the homepage.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

type HomeForm = {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  heroVisible: boolean;
  servicesTitle: string;
  servicesSubtitle: string;
  servicesVisible: boolean;
  serviceCards: ServiceCard[];
  whyTitle: string;
  whySubtitle: string;
  whyImageUrl: string;
  whyVisible: boolean;
  features: FeatureCard[];
  stats: StatItem[];
  howTitle: string;
  howSubtitle: string;
  howVisible: boolean;
  steps: HowItWorksStep[];
  testimonialsVisible: boolean;
  cta: HomeCta;
  isPublished: boolean;
};

function isTabId(value: string | null): value is TabId {
  return TABS.some((tab) => tab.id === value);
}

function parseHomeForm(d: Record<string, unknown>): HomeForm {
  const hero = (d.hero as Record<string, unknown>) ?? {};
  const services = (d.services as Record<string, unknown>) ?? {};
  const why = (d.whyChooseUs as Record<string, unknown>) ?? {};
  const showcase = (d.propertyShowcase as Record<string, unknown>) ?? {};
  const testimonials = (d.testimonials as Record<string, unknown>) ?? {};
  const rawCards = services.cards ?? services.services;

  return {
    heroTitle: String(hero.title ?? ""),
    heroHighlight: String(hero.titleHighlight ?? ""),
    heroSubtitle: String(hero.subtitle ?? ""),
    heroImageUrl: String(hero.imageUrl ?? "/hero.jpg"),
    heroImageAlt: String(hero.imageAlt ?? ""),
    heroVisible: hero.isVisible !== false,
    servicesTitle: String(services.sectionTitle ?? ""),
    servicesSubtitle: String(services.sectionSubtitle ?? ""),
    servicesVisible: services.isVisible !== false,
    serviceCards: mergeServiceCards(rawCards),
    whyTitle: String(why.sectionTitle ?? ""),
    whySubtitle: String(why.sectionSubtitle ?? ""),
    whyImageUrl:
      (why.backgroundImage as { url?: string } | undefined)?.url ?? "/section2.jpg",
    whyVisible: why.isVisible !== false,
    features: mergeFeatureCards(why.features),
    stats: mergeStats(why.stats),
    howTitle: String(showcase.sectionTitle ?? ""),
    howSubtitle: String(showcase.sectionSubtitle ?? ""),
    howVisible: showcase.isVisible !== false,
    steps: mergeSteps(showcase.steps),
    testimonialsVisible: testimonials.isVisible !== false,
    cta: mergeCta(d.cta as Partial<HomeCta>),
    isPublished: d.isPublished !== false,
  };
}

function updateCard<T>(arr: T[], index: number, patch: Partial<T>): T[] {
  return arr.map((item, i) => (i === index ? { ...item, ...patch } : item));
}

export default function AdminHomeEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramSection = searchParams.get("section");
  const legacySection =
    paramSection === "property-showcase" ? "how-it-works" : paramSection;
  const activeTab: TabId = isTabId(legacySection) ? legacySection : "hero";

  const [form, setForm] = useState<HomeForm | null>(null);
  const [raw, setRaw] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Record<string, unknown>>("/admin/homepage").then((res) => {
      if (res.success && res.data) {
        setRaw(res.data);
        setForm(parseHomeForm(res.data));
      } else {
        setRaw({});
        setForm(
          parseHomeForm({
            hero: {},
            services: { cards: DEFAULT_SERVICE_CARDS },
            whyChooseUs: { features: DEFAULT_FEATURE_CARDS, stats: DEFAULT_STATS },
            propertyShowcase: { steps: DEFAULT_HOW_IT_WORKS_STEPS },
            cta: DEFAULT_CTA,
          }),
        );
      }
      setLoading(false);
    });
  }, []);

  const setTab = useCallback(
    (tab: TabId) => {
      router.replace(`/admin?section=${tab}`, { scroll: false });
    },
    [router],
  );

  function patchForm(patch: Partial<HomeForm>) {
    setForm((f) => (f ? { ...f, ...patch } : f));
    setStatus("");
  }

  async function save() {
    if (!raw || !form) return;
    setSaving(true);
    setStatus("Saving...");
    const updated = {
      ...raw,
      isPublished: form.isPublished,
      hero: {
        ...((raw.hero as Record<string, unknown>) ?? {}),
        title: form.heroTitle,
        titleHighlight: form.heroHighlight,
        subtitle: form.heroSubtitle,
        imageUrl: form.heroImageUrl,
        imageAlt: form.heroImageAlt,
        isVisible: form.heroVisible,
      },
      services: {
        ...((raw.services as object) ?? {}),
        sectionTitle: form.servicesTitle,
        sectionSubtitle: form.servicesSubtitle,
        isVisible: form.servicesVisible,
        cards: form.serviceCards,
      },
      whyChooseUs: {
        ...((raw.whyChooseUs as object) ?? {}),
        sectionTitle: form.whyTitle,
        sectionSubtitle: form.whySubtitle,
        isVisible: form.whyVisible,
        backgroundImage: { url: form.whyImageUrl },
        features: form.features,
        stats: form.stats,
      },
      propertyShowcase: {
        ...((raw.propertyShowcase as object) ?? {}),
        sectionTitle: form.howTitle,
        sectionSubtitle: form.howSubtitle,
        isVisible: form.howVisible,
        steps: form.steps,
      },
      testimonials: {
        ...((raw.testimonials as object) ?? {}),
        isVisible: form.testimonialsVisible,
      },
      cta: form.cta,
    };
    const res = await clientApi("/admin/homepage", {
      method: "PUT",
      body: JSON.stringify(updated),
    });
    setSaving(false);
    if (res.success) {
      setRaw(updated);
      setStatus("All changes saved");
    } else {
      setStatus(res.error?.message ?? "Save failed");
    }
  }

  if (loading || !form) return <AdminLoading />;

  const showSaveBar = true;

  const imagePanel =
    activeTab === "hero" ? (
      <AdminImagePanelShell
        title="Hero image"
        description="Upload the large banner shown below the headline on the homepage."
        onSave={save}
        saving={saving}
        status={status}
      >
        <HomeHeroImagePanel
          value={form.heroImageUrl}
          onChange={(url) => patchForm({ heroImageUrl: url })}
        />
      </AdminImagePanelShell>
    ) : activeTab === "why-choose-us" ? (
      <AdminImagePanelShell
        title="Section photo"
        description="Portrait image displayed on the left of the Why Choose Us block."
        onSave={save}
        saving={saving}
        status={status}
      >
        <WhyChooseUsImagePanel
          value={form.whyImageUrl}
          onChange={(url) => patchForm({ whyImageUrl: url })}
        />
      </AdminImagePanelShell>
    ) : undefined;

  return (
    <>
    <AdminEditorShell
      title="Home"
      description="Edit all homepage content. Save each section when you're done."
      previewHref="/"
      previewLabel="Preview site"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setTab(id as TabId)}
      tabPanelLabel="Homepage sections"
      imagePanel={imagePanel}
      footer={
        showSaveBar ? (
          <AdminEditorSaveBar>
            <AdminPublishedToggle
              checked={form.isPublished}
              onChange={(v) => patchForm({ isPublished: v })}
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
              <SectionVisibilityField
                visible={form.heroVisible}
                onChange={(v) => patchForm({ heroVisible: v })}
              />
              <AdminField label="Title">
                <input
                  className={inputClass()}
                  value={form.heroTitle}
                  onChange={(e) => patchForm({ heroTitle: e.target.value })}
                />
              </AdminField>
              <AdminField label="Title highlight">
                <input
                  className={inputClass()}
                  value={form.heroHighlight}
                  onChange={(e) => patchForm({ heroHighlight: e.target.value })}
                />
              </AdminField>
              <AdminField label="Subtitle">
                <textarea
                  className={inputClass()}
                  rows={4}
                  value={form.heroSubtitle}
                  onChange={(e) => patchForm({ heroSubtitle: e.target.value })}
                />
              </AdminField>
              <AdminField label="Image alt text">
                <input
                  className={inputClass()}
                  value={form.heroImageAlt}
                  onChange={(e) => patchForm({ heroImageAlt: e.target.value })}
                  placeholder="Describe the hero image for accessibility"
                />
              </AdminField>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={form.servicesVisible}
                onChange={(v) => patchForm({ servicesVisible: v })}
              />
              <AdminSectionFields
                title={form.servicesTitle}
                subtitle={form.servicesSubtitle}
                onTitleChange={(v) => patchForm({ servicesTitle: v })}
                onSubtitleChange={(v) => patchForm({ servicesSubtitle: v })}
              />
              <div className="space-y-4">
                {form.serviceCards.map((card, index) => (
                  <AdminCardGroup key={index} index={index} title={card.title || `Card ${index + 1}`}>
                    <AdminField label="Card title">
                      <input
                        className={inputClass()}
                        value={card.title}
                        onChange={(e) =>
                          patchForm({
                            serviceCards: updateCard(form.serviceCards, index, {
                              title: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                    <AdminField label="Description">
                      <textarea
                        className={inputClass()}
                        rows={4}
                        value={card.description}
                        onChange={(e) =>
                          patchForm({
                            serviceCards: updateCard(form.serviceCards, index, {
                              description: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <AdminReadOnlyUrlField label="Link URL" value={card.link} />
                      <AdminField label="Button label">
                        <input
                          className={inputClass()}
                          value={card.linkLabel}
                          onChange={(e) =>
                            patchForm({
                              serviceCards: updateCard(form.serviceCards, index, {
                                linkLabel: e.target.value,
                              }),
                            })
                          }
                          placeholder="Learn More"
                        />
                      </AdminField>
                    </div>
                  </AdminCardGroup>
                ))}
              </div>
            </div>
          )}

          {activeTab === "why-choose-us" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={form.whyVisible}
                onChange={(v) => patchForm({ whyVisible: v })}
              />
              <AdminSectionFields
                title={form.whyTitle}
                subtitle={form.whySubtitle}
                onTitleChange={(v) => patchForm({ whyTitle: v })}
                onSubtitleChange={(v) => patchForm({ whySubtitle: v })}
              />

              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Feature cards
              </p>
              <div className="space-y-4">
                {form.features.map((feature, index) => (
                  <AdminCardGroup
                    key={index}
                    index={index}
                    title={feature.title || `Feature ${index + 1}`}
                  >
                    <AdminField label="Title">
                      <input
                        className={inputClass()}
                        value={feature.title}
                        onChange={(e) =>
                          patchForm({
                            features: updateCard(form.features, index, {
                              title: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                    <AdminField label="Description">
                      <textarea
                        className={inputClass()}
                        rows={3}
                        value={feature.description}
                        onChange={(e) =>
                          patchForm({
                            features: updateCard(form.features, index, {
                              description: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                  </AdminCardGroup>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 pt-2">
                Stats row
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {form.stats.map((stat, index) => (
                  <AdminCardGroup key={index} index={index} title={`Stat ${index + 1}`}>
                    <AdminField label="Value">
                      <input
                        className={inputClass()}
                        value={stat.value}
                        onChange={(e) =>
                          patchForm({
                            stats: updateCard(form.stats, index, {
                              value: e.target.value,
                            }),
                          })
                        }
                        placeholder="11+"
                      />
                    </AdminField>
                    <AdminField label="Label">
                      <input
                        className={inputClass()}
                        value={stat.label}
                        onChange={(e) =>
                          patchForm({
                            stats: updateCard(form.stats, index, {
                              label: e.target.value,
                            }),
                          })
                        }
                        placeholder="Years Experience"
                      />
                    </AdminField>
                  </AdminCardGroup>
                ))}
              </div>
            </div>
          )}

          {activeTab === "how-it-works" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={form.howVisible}
                onChange={(v) => patchForm({ howVisible: v })}
              />
              <AdminSectionFields
                title={form.howTitle}
                subtitle={form.howSubtitle}
                onTitleChange={(v) => patchForm({ howTitle: v })}
                onSubtitleChange={(v) => patchForm({ howSubtitle: v })}
              />
              <div className="space-y-4">
                {form.steps.map((step, index) => (
                  <AdminCardGroup
                    key={index}
                    index={index}
                    title={`Step ${index + 1}: ${step.title || "Untitled"}`}
                  >
                    <AdminField label="Step title">
                      <input
                        className={inputClass()}
                        value={step.title}
                        onChange={(e) =>
                          patchForm({
                            steps: updateCard(form.steps, index, {
                              title: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                    <AdminField label="Description">
                      <textarea
                        className={inputClass()}
                        rows={3}
                        value={step.description}
                        onChange={(e) =>
                          patchForm({
                            steps: updateCard(form.steps, index, {
                              description: e.target.value,
                            }),
                          })
                        }
                      />
                    </AdminField>
                  </AdminCardGroup>
                ))}
              </div>
            </div>
          )}

          {activeTab === "testimonials" && (
            <>
              <SectionVisibilityField
                visible={form.testimonialsVisible}
                onChange={(v) => patchForm({ testimonialsVisible: v })}
              />
              <HomeTestimonialsTab />
            </>
          )}

          {activeTab === "cta" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={form.cta.isVisible !== false}
                onChange={(v) => patchForm({ cta: { ...form.cta, isVisible: v } })}
              />
              <AdminField label="Heading">
                <input
                  className={inputClass()}
                  value={form.cta.title}
                  onChange={(e) =>
                    patchForm({ cta: { ...form.cta, title: e.target.value } })
                  }
                />
              </AdminField>
              <AdminField label="Subtitle">
                <textarea
                  className={inputClass()}
                  rows={3}
                  value={form.cta.subtitle}
                  onChange={(e) =>
                    patchForm({ cta: { ...form.cta, subtitle: e.target.value } })
                  }
                />
              </AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Button text">
                  <input
                    className={inputClass()}
                    value={form.cta.buttonText}
                    onChange={(e) =>
                      patchForm({ cta: { ...form.cta, buttonText: e.target.value } })
                    }
                  />
                </AdminField>
                <AdminReadOnlyUrlField label="Button link" value={form.cta.buttonLink} />
              </div>
            </div>
          )}
    </AdminEditorShell>
    </>
  );
}
