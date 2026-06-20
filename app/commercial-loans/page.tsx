import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function CommercialLoansPage() {
  const page = await getPageData("commercial-loans");
  const content = mergeLoanPageContent(
    "commercial-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return <LoanPageClient slug="commercial-loans" content={content} />;
}
