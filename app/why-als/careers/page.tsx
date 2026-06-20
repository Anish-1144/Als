import { getPageData } from "@/lib/api-server";
import { mergeCareersContent } from "@/lib/page-content";
import CareersPageClient from "./CareersPageClient";

export default async function Careers() {
  const page = await getPageData("careers");
  const content = mergeCareersContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeCareersContent
    >[0],
  );
  return <CareersPageClient content={content} />;
}
