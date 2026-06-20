import { getPageData } from "@/lib/api-server";
import { mergeLoanPageContent } from "@/lib/services-content";
import LoanPageClient from "@/app/components/loan/LoanPageClient";

export default async function CarFinancingPage() {
  const page = await getPageData("car-financing");
  const content = mergeLoanPageContent(
    "car-financing",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLoanPageContent
    >[1],
  );
  return <LoanPageClient slug="car-financing" content={content} />;
}
