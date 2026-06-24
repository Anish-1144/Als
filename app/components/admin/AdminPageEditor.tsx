"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import {
  mergeAboutContent,
  mergeCareersContent,
  mergeWhyAlsContent,
  type AboutContent,
  type CareersContent,
  type ContentCard,
  type WhyAlsContent,
} from "@/lib/page-content";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import SectionVisibilityField from "@/app/components/admin/SectionVisibilityField";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminPublishedToggle,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup, AdminSectionFields } from "@/app/components/admin/home/AdminCardGroup";
import { AdminImagePanelShell, GenericImagePanel, PageHeroImagePanel } from "@/app/components/admin/AdminEditorImagePanel";
import HomeTestimonialsTab from "@/app/components/admin/home/HomeTestimonialsTab";
import HomeTeamTab from "@/app/components/admin/home/HomeTeamTab";
import HomeJobsTab from "@/app/components/admin/home/HomeJobsTab";
import AboutCrudTab from "@/app/components/admin/about/AboutCrudTab";

type PageSlug = "why-als" | "about" | "careers";

type TabDef = { id: string; label: string; description: string };

const PAGE_META: Record<
  PageSlug,
  { title: string; previewPath: string; tabs: TabDef[] }
> = {
  "why-als": {
    title: "Why ALS",
    previewPath: "/why-als",
    tabs: [
      { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
      { id: "reasons", label: "Why choose us", description: "Reason cards explaining why clients choose ALS." },
      { id: "process", label: "Our process", description: "Step-by-step process cards." },
      { id: "explore", label: "Explore more", description: "Link cards to About, Careers, and Contact." },
      { id: "cta", label: "CTA", description: "Bottom call-to-action section." },
    ],
  },
  about: {
    title: "About Us",
    previewPath: "/about",
    tabs: [
      { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
      { id: "vision", label: "Our vision", description: "Vision section with image and story text." },
      { id: "founder", label: "Founder", description: "Founder message and photo." },
      { id: "commitments", label: "Commitments", description: "Core commitment cards." },
      { id: "team", label: "Team", description: "Team section heading and member profiles." },
      { id: "achievements", label: "Achievements", description: "Awards section heading and achievement cards." },
      { id: "testimonials", label: "Testimonials", description: "Testimonials section heading and client reviews." },
      { id: "join-team", label: "Join our team", description: "Careers call-to-action banner on the about page." },
      { id: "giving-back", label: "Giving back", description: "Community involvement section and posts." },
      { id: "partners", label: "Our partners", description: "Lender panel section heading and partner logos." },
      { id: "contact", label: "Contact us", description: "Contact section heading and contact details." },
    ],
  },
  careers: {
    title: "Careers",
    previewPath: "/why-als/careers",
    tabs: [
      { id: "hero", label: "Hero", description: "Page banner title, subtitle, and background image." },
      { id: "intro", label: "Introduction", description: "Intro section with team image." },
      { id: "benefits", label: "Benefits", description: "Why work at ALS benefit cards." },
      { id: "nav-cards", label: "Career links", description: "Navigation cards to career sub-pages." },
      { id: "jobs", label: "Job postings", description: "Open roles listed on the site." },
      { id: "cta", label: "CTA", description: "Contact HR call-to-action." },
    ],
  },
};

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
            <input
              className={inputClass()}
              value={card.title}
              onChange={(e) => onChange(updateCard(cards, index, { title: e.target.value }))}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={3}
              value={card.description}
              onChange={(e) => onChange(updateCard(cards, index, { description: e.target.value }))}
            />
          </AdminField>
          {showLinks && (
            <div className="grid sm:grid-cols-2 gap-4">
              <AdminReadOnlyUrlField label="Link URL" value={card.link ?? ""} />
              <AdminField label="Link label">
                <input
                  className={inputClass()}
                  value={card.linkLabel ?? ""}
                  onChange={(e) => onChange(updateCard(cards, index, { linkLabel: e.target.value }))}
                />
              </AdminField>
            </div>
          )}
        </AdminCardGroup>
      ))}
    </div>
  );
}

