import { Router } from "express";
import { Page } from "../../models/Page.js";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const router = Router();

router.use(requireAuth);

router.get("/", async (_req, res) => {
  const pages = await Page.find().sort({ group: 1, label: 1 });
  return ok(res, pages, { total: pages.length });
});

router.get("/:slug", async (req, res) => {
  const page = await Page.findOne({ slug: req.params.slug });
  if (!page) return fail(res, 404, "NOT_FOUND", "Page not found");
  return ok(res, page);
});

router.put("/:slug", async (req, res) => {
  const page = await Page.findOneAndUpdate(
    { slug: req.params.slug },
    { ...req.body, slug: req.params.slug },
    { new: true, runValidators: true, upsert: true },
  );
  return ok(res, page);
});

export default router;
