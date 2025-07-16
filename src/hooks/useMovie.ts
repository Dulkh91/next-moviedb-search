import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch movie data");
  return res.json();
};

export const useMovie = () => {
  return useSWR("/api/movie", fetcher, {
    revalidateOnFocus: false,
  });
};