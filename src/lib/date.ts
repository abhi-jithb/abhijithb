// Format date into a human-readable string (e.g. "June 28, 2026")
export function formatDate(dateVal: string | Date): string {
  try {
    const d = typeof dateVal === "string" ? new Date(dateVal) : dateVal;
    if (isNaN(d.getTime())) {
      return String(dateVal);
    }
    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch (e) {
    return String(dateVal);
  }
}
