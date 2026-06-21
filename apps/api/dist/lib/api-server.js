"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHomepageData = getHomepageData;
exports.getFooterData = getFooterData;
exports.getNavigationData = getNavigationData;
exports.getPopupData = getPopupData;
exports.getLoansData = getLoansData;
exports.getLoanBySlug = getLoanBySlug;
exports.getTeamData = getTeamData;
exports.getTestimonialsData = getTestimonialsData;
exports.getAwardsData = getAwardsData;
exports.getLendersData = getLendersData;
exports.getCommunityPostsData = getCommunityPostsData;
exports.getDocumentsData = getDocumentsData;
exports.getJobPostingsData = getJobPostingsData;
exports.getFaqsData = getFaqsData;
exports.getPageData = getPageData;
const api_1 = require("./api");
const mock_data_1 = require("./mock-data");
const footer_content_1 = require("./footer-content");
const navigation_content_1 = require("./navigation-content");
async function getHomepageData() {
    const data = await (0, api_1.apiFetchOptional)("/homepage");
    const base = data ?? mock_data_1.mockHomepage;
    const seedHero = mock_data_1.mockHomepage.hero;
    const seedWhy = mock_data_1.mockHomepage.whyChooseUs;
    const hero = {
        ...seedHero,
        ...(base.hero ?? {}),
    };
    const whyChooseUs = {
        ...seedWhy,
        ...(base.whyChooseUs ?? {}),
        backgroundImage: {
            url: base.whyChooseUs
                ?.backgroundImage?.url ??
                seedWhy.backgroundImage?.url ??
                "/section2.jpg",
        },
    };
    return { ...base, hero, whyChooseUs };
}
async function getFooterData() {
    const data = await (0, api_1.apiFetchOptional)("/footer");
    return (0, footer_content_1.mergeFooterData)(data ?? null);
}
async function getNavigationData() {
    const data = await (0, api_1.apiFetchOptional)("/navigation");
    return (0, navigation_content_1.mergeNavigationData)(data ?? null);
}
async function getPopupData() {
    const data = await (0, api_1.apiFetchOptional)("/popup");
    return data ?? mock_data_1.mockPopup;
}
async function getLoansData() {
    const data = await (0, api_1.apiFetchOptional)("/loans");
    return data ?? (0, mock_data_1.getActiveLoans)();
}
async function getLoanBySlug(slug) {
    const data = await (0, api_1.apiFetchOptional)(`/loans/${slug}`);
    if (data)
        return data;
    return (0, mock_data_1.getActiveLoans)().find((l) => l.slug === slug) ?? null;
}
async function getTeamData(homepageOnly = false) {
    const path = homepageOnly ? "/team?homepage=true" : "/team";
    const data = await (0, api_1.apiFetchOptional)(path);
    return data ?? (homepageOnly ? (0, mock_data_1.getActiveTeam)().filter((m) => m.showOnHomepage) : (0, mock_data_1.getActiveTeam)());
}
async function getTestimonialsData() {
    const data = await (0, api_1.apiFetchOptional)("/testimonials");
    return data ?? (0, mock_data_1.getActiveTestimonials)();
}
async function getAwardsData() {
    const data = await (0, api_1.apiFetchOptional)("/awards");
    return data ?? (0, mock_data_1.getActiveAwards)();
}
async function getLendersData() {
    const data = await (0, api_1.apiFetchOptional)("/lenders");
    return data ?? (0, mock_data_1.getActiveLenders)();
}
async function getCommunityPostsData() {
    const data = await (0, api_1.apiFetchOptional)("/community-posts");
    return data ?? (0, mock_data_1.getActiveCommunityPosts)();
}
async function getDocumentsData() {
    const data = await (0, api_1.apiFetchOptional)("/documents");
    return data ?? (0, mock_data_1.getActiveDocuments)();
}
async function getJobPostingsData() {
    const data = await (0, api_1.apiFetchOptional)("/careers/postings");
    return data ?? (0, mock_data_1.getActiveJobPostings)();
}
async function getFaqsData() {
    const { faqSeedData } = await import("./mock-data/seed-faqs");
    const fallback = faqSeedData.filter((f) => f.isActive);
    const data = await (0, api_1.apiFetchOptional)("/faqs");
    return data ?? fallback;
}
async function getPageData(slug) {
    const { PAGE_REGISTRY } = await import("./page-registry");
    const fallback = PAGE_REGISTRY.find((p) => p.slug === slug) ?? null;
    const data = await (0, api_1.apiFetchOptional)(`/pages/${slug}`);
    return data ?? fallback;
}
