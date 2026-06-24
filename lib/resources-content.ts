import type {
  ContentCard,
  SectionHeader,
  SectionVisibility,
} from "@/lib/page-content";

export type GuideSubsection = {
  title?: string;
  paragraphs: string[];
  bullets?: string[];
  highlightTitle?: string;
  highlightBullets?: string[];
};

export type GuideSection = SectionVisibility & {
  title: string;
  introParagraphs?: string[];
  subsections: GuideSubsection[];
  bullets?: string[];
};

export type GuidePageContent = {
  introSection?: SectionVisibility;
  introParagraphs: string[];
  sections: GuideSection[];
  closingBlock?: SectionVisibility & {
    title: string;
    paragraphs: string[];
    primaryLabel: string;
    primaryLink: string;
    secondaryLabel: string;
    secondaryLink: string;
  };
  statsSection?: SectionHeader & { cards: ContentCard[] };
  bottomCta?: SectionVisibility & {
    title: string;
    subtitle: string;
    primaryLabel: string;
    primaryLink: string;
    secondaryLabel: string;
    secondaryLink: string;
  };
  relatedGuides?: SectionVisibility & { title: string; cards: ContentCard[] };
};

export type ResourceListPageContent = {
  intro: SectionHeader & {
    primaryCtaLabel: string;
    primaryCtaLink: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
  };
  bottomCta: SectionVisibility & {
    title: string;
    body: string;
    primaryLabel: string;
    primaryLink: string;
    secondaryLabel: string;
    secondaryLink: string;
  };
};

export const RESOURCE_GUIDE_SLUGS = [
  "first-home-buyer-guide",
  "investment-guide",
  "construction-loans-guide",
  "smsf-guide",
  "guarantors-guide",
] as const;

export const RESOURCE_LIST_SLUGS = ["documents", "faq"] as const;

export type ResourceGuideSlug = (typeof RESOURCE_GUIDE_SLUGS)[number];
export type ResourceListSlug = (typeof RESOURCE_LIST_SLUGS)[number];
export type ResourceSlug = ResourceGuideSlug | ResourceListSlug;

export const RESOURCE_SLUGS = [
  ...RESOURCE_GUIDE_SLUGS,
  ...RESOURCE_LIST_SLUGS,
] as const;

function mergeCards(
  defaults: ContentCard[],
  raw?: ContentCard[],
): ContentCard[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    ...(defaults[i] ?? { title: "", description: "" }),
    ...(raw?.[i] ?? {}),
  }));
}

function mergeSubsections(
  defaults: GuideSubsection[],
  raw?: GuideSubsection[],
): GuideSubsection[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    title: raw?.[i]?.title ?? defaults[i]?.title,
    paragraphs: raw?.[i]?.paragraphs ?? defaults[i]?.paragraphs ?? [],
    bullets: raw?.[i]?.bullets ?? defaults[i]?.bullets,
    highlightTitle: raw?.[i]?.highlightTitle ?? defaults[i]?.highlightTitle,
    highlightBullets:
      raw?.[i]?.highlightBullets ?? defaults[i]?.highlightBullets,
  }));
}

function mergeSections(
  defaults: GuideSection[],
  raw?: GuideSection[],
): GuideSection[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    ...defaults[i],
    ...raw?.[i],
    title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
    introParagraphs: raw?.[i]?.introParagraphs ?? defaults[i]?.introParagraphs,
    bullets: raw?.[i]?.bullets ?? defaults[i]?.bullets,
    subsections: mergeSubsections(
      defaults[i]?.subsections ?? [],
      raw?.[i]?.subsections,
    ),
  }));
}

function mergeParagraphs(defaults: string[], raw?: string[]): string[] {
  if (raw && raw.length > 0) return raw;
  return defaults;
}

export const DEFAULT_FAQ_PAGE_CONTENT: ResourceListPageContent = {
  intro: {
    badge: "HELP CENTER",
    title: "Get Your Questions Answered",
    subtitle:
      "Browse our comprehensive FAQ section to find quick answers to the most common questions about mortgages, loans, and our services. Can't find what you're looking for?",
    primaryCtaLabel: "Contact Us Directly",
    primaryCtaLink: "/contact",
  },
  bottomCta: {
    title: "Still Have Questions?",
    body: "Our mortgage experts are here to help. Get personalized answers and guidance for your specific situation.",
    primaryLabel: "Call 1300 257 467",
    primaryLink: "tel:1300257467",
    secondaryLabel: "Book Free Consultation",
    secondaryLink: "/book-consultation",
  },
};

