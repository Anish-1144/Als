import { notFound } from "next/navigation";
import { getPageData } from "@/lib/api-server";
import { LEGAL_SLUGS, mergeLegalPageContent, type LegalSlug } from "@/lib/legal-content";
import { mergePageHeroData } from "@/lib/page-hero";
import LegalPageClient from "@/app/components/legal/LegalPageClient";

function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  const page = await getPageData(slug);
  const content = mergeLegalPageContent(
    slug,
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeLegalPageContent
    >[1],
  );

  return (
    <LegalPageClient
      slug={slug}
      content={content}
      pageHero={mergePageHeroData(slug, page)}
    />
  );
}
