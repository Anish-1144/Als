export const ACCESS_LEVELS = [
  { value: "none", label: "No access", description: "Cannot open this section" },
  { value: "view", label: "View only", description: "Read content, no edits" },
  { value: "edit", label: "Edit", description: "Update existing content" },
  { value: "full", label: "Full control", description: "Create, edit, and publish" },
];

export const PAGE_ACCESS_MODULES = [
  { id: "home", label: "Home", description: "Homepage sections and hero", group: "pages" },
  { id: "how-it-works", label: "How It Works", description: "Process steps and FAQs", group: "pages" },
  { id: "contact", label: "Contact", description: "Contact page and form settings", group: "pages" },
  { id: "why-als", label: "Why ALS", description: "Overview, about, and careers pages", group: "pages" },
  { id: "services", label: "Our Services", description: "All loan and service pages", group: "pages" },
  { id: "calculators", label: "Calculators", description: "Calculator hub and tools", group: "pages" },
  { id: "resources", label: "Resources", description: "Guides, documents, and FAQ", group: "pages" },
  { id: "legal", label: "Legal", description: "Privacy, terms, and licensing", group: "pages" },
  { id: "leads", label: "Leads", description: "View, update, and delete contact, assessment, and job apply submissions", group: "pages" },
  { id: "careers", label: "Careers", description: "Job postings and applications", group: "pages" },
];

export const GLOBAL_ACCESS_MODULES = [
  { id: "navbar", label: "Navbar", description: "Site navigation and menu links", group: "global" },
  { id: "footer", label: "Footer", description: "Footer content, links, and contact info", group: "global" },
  { id: "popup", label: "Popup", description: "Site-wide popup and announcement settings", group: "global" },
];

export const ACCESS_MODULES = [...PAGE_ACCESS_MODULES, ...GLOBAL_ACCESS_MODULES];

export const ACCESS_MODULE_IDS = ACCESS_MODULES.map((m) => m.id);

const LEGACY_GLOBAL_MODULE_IDS = ["navbar", "footer", "popup"];

const LEVEL_RANK = {
  none: 0,
  view: 1,
  edit: 2,
  full: 3,
};

export function buildEmptyPermissions() {
  const permissions = {};
  for (const mod of ACCESS_MODULES) {
    permissions[mod.id] = "none";
  }
  return permissions;
}

export function buildFullPermissions() {
  const permissions = {};
  for (const mod of ACCESS_MODULES) {
    permissions[mod.id] = "full";
  }
  return permissions;
}

export function normalizePermissions(input) {
  const base = buildEmptyPermissions();
  if (!input) return base;
  for (const mod of ACCESS_MODULES) {
    const level = input[mod.id];
    if (level && level in LEVEL_RANK) {
      base[mod.id] = level;
    }
  }
  const legacyGlobal = input.global;
  if (legacyGlobal && legacyGlobal in LEVEL_RANK) {
    for (const id of LEGACY_GLOBAL_MODULE_IDS) {
      if (!input[id] || input[id] === "none") {
        base[id] = legacyGlobal;
      }
    }
  }
  return base;
}

export function isSuperAdmin(role) {
  return role === "super_admin";
}

export function getEffectivePermissions(role, pagePermissions) {
  if (isSuperAdmin(role)) return buildFullPermissions();
  return normalizePermissions(pagePermissions);
}

export function hasModuleAccess(role, pagePermissions, moduleId, minLevel = "view") {
  if (isSuperAdmin(role)) return true;
  const effective = getEffectivePermissions(role, pagePermissions);
  const level = effective[moduleId] ?? "none";
  return LEVEL_RANK[level] >= LEVEL_RANK[minLevel];
}

export function canWriteModule(role, pagePermissions, moduleId) {
  return hasModuleAccess(role, pagePermissions, moduleId, "edit");
}

export function canDeleteModule(role, pagePermissions, moduleId) {
  return hasModuleAccess(role, pagePermissions, moduleId, "full");
}

export function hasAnyModuleAccess(role, pagePermissions, moduleIds, minLevel = "view") {
  return moduleIds.some((moduleId) =>
    hasModuleAccess(role, pagePermissions, moduleId, minLevel),
  );
}

export const MODULE_ACCESS_HINTS = {
  leads: {
    view: "View leads and job applications",
    edit: "Update lead and application status",
    full: "Delete leads and job applications",
  },
};

export function resolveModuleFromPath(pathname) {
  const path = pathname.replace(/\/$/, "") || "/admin";

  if (path === "/admin/access-control") return "__access_control__";
  if (path === "/admin/login") return null;
  if (path.startsWith("/admin/navbar") || path.startsWith("/admin/navigation")) {
    return "navbar";
  }
  if (path.startsWith("/admin/footer")) return "footer";
  if (path.startsWith("/admin/popup")) return "popup";

  if (
    path === "/admin" ||
    path.startsWith("/admin/home") ||
    path.startsWith("/admin/testimonials")
  ) {
    return "home";
  }
  if (path.startsWith("/admin/how-it-works")) return "how-it-works";
  if (path.startsWith("/admin/contact")) return "contact";
  if (
    path.startsWith("/admin/why-als") ||
    path.startsWith("/admin/pages/why-als") ||
    path.startsWith("/admin/pages/about") ||
    path.startsWith("/admin/pages/careers") ||
    path.startsWith("/admin/team")
  ) {
    return "why-als";
  }
  if (path.startsWith("/admin/services") || path.startsWith("/admin/loans")) {
    return "services";
  }
  if (path.startsWith("/admin/calculators")) return "calculators";
  if (
    path.startsWith("/admin/resources") ||
    path.startsWith("/admin/faqs") ||
    path.startsWith("/admin/documents")
  ) {
    return "resources";
  }
  if (
    path.startsWith("/admin/legal") ||
    path.startsWith("/admin/pages/privacy") ||
    path.startsWith("/admin/pages/terms") ||
    path.startsWith("/admin/pages/accessibility") ||
    path.startsWith("/admin/pages/licensing")
  ) {
    return "legal";
  }
  if (path.startsWith("/admin/leads")) return "leads";
  if (
    path.startsWith("/admin/careers") ||
    path.startsWith("/admin/job-applications")
  ) {
    return "careers";
  }

  return null;
}

export function canAccessAdminPath(role, pagePermissions, pathname) {
  if (isSuperAdmin(role)) return true;

  const moduleId = resolveModuleFromPath(pathname);
  if (moduleId === null) return true;
  if (moduleId === "__access_control__") return false;

  return hasModuleAccess(role, pagePermissions, moduleId, "view");
}
