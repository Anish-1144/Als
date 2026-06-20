import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDb } from "../db/connect.js";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { Homepage } from "../models/Homepage.js";
import { Loan } from "../models/Loan.js";
import { Testimonial } from "../models/Testimonial.js";
import { Team } from "../models/Team.js";
import { Footer } from "../models/Footer.js";
import { Navigation } from "../models/Navigation.js";
import { Popup } from "../models/Popup.js";
import { Faq } from "../models/Faq.js";
import { ResourceDocument } from "../models/ResourceDocument.js";
import { Award } from "../models/Award.js";
import { Lender } from "../models/Lender.js";
import { CommunityPost } from "../models/CommunityPost.js";
import { JobPosting } from "../models/JobPosting.js";
import { Page } from "../models/Page.js";

// Import mock data from project root
import {
  homepageSeedData,
  testimonialsSeedData,
  teamSeedData,
  footerSeedData,
  loanSeedData,
  faqSeedData,
  popupData,
  awardsData,
  lendersData,
  communityPostsData,
  documentsData,
  jobPostingsData,
} from "../../../../lib/mock-data/index.js";
import { PAGE_REGISTRY } from "../../../../lib/page-registry.js";
import {
  DEFAULT_WHY_ALS_CONTENT,
  DEFAULT_ABOUT_CONTENT,
  DEFAULT_CAREERS_CONTENT,
} from "../../../../lib/page-content.js";
import {
  DEFAULT_SERVICES_CONTENT,
  LOAN_PAGE_DEFAULTS,
} from "../../../../lib/services-content.js";
import {
  DEFAULT_CALCULATORS_HUB_CONTENT,
  CALCULATOR_PAGE_DEFAULTS,
} from "../../../../lib/calculator-content.js";
import { DEFAULT_HOW_IT_WORKS_CONTENT } from "../../../../lib/how-it-works-content.js";
import { GUIDE_PAGE_DEFAULTS } from "../../../../lib/mock-data/seed-resource-guides.js";
import {
  DEFAULT_DOCUMENTS_PAGE_CONTENT,
  DEFAULT_FAQ_PAGE_CONTENT,
} from "../../../../lib/resources-content.js";
import { DEFAULT_CONTACT_CONTENT } from "../../../../lib/contact-content.js";
import { LEGAL_PAGE_DEFAULTS } from "../../../../lib/legal-content.js";
import { DEFAULT_NAVIGATION } from "../../../../lib/navigation-content.js";

function pageSeedContent(slug: string) {
  if (slug === "why-als") return DEFAULT_WHY_ALS_CONTENT;
  if (slug === "about") return DEFAULT_ABOUT_CONTENT;
  if (slug === "careers") return DEFAULT_CAREERS_CONTENT;
  if (slug === "services") return DEFAULT_SERVICES_CONTENT;
  if (slug in LOAN_PAGE_DEFAULTS) {
    return LOAN_PAGE_DEFAULTS[slug as keyof typeof LOAN_PAGE_DEFAULTS];
  }
  if (slug === "calculator") return DEFAULT_CALCULATORS_HUB_CONTENT;
  if (slug in CALCULATOR_PAGE_DEFAULTS) {
    return CALCULATOR_PAGE_DEFAULTS[slug as keyof typeof CALCULATOR_PAGE_DEFAULTS];
  }
  if (slug === "how-it-works") return DEFAULT_HOW_IT_WORKS_CONTENT;
  if (slug in GUIDE_PAGE_DEFAULTS) {
    return GUIDE_PAGE_DEFAULTS[slug as keyof typeof GUIDE_PAGE_DEFAULTS];
  }
  if (slug === "faq") return DEFAULT_FAQ_PAGE_CONTENT;
  if (slug === "documents") return DEFAULT_DOCUMENTS_PAGE_CONTENT;
  if (slug === "contact") return DEFAULT_CONTACT_CONTENT;
  if (slug in LEGAL_PAGE_DEFAULTS) {
    return LEGAL_PAGE_DEFAULTS[slug as keyof typeof LEGAL_PAGE_DEFAULTS];
  }
  return undefined;
}

const footerWithAuContact = {
  ...footerSeedData,
  logoUrl: footerSeedData.logoUrl,
  address: {
    street: "Level 1, 123 Collins Street",
    city: "Melbourne",
    state: "VIC",
    zipCode: "3000",
  },
  contact: {
    phone: "03 9087 7719",
    email: "info@alsmortgagesolutions.com.au",
  },
};

async function seed() {
  await connectDb();

  console.log("Clearing collections...");
  await Promise.all([
    User.deleteMany({}),
    Homepage.deleteMany({}),
    Loan.deleteMany({}),
    Testimonial.deleteMany({}),
    Team.deleteMany({}),
    Footer.deleteMany({}),
    Navigation.deleteMany({}),
    Popup.deleteMany({}),
    Faq.deleteMany({}),
    ResourceDocument.deleteMany({}),
    Award.deleteMany({}),
    Lender.deleteMany({}),
    CommunityPost.deleteMany({}),
    JobPosting.deleteMany({}),
    Page.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash(env.seedAdminPassword, 12);
  const admin = await User.create({
    email: env.seedAdminEmail.toLowerCase(),
    passwordHash,
    firstName: "Admin",
    lastName: "User",
    role: "super_admin",
    isActive: true,
  });
  console.log(`Created admin: ${admin.email}`);

  await Homepage.create({
    ...homepageSeedData,
    isPublished: true,
  });
  console.log("Created homepage");

  const loans = loanSeedData.map((loan) => ({
    ...loan,
    isPublished: loan.isActive !== false,
  }));
  await Loan.insertMany(loans);
  console.log(`Created ${loans.length} loans`);

  await Testimonial.insertMany(testimonialsSeedData);
  console.log(`Created ${testimonialsSeedData.length} testimonials`);

  await Team.insertMany(teamSeedData);
  console.log(`Created ${teamSeedData.length} team members`);

  await Footer.create(footerWithAuContact);
  console.log("Created footer");

  await Navigation.create(DEFAULT_NAVIGATION);
  console.log("Created navigation");

  await Popup.create(popupData);
  console.log("Created popup");

  await Faq.insertMany(faqSeedData);
  console.log(`Created ${faqSeedData.length} FAQs`);

  await ResourceDocument.insertMany(documentsData);
  console.log(`Created ${documentsData.length} documents`);

  await Award.insertMany(awardsData);
  await Lender.insertMany(lendersData);
  await CommunityPost.insertMany(communityPostsData);
  await JobPosting.insertMany(jobPostingsData);
  console.log("Created awards, lenders, community posts, job postings");

  await Page.insertMany(
    PAGE_REGISTRY.map((p) => ({
      slug: p.slug,
      label: p.label,
      group: p.group,
      path: p.path,
      heroTitle: p.heroTitle,
      heroSubtitle: p.heroSubtitle,
      heroBackgroundImage: p.heroBackgroundImage,
      isPublished: true,
      content: pageSeedContent(p.slug),
    })),
  );
  console.log(`Created ${PAGE_REGISTRY.length} page entries`);

  console.log("\nSeed complete!");
  console.log(`Login: ${env.seedAdminEmail}`);
  console.log(`Password: ${env.seedAdminPassword}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
