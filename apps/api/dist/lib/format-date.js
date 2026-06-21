"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDisplayDate = formatDisplayDate;
/** Fixed-locale date formatting — avoids SSR/client hydration mismatches. */
function formatDisplayDate(dateStr) {
    if (!dateStr)
        return "";
    const iso = dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00.000Z`;
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return dateStr;
    return d.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}
