import { Router } from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import { User } from "../models/User.js";
import {
  clearAuthCookie,
  requireAuth,
  serializeUser,
  setAuthCookie,
  signToken,
  type AuthRequest,
} from "../middleware/auth.js";
import { fail, ok } from "../utils/response.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return fail(res, 400, "VALIDATION_ERROR", "Email and password are required");
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.isActive) {
    return fail(res, 401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return fail(res, 401, "INVALID_CREDENTIALS", "Invalid email or password");
  }

  const token = signToken(user);
  setAuthCookie(res, token);
  return ok(res, {
    token,
    user: serializeUser(user),
  });
});

router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  return ok(res, { message: "Logged out" });
});

router.get("/me", requireAuth, (req: AuthRequest, res) => {
  return ok(res, serializeUser(req.user!));
});

export default router;
