export interface PageRegistryEntry {
  slug: string;
  label: string;
  group: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
}

export const PAGE_REGISTRY: PageRegistryEntry[] = [
  { slug: "why-als", label: "Why ALS", group: "Why ALS", path: "/why-als", heroTitle: "Why ALS", heroSubtitle: "Your trusted mortgage partner", heroBackgroundImage: "/why-als.jpg" },
  { slug: "about", label: "About Us", group: "Why ALS", path: "/about", heroTitle: "About Us", heroSubtitle: "Learn more about our story and mission", heroBackgroundImage: "/about-us.jpg" },
  { slug: "careers", label: "Careers", group: "Why ALS", path: "/why-als/careers", heroTitle: "Careers", heroSubtitle: "Join our growing team", heroBackgroundImage: "/about-us.jpg" },
  { slug: "services", label: "Our Services", group: "Services", path: "/services", heroTitle: "Our Services", heroSubtitle: "Comprehensive property finance solutions", heroBackgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80" },
  { slug: "home-loans", label: "Home Loans", group: "Services", path: "/home-loans", heroTitle: "Home Loans", heroSubtitle: "Your path to homeownership", heroBackgroundImage: "/hero.jpg" },
  { slug: "investment-loans", label: "Investment Loans", group: "Services", path: "/investment-loans", heroTitle: "Investment Loans", heroSubtitle: "Build your property portfolio", heroBackgroundImage: "/section2.jpg" },
  { slug: "commercial-loans", label: "Commercial Loans", group: "Services", path: "/commercial-loans", heroTitle: "Commercial Loans", heroSubtitle: "Business property finance", heroBackgroundImage: "/section2.jpg" },
  { slug: "smsf-loans", label: "SMSF Loans", group: "Services", path: "/smsf-loans", heroTitle: "SMSF Loans", heroSubtitle: "Superannuation property investment", heroBackgroundImage: "/section2.jpg" },
  { slug: "car-financing", label: "Car Financing", group: "Services", path: "/car-financing", heroTitle: "Car Financing", heroSubtitle: "Vehicle finance solutions", heroBackgroundImage: "/section2.jpg" },
  { slug: "refinancing", label: "Refinancing", group: "Services", path: "/refinancing", heroTitle: "Refinancing", heroSubtitle: "Save with a better rate", heroBackgroundImage: "/section2.jpg" },
  { slug: "calculator", label: "Calculators", group: "Tools", path: "/calculator", heroTitle: "Loan Calculators", heroSubtitle: "Plan your property finance", heroBackgroundImage: "/section2.jpg" },
  { slug: "borrowing-capacity", label: "Borrowing Capacity", group: "Tools", path: "/calculator/borrowing-capacity", heroTitle: "Borrowing Capacity Calculator", heroSubtitle: "Estimate how much you could borrow", heroBackgroundImage: "/section2.jpg" },
  { slug: "extra-repayments", label: "Extra Repayments", group: "Tools", path: "/calculator/extra-repayments", heroTitle: "Extra Repayments Calculator", heroSubtitle: "See how much you could save", heroBackgroundImage: "/section2.jpg" },
  { slug: "property-fees", label: "Property Fees", group: "Tools", path: "/calculator/property-fees", heroTitle: "Property Fees Calculator", heroSubtitle: "Calculate costs of buying a property", heroBackgroundImage: "/section2.jpg" },
  { slug: "how-it-works", label: "How It Works", group: "Company", path: "/how-it-works", heroTitle: "How It Works", heroSubtitle: "Our simple mortgage process", heroBackgroundImage: "/section2.jpg" },
  { slug: "contact", label: "Contact", group: "Company", path: "/contact", heroTitle: "Contact Us", heroSubtitle: "Get in touch with our expert team", heroBackgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80" },
  { slug: "book-consultation", label: "Book Consultation", group: "Company", path: "/book-consultation", heroTitle: "Book Your Free Consultation", heroSubtitle: "Get personalized advice from our brokers", heroBackgroundImage: "/hero.jpg" },
  { slug: "loans", label: "Loan Products", group: "Loans", path: "/loans", heroTitle: "Our Loan Products", heroSubtitle: "Comprehensive financial solutions", heroBackgroundImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80" },
  { slug: "faq", label: "FAQ", group: "Resources", path: "/resources/faq", heroTitle: "Frequently Asked Questions", heroSubtitle: "Answers to common mortgage questions", heroBackgroundImage: "/section2.jpg" },
  { slug: "documents", label: "Documents", group: "Resources", path: "/resources/documents", heroTitle: "Document Library", heroSubtitle: "Forms, guides and resources", heroBackgroundImage: "https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80" },
  { slug: "first-home-buyer-guide", label: "First Home Buyer Guide", group: "Resources", path: "/resources/first-home-buyer-guide", heroTitle: "First Home Buyer Guide", heroSubtitle: "Everything you need to know", heroBackgroundImage: "/section2.jpg" },
  { slug: "investment-guide", label: "Investment Guide", group: "Resources", path: "/resources/investment-guide", heroTitle: "Investment Guide", heroSubtitle: "Property investment strategies", heroBackgroundImage: "/section2.jpg" },
  { slug: "construction-loans-guide", label: "Construction Loans Guide", group: "Resources", path: "/resources/construction-loans-guide", heroTitle: "Construction Loans Guide", heroSubtitle: "Building your dream home", heroBackgroundImage: "/section2.jpg" },
  { slug: "smsf-guide", label: "SMSF Guide", group: "Resources", path: "/resources/smsf-guide", heroTitle: "SMSF Guide", heroSubtitle: "Self-managed super fund property", heroBackgroundImage: "/section2.jpg" },
  { slug: "guarantors-guide", label: "Guarantors Guide", group: "Resources", path: "/resources/guarantors-guide", heroTitle: "Guarantors Guide", heroSubtitle: "Understanding guarantor loans", heroBackgroundImage: "/section2.jpg" },
  { slug: "privacy-policy", label: "Privacy Policy", group: "Legal", path: "/legal/privacy-policy", heroTitle: "Privacy Policy", heroSubtitle: "How we collect, use, and protect your information", heroBackgroundImage: "/section2.jpg" },
  { slug: "terms-of-service", label: "Terms of Service", group: "Legal", path: "/legal/terms-of-service", heroTitle: "Terms of Service", heroSubtitle: "Terms governing use of our website and services", heroBackgroundImage: "/section2.jpg" },
  { slug: "accessibility", label: "Accessibility", group: "Legal", path: "/legal/accessibility", heroTitle: "Accessibility", heroSubtitle: "Our commitment to an accessible website", heroBackgroundImage: "/section2.jpg" },
  { slug: "licensing", label: "Licensing", group: "Legal", path: "/legal/licensing", heroTitle: "Licensing", heroSubtitle: "Our regulatory credentials and licensing information", heroBackgroundImage: "/section2.jpg" },
];
