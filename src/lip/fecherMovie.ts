export const fetcherMovie = async (url: string) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => {});
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as Error & {
      info: unknown;
      status: number;
    };
    error.info = errorInfo;
    error.status = response.status;
  }

  return response.json();
};
