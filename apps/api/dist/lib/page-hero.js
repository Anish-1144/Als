"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageHeroFallback = getPageHeroFallback;
const page_registry_1 = require("./page-registry");
function getPageHeroFallback(slug, overrides) {
    const entry = page_registry_1.PAGE_REGISTRY.find((p) => p.slug === slug);
    return {
        title: entry?.heroTitle ?? slug,
        subtitle: entry?.heroSubtitle ?? "",
        backgroundImage: entry?.heroBackgroundImage ?? "/hero.jpg",
        ...overrides,
    };
}
