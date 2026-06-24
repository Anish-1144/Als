import { Router } from "express";
import type { Model } from "mongoose";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "./asyncHandler.js";
import { isValidObjectId } from "./isValidObjectId.js";
import { sanitizeModelUpdates } from "./sanitizeUpdates.js";
import { fail, ok } from "./response.js";

export function createAdminCrudRouter<T>(
  Model: Model<T>,
  sort: Record<string, 1 | -1> = { createdAt: -1 },
) {
  const router = Router();
  router.use(requireAuth);

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      const items = await Model.find().sort(sort);
      return ok(res, items, { total: items.length });
    }),
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        return fail(res, 400, "INVALID_ID", "Invalid record id");
      }
      const item = await Model.findById(id);
      if (!item) return fail(res, 404, "NOT_FOUND", "Not found");
      return ok(res, item);
    }),
  );

  router.post(
    "/",
    asyncHandler(async (req, res) => {
      const payload = sanitizeModelUpdates(req.body as Record<string, unknown>);
      const item = await Model.create(payload);
      return ok(res, item);
    }),
  );

  router.put(
    "/:id",
    asyncHandler(async (req, res) => {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        return fail(res, 400, "INVALID_ID", "Invalid record id");
      }

      const updates = sanitizeModelUpdates(req.body as Record<string, unknown>);
      if (Object.keys(updates).length === 0) {
        return fail(res, 400, "VALIDATION_ERROR", "No valid fields to update");
      }

      const item = await Model.findByIdAndUpdate(
        id,
        { $set: updates },
        {
          new: true,
          runValidators: true,
        },
      );
      if (!item) return fail(res, 404, "NOT_FOUND", "Not found");
      return ok(res, item);
    }),
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        return fail(res, 400, "INVALID_ID", "Invalid record id");
      }
      const item = await Model.findByIdAndDelete(id);
      if (!item) return fail(res, 404, "NOT_FOUND", "Not found");
      return ok(res, { deleted: true });
    }),
  );

  return router;
}
