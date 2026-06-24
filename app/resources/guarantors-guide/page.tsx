import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeGuidePageContent } from "@/lib/resources-content";
import GuidePageClient from "@/app/components/resources/GuidePageClient";

export default async function GuarantorsGuidePage() {
  const page = await getPageData("guarantors-guide");
  const content = mergeGuidePageContent(
    "guarantors-guide",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeGuidePageContent
    >[1],
  );
  return (
    <GuidePageClient
      slug="guarantors-guide"
      content={content}
      pageHero={mergePageHeroData("guarantors-guide", page)}
    />
  );
}
