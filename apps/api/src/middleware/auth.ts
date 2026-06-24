import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User, type IUser } from "../models/User.js";
import { fail } from "../utils/response.js";
import {
  canWriteModule,
  getEffectivePermissions,
  hasAnyModuleAccess,
  hasModuleAccess,
  isSuperAdmin,
  type AccessLevel,
} from "../../../../lib/access-control.js";

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

export function userPermissionsMap(user: IUser): Record<string, string> {
  if (!user.pagePermissions) return {};
  if (user.pagePermissions instanceof Map) {
    return Object.fromEntries(user.pagePermissions.entries());
  }
  return user.pagePermissions as Record<string, string>;
}

export function serializeUser(user: IUser) {
  const permissions = getEffectivePermissions(user.role, userPermissionsMap(user));
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    isActive: user.isActive,
    pagePermissions: permissions,
  };
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

export function requireSuperAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const user = req.user;
  if (!user || !isSuperAdmin(user.role)) {
    return fail(res, 403, "FORBIDDEN", "Super admin access required");
  }
  next();
}

export function requireModuleAccess(
  moduleId: string,
  minLevel: AccessLevel = "view",
) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return fail(res, 401, "UNAUTHORIZED", "Authentication required");

    const perms = userPermissionsMap(user);
    if (!hasModuleAccess(user.role, perms, moduleId, minLevel)) {
      return fail(res, 403, "FORBIDDEN", "You do not have access to this section");
    }
    next();
  };
}

export function requireModuleWrite(moduleId: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return fail(res, 401, "UNAUTHORIZED", "Authentication required");

    const perms = userPermissionsMap(user);
    if (!canWriteModule(user.role, perms, moduleId)) {
      return fail(res, 403, "FORBIDDEN", "You do not have edit access to this section");
    }
    next();
  };
}

export function requireModuleFull(moduleId: string) {
  return requireModuleAccess(moduleId, "full");
}

export function requireAnyModuleAccess(
  moduleIds: string[],
  minLevel: AccessLevel = "view",
) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return fail(res, 401, "UNAUTHORIZED", "Authentication required");

    const perms = userPermissionsMap(user);
    if (!hasAnyModuleAccess(user.role, perms, moduleIds, minLevel)) {
      return fail(res, 403, "FORBIDDEN", "You do not have access to this section");
    }
    next();
  };
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
