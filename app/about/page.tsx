import { getPageData } from "@/lib/api-server";
import { mergeAboutContent } from "@/lib/page-content";
import { mergePageHeroData } from "@/lib/page-hero";
import AboutPageClient from "./AboutPageClient";

export default async function AboutPage() {
  const page = await getPageData("about");
  const initialContent = mergeAboutContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeAboutContent
    >[0],
  );
  return (
    <AboutPageClient
      initialContent={initialContent}
      pageHero={mergePageHeroData("about", page)}
    />
  );
}
