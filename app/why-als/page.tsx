import { getPageData } from "@/lib/api-server";
import { mergeWhyAlsContent } from "@/lib/page-content";
import WhyAlsPageClient from "./WhyAlsPageClient";

export default async function WhyAlsPage() {
  const page = await getPageData("why-als");
  const content = mergeWhyAlsContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeWhyAlsContent
    >[0],
  );
  return <WhyAlsPageClient content={content} />;
}
