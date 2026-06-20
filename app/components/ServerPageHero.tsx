import { getPageData } from "@/lib/api-server";
import type { PageHeroFallback } from "@/lib/page-hero";
import ParallaxHero from "./parallax-hero";

export default async function ServerPageHero({
  slug,
  fallback,
}: {
  slug: string;
  fallback: PageHeroFallback;
}) {
  const page = await getPageData(slug);

  return (
    <ParallaxHero
      title={page?.heroTitle ?? fallback.title}
      subtitle={page?.heroSubtitle ?? fallback.subtitle}
      backgroundImage={page?.heroBackgroundImage ?? fallback.backgroundImage}
      height={fallback.height}
    />
  );
}
