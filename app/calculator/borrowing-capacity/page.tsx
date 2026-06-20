import { getPageData } from "@/lib/api-server";
import { mergeCalculatorPageContent } from "@/lib/calculator-content";
import CalculatorPageClient from "@/app/components/calculator/CalculatorPageClient";

export default async function BorrowingCapacityPage() {
  const page = await getPageData("borrowing-capacity");
  const content = mergeCalculatorPageContent(
    "borrowing-capacity",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeCalculatorPageContent
    >[1],
  );
  return <CalculatorPageClient slug="borrowing-capacity" content={content} />;
}
