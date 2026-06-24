import type { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";
import { fail } from "../utils/response.js";

function isJsonSyntaxError(err: unknown): err is SyntaxError & { status?: number; body?: unknown } {
  return err instanceof SyntaxError && "body" in err;
}

function isMongoDuplicateKeyError(err: unknown): err is MongoServerError {
  return err instanceof MongoServerError && err.code === 11000;
}

function duplicateKeyMessage(err: MongoServerError): string {
  const key = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
  return `A record with this ${key} already exists`;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (res.headersSent) {
    console.error("Error after response was sent:", err);
    return;
  }

  if (isJsonSyntaxError(err)) {
    return fail(res, 400, "INVALID_JSON", "Request body contains invalid JSON");
  }

  if (err instanceof ZodError) {
    const message = err.issues.map((issue) => issue.message).join(" ") || "Invalid request data";
    return fail(res, 400, "VALIDATION_ERROR", message);
  }

  if (err instanceof MongooseError.ValidationError) {
    const message =
      Object.values(err.errors)
        .map((e) => e.message)
        .join(" ") || "Validation failed";
    return fail(res, 400, "VALIDATION_ERROR", message);
  }

  if (err instanceof MongooseError.CastError) {
    const label = err.path ? `Invalid ${err.path}` : "Invalid identifier";
    return fail(res, 400, "INVALID_ID", label);
  }

  if (isMongoDuplicateKeyError(err)) {
    return fail(res, 409, "DUPLICATE_KEY", duplicateKeyMessage(err));
  }

  if (err instanceof Error) {
    console.error(err.message);
    return fail(res, 500, "INTERNAL_ERROR", "Something went wrong. Please try again.");
  }

  console.error("Unknown error:", err);
  return fail(res, 500, "INTERNAL_ERROR", "Something went wrong. Please try again.");
}

/** Logs unexpected process-level failures without terminating the API process. */
export function registerProcessErrorHandlers() {
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection:", reason);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
  });
}
