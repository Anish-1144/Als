import { PAGE_REGISTRY } from "./page-registry";

export type PageHeroFallback = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  height?: string;
};

export type PageHeroApiData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: string;
};

/** Placeholder hero images from early seeds — replace with registry defaults. */
const GENERIC_HERO_IMAGES = new Set(["/section2.jpg", "/hero.jpg", ""]);

export function mergePageHeroData(
  slug: string,
  apiData?: PageHeroApiData | null,
): Required<PageHeroApiData> {
  const registry = PAGE_REGISTRY.find((p) => p.slug === slug);
  const fallback = getPageHeroFallback(slug);
  const apiImage = apiData?.heroBackgroundImage?.trim();
  const useRegistryImage = !apiImage || GENERIC_HERO_IMAGES.has(apiImage);

  return {
    heroTitle: apiData?.heroTitle?.trim() || registry?.heroTitle || fallback.title,
    heroSubtitle:
      apiData?.heroSubtitle?.trim() || registry?.heroSubtitle || fallback.subtitle,
    heroBackgroundImage: useRegistryImage
      ? registry?.heroBackgroundImage ?? fallback.backgroundImage
      : apiImage,
  };
}

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
