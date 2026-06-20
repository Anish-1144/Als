"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { mergeFooterData } from "@/lib/footer-content";
import { footerSeedData } from "@/lib/mock-data/seed-footer";
import { DEFAULT_LOGO_URL } from "@/lib/navigation-content";
import type { FooterData, FooterLink, FooterLinkGroup } from "@/lib/types";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { AdminField, SaveButton, inputClass, AdminReadOnlyUrlField } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminImagePanelShell } from "@/app/components/admin/AdminEditorImagePanel";
import { AdminLoading } from "@/app/components/admin/AdminTable";
import { AdminCardGroup } from "@/app/components/admin/home/AdminCardGroup";

const TABS = [
  { id: "logo", label: "Logo", description: "Footer logo shown in the company column." },
  {
    id: "company",
    label: "Company",
    description: "Company name, short description, and copyright line.",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Phone, email, and office address shown in the footer.",
  },
  {
    id: "links",
    label: "Link columns",
    description: "Footer navigation columns. Edit link labels; routes are fixed.",
  },
  {
    id: "social",
    label: "Social",
    description: "Social profile links and icons.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

type SocialLink = NonNullable<FooterData["socialLinks"]>[number];

type FooterForm = {
  companyName: string;
  description: string;
  copyrightText: string;
  logoUrl: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  socialLinks: SocialLink[];
  footerLinks: FooterLinkGroup[];
};

const SOCIAL_ICONS = [
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
] as const;

function parseFooterForm(data: FooterData): FooterForm {
  const merged = mergeFooterData(data);
  return {
    companyName: merged.companyName ?? "",
    description: merged.description ?? "",
    copyrightText: merged.copyrightText ?? "",
    logoUrl: merged.logoUrl ?? DEFAULT_LOGO_URL,
    phone: merged.contact?.phone ?? "",
    email: merged.contact?.email ?? "",
    street: merged.address?.street ?? "",
    city: merged.address?.city ?? "",
    state: merged.address?.state ?? "",
    zipCode: merged.address?.zipCode ?? "",
    socialLinks: merged.socialLinks?.length
      ? merged.socialLinks.map((s) => ({ ...s }))
      : footerSeedData.socialLinks.map((s) => ({ ...s })),
    footerLinks: merged.footerLinks?.length
      ? merged.footerLinks.map((g) => ({
          title: g.title,
          links: g.links.map((l) => ({ ...l })),
        }))
      : footerSeedData.footerLinks.map((g) => ({
          title: g.title,
          links: g.links.map((l) => ({ ...l })),
        })),
  };
}

function updateLink(links: FooterLink[], index: number, patch: Partial<FooterLink>): FooterLink[] {
  return links.map((link, i) => (i === index ? { ...link, ...patch } : link));
}

function updateGroup(groups: FooterLinkGroup[], index: number, patch: Partial<FooterLinkGroup>): FooterLinkGroup[] {
  return groups.map((group, i) => (i === index ? { ...group, ...patch } : group));
}

export default function AdminFooterEditor() {
  const [form, setForm] = useState<FooterForm | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("logo");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<FooterData>("/admin/footer").then((res) => {
      if (res.success && res.data) {
        setForm(parseFooterForm(res.data));
      } else {
        setForm(parseFooterForm(footerSeedData));
      }
      setLoading(false);
    });
  }, []);

  function patchForm(patch: Partial<FooterForm>) {
    setForm((f) => (f ? { ...f, ...patch } : f));
    setStatus("");
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setStatus("Saving...");
    const body = {
      companyName: form.companyName,
      description: form.description,
      copyrightText: form.copyrightText,
      logoUrl: form.logoUrl,
      address: {
        street: form.street,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
      },
      contact: { phone: form.phone, email: form.email },
      socialLinks: form.socialLinks,
      footerLinks: form.footerLinks,
    };
    const res = await clientApi("/admin/footer", {
      method: "PUT",
      body: JSON.stringify(body),
    });
    setSaving(false);
    if (res.success) {
      setStatus("All changes saved");
      if (res.data) setForm(parseFooterForm(res.data as FooterData));
    } else {
      setStatus(res.error?.message ?? "Save failed");
    }
  }

  if (loading || !form) return <AdminLoading />;

  const imagePanel =
    activeTab === "logo" ? (
      <AdminImagePanelShell
        title="Footer logo"
        description="Shown in the company column on every page."
        onSave={save}
        saving={saving}
        status={status}
      >
        <CloudinaryImageField
          label="Logo"
          value={form.logoUrl}
          onChange={(url) => patchForm({ logoUrl: url })}
          folder="als/branding"
          aspectClass="aspect-[3/1] max-h-28"
          hint="Wide logo on dark background. PNG with transparency works best."
          compact
        />
      </AdminImagePanelShell>
    ) : undefined;

  return (
    <AdminEditorShell
      title="Footer"
      description="Site-wide footer logo, contact details, link columns, and social profiles."
      previewHref="/"
      previewLabel="Preview site"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabId)}
      tabPanelLabel="Footer sections"
      imagePanel={imagePanel}
      footer={
        <AdminEditorSaveBar>
          <div />
          <div className="flex items-center gap-3">
            <AdminSaveStatus status={status} />
            <SaveButton onClick={save} loading={saving} />
          </div>
        </AdminEditorSaveBar>
      }
    >
      {activeTab === "logo" && (
        <p className="text-sm text-slate-500">
          Upload or replace the footer logo using the panel on the right, then save your changes.
        </p>
      )}

      {activeTab === "company" && (
        <div className="space-y-1">
          <AdminField label="Company name">
            <input
              className={inputClass()}
              value={form.companyName}
              onChange={(e) => patchForm({ companyName: e.target.value })}
            />
          </AdminField>
          <AdminField label="Description">
            <textarea
              className={inputClass()}
              rows={4}
              value={form.description}
              onChange={(e) => patchForm({ description: e.target.value })}
            />
          </AdminField>
          <AdminField label="Copyright text">
            <input
              className={inputClass()}
              value={form.copyrightText}
              onChange={(e) => patchForm({ copyrightText: e.target.value })}
            />
          </AdminField>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="space-y-1">
          <AdminField label="Phone">
            <input
              className={inputClass()}
              value={form.phone}
              onChange={(e) => patchForm({ phone: e.target.value })}
            />
          </AdminField>
          <AdminField label="Email">
            <input
              className={inputClass()}
              type="email"
              value={form.email}
              onChange={(e) => patchForm({ email: e.target.value })}
            />
          </AdminField>
          <AdminField label="Street">
            <input
              className={inputClass()}
              value={form.street}
              onChange={(e) => patchForm({ street: e.target.value })}
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-3">
            <AdminField label="City">
              <input
                className={inputClass()}
                value={form.city}
                onChange={(e) => patchForm({ city: e.target.value })}
              />
            </AdminField>
            <AdminField label="State">
              <input
                className={inputClass()}
                value={form.state}
                onChange={(e) => patchForm({ state: e.target.value })}
              />
            </AdminField>
            <AdminField label="Postcode">
              <input
                className={inputClass()}
                value={form.zipCode}
                onChange={(e) => patchForm({ zipCode: e.target.value })}
              />
            </AdminField>
          </div>
        </div>
      )}

      {activeTab === "links" && (
        <div className="space-y-6">
          {form.footerLinks.map((group, groupIndex) => (
            <AdminCardGroup key={groupIndex} index={groupIndex} title={group.title || `Column ${groupIndex + 1}`}>
              <AdminField label="Column title">
                <input
                  className={inputClass()}
                  value={group.title}
                  onChange={(e) =>
                    patchForm({
                      footerLinks: updateGroup(form.footerLinks, groupIndex, { title: e.target.value }),
                    })
                  }
                />
              </AdminField>
              <div className="space-y-4 pt-2">
                {group.links.map((link, linkIndex) => (
                  <div
                    key={linkIndex}
                    className="rounded-lg border border-slate-200/80 bg-white p-4 space-y-1"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Link {linkIndex + 1}
                    </p>
                    <AdminField label="Label">
                      <input
                        className={inputClass()}
                        value={link.label}
                        onChange={(e) =>
                          patchForm({
                            footerLinks: updateGroup(form.footerLinks, groupIndex, {
                              links: updateLink(group.links, linkIndex, { label: e.target.value }),
                            }),
                          })
                        }
                      />
                    </AdminField>
                    <AdminReadOnlyUrlField label="URL" value={link.url} />
                  </div>
                ))}
              </div>
            </AdminCardGroup>
          ))}
        </div>
      )}

      {activeTab === "social" && (
        <div className="space-y-4">
          {form.socialLinks.map((social, index) => (
            <AdminCardGroup key={index} index={index} title={social.platform || `Social ${index + 1}`}>
              <AdminField label="Platform">
                <select
                  className={inputClass()}
                  value={social.icon || social.platform.toLowerCase()}
                  onChange={(e) => {
                    const option = SOCIAL_ICONS.find((o) => o.value === e.target.value);
                    const next = form.socialLinks.map((item, i) =>
                      i === index
                        ? {
                            ...item,
                            icon: e.target.value,
                            platform: option?.label ?? e.target.value,
                          }
                        : item,
                    );
                    patchForm({ socialLinks: next });
                  }}
                >
                  {SOCIAL_ICONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Profile URL">
                <input
                  className={inputClass()}
                  value={social.url}
                  onChange={(e) => {
                    const next = form.socialLinks.map((item, i) =>
                      i === index ? { ...item, url: e.target.value } : item,
                    );
                    patchForm({ socialLinks: next });
                  }}
                  placeholder="https://..."
                />
              </AdminField>
              <button
                type="button"
                onClick={() =>
                  patchForm({ socialLinks: form.socialLinks.filter((_, i) => i !== index) })
                }
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </AdminCardGroup>
          ))}
          <button
            type="button"
            onClick={() =>
              patchForm({
                socialLinks: [
                  ...form.socialLinks,
                  { platform: "Facebook", url: "", icon: "facebook" },
                ],
              })
            }
            className="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            + Add social link
          </button>
        </div>
      )}
    </AdminEditorShell>
  );
}
