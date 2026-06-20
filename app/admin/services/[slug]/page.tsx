import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminServicesEditor from "@/app/components/admin/AdminServicesEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { LOAN_PRODUCT_SLUGS } from "@/lib/services-content";

type LoanProductSlug = (typeof LOAN_PRODUCT_SLUGS)[number];

function isLoanProductSlug(slug: string): slug is LoanProductSlug {
  return (LOAN_PRODUCT_SLUGS as readonly string[]).includes(slug);
}

export default async function LoanProductAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isLoanProductSlug(slug)) notFound();

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminServicesEditor slug={slug} />
    </Suspense>
  );
}
