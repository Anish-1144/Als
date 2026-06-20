import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function SmsfLoansPage() {
  const page = await getPageData("smsf-loans");
  const content = mergeLoanPageContent(
    "smsf-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return <LoanPageClient slug="smsf-loans" content={content} />;
}
