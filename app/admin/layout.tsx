"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import {
  AdminSidebar,
  type AdminUserSession,
} from "@/app/components/admin/AdminSidebar";
import { canAccessAdminPath } from "@/lib/access-control";
import { DEFAULT_LOGO_URL } from "@/lib/navigation-content";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AdminUserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) {
      setLoading(false);
      return;
    }
    fetch("/api/v1/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setUser(json.data);
          const allowed = canAccessAdminPath(
            json.data.role,
            json.data.pagePermissions,
            pathname,
          );
          if (!allowed) {
            setAccessDenied(true);
          }
        } else {
          router.replace("/admin/login");
        }
      })
      .catch(() => router.replace("/admin/login"))
      .finally(() => setLoading(false));
  }, [isLogin, router, pathname]);

  useEffect(() => {
    if (!user || isLogin) return;
    const allowed = canAccessAdminPath(user.role, user.pagePermissions, pathname);
    setAccessDenied(!allowed);
  }, [pathname, user, isLogin]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLogin) return <>{children}</>;

  if (loading) {
    return (
      <div className="admin-ui flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-teal-600" />
          Loading admin...
        </div>
      </div>
    );
  }

  async function logout() {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    router.replace("/admin/login");
  }

  return (
    <div className="admin-ui flex min-h-screen flex-col bg-slate-50 text-slate-900 lg:flex-row">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        user={user}
        onLogout={logout}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-sm lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100"
              aria-label="Open menu"
              aria-expanded={sidebarOpen}
            >
              <FaBars className="h-5 w-5" />
            </button>
            <span className="truncate text-sm font-medium text-slate-700">Admin</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEFAULT_LOGO_URL}
            alt="ALS"
            className="h-8 w-auto shrink-0 rounded bg-black object-contain"
          />
        </header>

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="w-full px-4 py-5 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
            {accessDenied ? (
              <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-lg font-semibold text-slate-900">Access denied</h1>
                <p className="mt-2 text-sm text-slate-500">
                  You do not have permission to view this section. Contact your super admin
                  to request access.
                </p>
                <button
                  type="button"
                  onClick={() => router.push("/admin")}
                  className="mt-6 rounded-xl bg-[#00a69c] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#008f86]"
                >
                  Go to dashboard
                </button>
              </div>
            ) : (
              children
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
