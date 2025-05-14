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

export const getAccountAge = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months`;
  } else {
    return `${Math.floor(diffDays / 365)} years`;
  }
};
