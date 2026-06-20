import { getPageData } from "@/lib/api-server";
import { mergeCalculatorPageContent } from "@/lib/calculator-content";
import CalculatorPageClient from "@/app/components/calculator/CalculatorPageClient";

export default async function ExtraRepaymentsPage() {
  const page = await getPageData("extra-repayments");
  const content = mergeCalculatorPageContent(
    "extra-repayments",
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeCalculatorPageContent
    >[1],
  );
  return <CalculatorPageClient slug="extra-repayments" content={content} />;
}
