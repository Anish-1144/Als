"use client";

import { useCallback, useRef, useState } from "react";

type CloudinaryImageFieldProps = {
  label?: string;
  value: string;
  alt?: string;
  onChange: (url: string) => void;
  onAltChange?: (alt: string) => void;
  folder?: string;
  aspectClass?: string;
  hint?: string;
  /** Tighter layout for the right-hand image panel — upload preview only */
  compact?: boolean;
  /** Logo-style preview keeps full image visible */
  objectFit?: "cover" | "contain";
};

export default function CloudinaryImageField({
  label = "Image",
  value,
  alt = "",
  onChange,
  onAltChange,
  folder = "als/hero",
  aspectClass = "aspect-[16/9]",
  hint,
  compact = false,
  objectFit = "cover",
}: CloudinaryImageFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState("");

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setStatus("Please choose an image file");
        return;
      }
      setUploading(true);
      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      try {
        const res = await fetch("/api/v1/admin/cloudinary/upload", {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const json = await res.json();
        if (json.success && json.data?.url) {
          onChange(json.data.url);
          setStatus("");
        } else {
          setStatus(json.error?.message ?? "Upload failed");
        }
      } catch {
        setStatus("Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange],
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  const preview = (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
      className={`overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
        dragOver ? "border-teal-400 bg-teal-50/50" : "border-slate-200 bg-slate-50/60"
      }`}
    >
      {value ? (
        <div
          className={`relative ${aspectClass} w-full ${
            objectFit === "contain" ? "bg-white" : "bg-slate-900"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={alt || "Preview"}
            className={`h-full w-full ${objectFit === "contain" ? "object-contain p-4" : "object-cover"}`}
          />
          <div className="group absolute inset-0">
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-100 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileRef.current?.click()}
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-800 hover:bg-slate-100 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Replace"}
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center gap-2 p-6 text-center ${aspectClass} disabled:opacity-60`}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900/5 text-xl text-slate-600">
            ↑
          </span>
          <span className="text-sm font-medium text-slate-800">
            {uploading ? "Uploading..." : "Click or drop an image"}
          </span>
          <span className="text-xs text-slate-500">PNG, JPG, WebP</span>
        </button>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );

  if (compact) {
    return (
      <div>
        {preview}
        {hint && <p className="mt-3 text-xs leading-relaxed text-slate-500">{hint}</p>}
        {status && <p className="mt-2 text-xs text-red-600">{status}</p>}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <p className="mb-2 text-[13px] font-medium text-slate-700">{label}</p>
      {preview}
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
      {status && <p className="mt-2 text-xs text-red-600">{status}</p>}
      {onAltChange && (
        <div className="mt-4">
          <p className="mb-1.5 text-[13px] font-medium text-slate-700">Alt text</p>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15"
            value={alt}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder="Describe the image"
          />
        </div>
      )}
    </div>
  );
}
