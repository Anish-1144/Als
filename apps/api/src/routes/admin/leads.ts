import { Router } from "express";
import { Lead } from "../../models/Lead.js";
import {
  requireAuth,
  requireModuleAccess,
  requireModuleFull,
  requireModuleWrite,
} from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

router.get("/", requireModuleAccess("leads", "view"), async (req, res) => {
  const filter: Record<string, string> = {};
  const type = req.query.type;
  if (type === "contact" || type === "consultation" || type === "assessment") {
    filter.type = type;
  }
  const items = await Lead.find(filter).sort({ createdAt: -1 });
  return ok(res, items, { total: items.length });
});

router.patch("/:id", requireModuleWrite("leads"), async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true },
  );
  if (!lead) return fail(res, 404, "NOT_FOUND", "Lead not found");
  return ok(res, lead);
});

router.delete("/:id", requireModuleFull("leads"), async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return fail(res, 404, "NOT_FOUND", "Lead not found");
  return ok(res, { deleted: true });
});

export default router;
