import { redirect } from "next/navigation";

const REDIRECTS: Record<string, string> = {
  "why-als": "/admin/why-als",
  about: "/admin/why-als/about",
  careers: "/admin/why-als/careers",
  services: "/admin/services",
  "home-loans": "/admin/services/home-loans",
  "investment-loans": "/admin/services/investment-loans",
  "commercial-loans": "/admin/services/commercial-loans",
  "smsf-loans": "/admin/services/smsf-loans",
  "car-financing": "/admin/services/car-financing",
  refinancing: "/admin/services/refinancing",
  calculator: "/admin/calculators",
  "borrowing-capacity": "/admin/calculators/borrowing-capacity",
  "extra-repayments": "/admin/calculators/extra-repayments",
  "property-fees": "/admin/calculators/property-fees",
  "how-it-works": "/admin/how-it-works",
  "first-home-buyer-guide": "/admin/resources/first-home-buyer-guide",
  "investment-guide": "/admin/resources/investment-guide",
  "construction-loans-guide": "/admin/resources/construction-loans-guide",
  "smsf-guide": "/admin/resources/smsf-guide",
  "guarantors-guide": "/admin/resources/guarantors-guide",
  documents: "/admin/resources/documents",
  faq: "/admin/resources/faq",
  contact: "/admin/contact",
  "privacy-policy": "/admin/legal/privacy-policy",
  "terms-of-service": "/admin/legal/terms-of-service",
  accessibility: "/admin/legal/accessibility",
  licensing: "/admin/legal/licensing",
};

export default async function AdminEditPageHero({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const target = REDIRECTS[slug];
  if (target) redirect(target);

  const { default: Editor } = await import("./editor");
  return <Editor slug={slug} />;
}
