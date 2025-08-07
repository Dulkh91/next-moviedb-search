"use client";
import { useState, useEffect, useCallback } from "react";
import { Rate, Alert } from "antd";
import { useRated } from "@/hooks/useRated";
import { Movie } from "@/types/movie";
import { useSubmitMovieRating } from "@/hooks/useRatingMovie";
import { MovieApiResponse } from "@/types/MovieApiResponse";
import { useSearchParams } from "next/navigation";
import { throttle } from "lodash";
import { ApiEror } from "@/utils/customError";

type Props = {
  movieId: string;
  onSuccess?: (success: boolean) => void;
};

const VoteStar = ({ movieId, onSuccess }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const { submitRating, isSubmitting } = useSubmitMovieRating();

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || "1");

  // Initialize guest session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionId = localStorage.getItem("guest_session_id");
      if (sessionId) {
        setGuestSessionId(sessionId);
      }
    }
  }, []);

  const { ratedData, isLoading, error, mutate } = useRated(
    guestSessionId,
    Number(page),
  );

  // set existing rating if found
  useEffect(() => {
    if (!movieId) return; // ប្រសិនបើ movieId មិនមានទេ កុំធ្វើអ្វី

    if (ratedData && !isLoading && ratedData.results) {
      const found = ratedData.results.find(
        (m: Movie) => String(m.id) === String(movieId),
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
          if (!currentData || !currentData.results) return currentData;
          return {
            ...currentData,
            results: currentData.results.map((movie) =>
              String(movie.id) === movieId
                ? { ...movie, rating: value }
                : movie,
            ),
          };
        }, false);
      }
    } catch (error) {
      console.error("Failed to rate:", error);
      onSuccess?.(false);
    }
  };
  const throttledRateStar = useCallback(
    throttle(
      (value: number) => {
        handleRate(value);
      },
      1000,
      {
        loading: true, //Execute ភ្លាមនៅ call ដំបូង
        trailing: false, //មិន execute ក្រោយ delay
      },
    ),
    [guestSessionId, movieId],
  );

  useEffect(() => {
    return () => {
      throttledRateStar.cancel();
    };
  }, [throttledRateStar]);

  if (error) {
    if (error instanceof ApiEror) {
      return (
        <Alert
          message={`Error: ${error.status}`}
          description={error.message}
          type="error"
          className="text-lg"
        />
      );
    }
  }

  return (
    <Rate
      count={10}
      allowHalf
      value={rating}
      style={{ fontSize: 18 }}
      className={`flex flex-row custom-rate `}
      onChange={throttledRateStar}
      disabled={isSubmitting}
    />
  );
};

export default VoteStar;
