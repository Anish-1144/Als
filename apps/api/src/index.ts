import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import { isCloudinaryConfigured } from "./lib/cloudinary.js";
import { connectDb } from "./db/connect.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.js";
import publicRoutes from "./routes/public.js";
import leadsRoutes from "./routes/leads.js";
import adminHomepageRoutes from "./routes/admin/homepage.js";
import adminLoansRoutes from "./routes/admin/loans.js";
import adminPagesRoutes from "./routes/admin/pages.js";
import adminMediaRoutes from "./routes/admin/media.js";
import adminCloudinaryRoutes from "./routes/admin/cloudinary.js";
import adminLeadsRoutes from "./routes/admin/leads.js";
import adminJobApplicationsRoutes from "./routes/admin/job-applications.js";
import { footerAdminRouter, navigationAdminRouter, popupAdminRouter } from "./routes/admin/singletons.js";
import { createAdminCrudRouter } from "./utils/createCrudRouter.js";
import { Testimonial } from "./models/Testimonial.js";
import { Team } from "./models/Team.js";
import { Faq } from "./models/Faq.js";
import { ResourceDocument } from "./models/ResourceDocument.js";
import { JobPosting } from "./models/JobPosting.js";
import { Award } from "./models/Award.js";
import { Lender } from "./models/Lender.js";
import { CommunityPost } from "./models/CommunityPost.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mediaDir = path.resolve(__dirname, "../../../public/media");

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/media", express.static(mediaDir));

app.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

const v1 = express.Router();
v1.use((_req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  next();
});
v1.use(publicRoutes);
v1.use("/auth", authRoutes);
v1.use("/leads", leadsRoutes);
v1.use("/admin/homepage", adminHomepageRoutes);
v1.use("/admin/loans", adminLoansRoutes);
v1.use("/admin/pages", adminPagesRoutes);
v1.use("/admin/media", adminMediaRoutes);
v1.use("/admin/cloudinary", adminCloudinaryRoutes);
v1.use("/admin/leads", adminLeadsRoutes);
v1.use("/admin/job-applications", adminJobApplicationsRoutes);
v1.use("/admin/footer", footerAdminRouter);
v1.use("/admin/navigation", navigationAdminRouter);
v1.use("/admin/popup", popupAdminRouter);
v1.use("/admin/testimonials", createAdminCrudRouter(Testimonial, { order: 1 }));
v1.use("/admin/team", createAdminCrudRouter(Team, { order: 1 }));
v1.use("/admin/faqs", createAdminCrudRouter(Faq, { order: 1 }));
v1.use("/admin/documents", createAdminCrudRouter(ResourceDocument, { order: 1 }));
v1.use("/admin/careers/postings", createAdminCrudRouter(JobPosting, { order: 1 }));
v1.use("/admin/awards", createAdminCrudRouter(Award, { order: 1 }));
v1.use("/admin/lenders", createAdminCrudRouter(Lender, { order: 1 }));
v1.use("/admin/community-posts", createAdminCrudRouter(CommunityPost, { order: 1 }));

app.use("/api/v1", v1);
app.use(errorHandler);

async function start() {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
    console.log(
      isCloudinaryConfigured()
        ? "Cloudinary: configured"
        : "Cloudinary: not configured (add CLOUDINARY_* to .env and restart)",
    );
  });
}

start().catch((err) => {
  console.error("Failed to start API:", err);
  process.exit(1);
});
