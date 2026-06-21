"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DASHBOARD_GLOBAL = exports.DASHBOARD_NAV = void 0;
/** Mirrors the public navbar: primary page/hero editor first, then sub-sections. */
exports.DASHBOARD_NAV = [
    {
        label: "Site",
        pages: [
            {
                label: "Home",
                path: "/",
                primary: {
                    href: "/admin/homepage",
                    title: "Homepage",
                    desc: "Hero, services, why choose us, property showcase",
                },
                sections: [
                    {
                        href: "/admin/testimonials",
                        title: "Testimonials",
                        desc: "Client reviews on homepage and about",
                    },
                    {
                        href: "/admin/team",
                        title: "Team",
                        desc: "Team highlights on homepage and services",
                    },
                ],
            },
        ],
    },
    {
        label: "Why ALS",
        pages: [
            {
                label: "Why ALS",
                path: "/why-als",
                primary: {
                    href: "/admin/pages/why-als",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "About Us",
                path: "/about",
                primary: {
                    href: "/admin/pages/about",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    { href: "/admin/team", title: "Team", desc: "Team members, bios, photos" },
                    {
                        href: "/admin/testimonials",
                        title: "Testimonials",
                        desc: "Client reviews and ratings",
                    },
                ],
            },
            {
                label: "Careers",
                path: "/why-als/careers",
                primary: {
                    href: "/admin/pages/careers",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    {
                        href: "/admin/careers",
                        title: "Job postings",
                        desc: "Open roles and application details",
                    },
                ],
            },
        ],
    },
    {
        label: "Our Services",
        pages: [
            {
                label: "Our Services",
                path: "/services",
                primary: {
                    href: "/admin/pages/services",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    { href: "/admin/team", title: "Team", desc: "Team section on services page" },
                ],
            },
            {
                label: "Home Loans",
                path: "/home-loans",
                primary: {
                    href: "/admin/pages/home-loans",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Investment Loans",
                path: "/investment-loans",
                primary: {
                    href: "/admin/pages/investment-loans",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Commercial Loans",
                path: "/commercial-loans",
                primary: {
                    href: "/admin/pages/commercial-loans",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "SMSF Loans",
                path: "/smsf-loans",
                primary: {
                    href: "/admin/pages/smsf-loans",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Car Financing",
                path: "/car-financing",
                primary: {
                    href: "/admin/pages/car-financing",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Refinancing",
                path: "/refinancing",
                primary: {
                    href: "/admin/pages/refinancing",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
        ],
    },
    {
        label: "Calculators",
        pages: [
            {
                label: "Calculators",
                path: "/calculator",
                primary: {
                    href: "/admin/pages/calculator",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
        ],
    },
    {
        label: "Company",
        pages: [
            {
                label: "How It Works",
                path: "/how-it-works",
                primary: {
                    href: "/admin/pages/how-it-works",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Loan Products",
                path: "/loans",
                primary: {
                    href: "/admin/pages/loans",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    {
                        href: "/admin/loans",
                        title: "Loan products",
                        desc: "Individual loan cards and detail pages",
                    },
                ],
            },
            {
                label: "Book Consultation",
                path: "/book-consultation",
                primary: {
                    href: "/admin/pages/book-consultation",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    {
                        href: "/admin/leads?type=consultation",
                        title: "Consultation leads",
                        desc: "Submitted consultation requests",
                    },
                ],
            },
            {
                label: "Contact",
                path: "/contact",
                primary: {
                    href: "/admin/pages/contact",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    {
                        href: "/admin/leads?type=contact",
                        title: "Contact leads",
                        desc: "Submitted contact form messages",
                    },
                ],
            },
        ],
    },
    {
        label: "Resources",
        pages: [
            {
                label: "First Home Buyer Guide",
                path: "/resources/first-home-buyer-guide",
                primary: {
                    href: "/admin/pages/first-home-buyer-guide",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Investment Guide",
                path: "/resources/investment-guide",
                primary: {
                    href: "/admin/pages/investment-guide",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Construction Loans Guide",
                path: "/resources/construction-loans-guide",
                primary: {
                    href: "/admin/pages/construction-loans-guide",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "SMSF Guide",
                path: "/resources/smsf-guide",
                primary: {
                    href: "/admin/pages/smsf-guide",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Guarantors Guide",
                path: "/resources/guarantors-guide",
                primary: {
                    href: "/admin/pages/guarantors-guide",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
            },
            {
                label: "Documents",
                path: "/resources/documents",
                primary: {
                    href: "/admin/pages/documents",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    {
                        href: "/admin/documents",
                        title: "Document library",
                        desc: "Files, links, and categories",
                    },
                ],
            },
            {
                label: "FAQ",
                path: "/resources/faq",
                primary: {
                    href: "/admin/pages/faq",
                    title: "Page hero",
                    desc: "Title, subtitle, background image",
                },
                sections: [
                    { href: "/admin/faqs", title: "FAQ items", desc: "Questions and answers" },
                ],
            },
        ],
    },
];
exports.DASHBOARD_GLOBAL = [
    { href: "/admin/navbar", title: "Navbar", desc: "Site logo and navbar page heroes" },
    { href: "/admin/footer", title: "Footer", desc: "Footer logo, contact info, links, social" },
    { href: "/admin/popup", title: "Popup", desc: "Site-wide promotional popup" },
    { href: "/admin/leads", title: "All leads", desc: "Contact & consultation submissions" },
];
