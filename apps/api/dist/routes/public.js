import { Router } from "express";
import { Homepage } from "../models/Homepage.js";
import { Loan } from "../models/Loan.js";
import { Testimonial } from "../models/Testimonial.js";
import { Team } from "../models/Team.js";
import { Footer } from "../models/Footer.js";
import { Navigation } from "../models/Navigation.js";
import { Popup } from "../models/Popup.js";
import { Typography } from "../models/Typography.js";
import { Faq } from "../models/Faq.js";
import { ResourceDocument } from "../models/ResourceDocument.js";
import { Award } from "../models/Award.js";
import { Lender } from "../models/Lender.js";
import { CommunityPost } from "../models/CommunityPost.js";
import { JobPosting } from "../models/JobPosting.js";
import { Page } from "../models/Page.js";
import { fail, ok } from "../utils/response.js";
import { mergeFooterData } from "../../../../lib/footer-content.js";
import { mergeNavigationData } from "../../../../lib/navigation-content.js";
import { mergeTypographyData } from "../../../../lib/typography-content.js";
const router = Router();
router.get("/health", (_req, res) => {
    return ok(res, { status: "ok", timestamp: new Date().toISOString() });
});
router.get("/homepage", async (_req, res) => {
    const doc = await Homepage.findOne({ isPublished: true }).sort({ updatedAt: -1 });
    if (!doc)
        return fail(res, 404, "NOT_FOUND", "Homepage not found");
    return ok(res, doc);
});
router.get("/loans", async (_req, res) => {
    const loans = await Loan.find({ isPublished: true }).sort({ title: 1 });
    return ok(res, loans, { total: loans.length });
});
router.get("/loans/:slug", async (req, res) => {
    const loan = await Loan.findOne({ slug: req.params.slug, isPublished: true });
    if (!loan)
        return fail(res, 404, "NOT_FOUND", "Loan not found");
    return ok(res, loan);
});
router.get("/testimonials", async (_req, res) => {
    const items = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/team", async (req, res) => {
    const filter = { isActive: true };
    if (req.query.homepage === "true")
        filter.showOnHomepage = true;
    const items = await Team.find(filter).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/faqs", async (req, res) => {
    const filter = { isActive: true };
    if (req.query.category)
        filter.category = req.query.category;
    const items = await Faq.find(filter).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/documents", async (_req, res) => {
    const items = await ResourceDocument.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/typography", async (_req, res) => {
    const doc = await Typography.findOne().sort({ updatedAt: -1 });
    return ok(res, mergeTypographyData(doc?.toObject() ?? null));
});
router.get("/navigation", async (_req, res) => {
    const doc = await Navigation.findOne().sort({ updatedAt: -1 });
    return ok(res, mergeNavigationData(doc?.toObject() ?? null));
});
router.get("/footer", async (_req, res) => {
    const doc = await Footer.findOne().sort({ updatedAt: -1 });
    if (!doc)
        return fail(res, 404, "NOT_FOUND", "Footer not found");
    return ok(res, mergeFooterData(doc.toObject()));
});
router.get("/popup", async (_req, res) => {
    const doc = await Popup.findOne().sort({ updatedAt: -1 });
    if (!doc)
        return fail(res, 404, "NOT_FOUND", "Popup not found");
    return ok(res, doc);
});
router.get("/awards", async (_req, res) => {
    const items = await Award.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/lenders", async (_req, res) => {
    const items = await Lender.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/community-posts", async (_req, res) => {
    const items = await CommunityPost.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/careers/postings", async (_req, res) => {
    const items = await JobPosting.find({ isActive: true }).sort({ order: 1 });
    return ok(res, items, { total: items.length });
});
router.get("/pages/:slug", async (req, res) => {
    const page = await Page.findOne({
        slug: req.params.slug,
        isPublished: true,
    });
    if (!page)
        return fail(res, 404, "NOT_FOUND", "Page not found");
    return ok(res, page);
});
export default router;
