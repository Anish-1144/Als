import { fail } from "../utils/response.js";
export function errorHandler(err, _req, res, _next) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return fail(res, 500, "INTERNAL_ERROR", message);
}
