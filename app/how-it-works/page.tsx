import { getPageData } from "@/lib/api-server";
import { mergeHowItWorksContent } from "@/lib/how-it-works-content";
import { mergePageHeroData } from "@/lib/page-hero";
import HowItWorksPageClient from "./HowItWorksPageClient";

export default async function HowItWorksPage() {
  const page = await getPageData("how-it-works");
  const content = mergeHowItWorksContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeHowItWorksContent
    >[0],
  );
  return (
    <HowItWorksPageClient
      content={content}
      pageHero={mergePageHeroData("how-it-works", page)}
    />
  );
}
