import { Router } from "express";
import { Loan } from "../../models/Loan.js";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";
const router = Router();
router.use(requireAuth);
router.get("/", async (_req, res) => {
    const loans = await Loan.find().sort({ title: 1 });
    return ok(res, loans, { total: loans.length });
});
router.get("/:id", async (req, res) => {
    const loan = await Loan.findById(req.params.id);
    if (!loan)
        return fail(res, 404, "NOT_FOUND", "Loan not found");
    return ok(res, loan);
});
router.post("/", async (req, res) => {
    const loan = await Loan.create(req.body);
    return ok(res, loan);
});
router.put("/:id", async (req, res) => {
    const loan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!loan)
        return fail(res, 404, "NOT_FOUND", "Loan not found");
    return ok(res, loan);
});
router.delete("/:id", async (req, res) => {
    const loan = await Loan.findByIdAndDelete(req.params.id);
    if (!loan)
        return fail(res, 404, "NOT_FOUND", "Loan not found");
    return ok(res, { deleted: true });
});
export default router;
