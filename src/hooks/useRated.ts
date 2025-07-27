import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = ([url, token]: [string, string]) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

export const useRated = (page?: number) => {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  const pageRate = page || 1;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const guestId = localStorage.getItem("guest_session_id");
      if (guestId) {
        setGuestSessionId(guestId);
      }
    }
  }, []);

  const URL =
    guestSessionId && BASE_URL
      ? `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?page=${pageRate}`
      : null;

  const { data, isLoading } = useSWR(
    URL && TOKEN_KEY ? [URL, TOKEN_KEY] : null,
    fetcher,
  );
  // Handle loading and error states
  if (!URL || !TOKEN_KEY) return { ratedData: [], isLoading: true };
  if (isLoading || !data) return { ratedData: [], isLoading: true };

  return { ratedData: data || [], ratePage: data.total_results, isLoading };
};
