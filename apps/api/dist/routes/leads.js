import { Router } from "express";
import { z } from "zod";
import { Lead } from "../models/Lead.js";
import { JobApplication } from "../models/JobApplication.js";
import { ok, fail } from "../utils/response.js";
const router = Router();
const contactSchema = z.object({
    name: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().optional(),
    message: z.string().optional(),
    preferredContact: z.string().optional(),
});
router.post("/contact", async (req, res) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
        return fail(res, 400, "VALIDATION_ERROR", "Valid email is required");
    }
    const data = parsed.data;
    const name = data.name ||
        [data.firstName, data.lastName].filter(Boolean).join(" ").trim() ||
        "Unknown";
    const lead = await Lead.create({
        type: "contact",
        name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        preferredContact: data.preferredContact,
        payload: req.body,
    });
    return ok(res, { id: lead.id, message: "Thank you — we will be in touch soon." });
});
router.post("/consultation", async (req, res) => {
    const parsed = contactSchema
        .extend({
        consultationType: z.string().optional(),
        preferredTime: z.string().optional(),
    })
        .safeParse(req.body);
    if (!parsed.success) {
        return fail(res, 400, "VALIDATION_ERROR", "Valid email is required");
    }
    const data = parsed.data;
    const name = data.name ||
        [data.firstName, data.lastName].filter(Boolean).join(" ").trim() ||
        "Unknown";
    const lead = await Lead.create({
        type: "consultation",
        name,
        email: data.email,
        phone: data.phone,
        subject: data.subject ?? "consultation",
        message: data.message,
        consultationType: data.consultationType,
        preferredTime: data.preferredTime,
        payload: req.body,
    });
    return ok(res, { id: lead.id, message: "Consultation request received." });
});
const applySchema = z.object({
    jobPosting: z.string().optional(),
    applicantName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    resumeUrl: z.string().optional(),
    coverLetter: z.string().optional(),
    linkedIn: z.string().optional(),
});
router.post("/careers/apply", async (req, res) => {
    const parsed = applySchema.safeParse(req.body);
    if (!parsed.success) {
        return fail(res, 400, "VALIDATION_ERROR", "Name and valid email are required");
    }
    const app = await JobApplication.create({
        jobPostingId: parsed.data.jobPosting,
        applicantName: parsed.data.applicantName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        resumeUrl: parsed.data.resumeUrl,
        coverLetter: parsed.data.coverLetter,
        linkedIn: parsed.data.linkedIn,
    });
    return ok(res, { id: app.id, message: "Application submitted successfully." });
});
export default router;
