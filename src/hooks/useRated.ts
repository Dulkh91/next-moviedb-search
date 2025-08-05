"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherMovie } from "@/lip/fecherMovie";

export const useRated = (page: number) => {

  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionId = localStorage.getItem("guest_session_id");
      if (sessionId) {
        setGuestSessionId(sessionId);
        setIsInitialized(true)
      }
    }
  }, []);

  const URL = guestSessionId && isInitialized
    ? `/api/rated?guest_session_id=${guestSessionId}&page=${page}`
    : null;

  const { data, isLoading } = useSWR(URL, fetcherMovie, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 3000,
  });

  // Still loading guest session from localStorage
  if (!isInitialized) {
    return { 
      ratedData: null, 
      isLoading: true,
      error: null 
    };
  }

  // No guest session found
  if (!guestSessionId) {
    return { 
      ratedData: null, 
      isLoading: false,
      error: new Error("No guest session ID found") 
    };
  }

  // SWR is loading
  if (isLoading) {
    return { 
      ratedData: null, 
      isLoading: true,
      error: null 
    };
  }

// success
  return { ratedData: data || [], isLoading};
};
