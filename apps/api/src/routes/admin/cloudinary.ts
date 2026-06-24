import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";
import {
  isCloudinaryConfigured,
  uploadImageBuffer,
  uploadRawBuffer,
} from "../../lib/cloudinary.js";
import { env } from "../../config/env.js";

const IMAGE_MAX_BYTES = 10 * 1024 * 1024;
const DOCUMENT_MAX_BYTES = 15 * 1024 * 1024;

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
]);

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: IMAGE_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image uploads are allowed"));
  },
});

const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: DOCUMENT_MAX_BYTES },
  fileFilter: (_req, file, cb) => {
    if (DOCUMENT_MIME_TYPES.has(file.mimetype)) cb(null, true);
    else cb(new Error("Only PDF, Word, Excel, and text files are allowed"));
  },
});

const router = Router();

function handleMulterError(err: unknown, res: Parameters<typeof fail>[0], maxLabel: string) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return fail(res, 400, "VALIDATION_ERROR", `${maxLabel} file is too large`);
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
  return null;
}

router.post(
  "/upload",
  requireAuth,
  (req, res, next) => {
    imageUpload.single("file")(req, res, (err) => {
      const handled = handleMulterError(err, res, "Image");
      if (handled) return;
      next();
    });
  },
  async (req, res) => {
    if (!isCloudinaryConfigured()) {
      return fail(
        res,
        503,
        "CLOUDINARY_NOT_CONFIGURED",
        "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env",
      );
    }
    if (!req.file) {
      return fail(res, 400, "VALIDATION_ERROR", "Image file is required");
    }

    try {
      const folder = (req.body.folder as string) || `${env.cloudinaryFolder}/hero`;
      const result = await uploadImageBuffer(req.file.buffer, { folder });
      return ok(res, result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Cloudinary upload failed";
      return fail(res, 500, "UPLOAD_FAILED", message);
    }
  },
);

router.post(
  "/upload-document",
  requireAuth,
  (req, res, next) => {
    documentUpload.single("file")(req, res, (err) => {
      const handled = handleMulterError(err, res, "Document");
      if (handled) return;
      next();
    });
  },
  async (req, res) => {
    if (!isCloudinaryConfigured()) {
      return fail(
        res,
        503,
        "CLOUDINARY_NOT_CONFIGURED",
        "Cloudinary is not configured",
      );
    }
    if (!req.file) {
      return fail(res, 400, "VALIDATION_ERROR", "Document file is required");
    }

    try {
      const folder =
        (req.body.folder as string) || `${env.cloudinaryFolder}/documents`;
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
        err instanceof Error ? err.message : "Document upload failed";
      return fail(res, 500, "UPLOAD_FAILED", message);
    }
  },
);

/** Public — only returns whether credentials exist (no secrets). */
router.get("/status", (_req, res) => {
  return ok(res, { configured: isCloudinaryConfigured() });
});

export default router;
