import { PAGE_REGISTRY } from "./page-registry";

export type PageHeroFallback = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
};

export function getPageHeroFallback(
  slug: string,
  overrides?: Partial<PageHeroFallback>,
): PageHeroFallback {
  const entry = PAGE_REGISTRY.find((p) => p.slug === slug);
  return {
    title: entry?.heroTitle ?? slug,
    subtitle: entry?.heroSubtitle ?? "",
    backgroundImage: entry?.heroBackgroundImage ?? "/hero.jpg",
    ...overrides,
  };
}
