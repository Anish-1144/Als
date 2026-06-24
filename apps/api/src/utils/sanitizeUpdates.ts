/** Fields that may be cleared intentionally on update. */
const CLEARABLE_STRING_FIELDS = new Set([
  "description",
  "website",
  "subtitle",
  "message",
  "phone",
  "subject",
  "coverLetter",
  "linkedIn",
  "clientTitle",
  "loanType",
  "category",
  "alt",
  "originalName",
  "resumeFileName",
]);

/**
 * Prepares a partial update payload.
 * Skips empty strings so partial PUTs (e.g. `{ showBorder: true }`) do not wipe required fields.
 */
export function sanitizeModelUpdates(
  body: Record<string, unknown>,
): Record<string, unknown> {
  const { _id, __v, createdAt, updatedAt, id, ...rest } = body;
  const updates: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(rest)) {
    if (value === undefined) continue;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "" && !CLEARABLE_STRING_FIELDS.has(key)) continue;
      updates[key] = trimmed;
      continue;
    }

    updates[key] = value;
  }

  return updates;
}
