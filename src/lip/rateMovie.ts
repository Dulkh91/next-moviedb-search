export const rateMovie = async (movieId: string, rating: number) => {
  const sessionId = localStorage.getItem("guest_session_id"); //ឬ guest session

  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;

  // Validate rating value
  if (rating < 0.5 || rating > 10 || rating % 0.5 !== 0) {
    throw new Error("Rating must be between 0.5 and 10 (step 0.5)");
  }
  if (!sessionId) {
    throw new Error("No guest_session_id found");
  }
  if (!BASE_URL || !TOKEN_KEY) {
    throw new Error("Missing BASE_URL or TOKEN_KEY");
  }

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${sessionId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: rating }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("TMDB Rate Error:", data);
      throw new Error(data.status_message || "Failed to rate movie");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
