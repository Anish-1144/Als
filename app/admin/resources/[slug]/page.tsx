import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminResourcesEditor from "@/app/components/admin/AdminResourcesEditor";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { RESOURCE_SLUGS, type ResourceSlug } from "@/lib/resources-content";

function isResourceSlug(slug: string): slug is ResourceSlug {
  return (RESOURCE_SLUGS as readonly string[]).includes(slug);
}

export default async function ResourceAdminPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isResourceSlug(slug)) notFound();

  return (
    <Suspense fallback={<AdminLoading />}>
      <AdminResourcesEditor slug={slug} />
    </Suspense>
  );
}
