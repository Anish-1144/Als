import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { Media } from "../../models/Media.js";
import { requireAuth } from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.resolve(__dirname, "../../../../../public/media");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image uploads are allowed"));
  },
});

const router = Router();

router.get("/", requireAuth, async (_req, res) => {
  const items = await Media.find().sort({ createdAt: -1 });
  return ok(res, items, { total: items.length });
});

router.post("/", requireAuth, upload.single("file"), async (req, res) => {
  if (!req.file) return fail(res, 400, "VALIDATION_ERROR", "File is required");
  const media = await Media.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    url: `/media/${req.file.filename}`,
    mimeType: req.file.mimetype,
    size: req.file.size,
    alt: (req.body.alt as string) || req.file.originalname,
  });
  return ok(res, media);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const media = await Media.findByIdAndDelete(req.params.id);
  if (!media) return fail(res, 404, "NOT_FOUND", "Media not found");
  const filePath = path.join(uploadDir, media.filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  return ok(res, { deleted: true });
});

export default router;
