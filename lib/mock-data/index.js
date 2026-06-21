export { homepageSeedData, testimonialsSeedData, teamSeedData } from "./seed-homepage";
export { footerSeedData } from "./seed-footer";
export { loanSeedData } from "./seed-loans";
export { faqSeedData } from "./seed-faqs";
export { popupData, awardsData, lendersData, communityPostsData, documentsData, jobPostingsData, } from "./extras";
import { homepageSeedData, testimonialsSeedData, teamSeedData } from "./seed-homepage";
import { footerSeedData } from "./seed-footer";
import { loanSeedData } from "./seed-loans";
import { popupData, awardsData, lendersData, communityPostsData, documentsData, jobPostingsData, } from "./extras";
export function getActiveLoans() {
    return loanSeedData.filter((loan) => loan.isActive);
}
export function getHomepageTeam() {
    return teamSeedData.filter((member) => member.showOnHomepage && member.isActive);
}
export function getActiveTeam(limit) {
    const members = teamSeedData
        .filter((member) => member.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    return limit ? members.slice(0, limit) : members;
}
export function getActiveTestimonials(limit) {
    const items = testimonialsSeedData
        .filter((t) => t.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    return limit ? items.slice(0, limit) : items;
}
export function getActiveAwards() {
    return awardsData.filter((a) => a.isActive);
}
export function getActiveLenders() {
    return lendersData.filter((l) => l.isActive);
}
export function getActiveCommunityPosts() {
    return communityPostsData.filter((p) => p.isActive);
}
export function getActiveDocuments() {
    return documentsData
        .filter((d) => d.isActive)
        .sort((a, b) => a.order - b.order);
}
export function getActiveJobPostings() {
    return jobPostingsData
        .filter((j) => j.isActive)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
}
export const mockHomepage = homepageSeedData;
export const mockFooter = footerSeedData;
export const mockPopup = popupData;
