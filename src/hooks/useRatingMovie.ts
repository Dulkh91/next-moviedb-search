import useSWRMutation from "swr/mutation";

interface SubmitMovieRatingArgs {
  movieId: string; // Assuming movieId is a string for consistency with most APIs
  guestSession: string;
  rating: number;
}

const fetcher = async (
  url: string,
  { arg }: { arg: SubmitMovieRatingArgs },
) => {
  const { movieId, guestSession, rating } = arg;

  // Validate inputs
  if (!guestSession) {
    throw new Error("Guest session ID is required.");
  }
  if (!movieId) {
    throw new Error("Movie ID is required.");
  }
  if (rating == null || isNaN(rating)) {
    throw new Error("Valid rating is required.");
  }

  try {
    const endpointUrl = `${url}/${movieId}?guest_session_id=${guestSession}`;

    const option = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ value: rating }),
    };

    const response = await fetch(endpointUrl, option)!;

    if (!response.ok) {
      const errorData = await response.json().catch(() => {});
      return {
        success: false,
        error: errorData.status_message || `Failed to rate: ${response.status}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Rate movie error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export function useSubmitMovieRating() {
  const { trigger, isMutating } = useSWRMutation(`api/rated/`, fetcher, {
    populateCache: false,
    revalidate: true,
  });

  return {
    submitRating: trigger,
    isSubmitting: isMutating,
  };
}
