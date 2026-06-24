import { getPageData } from "@/lib/api-server";
import { mergeDetailedLoanContent } from "@/lib/loan-detail-content";
import DetailedLoanPageClient from "@/app/components/loan/DetailedLoanPageClient";

export default async function SmsfLoansPage() {
  const page = await getPageData("smsf-loans");
  const content = mergeDetailedLoanContent(
    "smsf-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeDetailedLoanContent
    >[1],
  );
  return (
    <DetailedLoanPageClient
      slug="smsf-loans"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
