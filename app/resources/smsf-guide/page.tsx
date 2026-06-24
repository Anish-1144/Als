import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeGuidePageContent } from "@/lib/resources-content";
import GuidePageClient from "@/app/components/resources/GuidePageClient";

export default async function SmsfGuidePage() {
  const page = await getPageData("smsf-guide");
  const content = mergeGuidePageContent(
    "smsf-guide",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeGuidePageContent
    >[1],
  );
  return (
    <GuidePageClient
      slug="smsf-guide"
      content={content}
      pageHero={mergePageHeroData("smsf-guide", page)}
    />
  );
}
