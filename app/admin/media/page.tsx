"use client";

import { useEffect, useRef, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminLoading } from "@/app/components/admin/AdminTable";

interface MediaItem {
  _id: string;
  filename: string;
  url: string;
  alt?: string;
  originalName?: string;
}

export default function AdminMediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [alt, setAlt] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await clientApi<MediaItem[]>("/admin/media");
    if (res.success && res.data) setItems(res.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setStatus("Select a file first");
      return;
    }
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    if (alt) formData.append("alt", alt);
    const res = await fetch("/api/v1/admin/media", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const json = await res.json();
    setStatus(json.success ? "Uploaded!" : (json.error?.message ?? "Upload failed"));
    if (json.success) {
      setAlt("");
      if (fileRef.current) fileRef.current.value = "";
      await load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this file?")) return;
    await clientApi(`/admin/media/${id}`, { method: "DELETE" });
    await load();
  }

  if (loading) return <AdminLoading />;

  return (
    <div>
      <h1 className="text-3xl font-besley font-semibold text-[#1d293d] mb-6">Media library</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 max-w-xl">
        <h2 className="font-semibold text-gray-900 mb-4">Upload image</h2>
        <input ref={fileRef} type="file" accept="image/*" className="mb-3 block w-full text-sm text-gray-800" />
        <input
          type="text"
          placeholder="Alt text (optional)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 text-sm text-gray-900 bg-white"
        />
        <button
          type="button"
          onClick={upload}
          className="px-4 py-2 bg-[#00a69c] text-white rounded text-sm hover:bg-[#0d8a99]"
        >
          Upload to /media/
        </button>
        {status && <p className="text-sm text-gray-700 font-medium mt-2">{status}</p>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <img src={item.url} alt={item.alt ?? ""} className="w-full h-32 object-cover" />
            <div className="p-3 text-xs text-gray-900">
              <p className="truncate font-medium text-gray-900">{item.originalName ?? item.filename}</p>
              <p className="text-gray-600 truncate">{item.url}</p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(item.url)}
                className="text-[#00a69c] hover:underline mt-1"
              >
                Copy URL
              </button>
              <button
                type="button"
                onClick={() => remove(item._id)}
                className="text-red-500 hover:underline mt-1 ml-3"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
