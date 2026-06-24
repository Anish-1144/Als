import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function InvestmentLoansPage() {
  const page = await getPageData("investment-loans");
  const content = mergeLoanPageContent(
    "investment-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return (
    <LoanPageClient
      slug="investment-loans"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
