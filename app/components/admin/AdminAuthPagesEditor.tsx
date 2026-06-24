"use client";

import { useEffect, useState } from "react";
import { clientApi } from "@/lib/api-client";
import {
  DEFAULT_AUTH_PAGES_CONFIG,
  mergeAuthPagesConfigAdmin,
  type AuthPagesConfig,
  type RegistrationField,
  type RegistrationFieldType,
} from "@/lib/auth-pages-content";
import {
  AdminField,
  SaveButton,
  inputClass,
} from "@/app/components/admin/AdminForm";
import {
  AdminAddButton,
  AdminLoading,
  AdminPageTitle,
  AdminStatus,
  AdminTable,
  AdminTableHead,
  AdminTd,
  AdminTh,
  AdminTr,
} from "@/app/components/admin/AdminTable";

const FIELD_TYPES: RegistrationFieldType[] = [
  "text",
  "email",
  "tel",
  "password",
  "textarea",
  "select",
  "checkbox",
];

function newFieldId() {
  return `field_${Date.now()}`;
}

export default function AdminAuthPagesEditor() {
  const [tab, setTab] = useState<"signin" | "registration" | "submissions">(
    "registration",
  );
  const [config, setConfig] = useState<AuthPagesConfig | null>(null);
  const [registrations, setRegistrations] = useState<Record<string, unknown>[]>(
    [],
  );
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const [pagesRes, regRes] = await Promise.all([
      clientApi<AuthPagesConfig>("/admin/auth-pages"),
      clientApi<Record<string, unknown>[]>("/admin/auth-pages/registrations"),
    ]);
    if (pagesRes.success && pagesRes.data) {
      setConfig(mergeAuthPagesConfigAdmin(pagesRes.data));
    } else {
      setConfig(mergeAuthPagesConfigAdmin(null));
    }
    if (regRes.success && regRes.data) setRegistrations(regRes.data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!config) return;
    setStatus("Saving...");
    const res = await clientApi("/admin/auth-pages", {
      method: "PUT",
      body: JSON.stringify(config),
    });
    setStatus(res.success ? "Saved!" : (res.error?.message ?? "Save failed"));
    if (res.success && res.data) {
      setConfig(mergeAuthPagesConfigAdmin(res.data as AuthPagesConfig));
    }
  }

  function patchRegistration(patch: Partial<AuthPagesConfig["registration"]>) {
    setConfig((c) =>
      c ? { ...c, registration: { ...c.registration, ...patch } } : c,
    );
    setStatus("");
  }

  function patchSignIn(patch: Partial<AuthPagesConfig["signIn"]>) {
    setConfig((c) => (c ? { ...c, signIn: { ...c.signIn, ...patch } } : c));
    setStatus("");
  }

  function updateField(index: number, patch: Partial<RegistrationField>) {
    if (!config) return;
    const fields = [...config.registration.fields];
    fields[index] = { ...fields[index], ...patch };
    patchRegistration({ fields });
  }

  function addField() {
    if (!config) return;
    const fields = [
      ...config.registration.fields,
      {
        id: newFieldId(),
        name: `custom_${config.registration.fields.length + 1}`,
        label: "New Field",
        type: "text" as const,
        required: false,
        placeholder: "",
        order: config.registration.fields.length,
        isVisible: true,
      },
    ];
    patchRegistration({ fields });
  }

  function removeField(index: number) {
    if (!config) return;
    const fields = config.registration.fields.filter((_, i) => i !== index);
    patchRegistration({ fields });
  }

  if (loading || !config) return <AdminLoading />;

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <AdminPageTitle>Sign In & Registration</AdminPageTitle>
        {tab !== "submissions" && <SaveButton onClick={save} />}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {(
          [
            { id: "signin" as const, label: "Sign In Page" },
            { id: "registration" as const, label: "Registration Form" },
            { id: "submissions" as const, label: "Registrations" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
              tab === t.id
                ? "bg-[#00a69c] text-white border-[#00a69c]"
                : "bg-white text-gray-800 border-gray-300 hover:border-[#00a69c]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {status && (
        <p className="mb-4">
          <AdminStatus>{status}</AdminStatus>
        </p>
      )}

      {tab === "signin" && (
        <div className="max-w-2xl space-y-1">
          <AdminField label="Hero title">
            <input
              className={inputClass()}
              value={config.signIn.heroTitle}
              onChange={(e) => patchSignIn({ heroTitle: e.target.value })}
            />
          </AdminField>
          <AdminField label="Hero subtitle">
            <input
              className={inputClass()}
              value={config.signIn.heroSubtitle}
              onChange={(e) => patchSignIn({ heroSubtitle: e.target.value })}
            />
          </AdminField>
          <AdminField label="Submit button">
            <input
              className={inputClass()}
              value={config.signIn.submitLabel}
              onChange={(e) => patchSignIn({ submitLabel: e.target.value })}
            />
          </AdminField>
          <AdminField label="Footer text">
            <input
              className={inputClass()}
              value={config.signIn.footerText}
              onChange={(e) => patchSignIn({ footerText: e.target.value })}
            />
          </AdminField>
          <AdminField label="Register link text">
            <input
              className={inputClass()}
              value={config.signIn.registerLinkText}
              onChange={(e) =>
                patchSignIn({ registerLinkText: e.target.value })
              }
            />
          </AdminField>
        </div>
      )}

      {tab === "registration" && (
        <div className="space-y-8">
          <div className="max-w-2xl space-y-1">
            <AdminField label="Hero title">
              <input
                className={inputClass()}
                value={config.registration.heroTitle}
                onChange={(e) =>
                  patchRegistration({ heroTitle: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Hero subtitle">
              <textarea
                className={inputClass()}
                rows={2}
                value={config.registration.heroSubtitle}
                onChange={(e) =>
                  patchRegistration({ heroSubtitle: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Submit button">
              <input
                className={inputClass()}
                value={config.registration.submitLabel}
                onChange={(e) =>
                  patchRegistration({ submitLabel: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Success title">
              <input
                className={inputClass()}
                value={config.registration.successTitle}
                onChange={(e) =>
                  patchRegistration({ successTitle: e.target.value })
                }
              />
            </AdminField>
            <AdminField label="Success message">
              <textarea
                className={inputClass()}
                rows={3}
                value={config.registration.successMessage}
                onChange={(e) =>
                  patchRegistration({ successMessage: e.target.value })
                }
              />
            </AdminField>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-[#1d293d]">
                Form fields
              </h3>
              <AdminAddButton label="Add field" onClick={addField} />
            </div>
            <div className="space-y-4">
              {config.registration.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-3"
                >
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-sm font-medium text-slate-700">
                      Field {index + 1}: {field.label || field.name}
                    </span>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input
                          type="checkbox"
                          checked={field.isVisible}
                          onChange={(e) =>
                            updateField(index, { isVisible: e.target.checked })
                          }
                        />
                        Visible
                      </label>
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => removeField(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <AdminField label="Label">
                      <input
                        className={inputClass()}
                        value={field.label}
                        onChange={(e) =>
                          updateField(index, { label: e.target.value })
                        }
                      />
                    </AdminField>
                    <AdminField label="Field name (key)">
                      <input
                        className={inputClass()}
                        value={field.name}
                        onChange={(e) =>
                          updateField(index, { name: e.target.value })
                        }
                      />
                    </AdminField>
                    <AdminField label="Type">
                      <select
                        className={inputClass()}
                        value={field.type}
                        onChange={(e) =>
                          updateField(index, {
                            type: e.target.value as RegistrationFieldType,
                          })
                        }
                      >
                        {FIELD_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </AdminField>
                    <AdminField label="Placeholder">
                      <input
                        className={inputClass()}
                        value={field.placeholder ?? ""}
                        onChange={(e) =>
                          updateField(index, { placeholder: e.target.value })
                        }
                      />
                    </AdminField>
                    {field.type === "select" && (
                      <AdminField label="Options (comma-separated)">
                        <input
                          className={inputClass()}
                          value={(field.options ?? []).join(", ")}
                          onChange={(e) =>
                            updateField(index, {
                              options: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            })
                          }
                        />
                      </AdminField>
                    )}
                    <label className="flex items-center gap-2 text-sm text-slate-700 pt-6">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          updateField(index, { required: e.target.checked })
                        }
                      />
                      Required
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "submissions" && (
        <AdminTable>
          <AdminTableHead>
            <tr>
              <AdminTh>Date</AdminTh>
              <AdminTh>Name</AdminTh>
              <AdminTh>Email</AdminTh>
              <AdminTh>Phone</AdminTh>
              <AdminTh>Active</AdminTh>
            </tr>
          </AdminTableHead>
          <tbody>
            {registrations.map((row) => {
              const id = String(row._id ?? "");
              const firstName = String(row.firstName ?? "");
              const lastName = String(row.lastName ?? "");
              return (
                <AdminTr key={id}>
                  <AdminTd muted>
                    {row.createdAt
                      ? new Date(String(row.createdAt)).toLocaleDateString()
                      : "—"}
                  </AdminTd>
                  <AdminTd>
                    {[firstName, lastName].filter(Boolean).join(" ") || "—"}
                  </AdminTd>
                  <AdminTd>{String(row.email ?? "")}</AdminTd>
                  <AdminTd muted>{String(row.phone ?? "—")}</AdminTd>
                  <AdminTd>{row.isActive === false ? "No" : "Yes"}</AdminTd>
                </AdminTr>
              );
            })}
          </tbody>
        </AdminTable>
      )}
    </div>
  );
}
