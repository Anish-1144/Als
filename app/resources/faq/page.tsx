import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeResourceListPageContent } from "@/lib/resources-content";
import ResourceListPageClient from "@/app/components/resources/ResourceListPageClient";

export default async function FAQPage() {
  const page = await getPageData("faq");
  const content = mergeResourceListPageContent(
    "faq",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<typeof mergeResourceListPageContent>[1],
  );
  return (
    <ResourceListPageClient
      slug="faq"
      content={content}
      pageHero={mergePageHeroData("faq", page)}
    />
  );
}
