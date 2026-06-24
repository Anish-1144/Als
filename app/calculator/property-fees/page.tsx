import { getPageData } from "@/lib/api-server";
import { mergeCalculatorPageContent } from "@/lib/calculator-content";
import { mergePageHeroData } from "@/lib/page-hero";
import CalculatorPageClient from "@/app/components/calculator/CalculatorPageClient";

export default async function PropertyFeesPage() {
  const page = await getPageData("property-fees");
  const content = mergeCalculatorPageContent(
    "property-fees",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeCalculatorPageContent
    >[1],
  );
  return (
    <CalculatorPageClient
      slug="property-fees"
      content={content}
      pageHero={mergePageHeroData("property-fees", page)}
    />
  );
}
