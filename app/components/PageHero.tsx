"use client";

import { useEffect, useState } from "react";
import { clientApiData } from "@/lib/api-client";
import type { PageHeroFallback } from "@/lib/page-hero";
import ParallaxHero from "@/app/components/parallax-hero";

interface PageHeroData {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
}

function toHeroState(
  data: PageHeroData | PageHeroFallback,
  height?: string,
) {
  if ("heroTitle" in data) {
    return {
      title: data.heroTitle,
      subtitle: data.heroSubtitle,
      backgroundImage: data.heroBackgroundImage,
      height,
    };
  }
  return { ...data, height: data.height ?? height };
}

export default function PageHero({
  slug,
  fallback,
  initialData,
}: {
  slug: string;
  fallback: PageHeroFallback;
  initialData?: PageHeroData | null;
}) {
  const [hero, setHero] = useState(() =>
    toHeroState(initialData ?? fallback, fallback.height),
  );

  useEffect(() => {
    clientApiData<PageHeroData>(`/pages/${slug}`).then((page) => {
      if (page) {
        setHero(toHeroState(page, fallback.height));
      }
    });
  }, [slug, fallback.height]);

  return (
    <ParallaxHero
      title={hero.title}
      subtitle={hero.subtitle}
      backgroundImage={hero.backgroundImage}
      height={hero.height}
    />
  );
}
