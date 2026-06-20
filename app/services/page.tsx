import { getPageData } from "@/lib/api-server";
import { mergeServicesContent } from "@/lib/services-content";
import ServicesPageClient from "./ServicesPageClient";

export default async function ServicesPage() {
  const page = await getPageData("services");
  const content = mergeServicesContent(
    (page as { content?: Record<string, unknown> } | null)?.content as Parameters<
      typeof mergeServicesContent
    >[0],
  );
  return <ServicesPageClient content={content} />;
}
