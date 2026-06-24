"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminField, adminPrimaryButtonClass, inputClass } from "@/app/components/admin/AdminForm";
import { AdminMuted, AdminPageTitle, AdminStatus } from "@/app/components/admin/AdminTable";
import {
  ACCESS_LEVELS,
  GLOBAL_ACCESS_MODULES,
  MODULE_ACCESS_HINTS,
  PAGE_ACCESS_MODULES,
  buildEmptyPermissions,
  type AccessLevel,
  type AccessModule,
  type PagePermissions,
} from "@/lib/admin-access-control";
import { clientApi } from "@/lib/api-client";

type AdminUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  pagePermissions: PagePermissions;
};

export default function AccessControlEditor() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [permissions, setPermissions] = useState<Record<string, PagePermissions>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    const json = await clientApi<AdminUser[]>("/admin/users");
    if (json.success && json.data) {
      setUsers(json.data);
      const perms: Record<string, PagePermissions> = {};
      for (const user of json.data) {
        perms[user.id] = user.pagePermissions ?? buildEmptyPermissions();
      }
      setPermissions(perms);
      setSelectedUserId((current) => current || json.data![0]?.id || "");
    } else {
      setStatus(json.error?.message ?? "Failed to load users");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  function setModuleAccess(moduleId: string, level: AccessLevel) {
    if (!selectedUserId) return;
    setPermissions((prev) => ({
      ...prev,
      [selectedUserId]: {
        ...prev[selectedUserId],
        [moduleId]: level,
      },
    }));
    setStatus("");
  }

  async function handleSave() {
    if (!selectedUserId) return;
    setSaving(true);
    setStatus("");
    const json = await clientApi<AdminUser>(`/admin/users/${selectedUserId}`, {
      method: "PUT",
      body: JSON.stringify({
        pagePermissions: permissions[selectedUserId],
      }),
    });
    if (json.success) {
      setStatus("Access settings saved.");
      await loadUsers();
    } else {
      setStatus(json.error?.message ?? "Failed to save");
    }
    setSaving(false);
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setStatus("");
    const json = await clientApi<AdminUser>("/admin/users", {
      method: "POST",
      body: JSON.stringify({
        email: newEmail,
        password: newPassword,
        firstName: newFirstName,
        lastName: newLastName,
        pagePermissions: buildEmptyPermissions(),
      }),
    });
    if (json.success && json.data) {
      setStatus(`Created user ${json.data.email}`);
      setNewFirstName("");
      setNewLastName("");
      setNewEmail("");
      setNewPassword("");
      setSelectedUserId(json.data.id);
      await loadUsers();
    } else {
      setStatus(json.error?.message ?? "Failed to create user");
    }
    setCreating(false);
  }

  async function handleDeleteUser() {
    if (!selectedUserId || !selectedUser) return;

    const confirmed = window.confirm(
      `Delete ${selectedUser.firstName} ${selectedUser.lastName} (${selectedUser.email})? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeleting(true);
    setStatus("");
    const json = await clientApi(`/admin/users/${selectedUserId}`, {
      method: "DELETE",
    });
    if (json.success) {
      setStatus(`Deleted user ${selectedUser.email}`);
      setSelectedUserId("");
      await loadUsers();
    } else {
      setStatus(json.error?.message ?? "Failed to delete user");
    }
    setDeleting(false);
  }

  function renderModuleSection(title: string, modules: AccessModule[]) {
    return (
      <div className="space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
          {title}
        </h3>
        <div className="space-y-6">
          {modules.map((mod) => {
            const current = permissions[selectedUserId]?.[mod.id] ?? "none";
            return (
              <div
                key={mod.id}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
              >
                <div className="mb-3">
                  <p className="text-sm font-semibold text-slate-900">{mod.label}</p>
                  <p className="text-xs text-slate-500">{mod.description}</p>
                </div>
                <fieldset>
                  <legend className="sr-only">{mod.label} access level</legend>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {ACCESS_LEVELS.map((level) => {
                      const checked = current === level.value;
                      return (
                        <label
                          key={level.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition ${
                            checked
                              ? "border-[#00a69c] bg-white shadow-sm ring-1 ring-[#00a69c]/15"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`access-${selectedUserId}-${mod.id}`}
                            value={level.value}
                            checked={checked}
                            onChange={() => setModuleAccess(mod.id, level.value)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-[#00a69c]"
                          />
                          <span>
                            <span className="block text-sm font-medium text-slate-900">
                              {level.label}
                            </span>
                                  <span className="block text-xs text-slate-500">
                                    {MODULE_ACCESS_HINTS[mod.id]?.[level.value] ??
                                      level.description}
                                  </span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-600" />
        Loading users...
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <AdminPageTitle>Access Control</AdminPageTitle>
      <AdminMuted>
        Create admin users and assign tab-wise access for each section of the dashboard.
        Only the super admin can manage users and permissions.
      </AdminMuted>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Admin users
          </p>
          {users.length === 0 ? (
            <p className="text-sm text-slate-500">No admin users yet. Create one below.</p>
          ) : (
            <div className="space-y-2">
              {users.map((user) => {
                const active = user.id === selectedUserId;
                return (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setStatus("");
                    }}
                    className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                      active
                        ? "border-[#00a69c] bg-teal-50/80 ring-1 ring-[#00a69c]/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{user.email}</p>
                    <span
                      className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        user.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.isActive ? "active" : "inactive"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          {selectedUser ? (
            <>
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </h2>
                  <p className="text-sm text-slate-500">{selectedUser.email}</p>
                </div>
                <button
                  type="button"
                  onClick={handleDeleteUser}
                  disabled={deleting}
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete user"}
                </button>
              </div>

              <div className="space-y-8">
                {renderModuleSection("Pages", PAGE_ACCESS_MODULES)}
                {renderModuleSection("Global components", GLOBAL_ACCESS_MODULES)}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className={adminPrimaryButtonClass}
                >
                  {saving ? "Saving..." : "Save access settings"}
                </button>
                {status && <AdminStatus>{status}</AdminStatus>}
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-500">
              Create an admin user below, then assign tab access here.
            </p>
          )}
        </div>
      </div>

      <form
        onSubmit={handleCreateUser}
        className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm"
      >
        <h3 className="text-sm font-semibold text-slate-900">Create admin user</h3>
        <p className="mt-1 text-xs text-slate-500">
          New users start with no access. Assign permissions after creating the account.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <AdminField label="First name">
            <input
              className={inputClass()}
              placeholder="Jane"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Last name">
            <input
              className={inputClass()}
              placeholder="Smith"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Email address">
            <input
              type="email"
              className={inputClass()}
              placeholder="jane@alsmortgagesolutions.com.au"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </AdminField>
          <AdminField label="Password">
            <input
              type="password"
              className={inputClass()}
              placeholder="Min. 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength={8}
              required
            />
          </AdminField>
        </div>
        <button
          type="submit"
          disabled={creating}
          className={`mt-4 ${adminPrimaryButtonClass}`}
        >
          {creating ? "Creating..." : "Create user"}
        </button>
      </form>
    </div>
  );
}
