import { Router } from "express";
import { JobApplication } from "../../models/JobApplication.js";
import {
  requireAuth,
  requireAnyModuleAccess,
  requireModuleFull,
  requireModuleWrite,
} from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const LEADS_MODULES = ["leads", "careers"];

const router = Router();
router.use(requireAuth);

router.get("/", requireAnyModuleAccess(LEADS_MODULES, "view"), async (_req, res) => {
  const items = await JobApplication.find().sort({ createdAt: -1 });
  return ok(res, items, { total: items.length });
});

router.patch(
  "/:id",
  requireAnyModuleAccess(LEADS_MODULES, "edit"),
  async (req, res) => {
    const app = await JobApplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!app) return fail(res, 404, "NOT_FOUND", "Application not found");
    return ok(res, app);
  },
);

router.delete(
  "/:id",
  requireAnyModuleAccess(LEADS_MODULES, "full"),
  async (req, res) => {
    const app = await JobApplication.findByIdAndDelete(req.params.id);
    if (!app) return fail(res, 404, "NOT_FOUND", "Application not found");
    return ok(res, { deleted: true });
  },
);

export default router;
