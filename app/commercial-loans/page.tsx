import { getPageData } from "@/lib/api-server";
import { mergeDetailedLoanContent } from "@/lib/loan-detail-content";
import DetailedLoanPageClient from "@/app/components/loan/DetailedLoanPageClient";

export default async function CommercialLoansPage() {
  const page = await getPageData("commercial-loans");
  const content = mergeDetailedLoanContent(
    "commercial-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeDetailedLoanContent
    >[1],
  );
  return (
    <DetailedLoanPageClient
      slug="commercial-loans"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
