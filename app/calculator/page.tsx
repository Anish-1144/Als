import { getPageData } from "@/lib/api-server";
import { mergeCalculatorsHubContent } from "@/lib/calculator-content";
import { mergePageHeroData } from "@/lib/page-hero";
import CalculatorsHubClient from "./CalculatorsHubClient";

export default async function CalculatorPage() {
  const page = await getPageData("calculator");
  const content = mergeCalculatorsHubContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeCalculatorsHubContent
    >[0],
  );
  return (
    <CalculatorsHubClient
      content={content}
      pageHero={mergePageHeroData("calculator", page)}
    />
  );
}
