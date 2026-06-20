"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { clientApi } from "@/lib/api-client";
import { PAGE_REGISTRY } from "@/lib/page-registry";
import { DEFAULT_NAVIGATION, mergeNavigationData } from "@/lib/navigation-content";
import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { AdminField, SaveButton, inputClass } from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminImagePanelShell } from "@/app/components/admin/AdminEditorImagePanel";
import { AdminLoading } from "@/app/components/admin/AdminTable";

const TABS = [
  { id: "logo", label: "Logo", description: "Navbar logo shown top-left on every public page." },
  {
    id: "pages",
    label: "Pages",
    description: "Edit hero title, subtitle, and background for each navbar-linked page.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

interface PageRow {
  slug: string;
  label: string;
  group: string;
  path: string;
  heroTitle: string;
  isPublished?: boolean;
}

const NAV_PREVIEW_ITEMS = [
  "Home",
  "Why ALS",
  "Our Services",
  "Calculators",
  "How It Works",
  "Resources",
  "Contact",
];

/** Groups shown in the Pages tab — navbar-linked content only */
const NAVBAR_GROUPS = new Set(["Why ALS", "Services", "Tools", "Company", "Resources"]);

function NavbarPreview({ logoUrl, logoAlt }: { logoUrl: string; logoAlt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#1d293d] shadow-lg">
      <p className="border-b border-white/10 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        Live preview
      </p>
      <div className="px-3 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 shrink-0">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-10 max-w-[120px] object-contain object-left"
            />
          </div>
          <div className="hidden min-w-0 flex-1 flex-wrap justify-center gap-x-2 gap-y-1 px-1 sm:flex">
            {NAV_PREVIEW_ITEMS.slice(0, 5).map((label) => (
              <span
                key={label}
                className="truncate text-[9px] font-medium uppercase tracking-wide text-gray-300"
              >
                {label}
              </span>
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded bg-[#00a69c] px-2 py-1 text-[9px] font-medium uppercase text-white">
            <IoCallSharp className="h-2.5 w-2.5" />
            Touch
          </span>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-x-2 gap-y-1 border-t border-white/10 pt-3 sm:hidden">
          {NAV_PREVIEW_ITEMS.map((label) => (
            <span
              key={label}
              className="text-[9px] font-medium uppercase tracking-wide text-gray-400"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageCard({ page }: { page: PageRow }) {
  return (
    <Link
      href={`/admin/pages/${page.slug}`}
      className="group flex items-start justify-between gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-[#00a69c]/40 hover:shadow-md"
    >
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900 group-hover:text-[#00a69c]">{page.label}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500">{page.heroTitle}</p>
        <p className="mt-2 truncate font-mono text-[11px] text-slate-400">{page.path}</p>
      </div>
      <span className="mt-0.5 shrink-0 text-xs font-medium text-[#00a69c] opacity-0 transition group-hover:opacity-100">
        Edit →
      </span>
    </Link>
  );
}

export default function AdminNavbarEditor() {
  const [pages, setPages] = useState<PageRow[]>([]);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_NAVIGATION.logoUrl);
  const [logoAlt, setLogoAlt] = useState(DEFAULT_NAVIGATION.logoAlt);
  const [activeTab, setActiveTab] = useState<TabId>("logo");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      clientApi<PageRow[]>("/admin/pages"),
      clientApi<Record<string, unknown>>("/admin/navigation"),
    ]).then(([pagesRes, navRes]) => {
      if (pagesRes.success && pagesRes.data?.length) {
        setPages(pagesRes.data);
      } else {
        setPages(
          PAGE_REGISTRY.map((p) => ({
            slug: p.slug,
            label: p.label,
            group: p.group,
            path: p.path,
            heroTitle: p.heroTitle,
            isPublished: true,
          })),
        );
      }

      if (navRes.success && navRes.data) {
        const merged = mergeNavigationData(navRes.data as Partial<typeof DEFAULT_NAVIGATION>);
        setLogoUrl(merged.logoUrl);
        setLogoAlt(merged.logoAlt);
      }

      setLoading(false);
    });
  }, []);

  function patchLogo(patch: { logoUrl?: string; logoAlt?: string }) {
    if (patch.logoUrl !== undefined) setLogoUrl(patch.logoUrl);
    if (patch.logoAlt !== undefined) setLogoAlt(patch.logoAlt);
    setStatus("");
  }

  async function save() {
    setSaving(true);
    setStatus("Saving...");
    const res = await clientApi("/admin/navigation", {
      method: "PUT",
      body: JSON.stringify({ logoUrl, logoAlt }),
    });
    setSaving(false);
    if (res.success) {
      setStatus("All changes saved");
      if (res.data) {
        const merged = mergeNavigationData(res.data as Partial<typeof DEFAULT_NAVIGATION>);
        setLogoUrl(merged.logoUrl);
        setLogoAlt(merged.logoAlt);
      }
    } else {
      setStatus(res.error?.message ?? "Save failed");
    }
  }

  if (loading) return <AdminLoading />;

  const navbarPages = pages.filter((p) => NAVBAR_GROUPS.has(p.group));
  const grouped = navbarPages.reduce<Record<string, PageRow[]>>((acc, page) => {
    if (!acc[page.group]) acc[page.group] = [];
    acc[page.group].push(page);
    return acc;
  }, {});

  const previewPanel = (
    <div className="space-y-5">
      {activeTab === "logo" && (
        <AdminImagePanelShell title="Navbar logo" description="Upload or replace the site logo.">
          <CloudinaryImageField
            label="Logo"
            value={logoUrl}
            onChange={(url) => patchLogo({ logoUrl: url })}
            folder="als/branding"
            aspectClass="aspect-[3/1] max-h-28"
            hint="Wide logo on dark background. PNG with transparency works best."
            compact
          />
        </AdminImagePanelShell>
      )}
      <NavbarPreview logoUrl={logoUrl} logoAlt={logoAlt} />
    </div>
  );

  return (
    <AdminEditorShell
      title="Navbar"
      description="Site-wide navbar logo and hero content for pages linked in the main menu."
      previewHref="/"
      previewLabel="Preview site"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabId)}
      tabPanelLabel="Navbar sections"
      imagePanel={previewPanel}
      footer={
        activeTab === "logo" ? (
          <AdminEditorSaveBar>
            <p className="text-xs text-slate-500">Logo appears on every public page.</p>
            <div className="flex items-center gap-3">
              <AdminSaveStatus status={status} />
              <SaveButton onClick={save} loading={saving} />
            </div>
          </AdminEditorSaveBar>
        ) : undefined
      }
    >
      {activeTab === "logo" && (
        <div className="space-y-1">
          <AdminField label="Logo alt text">
            <input
              className={inputClass()}
              value={logoAlt}
              onChange={(e) => patchLogo({ logoAlt: e.target.value })}
              placeholder="ALS Mortgage Solutions"
            />
          </AdminField>
          <p className="text-sm text-slate-500">
            Upload or replace the logo using the panel on the right, then save your changes.
          </p>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="space-y-8">
          {Object.entries(grouped).map(([group, groupPages]) => (
            <section key={group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                {group}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {groupPages.map((page) => (
                  <PageCard key={page.slug} page={page} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </AdminEditorShell>
  );
}
