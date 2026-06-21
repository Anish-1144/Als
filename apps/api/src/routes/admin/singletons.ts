import { Router } from "express";
import type { Model } from "mongoose";
import { Footer } from "../../models/Footer.js";
import { Navigation } from "../../models/Navigation.js";
import { Popup } from "../../models/Popup.js";
import { Typography } from "../../models/Typography.js";
import { requireAuth } from "../../middleware/auth.js";
import { ok } from "../../utils/response.js";

function singletonRouter(Model: Model<any>) {
  const router = Router();
  router.use(requireAuth);
  router.get("/", async (_req, res) => {
    const doc = await Model.findOne().sort({ updatedAt: -1 });
    return ok(res, doc);
  });
  router.put("/", async (req, res) => {
    const existing = await Model.findOne().sort({ updatedAt: -1 });
    if (existing) {
      Object.assign(existing, req.body);
      await existing.save();
      return ok(res, existing);
    }
    const created = await Model.create(req.body);
    return ok(res, created);
  });
  return router;
}

export const footerAdminRouter = singletonRouter(Footer as Model<any>);
export const popupAdminRouter = singletonRouter(Popup as Model<any>);
export const navigationAdminRouter = singletonRouter(Navigation as Model<any>);
export const typographyAdminRouter = singletonRouter(Typography as Model<any>);
