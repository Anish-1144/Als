import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, type IUser } from "../models/User.js";
import { fail } from "../utils/response.js";

export interface AuthRequest extends Request {
  user?: IUser;
}

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

function getToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return req.cookies?.token;
}

export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = getToken(req);
    if (!token) return fail(res, 401, "UNAUTHORIZED", "Authentication required");

    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) {
      return fail(res, 401, "UNAUTHORIZED", "Invalid or inactive user");
    }
    req.user = user;
    next();
  } catch {
    return fail(res, 401, "UNAUTHORIZED", "Invalid token");
  }
}

export function signToken(user: IUser): string {
  return jwt.sign(
    { email: user.email, role: user.role },
    env.jwtSecret,
    { subject: user.id, expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"] },
  );
}

export function setAuthCookie(res: Response, token: string) {
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });
}

export function clearAuthCookie(res: Response) {
  res.clearCookie("token", { path: "/" });
}
