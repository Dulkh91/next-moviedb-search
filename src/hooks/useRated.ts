import useSWR from "swr";
import { fetcherMovie } from "@/lip/fecherMovie";

export const useRated = (guestSessionId: string | null, page: number) => {
  const URL = guestSessionId
    ? `/api/rated?guest_session_id=${guestSessionId}&page=${page}`
    : null;

  const { data, isLoading, error, mutate } = useSWR(URL, fetcherMovie, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 3000,
  });

  // success
  return {
    ratedData: data || null,
    isLoading: isLoading,
    error: error,
    mutate,
  };
};
