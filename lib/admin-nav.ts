export type AdminNavLink = {
  href: string;
  label: string;
};

export type AdminNavItem = {
  label: string;
  href?: string;
  children?: AdminNavLink[];
};

/** Sidebar navigation — Home, Why ALS, Our Services */
export const ADMIN_SIDEBAR_NAV: AdminNavItem[] = [
  { label: "Home", href: "/admin" },
  { label: "How It Works", href: "/admin/how-it-works" },
  { label: "Contact", href: "/admin/contact" },
  {
    label: "Why ALS",
    children: [
      { label: "Overview", href: "/admin/why-als" },
      { label: "About", href: "/admin/why-als/about" },
      { label: "Careers", href: "/admin/why-als/careers" },
    ],
  },
  {
    label: "Our Services",
    children: [
      { label: "Our Services", href: "/admin/services" },
      { label: "Home Loans", href: "/admin/services/home-loans" },
      { label: "Investment Loans", href: "/admin/services/investment-loans" },
      { label: "Commercial Loans", href: "/admin/services/commercial-loans" },
      { label: "SMSF Loans", href: "/admin/services/smsf-loans" },
      { label: "Car Financing", href: "/admin/services/car-financing" },
      { label: "Refinancing", href: "/admin/services/refinancing" },
    ],
  },
  {
    label: "Calculators",
    children: [
      { label: "Calculators", href: "/admin/calculators" },
      { label: "Borrowing Capacity", href: "/admin/calculators/borrowing-capacity" },
      { label: "Extra Repayments", href: "/admin/calculators/extra-repayments" },
      { label: "Property Fees", href: "/admin/calculators/property-fees" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "First Home Buyer Guide", href: "/admin/resources/first-home-buyer-guide" },
      { label: "Investment Guide", href: "/admin/resources/investment-guide" },
      { label: "Construction Loans Guide", href: "/admin/resources/construction-loans-guide" },
      { label: "SMSF Guide", href: "/admin/resources/smsf-guide" },
      { label: "Guarantors Guide", href: "/admin/resources/guarantors-guide" },
      { label: "Documents", href: "/admin/resources/documents" },
      { label: "FAQ", href: "/admin/resources/faq" },
    ],
  },
  {
    label: "Legal",
    children: [
      { label: "Privacy Policy", href: "/admin/legal/privacy-policy" },
      { label: "Terms of Service", href: "/admin/legal/terms-of-service" },
      { label: "Accessibility", href: "/admin/legal/accessibility" },
      { label: "Licensing", href: "/admin/legal/licensing" },
    ],
  },
];

export const ADMIN_GLOBAL_LINKS: AdminNavLink[] = [
  { label: "Navbar", href: "/admin/navbar" },
  { label: "Footer", href: "/admin/footer" },
  { label: "Leads", href: "/admin/leads" },
  { label: "Popup", href: "/admin/popup" },
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
  { id: "hero", title: "Hero", description: "", href: "/admin?section=hero", previewPath: "/" },
  { id: "services", title: "Lending solutions", description: "", href: "/admin?section=services", previewPath: "/" },
  { id: "why-choose-us", title: "Why choose us", description: "", href: "/admin?section=why-choose-us", previewPath: "/" },
  { id: "property-showcase", title: "Property showcase", description: "", href: "/admin?section=property-showcase", previewPath: "/" },
  { id: "testimonials", title: "Testimonials", description: "", href: "/admin/testimonials", previewPath: "/" },
  { id: "cta", title: "Contact CTA", description: "", href: "/admin/home/cta", previewPath: "/" },
  { id: "footer", title: "Footer", description: "", href: "/admin/footer", previewPath: "/" },
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
