import { Router } from "express";
import { Homepage } from "../../models/Homepage.js";
import { requireAuth } from "../../middleware/auth.js";
import { ok } from "../../utils/response.js";

const router = Router();

router.use(requireAuth);

const MIXED_FIELDS = [
  "hero",
  "services",
  "whyChooseUs",
  "propertyShowcase",
  "teamSection",
  "awards",
  "cta",
] as const;

router.get("/", async (_req, res) => {
  const doc = await Homepage.findOne().sort({ updatedAt: -1 });
  return ok(res, doc);
});

router.put("/", async (req, res) => {
  const existing = await Homepage.findOne().sort({ updatedAt: -1 });
  const body = req.body as Record<string, unknown>;

  if (existing) {
    if (body.title !== undefined) existing.title = String(body.title);
    if (body.isPublished !== undefined) existing.isPublished = Boolean(body.isPublished);

    for (const key of MIXED_FIELDS) {
      if (body[key] !== undefined) {
        existing.set(key, body[key]);
        existing.markModified(key);
      }
    }

    await existing.save();
    return ok(res, existing);
  }

  const created = await Homepage.create(body);
  return ok(res, created);
});

export default router;
