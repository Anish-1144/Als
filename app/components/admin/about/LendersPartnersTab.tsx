"use client";

import { useCallback, useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminSectionVisibilityToggle } from "@/app/components/admin/AdminForm";
import AboutCrudTab from "@/app/components/admin/about/AboutCrudTab";

type LenderItem = {
  _id?: string;
  name: string;
  logo: string;
  description?: string;
  website?: string;
  order: number;
  showBorder?: boolean;
  featured?: boolean;
  isActive: boolean;
};

type LendersPartnersTabProps = {
  showLogoBorders: boolean;
  onShowLogoBordersChange: (value: boolean) => void;
  showLogoBackground: boolean;
  onShowLogoBackgroundChange: (value: boolean) => void;
};

export default function LendersPartnersTab({
  showLogoBorders,
  onShowLogoBordersChange,
  showLogoBackground,
  onShowLogoBackgroundChange,
}: LendersPartnersTabProps) {
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");

  const syncBordersToAllLenders = useCallback(async (enabled: boolean) => {
    setSyncing(true);
    setSyncStatus(enabled ? "Adding borders to all logos…" : "Removing borders from all logos…");
    const res = await clientApi<LenderItem[]>("/admin/lenders");
    if (!res.success || !res.data) {
      setSyncing(false);
      setSyncStatus("Could not update lender borders");
      return;
    }
    await Promise.all(
      res.data.map((lender) => {
        if (!lender._id) return Promise.resolve();
        return clientApi(`/admin/lenders/${lender._id}`, {
          method: "PUT",
          body: JSON.stringify({ showBorder: enabled }),
        });
      }),
    );
    setSyncing(false);
    setSyncStatus(enabled ? "Borders added to all lender logos" : "Borders removed from all lender logos");
  }, []);

  useEffect(() => {
    if (!syncStatus) return;
    const timer = window.setTimeout(() => setSyncStatus(""), 4000);
    return () => window.clearTimeout(timer);
  }, [syncStatus]);

  async function handleBorderToggle(enabled: boolean) {
    onShowLogoBordersChange(enabled);
    await syncBordersToAllLenders(enabled);
  }

  return (
    <div className="space-y-6">
      <div>
        <AdminSectionVisibilityToggle
          visible={showLogoBackground}
          onChange={onShowLogoBackgroundChange}
          label="Show card background behind logos"
          description={
            showLogoBackground
              ? "Each lender logo sits on a dark card background."
              : "Logos display without a card background — transparent icons only."
          }
        />
      </div>

      <div>
        <AdminSectionVisibilityToggle
          visible={showLogoBorders}
          onChange={handleBorderToggle}
          label="Show teal border on lender logos"
          description={
            showLogoBorders
              ? "Borders are on for all logos. Turn off to remove borders from every lender."
              : "Borders are off for all logos. Turn on to add borders to every lender."
          }
        />
        {(syncing || syncStatus) && (
          <p className="mt-2 text-xs font-medium text-slate-500">
            {syncing ? "Updating all lenders…" : syncStatus}
          </p>
        )}
      </div>

      <AboutCrudTab<LenderItem>
        key={`${showLogoBorders ? "borders-on" : "borders-off"}-${showLogoBackground ? "bg-on" : "bg-off"}`}
        apiPath="/admin/lenders"
        itemLabel="Lender"
        defaultImageFolder="als/partners"
        empty={{
          name: "",
          logo: "",
          description: "",
          website: "",
          order: 0,
          showBorder: showLogoBorders,
          featured: false,
          isActive: true,
        }}
        fields={[
          { key: "name", label: "Name", required: true },
          {
            key: "logo",
            label: "Logo",
            type: "image",
            required: true,
            imageFolder: "als/partners",
            imageHint: "Upload a lender logo. PNG with transparency works best.",
            aspectClass: "aspect-square max-h-44",
            objectFit: "contain",
          },
          { key: "description", label: "Description", type: "textarea", rows: 2 },
          { key: "website", label: "Website URL" },
          { key: "order", label: "Display order", type: "number" },
          { key: "featured", label: "Featured (sort first)", type: "checkbox" },
          { key: "isActive", label: "Active", type: "checkbox" },
        ]}
        getListTitle={(item) => String(item.name ?? "Untitled")}
        getListImage={(item) => String(item.logo || "") || undefined}
        getListImageBorder={(item) => showLogoBorders && item.showBorder !== false}
        previewImageBorder={showLogoBorders}
        previewImageBackground={showLogoBackground}
      />
    </div>
  );
}
