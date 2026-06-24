import { Router } from "express";
import { z } from "zod";
import { Lead } from "../models/Lead.js";
import { JobApplication } from "../models/JobApplication.js";
import { JobPosting } from "../models/JobPosting.js";
import { asyncHandler } from "../utils/asyncHandler.js";
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

router.post("/contact", asyncHandler(async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "VALIDATION_ERROR", "Valid email is required");
  }
  const data = parsed.data;
  const name =
    data.name ||
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
}));

router.post("/consultation", asyncHandler(async (req, res) => {
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
  const name =
    data.name ||
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
}));

router.post("/assessment", asyncHandler(async (req, res) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);

  const name =
    str(body.name) ||
    str(body.fullName) ||
    [str(body.firstName), str(body.lastName)].filter(Boolean).join(" ").trim() ||
    "Unknown";
  const email = str(body.email);
  const phone = str(body.phone) || str(body.phoneNumber) || str(body.mobile);
  const message = str(body.message);

  if (!name && !email && !phone) {
    return fail(res, 400, "VALIDATION_ERROR", "Please complete the form");
  }

  const lead = await Lead.create({
    type: "assessment",
    name,
    email,
    phone,
    subject: "Free Assessment",
    message,
    payload: body,
  });
  return ok(res, {
    id: lead.id,
    message: "Thank you — your assessment request has been received.",
  });
}));

const applySchema = z.object({
  jobPosting: z.string().optional(),
  applicantName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeUrl: z.string().min(1, "Resume is required"),
  resumeFileName: z.string().optional(),
  coverLetter: z.string().optional(),
  linkedIn: z.string().optional(),
});

router.post("/careers/apply", asyncHandler(async (req, res) => {
  const parsed = applySchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "VALIDATION_ERROR", "Name, email, and resume are required");
  }

  let jobTitle = "General Application";
  const jobPostingId = parsed.data.jobPosting;
  if (jobPostingId && jobPostingId !== "general") {
    const job = await JobPosting.findById(jobPostingId);
    if (job?.title) jobTitle = job.title;
  }

  const app = await JobApplication.create({
    jobPostingId: jobPostingId === "general" ? undefined : jobPostingId,
    jobTitle,
    applicantName: parsed.data.applicantName,
    email: parsed.data.email,
    phone: parsed.data.phone,
    resumeUrl: parsed.data.resumeUrl,
    resumeFileName: parsed.data.resumeFileName,
    coverLetter: parsed.data.coverLetter,
    linkedIn: parsed.data.linkedIn,
  });
  return ok(res, { id: app.id, message: "Application submitted successfully." });
}));

export default router;
