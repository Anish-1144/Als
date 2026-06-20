import type { Response } from "express";

export function ok<T>(res: Response, data: T, meta?: Record<string, unknown>) {
  return res.json({ success: true, data, ...(meta ? { meta } : {}) });
}

export function fail(
  res: Response,
  status: number,
  code: string,
  message: string,
) {
  return res.status(status).json({
    success: false,
    error: { code, message },
  });
}
