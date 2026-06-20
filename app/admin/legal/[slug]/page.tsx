import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminLegalEditor from "@/app/components/admin/AdminLegalEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { LEGAL_SLUGS, type LegalSlug } from "@/lib/legal-content";

function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

export default async function LegalAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminLegalEditor slug={slug} />
    </Suspense>
  );
}
