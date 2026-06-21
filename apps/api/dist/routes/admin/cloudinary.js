import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";
import { isCloudinaryConfigured, uploadImageBuffer, } from "../../lib/cloudinary.js";
import { env } from "../../config/env.js";
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith("image/"))
            cb(null, true);
        else
            cb(new Error("Only image uploads are allowed"));
    },
});
const router = Router();
router.post("/upload", requireAuth, upload.single("file"), async (req, res) => {
    if (!isCloudinaryConfigured()) {
        return fail(res, 503, "CLOUDINARY_NOT_CONFIGURED", "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to .env");
    }
    if (!req.file) {
        return fail(res, 400, "VALIDATION_ERROR", "Image file is required");
    }
    try {
        const folder = req.body.folder || `${env.cloudinaryFolder}/hero`;
        const result = await uploadImageBuffer(req.file.buffer, { folder });
        return ok(res, result);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Cloudinary upload failed";
        return fail(res, 500, "UPLOAD_FAILED", message);
    }
});
/** Public — only returns whether credentials exist (no secrets). */
router.get("/status", (_req, res) => {
    return ok(res, { configured: isCloudinaryConfigured() });
});
export default router;
