"use client";

import { AdminField, inputClass } from "@/app/components/admin/AdminForm";

export function AdminCardGroup({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/40">
      <div className="flex items-center gap-2.5 border-b border-slate-200/80 bg-white px-4 py-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00a69c] text-[11px] font-semibold text-white">
          {index + 1}
        </span>
        <span className="text-sm font-medium text-slate-800">{title}</span>
      </div>
      <div className="space-y-1 p-4">{children}</div>
    </div>
  );
}

export function AdminSectionFields({
  titleLabel = "Section title",
  subtitleLabel = "Section subtitle",
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
}: {
  titleLabel?: string;
  subtitleLabel?: string;
  title: string;
  subtitle: string;
  onTitleChange: (v: string) => void;
  onSubtitleChange: (v: string) => void;
}) {
  return (
    <div className="mb-6 space-y-1 border-b border-slate-100 pb-6">
      <AdminField label={titleLabel}>
        <input
          className={inputClass()}
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </AdminField>
      <AdminField label={subtitleLabel}>
        <textarea
          className={inputClass()}
          rows={3}
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
        />
      </AdminField>
    </div>
  );
}
