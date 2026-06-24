import { getPageData } from "@/lib/api-server";
import { mergeContactContent } from "@/lib/contact-content";
import { mergePageHeroData } from "@/lib/page-hero";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const page = await getPageData("contact");
  const content = mergeContactContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeContactContent
    >[0],
  );
  return (
    <ContactPageClient
      content={content}
      pageHero={mergePageHeroData("contact", page)}
    />
  );
}
