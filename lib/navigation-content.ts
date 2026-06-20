export type NavigationData = {
  logoUrl: string;
  logoAlt: string;
};

export const DEFAULT_LOGO_URL = "/logo-bgr.png";

export const DEFAULT_NAVIGATION: NavigationData = {
  logoUrl: DEFAULT_LOGO_URL,
  logoAlt: "ALS Mortgage Solutions",
};

export function mergeNavigationData(
  data: Partial<NavigationData> | null | undefined,
): NavigationData {
  return {
    logoUrl: data?.logoUrl?.trim() || DEFAULT_NAVIGATION.logoUrl,
    logoAlt: data?.logoAlt?.trim() || DEFAULT_NAVIGATION.logoAlt,
  };
}
