"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import { AdminField, SaveButton, inputClass, readOnlyInputClass } from "./AdminForm";
import { AdminLoading, AdminStatus } from "./AdminTable";

export type SingletonField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "readonly";
  rows?: number;
};

export default function SingletonAdmin({
  title,
  apiPath,
  fields,
}: {
  title: string;
  apiPath: string;
  fields: SingletonField[];
}) {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<Record<string, unknown>>(apiPath).then((res) => {
      if (res.success && res.data) setForm(res.data);
      setLoading(false);
    });
  }, [apiPath]);

  function setField(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setStatus("Saving...");
    const res = await clientApi(apiPath, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Failed"));
    if (res.success && res.data) setForm(res.data as Record<string, unknown>);
  }

  if (loading) return <AdminLoading />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-besley text-[#1d293d] mb-6">{title}</h1>
      {fields.map((f) => (
        <AdminField key={f.key} label={f.label}>
          {f.type === "textarea" ? (
            <textarea
              className={inputClass()}
              rows={f.rows ?? 4}
              value={String(form[f.key] ?? "")}
              onChange={(e) => setField(f.key, e.target.value)}
            />
          ) : f.type === "checkbox" ? (
            <input
              type="checkbox"
              checked={Boolean(form[f.key])}
              onChange={(e) => setField(f.key, e.target.checked)}
            />
          ) : f.type === "number" ? (
            <input
              type="number"
              className={inputClass()}
              value={Number(form[f.key] ?? 0)}
              onChange={(e) => setField(f.key, Number(e.target.value))}
            />
          ) : f.type === "readonly" ? (
            <>
              <input
                readOnly
                tabIndex={-1}
                aria-readonly
                className={readOnlyInputClass()}
                value={String(form[f.key] ?? "—")}
              />
              <p className="mt-1 text-xs text-slate-400">Fixed site route — cannot be changed here.</p>
            </>
          ) : (
            <input
              type="text"
              className={inputClass()}
              value={String(form[f.key] ?? "")}
              onChange={(e) => setField(f.key, e.target.value)}
            />
          )}
        </AdminField>
      ))}
      <div className="flex gap-4 items-center mt-6">
        <SaveButton onClick={save} />
        {status && <AdminStatus>{status}</AdminStatus>}
      </div>
    </div>
  );
}
