export async function getItem(key: string): Promise<string | boolean | null> {
  try {
    const value = localStorage.getItem(key); // Synchronous API
    if (value !== null) {
      // Try to parse as a boolean first, otherwise return as string
      const parsedValue = JSON.parse(value);
      if (typeof parsedValue === "boolean" || typeof parsedValue === "string") {
        return parsedValue;
      }
    }
    return value;
  } catch (error) {
    console.error("Error getting item from localStorage:", error);
    return null;
  }
}

export async function setItem(
  key: string,
  value: string | boolean
): Promise<void> {
  try {
    const valueToStore = JSON.stringify(value);
    localStorage.setItem(key, valueToStore); // Synchronous API
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    localStorage.removeItem(key); // Synchronous API
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
}
