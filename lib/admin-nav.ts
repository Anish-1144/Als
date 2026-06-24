export type AdminNavLink = {
  href: string;
  label: string;
  moduleId?: string;
};

export type AdminNavItem = {
  label: string;
  href?: string;
  moduleId?: string;
  children?: AdminNavLink[];
};

/** Sidebar navigation — Home, Why ALS, Our Services */
export const ADMIN_SIDEBAR_NAV: AdminNavItem[] = [
  { label: "Home", href: "/admin", moduleId: "home" },
  { label: "How It Works", href: "/admin/how-it-works", moduleId: "how-it-works" },
  { label: "Contact", href: "/admin/contact", moduleId: "contact" },
  {
    label: "Why ALS",
    moduleId: "why-als",
    children: [
      { label: "Overview", href: "/admin/why-als", moduleId: "why-als" },
      { label: "About", href: "/admin/why-als/about", moduleId: "why-als" },
      { label: "Careers", href: "/admin/why-als/careers", moduleId: "why-als" },
    ],
  },
  {
    label: "Our Services",
    moduleId: "services",
    children: [
      { label: "Our Services", href: "/admin/services", moduleId: "services" },
      { label: "Home Loans", href: "/admin/services/home-loans", moduleId: "services" },
      { label: "Investment Loans", href: "/admin/services/investment-loans", moduleId: "services" },
      { label: "Commercial Loans", href: "/admin/services/commercial-loans", moduleId: "services" },
      { label: "SMSF Loans", href: "/admin/services/smsf-loans", moduleId: "services" },
      { label: "Car Financing", href: "/admin/services/car-financing", moduleId: "services" },
      { label: "Refinancing", href: "/admin/services/refinancing", moduleId: "services" },
    ],
  },
  {
    label: "Calculators",
    moduleId: "calculators",
    children: [
      { label: "Calculators", href: "/admin/calculators", moduleId: "calculators" },
      {
        label: "Borrowing Capacity",
        href: "/admin/calculators/borrowing-capacity",
        moduleId: "calculators",
      },
      {
        label: "Extra Repayments",
        href: "/admin/calculators/extra-repayments",
        moduleId: "calculators",
      },
      { label: "Property Fees", href: "/admin/calculators/property-fees", moduleId: "calculators" },
    ],
  },
  {
    label: "Resources",
    moduleId: "resources",
    children: [
      {
        label: "First Home Buyer Guide",
        href: "/admin/resources/first-home-buyer-guide",
        moduleId: "resources",
      },
      { label: "Investment Guide", href: "/admin/resources/investment-guide", moduleId: "resources" },
      {
        label: "Construction Loans Guide",
        href: "/admin/resources/construction-loans-guide",
        moduleId: "resources",
      },
      { label: "SMSF Guide", href: "/admin/resources/smsf-guide", moduleId: "resources" },
      { label: "Guarantors Guide", href: "/admin/resources/guarantors-guide", moduleId: "resources" },
      { label: "Documents", href: "/admin/resources/documents", moduleId: "resources" },
      { label: "FAQ", href: "/admin/resources/faq", moduleId: "resources" },
    ],
  },
  {
    label: "Legal",
    moduleId: "legal",
    children: [
      { label: "Privacy Policy", href: "/admin/legal/privacy-policy", moduleId: "legal" },
      { label: "Terms of Service", href: "/admin/legal/terms-of-service", moduleId: "legal" },
      { label: "Accessibility", href: "/admin/legal/accessibility", moduleId: "legal" },
      { label: "Licensing", href: "/admin/legal/licensing", moduleId: "legal" },
    ],
  },
];

export const ADMIN_GLOBAL_LINKS: AdminNavLink[] = [
  { label: "Navbar", href: "/admin/navbar", moduleId: "navbar" },
  { label: "Footer", href: "/admin/footer", moduleId: "footer" },
  { label: "Leads", href: "/admin/leads", moduleId: "leads" },
  { label: "Access Control", href: "/admin/access-control", moduleId: "__access_control__" },
  { label: "Popup", href: "/admin/popup", moduleId: "popup" },
];

export type SectionCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  previewPath?: string;
};

/** @deprecated Home editor is inline at /admin — kept for reference */
export const HOME_SECTIONS: SectionCard[] = [
  {
    id: "hero",
    title: "Hero",
    description: "",
    href: "/admin?section=hero",
    previewPath: "/",
  },
  {
    id: "services",
    title: "Lending solutions",
    description: "",
    href: "/admin?section=services",
    previewPath: "/",
  },
  {
    id: "why-choose-us",
    title: "Why choose us",
    description: "",
    href: "/admin?section=why-choose-us",
    previewPath: "/",
  },
  {
    id: "property-showcase",
    title: "Property showcase",
    description: "",
    href: "/admin?section=property-showcase",
    previewPath: "/",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "",
    href: "/admin/testimonials",
    previewPath: "/",
  },
  {
    id: "cta",
    title: "Contact CTA",
    description: "",
    href: "/admin/home/cta",
    previewPath: "/",
  },
  {
    id: "footer",
    title: "Footer",
    description: "",
    href: "/admin/footer",
    previewPath: "/",
  },
];

export const WHY_ALS_OVERVIEW_SECTIONS: SectionCard[] = [
  {
    id: "hero",
    title: "Page hero",
    description: "Title, subtitle, and background image",
    href: "/admin/pages/why-als",
    previewPath: "/why-als",
  },
];

export const WHY_ALS_ABOUT_SECTIONS: SectionCard[] = [
  {
    id: "hero",
    title: "Page hero",
    description: "Title, subtitle, and background image",
    href: "/admin/pages/about",
    previewPath: "/about",
  },
  {
    id: "team",
    title: "Team",
    description: "Team members, bios, and photos",
    href: "/admin/team",
    previewPath: "/about",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Client reviews shown on the about page",
    href: "/admin/testimonials",
    previewPath: "/about",
  },
];

export const WHY_ALS_CAREERS_SECTIONS: SectionCard[] = [
  {
    id: "hero",
    title: "Page hero",
    description: "Title, subtitle, and background image",
    href: "/admin/pages/careers",
    previewPath: "/why-als/careers",
  },
  {
    id: "jobs",
    title: "Job postings",
    description: "Open roles and application details",
    href: "/admin/careers",
    previewPath: "/why-als/careers/job-openings",
  },
];
