import mongoose from "mongoose";
import { connectDb } from "../db/connect.js";
import { Page } from "../models/Page.js";
import { PAGE_REGISTRY } from "../../../../lib/page-registry.js";

/**
 * The services + loan pages had stale placeholder `content` saved in the DB,
 * which overrode the new code-driven defaults (rich detailed pages, correct
 * hero images). This resets their `content` to {} so the Next app renders the
 * up-to-date defaults, and refreshes the hero fields from the page registry.
 * Editors can still customise everything from the admin dashboard afterwards.
 */
const SERVICE_SLUGS = [
  "services",
  "home-loans",
  "investment-loans",
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing",
];

async function main() {
  await connectDb();

  for (const slug of SERVICE_SLUGS) {
    const entry = PAGE_REGISTRY.find((p) => p.slug === slug);
    if (!entry) {
      console.log(`${slug}: no registry entry, skipped`);
      continue;
    }
    const result = await Page.updateOne(
      { slug },
      {
        $set: {
          content: {},
          heroTitle: entry.heroTitle,
          heroSubtitle: entry.heroSubtitle,
          heroBackgroundImage: entry.heroBackgroundImage,
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
