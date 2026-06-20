import { footerSeedData } from "./mock-data/seed-footer";
import { DEFAULT_LOGO_URL } from "./navigation-content";
import type { FooterData, FooterLinkGroup } from "./types";

export const LEGAL_FOOTER_LINKS: FooterLinkGroup = {
  title: "Legal",
  links: [
    { label: "Privacy Policy", url: "/legal/privacy-policy" },
    { label: "Terms of Service", url: "/legal/terms-of-service" },
    { label: "Accessibility", url: "/legal/accessibility" },
    { label: "Licensing", url: "/legal/licensing" },
  ],
};

export function mergeFooterLinks(links?: FooterLinkGroup[]): FooterLinkGroup[] {
  const groups = links?.length ? [...links] : [...footerSeedData.footerLinks];
  if (groups.some((g) => g.title === "Legal")) return groups;
  return [...groups, LEGAL_FOOTER_LINKS];
}

export function mergeFooterData(data: FooterData | null | undefined): FooterData {
  if (!data) return footerSeedData;
  return {
    ...data,
    logoUrl: data.logoUrl?.trim() || footerSeedData.logoUrl || DEFAULT_LOGO_URL,
    footerLinks: mergeFooterLinks(data.footerLinks),
  };
}
