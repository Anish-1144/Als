import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeGuidePageContent } from "@/lib/resources-content";
import GuidePageClient from "@/app/components/resources/GuidePageClient";

export default async function FirstHomeBuyerGuidePage() {
  const page = await getPageData("first-home-buyer-guide");
  const content = mergeGuidePageContent(
    "first-home-buyer-guide",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeGuidePageContent
    >[1],
  );
  return (
    <GuidePageClient
      slug="first-home-buyer-guide"
      content={content}
      pageHero={mergePageHeroData("first-home-buyer-guide", page)}
    />
  );
}
