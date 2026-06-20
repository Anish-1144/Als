import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function RefinancingPage() {
  const page = await getPageData("refinancing");
  const content = mergeLoanPageContent(
    "refinancing",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return <LoanPageClient slug="refinancing" content={content} />;
}
