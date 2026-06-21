/** Fixed-locale date formatting — avoids SSR/client hydration mismatches. */
export function formatDisplayDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "";
  const iso = dateStr.includes("T") ? dateStr : `${dateStr}T00:00:00.000Z`;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
