"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowRightFromBracket,
  FaChevronDown,
  FaGlobe,
  FaXmark,
} from "react-icons/fa6";
import { ADMIN_GLOBAL_LINKS, ADMIN_SIDEBAR_NAV } from "@/lib/admin-nav";
import { DEFAULT_LOGO_URL } from "@/lib/navigation-content";

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

function pathMatches(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getActiveHref(pathname: string, hrefs: string[]) {
  const matches = hrefs.filter((href) => pathMatches(pathname, href));
  if (matches.length === 0) return null;
  return matches.reduce((best, current) => (current.length > best.length ? current : best));
}

function isActive(pathname: string, href: string, peerHrefs?: string[]) {
  const normalized = normalizePath(pathname);
  if (!peerHrefs || peerHrefs.length === 0) {
    return pathMatches(normalized, href);
  }
  return getActiveHref(normalized, peerHrefs) === href;
}

function isGroupActive(pathname: string, children: { href: string }[]) {
  const hrefs = children.map((child) => child.href);
  return getActiveHref(normalizePath(pathname), hrefs) !== null;
}

function NavLink({
  href,
  label,
  active,
  nested,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  nested?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`block rounded-lg text-sm leading-snug transition ${
        nested ? "py-1.5 pl-3 pr-2" : "px-3 py-2"
      } ${
        active
          ? "bg-[#00a69c] font-medium text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {label}
    </Link>
  );
}

function buildExpandedState(pathname: string) {
  const initial: Record<string, boolean> = {};
  for (const item of ADMIN_SIDEBAR_NAV) {
    if (item.children) {
      initial[item.label] = isGroupActive(pathname, item.children);
    }
  }
  return initial;
}

export function AdminSidebar({
  user,
  onLogout,
  mobileOpen = false,
  onMobileClose,
}: {
  user: { email: string } | null;
  onLogout: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}) {
  const pathname = normalizePath(usePathname());
  const globalHrefs = ADMIN_GLOBAL_LINKS.map((link) => link.href);
  const closeMobile = onMobileClose ?? (() => {});

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    buildExpandedState(pathname),
  );

  useEffect(() => {
    setExpanded(buildExpandedState(pathname));
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  function toggleGroup(label: string) {
    setExpanded((prev) => {
      const willOpen = !(prev[label] ?? false);
      const next: Record<string, boolean> = {};
      for (const item of ADMIN_SIDEBAR_NAV) {
        if (item.children) {
          next[item.label] = item.label === label ? willOpen : false;
        }
      }
      return next;
    });
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[min(280px,88vw)] flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-in-out lg:w-[260px] lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex shrink-0 items-start justify-between border-b border-slate-100 bg-white px-4 py-4 lg:block lg:py-5">
        <Link
          href="/admin"
          onClick={closeMobile}
          className="flex min-w-0 flex-1 flex-col items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEFAULT_LOGO_URL}
            alt="ALS Mortgage Solutions"
            className="h-11 w-auto max-w-full rounded-lg bg-black object-contain"
          />
          {user && (
            <p className="mt-2 max-w-full truncate text-xs text-slate-400">{user.email}</p>
          )}
        </Link>
        <button
          type="button"
          onClick={closeMobile}
          className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 lg:hidden"
          aria-label="Close menu"
        >
          <FaXmark className="h-4 w-4" />
        </button>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:thin]">
        <div className="space-y-0.5">
          {ADMIN_SIDEBAR_NAV.map((item) => {
            if (item.href) {
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  label={item.label}
                  active={isActive(pathname, item.href)}
                  onNavigate={closeMobile}
                />
              );
            }

            if (!item.children) return null;

            const childHrefs = item.children.map((child) => child.href);
            const groupOpen = expanded[item.label] ?? false;
            const groupActive = isGroupActive(pathname, item.children);

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(item.label)}
                  aria-expanded={groupOpen}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                    groupActive
                      ? "bg-teal-50 text-[#00a69c]"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>{item.label}</span>
                  <FaChevronDown
                    className={`h-3 w-3 shrink-0 text-slate-400 transition-transform ${groupOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {groupOpen && (
                  <div className="mt-0.5 ml-2 space-y-0.5 border-l border-slate-200 pl-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        href={child.href}
                        label={child.label}
                        active={isActive(pathname, child.href, childHrefs)}
                        nested
                        onNavigate={closeMobile}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Global
          </p>
          <div className="space-y-0.5">
            {ADMIN_GLOBAL_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(pathname, link.href, globalHrefs)}
                onNavigate={closeMobile}
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="shrink-0 space-y-0.5 border-t border-slate-100 p-3">
        <Link
          href="/"
          onClick={closeMobile}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50"
        >
          <FaGlobe className="h-3.5 w-3.5 text-slate-400" />
          View site
        </Link>
        <button
          type="button"
          onClick={() => {
            closeMobile();
            onLogout();
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-red-50 hover:text-red-600"
        >
          <FaArrowRightFromBracket className="h-3.5 w-3.5" />
          Log out
        </button>
      </div>
    </aside>
  );
}
