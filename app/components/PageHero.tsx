"use client";

import { useEffect, useState } from "react";
import { clientApiData } from "@/lib/api-client";
import type { PageHeroFallback, PageHeroApiData } from "@/lib/page-hero";
import { mergePageHeroData } from "@/lib/page-hero";
import ParallaxHero from "@/app/components/parallax-hero";

interface PageHeroData extends PageHeroApiData {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
}

function toHeroState(
  slug: string,
  data: PageHeroApiData | PageHeroFallback | PageHeroData | null | undefined,
  height?: string,
) {
  if (data && "heroTitle" in data && data.heroTitle) {
    const merged = mergePageHeroData(slug, data);
    return {
      title: merged.heroTitle,
      subtitle: merged.heroSubtitle,
      backgroundImage: merged.heroBackgroundImage,
      height,
    };
  }
  if (data && "title" in data) {
    return { ...data, height: data.height ?? height };
  }
  const merged = mergePageHeroData(slug, null);
  return {
    title: merged.heroTitle,
    subtitle: merged.heroSubtitle,
    backgroundImage: merged.heroBackgroundImage,
    height,
  };
}

export default function PageHero({
  slug,
  fallback,
  initialData,
  serifTitle = true,
}: {
  slug: string;
  fallback: PageHeroFallback;
  initialData?: PageHeroApiData | null;
  /** Besley on hero title; set false for service/loan pages (Author, matches hackbox). */
  serifTitle?: boolean;
}) {
  const [hero, setHero] = useState(() =>
    toHeroState(slug, initialData ?? fallback, fallback.height),
  );

  useEffect(() => {
    clientApiData<PageHeroData>(`/pages/${slug}`).then((page) => {
      setHero(toHeroState(slug, page ?? fallback, fallback.height));
    });
  }, [slug, fallback]);

  return (
    <ParallaxHero
      title={hero.title}
      subtitle={hero.subtitle}
      backgroundImage={hero.backgroundImage}
      height={hero.height}
      serifTitle={serifTitle}
    />
  );
}
