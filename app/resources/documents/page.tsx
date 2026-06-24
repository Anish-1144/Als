import { getPageData } from "@/lib/api-server";
import { mergePageHeroData } from "@/lib/page-hero";
import { mergeResourceListPageContent } from "@/lib/resources-content";
import ResourceListPageClient from "@/app/components/resources/ResourceListPageClient";

export default async function DocumentsPage() {
  const page = await getPageData("documents");
  const content = mergeResourceListPageContent(
    "documents",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeResourceListPageContent
    >[1],
  );
  return (
    <ResourceListPageClient
      slug="documents"
      content={content}
      pageHero={mergePageHeroData("documents", page)}
    />
  );
}
