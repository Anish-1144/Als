"use client";

import { useEffect, useState } from "react";
import {
  canDeleteModule,
  canWriteModule,
  hasModuleAccess,
  isSuperAdmin,
  type PagePermissions,
} from "@/lib/access-control";
import { clientApi } from "@/lib/api-client";

export type AdminSessionUser = {
  role: string;
  pagePermissions?: PagePermissions;
};

export function useAdminSession() {
  const [user, setUser] = useState<AdminSessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clientApi<AdminSessionUser>("/auth/me").then((res) => {
      if (res.success && res.data) setUser(res.data);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}

export function getModulePermissions(
  user: AdminSessionUser | null,
  moduleId: string,
) {
  const role = user?.role ?? "viewer";
  const permissions = user?.pagePermissions;
  return {
    canView: isSuperAdmin(role) || hasModuleAccess(role, permissions, moduleId, "view"),
    canEdit: isSuperAdmin(role) || canWriteModule(role, permissions, moduleId),
    canDelete: isSuperAdmin(role) || canDeleteModule(role, permissions, moduleId),
  };
}
