"use client";
import { useState, useEffect } from "react";
import { Rate } from "antd";
import { useRated } from "@/hooks/useRated";
import { Movie } from "@/types/movie";
import { useSubmitMovieRating } from "@/hooks/useRatingMovie";
import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";
import { MovieApiResponse } from "@/types/MovieApiResponse";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

type Props = {
  movieId: string;
  onSuccess?: (success: boolean) => void;
};

const VoteStar = ({ movieId, onSuccess }: Props) => {
  
  const [rating, setRating] = useState<number>(0);
  const { submitRating, isSubmitting } = useSubmitMovieRating();
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") || "1")

  const {mutate} = useSWR(guestSessionId || page ?getRateMoviesSWRKey(guestSessionId,page):null)
  const { ratedData, isLoading } = useRated(Number(page));

  useEffect(() => {
    if (!movieId) return; // ប្រសិនបើ movieId មិនមានទេ កុំធ្វើអ្វី

    if (typeof ratedData !== "undefined" && !isLoading && ratedData.results) {
      const found = ratedData.results.find(
        (m: Movie) => String(m.id) === String(movieId)
      );
      if (found) {
        setRating(found.rating);
      }
    }
  }, [ratedData, isLoading, movieId]);

  const handleRate = async (value: number) => {
    try {
      let sessionId = guestSessionId;

      if (!sessionId && typeof window !== "undefined") {
        sessionId = localStorage.getItem("guest_session_id");

        if (sessionId) {
          setGuestSessionId(sessionId);
        }
      }

      if (!sessionId) {
        return;
      }

      if (value === 0) return;

      const results = await submitRating({
        movieId,
        rating: value,
        guestSession: sessionId,
      });

      if (!results.success) {
        onSuccess?.(false);
      } else {
        onSuccess?.(true);
         setRating(value);

        mutate((currentData: MovieApiResponse | undefined) => {
            if (!currentData) return currentData;

            return {
              ...currentData,
              results: currentData.results.map((movie) =>
                String(movie.id) === movieId ? { ...movie, rating: value } : movie
              ),
            };
          },
          false
        );

      }


    } catch (error) {
      console.error("Failed to rate:", error);
      onSuccess?.(false);
    }
  };

  return (
    <Rate
      count={10}
      allowHalf
      value={rating}
      style={{ fontSize: 18 }}
      className={`flex flex-row custom-rate `}
      onChange={handleRate}
      disabled={isSubmitting}
    />
  );
};

export default VoteStar;
