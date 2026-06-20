import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminCalculatorsEditor from "@/app/components/admin/AdminCalculatorsEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { CALCULATOR_TOOL_SLUGS } from "@/lib/calculator-content";

type CalculatorToolSlug = (typeof CALCULATOR_TOOL_SLUGS)[number];

function isCalculatorToolSlug(slug: string): slug is CalculatorToolSlug {
  return (CALCULATOR_TOOL_SLUGS as readonly string[]).includes(slug);
}

export default async function CalculatorToolAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCalculatorToolSlug(slug)) notFound();

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminCalculatorsEditor slug={slug} />
    </Suspense>
  );
}
