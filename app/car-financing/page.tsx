import { getPageData } from "@/lib/api-server";
import { mergeDetailedLoanContent } from "@/lib/loan-detail-content";
import DetailedLoanPageClient from "@/app/components/loan/DetailedLoanPageClient";

export default async function CarFinancingPage() {
  const page = await getPageData("car-financing");
  const content = mergeDetailedLoanContent(
    "car-financing",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeDetailedLoanContent
    >[1],
  );
  return (
    <DetailedLoanPageClient
      slug="car-financing"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
