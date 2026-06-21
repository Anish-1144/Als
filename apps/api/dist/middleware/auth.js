import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";
import { fail } from "../utils/response.js";
function getToken(req) {
    const header = req.headers.authorization;
    if (header?.startsWith("Bearer "))
        return header.slice(7);
    return req.cookies?.token;
}
export async function requireAuth(req, res, next) {
    try {
        const token = getToken(req);
        if (!token)
            return fail(res, 401, "UNAUTHORIZED", "Authentication required");
        const payload = jwt.verify(token, env.jwtSecret);
        const user = await User.findById(payload.sub);
        if (!user || !user.isActive) {
            return fail(res, 401, "UNAUTHORIZED", "Invalid or inactive user");
        }
        req.user = user;
        next();
    }
    catch {
        return fail(res, 401, "UNAUTHORIZED", "Invalid token");
    }
}
export function signToken(user) {
    return jwt.sign({ email: user.email, role: user.role }, env.jwtSecret, { subject: user.id, expiresIn: env.jwtExpiresIn });
}
export function setAuthCookie(res, token) {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
    });
}
export function clearAuthCookie(res) {
    res.clearCookie("token", { path: "/" });
}
