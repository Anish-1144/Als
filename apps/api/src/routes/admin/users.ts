import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "../../models/User.js";
import {
  requireAuth,
  requireSuperAdmin,
  userPermissionsMap,
  type AuthRequest,
} from "../../middleware/auth.js";
import { fail, ok } from "../../utils/response.js";
import {
  buildEmptyPermissions,
  normalizePermissions,
} from "../../../../../lib/access-control.js";

const router = Router();

router.use(requireAuth);
router.use(requireSuperAdmin);

function serializeUserList(user: InstanceType<typeof User>) {
  const perms = normalizePermissions(userPermissionsMap(user));
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isActive: user.isActive,
    pagePermissions: perms,
    createdAt: user.createdAt,
  };
}

router.get("/", async (_req, res) => {
  const users = await User.find({ role: { $ne: "super_admin" } }).sort({
    createdAt: -1,
  });
  return ok(res, users.map(serializeUserList));
});

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  pagePermissions: z
    .record(z.enum(["none", "view", "edit", "full"]))
    .optional(),
});

router.post("/", async (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "VALIDATION_ERROR", "Invalid user data");
  }

  const { email, password, firstName, lastName, pagePermissions } = parsed.data;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return fail(res, 409, "CONFLICT", "A user with this email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const permissions = normalizePermissions(pagePermissions ?? buildEmptyPermissions());

  const user = await User.create({
    email: email.toLowerCase(),
    passwordHash,
    firstName,
    lastName,
    role: "editor",
    isActive: true,
    pagePermissions: new Map(Object.entries(permissions)),
  });

  return ok(res, serializeUserList(user));
});

const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  isActive: z.boolean().optional(),
  pagePermissions: z
    .record(z.enum(["none", "view", "edit", "full"]))
    .optional(),
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role === "super_admin") {
    return fail(res, 404, "NOT_FOUND", "User not found");
  }
  return ok(res, serializeUserList(user));
});

router.put("/:id", async (req: AuthRequest, res) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "VALIDATION_ERROR", "Invalid update data");
  }

  const user = await User.findById(req.params.id);
  if (!user || user.role === "super_admin") {
    return fail(res, 404, "NOT_FOUND", "User not found");
  }

  const { firstName, lastName, isActive, pagePermissions } = parsed.data;
  if (firstName !== undefined) user.firstName = firstName;
  if (lastName !== undefined) user.lastName = lastName;
  if (isActive !== undefined) user.isActive = isActive;
  if (pagePermissions !== undefined) {
    const normalized = normalizePermissions(pagePermissions);
    user.pagePermissions = new Map(Object.entries(normalized));
    user.markModified("pagePermissions");
  }

  await user.save();
  return ok(res, serializeUserList(user));
});

router.delete("/:id", async (req: AuthRequest, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role === "super_admin") {
    return fail(res, 404, "NOT_FOUND", "User not found");
  }

  await User.findByIdAndDelete(req.params.id);
  return ok(res, { deleted: true });
});

export default router;
