"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LEGAL_FOOTER_LINKS = void 0;
exports.mergeFooterLinks = mergeFooterLinks;
exports.mergeFooterData = mergeFooterData;
const seed_footer_1 = require("./mock-data/seed-footer");
const navigation_content_1 = require("./navigation-content");
exports.LEGAL_FOOTER_LINKS = {
    title: "Legal",
    links: [
        { label: "Privacy Policy", url: "/legal/privacy-policy" },
        { label: "Terms of Service", url: "/legal/terms-of-service" },
        { label: "Accessibility", url: "/legal/accessibility" },
        { label: "Licensing", url: "/legal/licensing" },
    ],
};
function mergeFooterLinks(links) {
    const groups = links?.length ? [...links] : [...seed_footer_1.footerSeedData.footerLinks];
    if (groups.some((g) => g.title === "Legal"))
        return groups;
    return [...groups, exports.LEGAL_FOOTER_LINKS];
}
function mergeFooterData(data) {
    if (!data)
        return seed_footer_1.footerSeedData;
    return {
        ...data,
        logoUrl: data.logoUrl?.trim() || seed_footer_1.footerSeedData.logoUrl || navigation_content_1.DEFAULT_LOGO_URL,
        footerLinks: mergeFooterLinks(data.footerLinks),
    };
}
