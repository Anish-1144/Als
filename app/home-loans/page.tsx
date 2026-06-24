import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function HomeLoansPage() {
  const page = await getPageData("home-loans");
  const content = mergeLoanPageContent(
    "home-loans",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return (
    <LoanPageClient
      slug="home-loans"
      content={content}
      heroImage={page?.heroBackgroundImage}
    />
  );
}
