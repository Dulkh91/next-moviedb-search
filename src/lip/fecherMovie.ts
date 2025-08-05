export const fetcherMovie = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch: ${response.statusText} (${response.status})`,
      };
    }

    return response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch",
    };
  }
};
