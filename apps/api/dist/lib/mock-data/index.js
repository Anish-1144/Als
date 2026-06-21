"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockPopup = exports.mockFooter = exports.mockHomepage = exports.jobPostingsData = exports.documentsData = exports.communityPostsData = exports.lendersData = exports.awardsData = exports.popupData = exports.faqSeedData = exports.loanSeedData = exports.footerSeedData = exports.teamSeedData = exports.testimonialsSeedData = exports.homepageSeedData = void 0;
exports.getActiveLoans = getActiveLoans;
exports.getHomepageTeam = getHomepageTeam;
exports.getActiveTeam = getActiveTeam;
exports.getActiveTestimonials = getActiveTestimonials;
exports.getActiveAwards = getActiveAwards;
exports.getActiveLenders = getActiveLenders;
exports.getActiveCommunityPosts = getActiveCommunityPosts;
exports.getActiveDocuments = getActiveDocuments;
exports.getActiveJobPostings = getActiveJobPostings;
var seed_homepage_1 = require("./seed-homepage");
Object.defineProperty(exports, "homepageSeedData", { enumerable: true, get: function () { return seed_homepage_1.homepageSeedData; } });
Object.defineProperty(exports, "testimonialsSeedData", { enumerable: true, get: function () { return seed_homepage_1.testimonialsSeedData; } });
Object.defineProperty(exports, "teamSeedData", { enumerable: true, get: function () { return seed_homepage_1.teamSeedData; } });
var seed_footer_1 = require("./seed-footer");
Object.defineProperty(exports, "footerSeedData", { enumerable: true, get: function () { return seed_footer_1.footerSeedData; } });
var seed_loans_1 = require("./seed-loans");
Object.defineProperty(exports, "loanSeedData", { enumerable: true, get: function () { return seed_loans_1.loanSeedData; } });
var seed_faqs_1 = require("./seed-faqs");
Object.defineProperty(exports, "faqSeedData", { enumerable: true, get: function () { return seed_faqs_1.faqSeedData; } });
var extras_1 = require("./extras");
Object.defineProperty(exports, "popupData", { enumerable: true, get: function () { return extras_1.popupData; } });
Object.defineProperty(exports, "awardsData", { enumerable: true, get: function () { return extras_1.awardsData; } });
Object.defineProperty(exports, "lendersData", { enumerable: true, get: function () { return extras_1.lendersData; } });
Object.defineProperty(exports, "communityPostsData", { enumerable: true, get: function () { return extras_1.communityPostsData; } });
Object.defineProperty(exports, "documentsData", { enumerable: true, get: function () { return extras_1.documentsData; } });
Object.defineProperty(exports, "jobPostingsData", { enumerable: true, get: function () { return extras_1.jobPostingsData; } });
const seed_homepage_2 = require("./seed-homepage");
const seed_footer_2 = require("./seed-footer");
const seed_loans_2 = require("./seed-loans");
const extras_2 = require("./extras");
function getActiveLoans() {
    return seed_loans_2.loanSeedData.filter((loan) => loan.isActive);
}
function getHomepageTeam() {
    return seed_homepage_2.teamSeedData.filter((member) => member.showOnHomepage && member.isActive);
}
function getActiveTeam(limit) {
    const members = seed_homepage_2.teamSeedData
        .filter((member) => member.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    return limit ? members.slice(0, limit) : members;
}
function getActiveTestimonials(limit) {
    const items = seed_homepage_2.testimonialsSeedData
        .filter((t) => t.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    return limit ? items.slice(0, limit) : items;
}
function getActiveAwards() {
    return extras_2.awardsData.filter((a) => a.isActive);
}
function getActiveLenders() {
    return extras_2.lendersData.filter((l) => l.isActive);
}
function getActiveCommunityPosts() {
    return extras_2.communityPostsData.filter((p) => p.isActive);
}
function getActiveDocuments() {
    return extras_2.documentsData
        .filter((d) => d.isActive)
        .sort((a, b) => a.order - b.order);
}
function getActiveJobPostings() {
    return extras_2.jobPostingsData
        .filter((j) => j.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}
exports.mockHomepage = seed_homepage_2.homepageSeedData;
exports.mockFooter = seed_footer_2.footerSeedData;
exports.mockPopup = extras_2.popupData;
