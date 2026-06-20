"use client";

import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { clientApi } from "@/lib/api-client";
import { popupData as defaultPopup } from "@/lib/mock-data/extras";
import type { PopupData } from "@/lib/types";
import {
  AdminField,
  SaveButton,
  inputClass,
  AdminReadOnlyUrlField,
  adminPrimaryButtonClass,
} from "@/app/components/admin/AdminForm";
import {
  AdminEditorSaveBar,
  AdminEditorShell,
  AdminSaveStatus,
} from "@/app/components/admin/AdminEditorShell";
import { AdminLoading } from "@/app/components/admin/AdminTable";

const TABS = [
  { id: "content", label: "Content", description: "Headline, message, and call-to-action button text." },
  { id: "settings", label: "Settings", description: "Enable or disable the popup and control when it appears." },
] as const;

type TabId = (typeof TABS)[number]["id"];

function PopupPreview({ data }: { data: PopupData }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#2d3544] p-6 shadow-lg">
      <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        Live preview
      </p>
      <div className="relative rounded-xl border border-gray-600 bg-[#2d3544] p-6">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#00a69c]/20">
          <svg className="h-7 w-7 text-[#00a69c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <h3 className="mb-3 text-center text-lg font-bold !text-white">
          {data.title || "Popup title"}
        </h3>
        <p className="mb-6 text-center text-sm leading-relaxed text-gray-400">
          {data.message || "Popup message will appear here."}
        </p>
        <button
          type="button"
          className={`flex w-full items-center justify-center gap-2 ${adminPrimaryButtonClass} py-3`}
        >
          {data.buttonText || "Button text"}
          <FaArrowRight className="h-3.5 w-3.5" />
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">Maybe later</p>
        {!data.isEnabled && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-slate-900/70">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
              Popup disabled
            </span>
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-slate-400">
        Redirects to <span className="font-medium text-[#00a69c]">{data.redirectUrl}</span>
      </p>
    </div>
  );
}

function EnabledToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <span>
        <span className="block text-sm font-medium text-slate-800">Show popup on site</span>
        <span className="block text-xs text-slate-500">Visitors see this after the delay below</span>
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-[#00a69c]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

export default function AdminPopupEditor() {
  const [form, setForm] = useState<PopupData | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("content");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<PopupData>("/admin/popup").then((res) => {
      if (res.success && res.data) {
        setForm({ ...defaultPopup, ...res.data });
      } else {
        setForm({ ...defaultPopup });
      }
      setLoading(false);
    });
  }, []);

  function patchForm(patch: Partial<PopupData>) {
    setForm((f) => (f ? { ...f, ...patch } : f));
    setStatus("");
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setStatus("Saving...");
    const res = await clientApi("/admin/popup", {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.success) {
      setStatus("All changes saved");
      if (res.data) setForm({ ...defaultPopup, ...(res.data as PopupData) });
    } else {
      setStatus(res.error?.message ?? "Save failed");
    }
  }

  if (loading || !form) return <AdminLoading />;

  const previewPanel = <PopupPreview data={form} />;

  return (
    <AdminEditorShell
      title="Site popup"
      description="Promotional popup shown to visitors after a short delay."
      previewHref="/"
      previewLabel="Preview site"
      tabs={TABS}
      activeTab={activeTab}
      onTabChange={(id) => setActiveTab(id as TabId)}
      tabPanelLabel="Popup sections"
      imagePanel={previewPanel}
      footer={
        <AdminEditorSaveBar>
          <EnabledToggle checked={form.isEnabled} onChange={(v) => patchForm({ isEnabled: v })} />
          <div className="flex items-center gap-3">
            <AdminSaveStatus status={status} />
            <SaveButton onClick={save} loading={saving} />
          </div>
        </AdminEditorSaveBar>
      }
    >
      {activeTab === "content" && (
        <div className="space-y-1">
          <AdminField label="Title">
            <input
              className={inputClass()}
              value={form.title}
              onChange={(e) => patchForm({ title: e.target.value })}
            />
          </AdminField>
          <AdminField label="Message">
            <textarea
              className={inputClass()}
              rows={5}
              value={form.message}
              onChange={(e) => patchForm({ message: e.target.value })}
            />
          </AdminField>
          <AdminField label="Button text">
            <input
              className={inputClass()}
              value={form.buttonText}
              onChange={(e) => patchForm({ buttonText: e.target.value })}
            />
          </AdminField>
          <AdminReadOnlyUrlField label="Redirect URL" value={form.redirectUrl} />
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-4">
          <EnabledToggle checked={form.isEnabled} onChange={(v) => patchForm({ isEnabled: v })} />
          <AdminField label="Show delay (milliseconds)">
            <input
              type="number"
              min={0}
              step={500}
              className={inputClass()}
              value={form.showDelay}
              onChange={(e) => patchForm({ showDelay: Number(e.target.value) })}
            />
            <p className="mt-1 text-xs text-slate-400">
              {form.showDelay >= 1000
                ? `Appears after ${(form.showDelay / 1000).toFixed(1)} seconds`
                : "Appears immediately when the page loads"}
            </p>
          </AdminField>
          <AdminReadOnlyUrlField label="Redirect URL" value={form.redirectUrl} />
        </div>
      )}
    </AdminEditorShell>
  );
}
