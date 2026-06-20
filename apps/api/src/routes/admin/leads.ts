import { Router } from "express";
import { Lead } from "../../models/Lead.js";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  const filter: Record<string, string> = {};
  if (req.query.type === "contact" || req.query.type === "consultation") {
    filter.type = req.query.type;
  }
  const items = await Lead.find(filter).sort({ createdAt: -1 });
  return ok(res, items, { total: items.length });
});

router.patch("/:id", async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!lead) return fail(res, 404, "NOT_FOUND", "Lead not found");
  return ok(res, lead);
});

export default router;
