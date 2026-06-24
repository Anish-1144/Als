import { getPageData } from "@/lib/api-server";
import { mergeDetailedLoanContent } from "@/lib/loan-detail-content";
import DetailedLoanPageClient from "@/app/components/loan/DetailedLoanPageClient";

export default async function RefinancingPage() {
  const page = await getPageData("refinancing");
  const content = mergeDetailedLoanContent(
    "refinancing",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeDetailedLoanContent
    >[1],
  );
  return (
    <DetailedLoanPageClient
      slug="refinancing"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
