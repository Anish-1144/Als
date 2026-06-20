import { getPageData } from "@/lib/api-server";
import { mergeContactContent } from "@/lib/contact-content";
import ContactPageClient from "./ContactPageClient";

export default async function ContactPage() {
  const page = await getPageData("contact");
  const content = mergeContactContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<typeof mergeContactContent>[0],
  );
  return (
    <ContactPageClient
      content={content}
      pageData={
        page
          ? {
              heroTitle: String(page.heroTitle ?? ""),
              heroSubtitle: String(page.heroSubtitle ?? ""),
              heroBackgroundImage: String(page.heroBackgroundImage ?? ""),
            }
          : null
      }
    />
  );
}
