"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import WebsitePopup from "./popup";
import type { FooterData, PopupData } from "@/lib/types";
import type { NavigationData } from "@/lib/navigation-content";

export default function SiteShell({
  children,
  footerData,
  popupData,
  navigationData,
}: {
  children: React.ReactNode;
  footerData: FooterData;
  popupData: PopupData;
  navigationData: NavigationData;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="font-sans">
      <Navbar logoUrl={navigationData.logoUrl} logoAlt={navigationData.logoAlt} />
      <div className="pt-24">{children}</div>
      <Footer footerData={footerData} />
      <WebsitePopup popupData={popupData} />
    </div>
  );
}
