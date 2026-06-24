import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeGuidePageContent } from "@/lib/resources-content";
import GuidePageClient from "@/app/components/resources/GuidePageClient";

export default async function ConstructionLoansGuidePage() {
  const page = await getPageData("construction-loans-guide");
  const content = mergeGuidePageContent(
    "construction-loans-guide",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeGuidePageContent
    >[1],
  );
  return (
    <GuidePageClient
      slug="construction-loans-guide"
      content={content}
      pageHero={mergePageHeroData("construction-loans-guide", page)}
    />
  );
}
