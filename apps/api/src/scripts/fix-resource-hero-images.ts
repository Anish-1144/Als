import mongoose from "mongoose";
import { connectDb } from "../db/connect.js";
import { Page } from "../models/Page.js";
import { PAGE_REGISTRY } from "../../../../lib/page-registry.js";

const RESOURCE_SLUGS = [
  "faq",
  "documents",
  "first-home-buyer-guide",
  "investment-guide",
  "construction-loans-guide",
  "smsf-guide",
  "guarantors-guide",
];

const CALCULATOR_SLUGS = [
  "calculator",
  "borrowing-capacity",
  "extra-repayments",
  "property-fees",
];

const LEGAL_SLUGS = [
  "privacy-policy",
  "terms-of-service",
  "accessibility",
  "licensing",
];

const WHY_ALS_SLUGS = ["why-als", "about", "careers"];

const COMPANY_SLUGS = ["how-it-works", "contact"];

const PAGE_SLUGS = [...RESOURCE_SLUGS, ...CALCULATOR_SLUGS, ...WHY_ALS_SLUGS, ...LEGAL_SLUGS, ...COMPANY_SLUGS];

async function main() {
  await connectDb();

  for (const slug of PAGE_SLUGS) {
    const entry = PAGE_REGISTRY.find((p) => p.slug === slug);
    if (!entry) continue;

    const result = await Page.updateOne(
      { slug },
      {
        $set: {
          heroBackgroundImage: entry.heroBackgroundImage,
          heroSubtitle: entry.heroSubtitle,
          heroTitle: entry.heroTitle,
        },
      },
    );
    console.log(`${slug}: matched=${result.matchedCount} modified=${result.modifiedCount}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
