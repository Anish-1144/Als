"use client";

import CloudinaryImageField from "@/app/components/admin/CloudinaryImageField";
import { SaveButton } from "@/app/components/admin/AdminForm";
import { AdminSaveStatus } from "@/app/components/admin/AdminEditorShell";

type PageHeroImagePanelProps = {
  slug: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export function PageHeroImagePanel({
  slug,
  value,
  onChange,
  hint = "Page banner background. Recommended 1920×1080 or wider.",
}: PageHeroImagePanelProps) {
  return (
    <CloudinaryImageField
      label="Hero background"
      value={value}
      onChange={onChange}
      folder={`als/pages/${slug}`}
      hint={hint}
      compact
    />
  );
}

type HomeHeroImagePanelProps = {
  value: string;
  onChange: (url: string) => void;
};

export function HomeHeroImagePanel({ value, onChange }: HomeHeroImagePanelProps) {
  return (
    <CloudinaryImageField
      label="Hero banner"
      value={value}
      onChange={onChange}
      folder="als/hero"
      hint="Large image below the headline. Recommended 1920×1080 or wider."
      compact
    />
  );
}

type WhyChooseUsImagePanelProps = {
  value: string;
  onChange: (url: string) => void;
};

export function WhyChooseUsImagePanel({ value, onChange }: WhyChooseUsImagePanelProps) {
  return (
    <CloudinaryImageField
      label="Section photo"
      value={value}
      onChange={onChange}
      folder="als/home/why-choose-us"
      aspectClass="aspect-[4/5]"
      hint="Portrait photo on the left of the section. Recommended 800×1000."
      compact
    />
  );
}

export function GenericImagePanel({
  label,
  value,
  onChange,
  folder,
  hint,
  aspectClass,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder: string;
  hint?: string;
  aspectClass?: string;
}) {
  return (
    <CloudinaryImageField
      label={label}
      value={value}
      onChange={onChange}
      folder={folder}
      hint={hint}
      aspectClass={aspectClass}
      compact
    />
  );
}

export function AdminImagePanelShell({
  title = "Image",
  description,
  children,
  onSave,
  saving,
  status,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  onSave?: () => void;
  saving?: boolean;
  status?: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{title}</p>
      {description && (
        <p className="mt-1 mb-4 text-[13px] leading-relaxed text-slate-500">{description}</p>
      )}
      {!description && <div className="mb-4" />}
      {children}
      {onSave && (
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4">
          <AdminSaveStatus status={status ?? ""} />
          <SaveButton onClick={onSave} loading={saving} />
        </div>
      )}
    </div>
  );
}
