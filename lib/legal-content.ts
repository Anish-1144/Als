export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalPageContent = {
  lastUpdated: string;
  introParagraphs: string[];
  sections: LegalSection[];
  footerNote?: string;
};

export const LEGAL_SLUGS = [
  "privacy-policy",
  "terms-of-service",
  "accessibility",
  "licensing",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

function mergeSections(defaults: LegalSection[], raw?: LegalSection[]): LegalSection[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
    paragraphs: raw?.[i]?.paragraphs ?? defaults[i]?.paragraphs ?? [],
    bullets: raw?.[i]?.bullets ?? defaults[i]?.bullets,
  }));
}

function mergeParagraphs(defaults: string[], raw?: string[]): string[] {
  if (raw && raw.length > 0) return raw;
  return defaults;
}

export const LEGAL_PAGE_DEFAULTS: Record<LegalSlug, LegalPageContent> = {
  "privacy-policy": {
    lastUpdated: "June 2025",
    introParagraphs: [
      "ALS Mortgage Solutions (\"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, use our services, or interact with us as a client or prospective client.",
      "We comply with the Australian Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs). By using our website or services, you consent to the practices described in this policy.",
    ],
    sections: [
      {
        title: "Information We Collect",
        paragraphs: ["We may collect the following types of personal information:"],
        bullets: [
          "Identity and contact details (name, address, email, phone number)",
          "Financial information required for mortgage applications and assessments",
          "Employment and income details",
          "Identification documents as required by law",
          "Website usage data, cookies, and analytics information",
          "Communications you send to us via forms, email, or phone",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: ["We use your personal information to:"],
        bullets: [
          "Assess and process mortgage and finance applications",
          "Provide advice and broker services tailored to your needs",
          "Communicate with you about your application and our services",
          "Comply with legal and regulatory obligations",
          "Improve our website, services, and customer experience",
          "Send relevant updates where you have opted in to receive them",
        ],
      },
      {
        title: "Disclosure to Third Parties",
        paragraphs: [
          "We may share your information with lenders, valuers, solicitors, credit reporting bodies, and other parties involved in your finance application, only as necessary to provide our services. We do not sell your personal information to third parties for marketing purposes.",
        ],
      },
      {
        title: "Data Security",
        paragraphs: [
          "We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.",
        ],
      },
      {
        title: "Your Rights",
        paragraphs: ["You may request access to, correction of, or deletion of your personal information, subject to legal requirements. To exercise these rights or make a privacy complaint, contact us using the details below."],
      },
      {
        title: "Contact Us",
        paragraphs: [
          "For privacy enquiries or complaints, contact ALS Mortgage Solutions at info@alsmortgagesolutions.com.au or 03 9087 7719, Level 1, 123 Collins Street, Melbourne VIC 3000.",
        ],
      },
    ],
    footerNote: "This policy may be updated from time to time. Please review this page periodically for changes.",
  },
  "terms-of-service": {
    lastUpdated: "June 2025",
    introParagraphs: [
      "These Terms of Service (\"Terms\") govern your use of the ALS Mortgage Solutions website and the services we provide. By accessing our website or engaging our services, you agree to be bound by these Terms.",
      "If you do not agree with any part of these Terms, please do not use our website or services.",
    ],
    sections: [
      {
        title: "Our Services",
        paragraphs: [
          "ALS Mortgage Solutions provides mortgage broking and finance advisory services. We act as an intermediary between you and lenders. We do not provide legal, tax, or financial planning advice unless explicitly agreed in writing.",
        ],
      },
      {
        title: "No Guarantee of Approval",
        paragraphs: [
          "While we work diligently to find suitable finance options, we cannot guarantee loan approval. All lending decisions are made by lenders based on their criteria and your individual circumstances.",
        ],
      },
      {
        title: "Your Responsibilities",
        paragraphs: ["When using our services, you agree to:"],
        bullets: [
          "Provide accurate, complete, and up-to-date information",
          "Notify us promptly of any material changes to your circumstances",
          "Review all loan documents carefully before signing",
          "Seek independent legal or financial advice where appropriate",
        ],
      },
      {
        title: "Fees and Commissions",
        paragraphs: [
          "In most cases, our broker services are provided at no direct cost to you. We receive commissions from lenders upon successful settlement. We will disclose any fees or commissions relevant to your application in accordance with regulatory requirements.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "All content on this website, including text, graphics, logos, and software, is the property of ALS Mortgage Solutions or its licensors and is protected by Australian copyright laws. You may not reproduce, distribute, or modify content without our written permission.",
        ],
      },
      {
        title: "Limitation of Liability",
        paragraphs: [
          "To the maximum extent permitted by law, ALS Mortgage Solutions is not liable for any indirect, incidental, or consequential damages arising from your use of our website or services. Our liability is limited to the extent permitted under the Australian Consumer Law.",
        ],
      },
      {
        title: "Governing Law",
        paragraphs: [
          "These Terms are governed by the laws of Victoria, Australia. Any disputes shall be subject to the exclusive jurisdiction of the courts of Victoria.",
        ],
      },
    ],
    footerNote: "We reserve the right to modify these Terms at any time. Continued use of our website constitutes acceptance of updated Terms.",
  },
  accessibility: {
    lastUpdated: "June 2025",
    introParagraphs: [
      "ALS Mortgage Solutions is committed to ensuring our website and services are accessible to all people, including those with disabilities. We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.",
      "We continuously work to improve the accessibility of our digital presence and welcome feedback from users.",
    ],
    sections: [
      {
        title: "Our Commitment",
        paragraphs: [
          "We believe everyone should be able to access information about mortgage and finance services independently. Our commitment includes designing pages with sufficient colour contrast, providing text alternatives for images, ensuring keyboard navigability, and maintaining clear heading structure.",
        ],
      },
      {
        title: "Accessibility Features",
        paragraphs: ["Our website includes the following accessibility features:"],
        bullets: [
          "Responsive design that works across desktop, tablet, and mobile devices",
          "Semantic HTML structure for screen reader compatibility",
          "Descriptive link text and form labels",
          "Adjustable text sizing through browser settings",
          "Alternative text for meaningful images",
        ],
      },
      {
        title: "Known Limitations",
        paragraphs: [
          "Some third-party content embedded on our site, such as calculator tools and map widgets, may not fully meet accessibility standards. We are working with providers to improve these integrations where possible.",
        ],
      },
      {
        title: "Alternative Access",
        paragraphs: [
          "If you are unable to access any information or service on our website, please contact us. We will provide the information in an alternative format or assist you directly by phone or email.",
        ],
      },
      {
        title: "Feedback",
        paragraphs: [
          "We welcome your feedback on the accessibility of our website. If you encounter accessibility barriers or have suggestions for improvement, please contact us at info@alsmortgagesolutions.com.au or call 03 9087 7719.",
        ],
      },
    ],
    footerNote: "This accessibility statement is reviewed regularly and updated as we make improvements to our website.",
  },
  licensing: {
    lastUpdated: "June 2025",
    introParagraphs: [
      "ALS Mortgage Solutions operates under applicable Australian financial services and credit licensing requirements. This page outlines our regulatory credentials and the licensing framework that governs our services.",
    ],
    sections: [
      {
        title: "Credit Licence",
        paragraphs: [
          "ALS Mortgage Solutions holds an Australian Credit Licence (ACL) and operates as an authorised credit representative. We are authorised to engage in credit activities including providing credit assistance and acting as an intermediary between consumers and credit providers.",
        ],
      },
      {
        title: "Australian Credit Licence Details",
        paragraphs: ["Our licensing details:"],
        bullets: [
          "Australian Credit Licence holder: [Insert ACL holder name and number]",
          "Credit representative number: [Insert CR number]",
          "Authorised credit activities: Credit assistance and credit provision",
        ],
      },
      {
        title: "Aggregator Membership",
        paragraphs: [
          "ALS Mortgage Solutions is a member of a licensed aggregator network, which provides access to a panel of lenders and compliance support. Our aggregator holds the relevant Australian Credit Licence under which we operate as an authorised credit representative.",
        ],
      },
      {
        title: "Professional Memberships",
        paragraphs: [
          "Our brokers maintain membership with relevant industry bodies and comply with ongoing professional development requirements. We adhere to the MFAA (Mortgage & Finance Association of Australia) Code of Practice where applicable.",
        ],
      },
      {
        title: "Complaints and Disputes",
        paragraphs: [
          "If you have a complaint about our services, please contact us directly in the first instance. If your complaint is not resolved to your satisfaction, you may refer the matter to the Australian Financial Complaints Authority (AFCA) at www.afca.org.au.",
        ],
      },
      {
        title: "Website Software Licence",
        paragraphs: [
          "The software powering this website is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0). Source code is available upon request in accordance with the licence terms.",
        ],
      },
    ],
    footerNote: "For verification of our licensing credentials, please contact us or check the ASIC Connect Professional Registers.",
  },
};

export function mergeLegalPageContent(slug: LegalSlug, raw?: Partial<LegalPageContent>): LegalPageContent {
  const d = LEGAL_PAGE_DEFAULTS[slug];
  return {
    lastUpdated: raw?.lastUpdated ?? d.lastUpdated,
    introParagraphs: mergeParagraphs(d.introParagraphs, raw?.introParagraphs),
    sections: mergeSections(d.sections, raw?.sections),
    footerNote: raw?.footerNote ?? d.footerNote,
  };
}

export function getLegalAdminPath(slug: LegalSlug): string {
  return `/admin/legal/${slug}`;
}

export function getLegalPublicPath(slug: LegalSlug): string {
  return `/legal/${slug}`;
}
