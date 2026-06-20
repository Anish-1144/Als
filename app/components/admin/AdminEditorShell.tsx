"use client";

import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { adminActiveTabClass } from "@/app/components/admin/AdminForm";
import { useMediaQuery } from "@/lib/use-media-query";

export type AdminEditorTab = {
  id: string;
  label: string;
  description: string;
};

const IMAGE_PANEL_WIDTH = 380;
const IMAGE_PANEL_GAP = 32;

export function AdminEditorShell({
  title,
  description = "Edit page sections. Save when you're done.",
  previewHref,
  previewLabel = "Preview",
  tabs,
  activeTab,
  onTabChange,
  tabPanelLabel,
  children,
  footer,
  imagePanel,
}: {
  title: string;
  description?: string;
  previewHref?: string;
  previewLabel?: string;
  tabs: readonly AdminEditorTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
  tabPanelLabel?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  imagePanel?: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const currentTab = tabs.find((t) => t.id === activeTab) ?? tabs[0];
  const contentOffset = imagePanel && isDesktop ? IMAGE_PANEL_WIDTH + IMAGE_PANEL_GAP : 0;

  const editorCard = (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.04)]">
      <div className="border-b border-slate-100 px-4 pt-4 sm:px-6">
        <div
          className="-mb-px flex gap-1 overflow-x-auto pb-1 [scrollbar-width:thin]"
          role="tablist"
          aria-label={tabPanelLabel ?? "Editor sections"}
        >
          {tabs.map((tab) => {
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onTabChange(tab.id)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition ${
                  active
                    ? adminActiveTabClass
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8" role="tabpanel">
        <p className="mb-6 text-[13px] leading-relaxed text-slate-500 sm:mb-8">{currentTab.description}</p>
        {children}
      </div>

      {footer}
    </div>
  );

  return (
    <div className="w-full min-w-0">
      <header
        className="mb-5 flex flex-col gap-3 sm:mb-6 sm:gap-4 lg:flex-row lg:items-start lg:justify-between"
        style={contentOffset ? { marginRight: contentOffset } : undefined}
      >
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Content</p>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl lg:text-[1.75rem]">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
        {previewHref && (
          <Link
            href={previewHref}
            target="_blank"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 sm:w-auto"
          >
            {previewLabel}
            <FaArrowUpRightFromSquare className="h-3 w-3 text-slate-400" />
          </Link>
        )}
      </header>

      {imagePanel && (
        <div
          className="mb-5 w-full rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_rgba(15,23,42,0.04)] sm:mb-6 sm:p-5 lg:fixed lg:top-8 lg:z-20 lg:mb-0 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto"
          style={
            isDesktop
              ? {
                  width: IMAGE_PANEL_WIDTH,
                  right: "max(1.5rem, calc((100vw - 260px - 1200px) / 2 + 1.5rem))",
                }
              : undefined
          }
        >
          {imagePanel}
        </div>
      )}

      <div style={contentOffset ? { marginRight: contentOffset } : undefined}>{editorCard}</div>
    </div>
  );
}

export function AdminEditorSaveBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export function AdminPublishedToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500/30"
      />
      <span>
        Published
        <span className="block text-xs text-slate-400">Visible on the live site</span>
      </span>
    </label>
  );
}

export function AdminSaveStatus({
  status,
  successMessage = "All changes saved",
}: {
  status: string;
  successMessage?: string;
}) {
  if (!status) return null;
  const ok = status === successMessage || status === "Saved!";
  return (
    <span className={`text-sm ${ok ? "font-medium text-teal-600" : "text-slate-500"}`}>{status}</span>
  );
}
