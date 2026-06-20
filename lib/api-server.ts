import { apiFetchOptional } from "./api";
import {
  mockHomepage,
  mockFooter,
  mockPopup,
  getActiveLoans,
  getActiveTeam,
  getActiveTestimonials,
  getActiveAwards,
  getActiveLenders,
  getActiveCommunityPosts,
  getActiveDocuments,
  getActiveJobPostings,
} from "./mock-data";
import { mergeFooterData } from "./footer-content";
import { mergeNavigationData, type NavigationData } from "./navigation-content";

export async function getHomepageData() {
  const data = await apiFetchOptional<typeof mockHomepage>("/homepage");
  const base = data ?? mockHomepage;
  const seedHero = mockHomepage.hero as Record<string, unknown>;
  const seedWhy = mockHomepage.whyChooseUs as Record<string, unknown>;
  const hero = {
    ...seedHero,
    ...((base.hero as Record<string, unknown> | undefined) ?? {}),
  };
  const whyChooseUs = {
    ...seedWhy,
    ...((base.whyChooseUs as Record<string, unknown> | undefined) ?? {}),
    backgroundImage: {
      url:
        (
          (base.whyChooseUs as Record<string, unknown> | undefined)
            ?.backgroundImage as { url?: string } | undefined
        )?.url ??
        (seedWhy.backgroundImage as { url?: string } | undefined)?.url ??
        "/section2.jpg",
    },
  };
  return { ...base, hero, whyChooseUs };
}

export async function getFooterData() {
  const data = await apiFetchOptional<typeof mockFooter>("/footer");
  return mergeFooterData(data ?? null);
}

export async function getNavigationData(): Promise<NavigationData> {
  const data = await apiFetchOptional<NavigationData>("/navigation");
  return mergeNavigationData(data ?? null);
}

export async function getPopupData() {
  const data = await apiFetchOptional<typeof mockPopup>("/popup");
  return data ?? mockPopup;
}

export async function getLoansData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveLoans>>>("/loans");
  return data ?? getActiveLoans();
}

export async function getLoanBySlug(slug: string) {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveLoans>>[0]>(
    `/loans/${slug}`,
  );
  if (data) return data;
  return getActiveLoans().find((l) => l.slug === slug) ?? null;
}

export async function getTeamData(homepageOnly = false) {
  const path = homepageOnly ? "/team?homepage=true" : "/team";
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveTeam>>>(path);
  return data ?? (homepageOnly ? getActiveTeam().filter((m) => m.showOnHomepage) : getActiveTeam());
}

export async function getTestimonialsData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveTestimonials>>>("/testimonials");
  return data ?? getActiveTestimonials();
}

export async function getAwardsData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveAwards>>>("/awards");
  return data ?? getActiveAwards();
}

export async function getLendersData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveLenders>>>("/lenders");
  return data ?? getActiveLenders();
}

export async function getCommunityPostsData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveCommunityPosts>>>("/community-posts");
  return data ?? getActiveCommunityPosts();
}

export async function getDocumentsData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveDocuments>>>("/documents");
  return data ?? getActiveDocuments();
}

export async function getJobPostingsData() {
  const data = await apiFetchOptional<Awaited<ReturnType<typeof getActiveJobPostings>>>("/careers/postings");
  return data ?? getActiveJobPostings();
}

export async function getFaqsData() {
  const { faqSeedData } = await import("./mock-data/seed-faqs");
  const fallback = faqSeedData.filter((f) => f.isActive);
  const data = await apiFetchOptional<typeof fallback>("/faqs");
  return data ?? fallback;
}

export async function getPageData(slug: string) {
  const { PAGE_REGISTRY } = await import("./page-registry");
  const fallback = PAGE_REGISTRY.find((p) => p.slug === slug) ?? null;
  const data = await apiFetchOptional<NonNullable<typeof fallback>>(`/pages/${slug}`);
  return data ?? fallback;
}
