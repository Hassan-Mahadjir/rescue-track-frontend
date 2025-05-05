// Format date to readable format (e.g., "May 17, 1999")
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function formatDateOnly(input?: string | Date): string {
  if (!input) return "";
  const date = new Date(input);
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

export function formatDateTime(input?: string | Date): string {
  if (!input) return "";
  const date = new Date(input);
  return date.toISOString().slice(0, 16); // YYYY-MM-DDTHH:MM
}
