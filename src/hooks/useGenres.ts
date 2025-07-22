import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useGenres() {
  const { data, isLoading } = useSWR("/api/genres", fetcher);
  return { genres: data?.genres || [], isLoading };
}
