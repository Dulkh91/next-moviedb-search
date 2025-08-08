export const fetcherMovie = async (url: string) => {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  
  const data = response.json()

  if (!response.ok) {
    const errorInfo = await response.json().catch(() => {});
    const error = new Error(errorInfo || response.statusText
    ) as Error & {
      info: unknown;
      status: number;
    };
    error.info = errorInfo;
    error.status = response.status;
  }

  return data;
};
