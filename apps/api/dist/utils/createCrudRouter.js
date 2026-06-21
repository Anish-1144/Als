import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { fail, ok } from "./response.js";
export function createAdminCrudRouter(Model, sort = { createdAt: -1 }) {
    const router = Router();
    router.use(requireAuth);
    router.get("/", async (_req, res) => {
        const items = await Model.find().sort(sort);
        return ok(res, items, { total: items.length });
    });
    router.get("/:id", async (req, res) => {
        const item = await Model.findById(req.params.id);
        if (!item)
            return fail(res, 404, "NOT_FOUND", "Not found");
        return ok(res, item);
    });
    router.post("/", async (req, res) => {
        const item = await Model.create(req.body);
        return ok(res, item);
    });
    router.put("/:id", async (req, res) => {
        const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item)
            return fail(res, 404, "NOT_FOUND", "Not found");
        return ok(res, item);
    });
    router.delete("/:id", async (req, res) => {
        const item = await Model.findByIdAndDelete(req.params.id);
        if (!item)
            return fail(res, 404, "NOT_FOUND", "Not found");
        return ok(res, { deleted: true });
    });
    return router;
}
