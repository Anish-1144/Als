"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DOCUMENTS_PAGE_CONTENT = exports.DEFAULT_FAQ_PAGE_CONTENT = exports.RESOURCE_SLUGS = exports.RESOURCE_LIST_SLUGS = exports.RESOURCE_GUIDE_SLUGS = void 0;
exports.mergeGuidePageContent = mergeGuidePageContent;
exports.mergeResourceListPageContent = mergeResourceListPageContent;
exports.mergeResourcePageContent = mergeResourcePageContent;
exports.getResourceAdminPath = getResourceAdminPath;
exports.RESOURCE_GUIDE_SLUGS = [
    "first-home-buyer-guide",
    "investment-guide",
    "construction-loans-guide",
    "smsf-guide",
    "guarantors-guide",
];
exports.RESOURCE_LIST_SLUGS = ["documents", "faq"];
exports.RESOURCE_SLUGS = [...exports.RESOURCE_GUIDE_SLUGS, ...exports.RESOURCE_LIST_SLUGS];
function mergeCards(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        ...(defaults[i] ?? { title: "", description: "" }),
        ...(raw?.[i] ?? {}),
    }));
}
function mergeSubsections(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        title: raw?.[i]?.title ?? defaults[i]?.title,
        paragraphs: raw?.[i]?.paragraphs ?? defaults[i]?.paragraphs ?? [],
        bullets: raw?.[i]?.bullets ?? defaults[i]?.bullets,
        highlightTitle: raw?.[i]?.highlightTitle ?? defaults[i]?.highlightTitle,
        highlightBullets: raw?.[i]?.highlightBullets ?? defaults[i]?.highlightBullets,
    }));
}
function mergeSections(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        ...defaults[i],
        ...raw?.[i],
        title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
        introParagraphs: raw?.[i]?.introParagraphs ?? defaults[i]?.introParagraphs,
        bullets: raw?.[i]?.bullets ?? defaults[i]?.bullets,
        subsections: mergeSubsections(defaults[i]?.subsections ?? [], raw?.[i]?.subsections),
    }));
}
function mergeParagraphs(defaults, raw) {
    if (raw && raw.length > 0)
        return raw;
    return defaults;
}
exports.DEFAULT_FAQ_PAGE_CONTENT = {
    intro: {
        badge: "HELP CENTER",
        title: "Get Your Questions Answered",
        subtitle: "Browse our comprehensive FAQ section to find quick answers to the most common questions about mortgages, loans, and our services. Can't find what you're looking for?",
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
exports.DEFAULT_DOCUMENTS_PAGE_CONTENT = {
    intro: {
        badge: "RESOURCE CENTER",
        title: "Your Financial Documents at Your Fingertips",
        subtitle: "Browse our comprehensive document library to find forms, guides, and resources to help you navigate your mortgage journey. All documents are regularly updated to ensure accuracy.",
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
const seed_resource_guides_1 = require("@/lib/mock-data/seed-resource-guides");
function mergeGuidePageContent(slug, raw) {
    const d = seed_resource_guides_1.GUIDE_PAGE_DEFAULTS[slug] ?? { introSection: {}, introParagraphs: [], sections: [] };
    return {
        introSection: { ...(d.introSection ?? {}), ...(raw?.introSection ?? {}) },
        introParagraphs: mergeParagraphs(d.introParagraphs, raw?.introParagraphs),
        sections: mergeSections(d.sections, raw?.sections),
        closingBlock: d.closingBlock || raw?.closingBlock
            ? {
                title: raw?.closingBlock?.title ?? d.closingBlock?.title ?? "",
                paragraphs: raw?.closingBlock?.paragraphs ?? d.closingBlock?.paragraphs ?? [],
                primaryLabel: raw?.closingBlock?.primaryLabel ?? d.closingBlock?.primaryLabel ?? "",
                primaryLink: raw?.closingBlock?.primaryLink ?? d.closingBlock?.primaryLink ?? "",
                secondaryLabel: raw?.closingBlock?.secondaryLabel ?? d.closingBlock?.secondaryLabel ?? "",
                secondaryLink: raw?.closingBlock?.secondaryLink ?? d.closingBlock?.secondaryLink ?? "",
            }
            : undefined,
        statsSection: d.statsSection || raw?.statsSection
            ? {
                ...(d.statsSection ?? { title: "", cards: [] }),
                ...raw?.statsSection,
                cards: mergeCards(d.statsSection?.cards ?? [], raw?.statsSection?.cards),
            }
            : undefined,
        bottomCta: d.bottomCta || raw?.bottomCta
            ? {
                title: raw?.bottomCta?.title ?? d.bottomCta?.title ?? "",
                subtitle: raw?.bottomCta?.subtitle ?? d.bottomCta?.subtitle ?? "",
                primaryLabel: raw?.bottomCta?.primaryLabel ?? d.bottomCta?.primaryLabel ?? "",
                primaryLink: raw?.bottomCta?.primaryLink ?? d.bottomCta?.primaryLink ?? "",
                secondaryLabel: raw?.bottomCta?.secondaryLabel ?? d.bottomCta?.secondaryLabel ?? "",
                secondaryLink: raw?.bottomCta?.secondaryLink ?? d.bottomCta?.secondaryLink ?? "",
            }
            : undefined,
        relatedGuides: raw?.relatedGuides ?? d.relatedGuides
            ? {
                title: raw?.relatedGuides?.title ?? d.relatedGuides?.title ?? "Related Guides",
                cards: mergeCards(d.relatedGuides?.cards ?? [], raw?.relatedGuides?.cards),
            }
            : undefined,
    };
}
function mergeResourceListPageContent(slug, raw) {
    const d = slug === "faq" ? exports.DEFAULT_FAQ_PAGE_CONTENT : exports.DEFAULT_DOCUMENTS_PAGE_CONTENT;
    return {
        intro: { ...d.intro, ...raw?.intro },
        bottomCta: { ...d.bottomCta, ...raw?.bottomCta },
    };
}
function mergeResourcePageContent(slug, raw) {
    if (exports.RESOURCE_LIST_SLUGS.includes(slug)) {
        return mergeResourceListPageContent(slug, raw);
    }
    return mergeGuidePageContent(slug, raw);
}
function getResourceAdminPath(slug) {
    return `/admin/resources/${slug}`;
}
