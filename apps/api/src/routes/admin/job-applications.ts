import { Router } from "express";
import { JobApplication } from "../../models/JobApplication.js";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (_req, res) => {
  const items = await JobApplication.find().sort({ createdAt: -1 });
  return ok(res, items, { total: items.length });
});

router.patch("/:id", async (req, res) => {
  const app = await JobApplication.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!app) return fail(res, 404, "NOT_FOUND", "Application not found");
  return ok(res, app);
});

export default router;
