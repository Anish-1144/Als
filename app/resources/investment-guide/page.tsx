import { getPageData } from "@/lib/api-server";
import { mergeGuidePageContent } from "@/lib/resources-content";
import GuidePageClient from "@/app/components/resources/GuidePageClient";

export default async function InvestmentGuidePage() {
  const page = await getPageData("investment-guide");
  const content = mergeGuidePageContent(
    "investment-guide",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<typeof mergeGuidePageContent>[1],
  );
  return <GuidePageClient slug="investment-guide" content={content} />;
}
