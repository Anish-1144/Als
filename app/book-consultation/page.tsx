import { getPageData } from "@/lib/api-server";
import { mergeConsultationContent } from "@/lib/consultation-content";
import { mergePageHeroData } from "@/lib/page-hero";
import BookConsultationPageClient from "./BookConsultationPageClient";

export default async function BookConsultationPage() {
  const page = await getPageData("book-consultation");
  const content = mergeConsultationContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeConsultationContent
    >[0],
  );

  return (
    <BookConsultationPageClient
      content={content}
      pageHero={mergePageHeroData("book-consultation", page)}
    />
  );
}