export default function AdminPageEditor({ slug }: { slug: PageSlug }) {
  const meta = PAGE_META[slug];
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramSection = searchParams.get("section");
  const activeTab =
    meta.tabs.find((t) => t.id === paramSection)?.id ?? meta.tabs[0].id;

  const [hero, setHero] = useState<HeroForm>({
    heroTitle: "",
    heroSubtitle: "",
    heroBackgroundImage: "",
    isPublished: true,
  });
  const [whyAls, setWhyAls] = useState<WhyAlsContent>(() => mergeWhyAlsContent());
  const [about, setAbout] = useState<AboutContent>(() => mergeAboutContent());
  const [careers, setCareers] = useState<CareersContent>(() => mergeCareersContent());
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
      if (slug === "why-als") setWhyAls(mergeWhyAlsContent(content as Partial<WhyAlsContent>));
      if (slug === "about") setAbout(mergeAboutContent(content as Partial<AboutContent>));
      if (slug === "careers") setCareers(mergeCareersContent(content as Partial<CareersContent>));
      setLoading(false);
    });
  }, [slug, registry]);

  const setTab = useCallback(
    (tab: string) => {
      const base = slug === "why-als" ? "/admin/why-als" : `/admin/why-als/${slug === "about" ? "about" : "careers"}`;
      router.replace(`${base}?section=${tab}`, { scroll: false });
    },
    [router, slug],
  );

  async function save() {
    if (!rawPage) return;
    setSaving(true);
    setStatus("Saving...");
    const content =
      slug === "why-als"
        ? whyAls
        : slug === "about"
          ? about
          : careers;
    const body = {
      ...rawPage,
      slug,
      group: registry?.group ?? "Why ALS",
      label: registry?.label ?? slug,
      path: registry?.path ?? "",
      ...hero,
      content,
    };
    const res = await clientApi(`/admin/pages/${slug}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.success) {
      setRawPage(body);
      setStatus("All changes saved");
    } else {
      setStatus(res.error?.message ?? "Save failed");
    }
  }

  if (loading) return <AdminLoading />;

  const crudTabs = ["team", "testimonials", "jobs", "achievements", "giving-back", "partners"];
  const showSaveBar =
    slug === "about" || slug === "why-als" || slug === "careers" || !crudTabs.includes(activeTab);

  const imagePanel =
    activeTab === "hero" ? (
      <AdminImagePanelShell title="Hero background" onSave={save} saving={saving} status={status}>
        <PageHeroImagePanel
          slug={slug}
          value={hero.heroBackgroundImage}
          onChange={(url) => {
            setHero((h) => ({ ...h, heroBackgroundImage: url }));
            setStatus("");
          }}
        />
      </AdminImagePanelShell>
    ) : slug === "about" && activeTab === "vision" ? (
      <AdminImagePanelShell
        title="Vision image"
        description="Photo beside the vision section on the About page."
        onSave={save}
        saving={saving}
        status={status}
      >
        <GenericImagePanel
          label="Vision image"
          value={about.vision.imageUrl}
          onChange={(url) => setAbout({ ...about, vision: { ...about.vision, imageUrl: url } })}
          folder="als/about"
          hint="Landscape or square photo. Recommended 800×600."
        />
      </AdminImagePanelShell>
    ) : slug === "about" && activeTab === "founder" ? (
      <AdminImagePanelShell
        title="Founder photo"
        description="Portrait shown in the founder message section."
        onSave={save}
        saving={saving}
        status={status}
      >
        <GenericImagePanel
          label="Founder photo"
          value={about.founder.imageUrl}
          onChange={(url) => setAbout({ ...about, founder: { ...about.founder, imageUrl: url } })}
          folder="als/about"
          aspectClass="aspect-[3/4]"
          hint="Portrait photo. Recommended 600×800."
        />
      </AdminImagePanelShell>
    ) : slug === "careers" && activeTab === "intro" ? (
      <AdminImagePanelShell
        title="Intro image"
        description="Photo beside the careers introduction."
        onSave={save}
        saving={saving}
        status={status}
      >
        <GenericImagePanel
          label="Intro image"
          value={careers.intro.imageUrl}
          onChange={(url) => setCareers({ ...careers, intro: { ...careers.intro, imageUrl: url } })}
          folder="als/careers"
          hint="Team or office photo. Recommended 800×600."
        />
      </AdminImagePanelShell>
    ) : undefined;

  return (
    <AdminEditorShell
      title={meta.title}
      previewHref={meta.previewPath}
      tabs={meta.tabs}
      activeTab={activeTab}
      onTabChange={setTab}
      imagePanel={imagePanel}
      footer={
        showSaveBar ? (
          <AdminEditorSaveBar>
            <AdminPublishedToggle
              checked={hero.isPublished}
              onChange={(v) => {
                setHero((h) => ({ ...h, isPublished: v }));
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
              <AdminField label="Hero title">
                <input className={inputClass()} value={hero.heroTitle} onChange={(e) => { setHero({ ...hero, heroTitle: e.target.value }); setStatus(""); }} />
              </AdminField>
              <AdminField label="Hero subtitle">
                <textarea className={inputClass()} rows={2} value={hero.heroSubtitle} onChange={(e) => { setHero({ ...hero, heroSubtitle: e.target.value }); setStatus(""); }} />
              </AdminField>
            </div>
          )}

          {slug === "why-als" && activeTab === "reasons" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={whyAls.reasons.isVisible !== false}
                onChange={(v) => {
                  setWhyAls({ ...whyAls, reasons: { ...whyAls.reasons, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={whyAls.reasons.title}
                subtitle={whyAls.reasons.subtitle ?? ""}
                onTitleChange={(v) => setWhyAls({ ...whyAls, reasons: { ...whyAls.reasons, title: v } })}
                onSubtitleChange={(v) => setWhyAls({ ...whyAls, reasons: { ...whyAls.reasons, subtitle: v } })}
              />
              <CardListEditor cards={whyAls.reasons.cards} onChange={(cards) => setWhyAls({ ...whyAls, reasons: { ...whyAls.reasons, cards } })} />
            </div>
          )}

          {slug === "why-als" && activeTab === "process" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={whyAls.process.isVisible !== false}
                onChange={(v) => {
                  setWhyAls({ ...whyAls, process: { ...whyAls.process, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={whyAls.process.title}
                subtitle={whyAls.process.subtitle ?? ""}
                onTitleChange={(v) => setWhyAls({ ...whyAls, process: { ...whyAls.process, title: v } })}
                onSubtitleChange={(v) => setWhyAls({ ...whyAls, process: { ...whyAls.process, subtitle: v } })}
              />
              <div className="space-y-4">
                {whyAls.process.steps.map((step, index) => (
                  <AdminCardGroup key={index} index={index} title={`Step ${index + 1}: ${step.title}`}>
                    <AdminField label="Title">
                      <input className={inputClass()} value={step.title} onChange={(e) => {
                        const steps = updateCard(whyAls.process.steps, index, { title: e.target.value });
                        setWhyAls({ ...whyAls, process: { ...whyAls.process, steps } });
                      }} />
                    </AdminField>
                    <AdminField label="Description">
                      <textarea className={inputClass()} rows={3} value={step.description} onChange={(e) => {
                        const steps = updateCard(whyAls.process.steps, index, { description: e.target.value });
                        setWhyAls({ ...whyAls, process: { ...whyAls.process, steps } });
                      }} />
                    </AdminField>
                  </AdminCardGroup>
                ))}
              </div>
            </div>
          )}

          {slug === "why-als" && activeTab === "explore" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={whyAls.explore.isVisible !== false}
                onChange={(v) => {
                  setWhyAls({ ...whyAls, explore: { ...whyAls.explore, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={whyAls.explore.title}
                subtitle={whyAls.explore.subtitle ?? ""}
                onTitleChange={(v) => setWhyAls({ ...whyAls, explore: { ...whyAls.explore, title: v } })}
                onSubtitleChange={(v) => setWhyAls({ ...whyAls, explore: { ...whyAls.explore, subtitle: v } })}
              />
              <CardListEditor showLinks cards={whyAls.explore.cards} onChange={(cards) => setWhyAls({ ...whyAls, explore: { ...whyAls.explore, cards } })} />
            </div>
          )}

          {slug === "why-als" && activeTab === "cta" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={whyAls.cta.isVisible !== false}
                onChange={(v) => {
                  setWhyAls({ ...whyAls, cta: { ...whyAls.cta, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Heading"><input className={inputClass()} value={whyAls.cta.title} onChange={(e) => setWhyAls({ ...whyAls, cta: { ...whyAls.cta, title: e.target.value } })} /></AdminField>
              <AdminField label="Subtitle"><textarea className={inputClass()} rows={3} value={whyAls.cta.subtitle} onChange={(e) => setWhyAls({ ...whyAls, cta: { ...whyAls.cta, subtitle: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Primary button"><input className={inputClass()} value={whyAls.cta.primaryText} onChange={(e) => setWhyAls({ ...whyAls, cta: { ...whyAls.cta, primaryText: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Primary link" value={whyAls.cta.primaryLink} />
                <AdminField label="Secondary button"><input className={inputClass()} value={whyAls.cta.secondaryText ?? ""} onChange={(e) => setWhyAls({ ...whyAls, cta: { ...whyAls.cta, secondaryText: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Secondary link" value={whyAls.cta.secondaryLink ?? ""} />
              </div>
            </div>
          )}

          {slug === "about" && activeTab === "vision" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={about.vision.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, vision: { ...about.vision, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Badge label"><input className={inputClass()} value={about.vision.badge ?? ""} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, badge: e.target.value } })} /></AdminField>
              <AdminField label="Title"><input className={inputClass()} value={about.vision.title} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, title: e.target.value } })} /></AdminField>
              <AdminField label="Body (paragraphs separated by blank lines)"><textarea className={inputClass()} rows={10} value={about.vision.body} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, body: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Button text"><input className={inputClass()} value={about.vision.ctaText} onChange={(e) => setAbout({ ...about, vision: { ...about.vision, ctaText: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Button link" value={about.vision.ctaLink} />
              </div>
            </div>
          )}

          {slug === "about" && activeTab === "founder" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={about.founder.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, founder: { ...about.founder, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Badge"><input className={inputClass()} value={about.founder.badge ?? ""} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, badge: e.target.value } })} /></AdminField>
              <AdminField label="Title"><input className={inputClass()} value={about.founder.title} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, title: e.target.value } })} /></AdminField>
              <AdminField label="Message"><textarea className={inputClass()} rows={8} value={about.founder.body} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, body: e.target.value } })} /></AdminField>
              <AdminField label="Signature short"><input className={inputClass()} value={about.founder.signatureShort} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, signatureShort: e.target.value } })} /></AdminField>
              <AdminField label="Full name"><input className={inputClass()} value={about.founder.name} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, name: e.target.value } })} /></AdminField>
              <AdminField label="Role"><input className={inputClass()} value={about.founder.role} onChange={(e) => setAbout({ ...about, founder: { ...about.founder, role: e.target.value } })} /></AdminField>
            </div>
          )}

          {slug === "about" && activeTab === "commitments" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={about.commitments.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, commitments: { ...about.commitments, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields title={about.commitments.title} subtitle={about.commitments.subtitle ?? ""} onTitleChange={(v) => setAbout({ ...about, commitments: { ...about.commitments, title: v } })} onSubtitleChange={(v) => setAbout({ ...about, commitments: { ...about.commitments, subtitle: v } })} />
              <CardListEditor cards={about.commitments.cards} onChange={(cards) => setAbout({ ...about, commitments: { ...about.commitments, cards } })} />
            </div>
          )}

          {slug === "about" && activeTab === "team" && (
            <div className="space-y-8">
              <SectionVisibilityField
                visible={about.team.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, team: { ...about.team, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                titleLabel="Section title"
                subtitleLabel="Section description"
                title={about.team.title}
                subtitle={about.team.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, team: { ...about.team, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, team: { ...about.team, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input
                  className={inputClass()}
                  value={about.team.badge ?? ""}
                  onChange={(e) => setAbout({ ...about, team: { ...about.team, badge: e.target.value } })}
                />
              </AdminField>
              <HomeTeamTab />
            </div>
          )}

          {slug === "about" && activeTab === "achievements" && (
            <div className="space-y-8">
              <SectionVisibilityField
                visible={about.achievements.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, achievements: { ...about.achievements, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={about.achievements.title}
                subtitle={about.achievements.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, achievements: { ...about.achievements, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, achievements: { ...about.achievements, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input
                  className={inputClass()}
                  value={about.achievements.badge ?? ""}
                  onChange={(e) => setAbout({ ...about, achievements: { ...about.achievements, badge: e.target.value } })}
                />
              </AdminField>
              <AboutCrudTab
                apiPath="/admin/awards"
                itemLabel="Award"
                empty={{ title: "", year: new Date().getFullYear(), organization: "", description: "", image: "", order: 0, featured: false, isActive: true }}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "year", label: "Year", type: "number" },
                  { key: "organization", label: "Organization" },
                  { key: "description", label: "Description", type: "textarea", rows: 3 },
                  { key: "image", label: "Photo", type: "image", imageFolder: "als/awards", aspectClass: "aspect-[4/3] max-h-40", objectFit: "cover" },
                  { key: "order", label: "Display order", type: "number" },
                  { key: "featured", label: "Featured", type: "checkbox" },
                  { key: "isActive", label: "Active", type: "checkbox" },
                ]}
                getListTitle={(item) => String(item.title ?? "Untitled")}
                getListSubtitle={(item) => String(item.year ?? "")}
              />
            </div>
          )}

          {slug === "about" && activeTab === "testimonials" && (
            <div className="space-y-8">
              <SectionVisibilityField
                visible={about.testimonials.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, testimonials: { ...about.testimonials, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={about.testimonials.title}
                subtitle={about.testimonials.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, testimonials: { ...about.testimonials, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, testimonials: { ...about.testimonials, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input
                  className={inputClass()}
                  value={about.testimonials.badge ?? ""}
                  onChange={(e) => setAbout({ ...about, testimonials: { ...about.testimonials, badge: e.target.value } })}
                />
              </AdminField>
              <HomeTestimonialsTab />
            </div>
          )}

          {slug === "about" && activeTab === "join-team" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={about.joinTeam.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, joinTeam: { ...about.joinTeam, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Heading">
                <input className={inputClass()} value={about.joinTeam.title} onChange={(e) => setAbout({ ...about, joinTeam: { ...about.joinTeam, title: e.target.value } })} />
              </AdminField>
              <AdminField label="Description">
                <textarea className={inputClass()} rows={4} value={about.joinTeam.subtitle} onChange={(e) => setAbout({ ...about, joinTeam: { ...about.joinTeam, subtitle: e.target.value } })} />
              </AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Button text">
                  <input className={inputClass()} value={about.joinTeam.buttonText} onChange={(e) => setAbout({ ...about, joinTeam: { ...about.joinTeam, buttonText: e.target.value } })} />
                </AdminField>
                <AdminReadOnlyUrlField label="Button link" value={about.joinTeam.buttonLink} />
              </div>
            </div>
          )}

          {slug === "about" && activeTab === "giving-back" && (
            <div className="space-y-8">
              <SectionVisibilityField
                visible={about.givingBack.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, givingBack: { ...about.givingBack, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={about.givingBack.title}
                subtitle={about.givingBack.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, givingBack: { ...about.givingBack, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, givingBack: { ...about.givingBack, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input
                  className={inputClass()}
                  value={about.givingBack.badge ?? ""}
                  onChange={(e) => setAbout({ ...about, givingBack: { ...about.givingBack, badge: e.target.value } })}
                />
              </AdminField>
              <AboutCrudTab
                apiPath="/admin/community-posts"
                itemLabel="Community post"
                empty={{ title: "", image: "", date: "", location: "", order: 0, isActive: true }}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "image", label: "Photo", type: "image", imageFolder: "als/community", aspectClass: "aspect-[16/10] max-h-40", objectFit: "cover" },
                  { key: "date", label: "Date", placeholder: "YYYY-MM-DD" },
                  { key: "location", label: "Location" },
                  { key: "order", label: "Display order", type: "number" },
                  { key: "isActive", label: "Active", type: "checkbox" },
                ]}
                getListTitle={(item) => String(item.title ?? "Untitled")}
                getListSubtitle={(item) => String(item.location ?? "")}
              />
            </div>
          )}

          {slug === "about" && activeTab === "partners" && (
            <div className="space-y-8">
              <SectionVisibilityField
                visible={about.partners.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, partners: { ...about.partners, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={about.partners.title}
                subtitle={about.partners.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, partners: { ...about.partners, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, partners: { ...about.partners, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input
                  className={inputClass()}
                  value={about.partners.badge ?? ""}
                  onChange={(e) => setAbout({ ...about, partners: { ...about.partners, badge: e.target.value } })}
                />
              </AdminField>
              <AboutCrudTab
                apiPath="/admin/lenders"
                itemLabel="Lender"
                defaultImageFolder="als/partners"
                empty={{ name: "", logo: "", description: "", website: "", order: 0, featured: false, isActive: true }}
                fields={[
                  { key: "name", label: "Name" },
                  {
                    key: "logo",
                    label: "Logo",
                    type: "image",
                    imageFolder: "als/partners",
                    imageHint: "Upload a lender logo. PNG with transparency works best.",
                    aspectClass: "aspect-square max-h-44",
                    objectFit: "contain",
                  },
                  { key: "description", label: "Description", type: "textarea", rows: 2 },
                  { key: "website", label: "Website URL" },
                  { key: "order", label: "Display order", type: "number" },
                  { key: "featured", label: "Featured", type: "checkbox" },
                  { key: "isActive", label: "Active", type: "checkbox" },
                ]}
                getListTitle={(item) => String(item.name ?? "Untitled")}
                getListImage={(item) => String(item.logo || "") || undefined}
              />
            </div>
          )}

          {slug === "about" && activeTab === "contact" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={about.contact.isVisible !== false}
                onChange={(v) => {
                  setAbout({ ...about, contact: { ...about.contact, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields
                title={about.contact.title}
                subtitle={about.contact.subtitle ?? ""}
                onTitleChange={(v) => setAbout({ ...about, contact: { ...about.contact, title: v } })}
                onSubtitleChange={(v) => setAbout({ ...about, contact: { ...about.contact, subtitle: v } })}
              />
              <AdminField label="Badge label">
                <input className={inputClass()} value={about.contact.badge ?? ""} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, badge: e.target.value } })} />
              </AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Phone">
                  <input className={inputClass()} value={about.contact.phone} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, phone: e.target.value } })} />
                </AdminField>
                <AdminField label="Email">
                  <input className={inputClass()} value={about.contact.email} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, email: e.target.value } })} />
                </AdminField>
              </div>
              <AdminField label="Address">
                <input className={inputClass()} value={about.contact.address} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, address: e.target.value } })} />
              </AdminField>
              <AdminField label="Form heading">
                <input className={inputClass()} value={about.contact.formTitle} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, formTitle: e.target.value } })} />
              </AdminField>
              <AdminField label="Success heading">
                <input className={inputClass()} value={about.contact.successTitle} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, successTitle: e.target.value } })} />
              </AdminField>
              <AdminField label="Success message">
                <textarea className={inputClass()} rows={3} value={about.contact.successMessage} onChange={(e) => setAbout({ ...about, contact: { ...about.contact, successMessage: e.target.value } })} />
              </AdminField>
            </div>
          )}

          {slug === "careers" && activeTab === "intro" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={careers.intro.isVisible !== false}
                onChange={(v) => {
                  setCareers({ ...careers, intro: { ...careers.intro, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Badge"><input className={inputClass()} value={careers.intro.badge ?? ""} onChange={(e) => setCareers({ ...careers, intro: { ...careers.intro, badge: e.target.value } })} /></AdminField>
              <AdminField label="Title"><input className={inputClass()} value={careers.intro.title} onChange={(e) => setCareers({ ...careers, intro: { ...careers.intro, title: e.target.value } })} /></AdminField>
              <AdminField label="Paragraph 1"><textarea className={inputClass()} rows={3} value={careers.intro.paragraph1} onChange={(e) => setCareers({ ...careers, intro: { ...careers.intro, paragraph1: e.target.value } })} /></AdminField>
              <AdminField label="Paragraph 2"><textarea className={inputClass()} rows={3} value={careers.intro.paragraph2} onChange={(e) => setCareers({ ...careers, intro: { ...careers.intro, paragraph2: e.target.value } })} /></AdminField>
            </div>
          )}

          {slug === "careers" && activeTab === "benefits" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={careers.benefits.isVisible !== false}
                onChange={(v) => {
                  setCareers({ ...careers, benefits: { ...careers.benefits, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminSectionFields title={careers.benefits.title} subtitle={careers.benefits.subtitle ?? ""} onTitleChange={(v) => setCareers({ ...careers, benefits: { ...careers.benefits, title: v } })} onSubtitleChange={(v) => setCareers({ ...careers, benefits: { ...careers.benefits, subtitle: v } })} />
              <CardListEditor cards={careers.benefits.cards} onChange={(cards) => setCareers({ ...careers, benefits: { ...careers.benefits, cards } })} />
            </div>
          )}

          {slug === "careers" && activeTab === "nav-cards" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={careers.navCards.isVisible !== false}
                onChange={(v) => {
                  setCareers({ ...careers, navCards: { ...careers.navCards, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Section title"><input className={inputClass()} value={careers.navCards.title} onChange={(e) => setCareers({ ...careers, navCards: { ...careers.navCards, title: e.target.value } })} /></AdminField>
              <CardListEditor showLinks cards={careers.navCards.cards} onChange={(cards) => setCareers({ ...careers, navCards: { ...careers.navCards, cards } })} />
            </div>
          )}

          {slug === "careers" && activeTab === "jobs" && (
            <div className="space-y-6">
              <SectionVisibilityField
                visible={careers.jobs.isVisible !== false}
                onChange={(v) => {
                  setCareers({ ...careers, jobs: { ...careers.jobs, isVisible: v } });
                  setStatus("");
                }}
              />
              <HomeJobsTab />
            </div>
          )}

          {slug === "careers" && activeTab === "cta" && (
            <div className="space-y-1">
              <SectionVisibilityField
                visible={careers.cta.isVisible !== false}
                onChange={(v) => {
                  setCareers({ ...careers, cta: { ...careers.cta, isVisible: v } });
                  setStatus("");
                }}
              />
              <AdminField label="Heading"><input className={inputClass()} value={careers.cta.title} onChange={(e) => setCareers({ ...careers, cta: { ...careers.cta, title: e.target.value } })} /></AdminField>
              <AdminField label="Subtitle"><textarea className={inputClass()} rows={3} value={careers.cta.subtitle} onChange={(e) => setCareers({ ...careers, cta: { ...careers.cta, subtitle: e.target.value } })} /></AdminField>
              <div className="grid sm:grid-cols-2 gap-4">
                <AdminField label="Button text"><input className={inputClass()} value={careers.cta.buttonText} onChange={(e) => setCareers({ ...careers, cta: { ...careers.cta, buttonText: e.target.value } })} /></AdminField>
                <AdminReadOnlyUrlField label="Button link" value={careers.cta.buttonLink} />
              </div>
            </div>
          )}
    </AdminEditorShell>
  );
}
