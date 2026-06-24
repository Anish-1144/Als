import { Router } from "express";
import multer from "multer";
import { env } from "../config/env.js";
import {
  isCloudinaryConfigured,
  uploadRawBuffer,
} from "../lib/cloudinary.js";
import { fail, ok } from "../utils/response.js";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;

const RESUME_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: RESUME_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (RESUME_MIME_TYPES.has(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
  },
});

const router = Router();

router.post(
  "/upload-resume",
  (req, res, next) => {
    resumeUpload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return fail(res, 400, "VALIDATION_ERROR", "Resume must be 5MB or smaller");
        }
        return fail(res, 400, "VALIDATION_ERROR", err.message);
      }
      if (err) {
        return fail(
          res,
          400,
          "VALIDATION_ERROR",
          err instanceof Error ? err.message : "Invalid file",
        );
      }
      next();
    });
  },
  async (req, res) => {
    if (!isCloudinaryConfigured()) {
      return fail(
        res,
        503,
        "CLOUDINARY_NOT_CONFIGURED",
        "Resume upload is temporarily unavailable",
      );
    }
    if (!req.file) {
      return fail(res, 400, "VALIDATION_ERROR", "Resume file is required");
    }

    try {
      const folder = `${env.cloudinaryFolder}/resumes`;
      const result = await uploadRawBuffer(req.file.buffer, {
        folder,
        filename: req.file.originalname,
      });
      return ok(res, {
        url: result.url,
        publicId: result.publicId,
        fileName: req.file.originalname,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Resume upload failed";
      return fail(res, 500, "UPLOAD_FAILED", message);
    }
  },
);

export default router;