export const DEFAULT_DOCUMENTS_PAGE_CONTENT: ResourceListPageContent = {
  intro: {
    badge: "RESOURCE CENTER",
    title: "Your Financial Documents at Your Fingertips",
    subtitle:
      "Browse our comprehensive document library to find forms, guides, and resources to help you navigate your mortgage journey. All documents are regularly updated to ensure accuracy.",
    primaryCtaLabel: "Contact Us for Help",
    primaryCtaLink: "/contact",
    secondaryCtaLabel: "Schedule a Consultation",
    secondaryCtaLink: "/book-consultation",
  },
  bottomCta: {
    title: "Need Help Finding a Document?",
    body: "Can't find what you're looking for? Our team is here to help. Contact us and we'll send you the documents and information you need.",
    primaryLabel: "Call 1300 257 467",
    primaryLink: "tel:1300257467",
    secondaryLabel: "Email Us",
    secondaryLink: "/contact",
  },
};

import { GUIDE_PAGE_DEFAULTS } from "@/lib/mock-data/seed-resource-guides";

export function mergeGuidePageContent(
  slug: string,
  raw?: Partial<GuidePageContent>,
): GuidePageContent {
  const d = GUIDE_PAGE_DEFAULTS[slug] ?? {
    introSection: {},
    introParagraphs: [],
    sections: [],
  };
  return {
    introSection: { ...(d.introSection ?? {}), ...(raw?.introSection ?? {}) },
    introParagraphs: mergeParagraphs(d.introParagraphs, raw?.introParagraphs),
    sections: mergeSections(d.sections, raw?.sections),
    closingBlock:
      d.closingBlock || raw?.closingBlock
        ? {
            title: raw?.closingBlock?.title ?? d.closingBlock?.title ?? "",
            paragraphs:
              raw?.closingBlock?.paragraphs ?? d.closingBlock?.paragraphs ?? [],
            primaryLabel:
              raw?.closingBlock?.primaryLabel ??
              d.closingBlock?.primaryLabel ??
              "",
            primaryLink:
              raw?.closingBlock?.primaryLink ??
              d.closingBlock?.primaryLink ??
              "",
            secondaryLabel:
              raw?.closingBlock?.secondaryLabel ??
              d.closingBlock?.secondaryLabel ??
              "",
            secondaryLink:
              raw?.closingBlock?.secondaryLink ??
              d.closingBlock?.secondaryLink ??
              "",
          }
        : undefined,
    statsSection:
      d.statsSection || raw?.statsSection
        ? {
            ...(d.statsSection ?? { title: "", cards: [] }),
            ...raw?.statsSection,
            cards: mergeCards(
              d.statsSection?.cards ?? [],
              raw?.statsSection?.cards,
            ),
          }
        : undefined,
    bottomCta:
      d.bottomCta || raw?.bottomCta
        ? {
            title: raw?.bottomCta?.title ?? d.bottomCta?.title ?? "",
            subtitle: raw?.bottomCta?.subtitle ?? d.bottomCta?.subtitle ?? "",
            primaryLabel:
              raw?.bottomCta?.primaryLabel ?? d.bottomCta?.primaryLabel ?? "",
            primaryLink:
              raw?.bottomCta?.primaryLink ?? d.bottomCta?.primaryLink ?? "",
            secondaryLabel:
              raw?.bottomCta?.secondaryLabel ??
              d.bottomCta?.secondaryLabel ??
              "",
            secondaryLink:
              raw?.bottomCta?.secondaryLink ?? d.bottomCta?.secondaryLink ?? "",
          }
        : undefined,
    relatedGuides:
      (raw?.relatedGuides ?? d.relatedGuides)
        ? {
            title:
              raw?.relatedGuides?.title ??
              d.relatedGuides?.title ??
              "Related Guides",
            cards: mergeCards(
              d.relatedGuides?.cards ?? [],
              raw?.relatedGuides?.cards,
            ),
          }
        : undefined,
  };
}

export function mergeResourceListPageContent(
  slug: ResourceListSlug,
  raw?: Partial<ResourceListPageContent>,
): ResourceListPageContent {
  const d =
    slug === "faq" ? DEFAULT_FAQ_PAGE_CONTENT : DEFAULT_DOCUMENTS_PAGE_CONTENT;
  return {
    intro: { ...d.intro, ...raw?.intro },
    bottomCta: { ...d.bottomCta, ...raw?.bottomCta },
  };
}

export function mergeResourcePageContent(
  slug: ResourceSlug,
  raw?: Record<string, unknown>,
): Record<string, unknown> {
  if (RESOURCE_LIST_SLUGS.includes(slug as ResourceListSlug)) {
    return mergeResourceListPageContent(
      slug as ResourceListSlug,
      raw as Partial<ResourceListPageContent>,
    ) as unknown as Record<string, unknown>;
  }
  return mergeGuidePageContent(
    slug,
    raw as Partial<GuidePageContent>,
  ) as unknown as Record<string, unknown>;
}

export function getResourceAdminPath(slug: ResourceSlug): string {
  return `/admin/resources/${slug}`;
}
