"use client";

import { useCallback, useRef, useState } from "react";
import { FaFile, FaXmark } from "react-icons/fa6";

const DOCUMENT_ACCEPT =
  ".pdf,.doc,.docx,.xls,.xlsx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain";

const DOCUMENT_MAX_BYTES = 15 * 1024 * 1024;

type CloudinaryDocumentFieldProps = {
  label?: string;
  value: string;
  fileName?: string;
  onChange: (url: string, fileName?: string) => void;
  folder?: string;
  hint?: string;
};

export default function CloudinaryDocumentField({
  label = "Document file",
  value,
  fileName = "",
  onChange,
  folder = "als/documents",
  hint = "PDF, Word, Excel, or text — max 15MB. Uploaded to Cloudinary.",
}: CloudinaryDocumentFieldProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [displayName, setDisplayName] = useState(fileName);

  const uploadFile = useCallback(
    async (file: File) => {
      if (file.size > DOCUMENT_MAX_BYTES) {
        setStatus("File must be 15MB or smaller.");
        return;
      }

      setUploading(true);
      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      try {
        const res = await fetch("/api/v1/admin/cloudinary/upload-document", {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const json = await res.json();
        if (json.success && json.data?.url) {
          const name = json.data.fileName ?? file.name;
          setDisplayName(name);
          onChange(json.data.url, name);
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

  return (
    <div>
      {label && <p className="mb-1.5 text-[13px] font-medium text-slate-700">{label}</p>}

      <input
        ref={fileRef}
        type="file"
        accept={DOCUMENT_ACCEPT}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadFile(file);
          e.target.value = "";
        }}
      />

      {value ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#00a69c]/10">
              <FaFile className="h-4 w-4 text-[#00a69c]" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-900">
                {displayName || fileName || "Uploaded document"}
              </p>
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#00a69c] hover:underline truncate block"
              >
                View file
              </a>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-[#00a69c] hover:text-[#00a69c] disabled:opacity-50"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayName("");
                onChange("", "");
                setStatus("");
              }}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Remove document"
            >
              <FaXmark className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center transition hover:border-[#00a69c] hover:bg-teal-50/30 disabled:opacity-60"
        >
          <FaFile className="h-6 w-6 text-[#00a69c]" />
          <span className="text-sm font-medium text-slate-800">
            {uploading ? "Uploading..." : "Click to upload document"}
          </span>
          <span className="text-xs text-slate-500">PDF, DOC, DOCX, XLS, XLSX, TXT</span>
        </button>
      )}

      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
      {status && <p className="mt-2 text-xs text-red-600">{status}</p>}
    </div>
  );
}
