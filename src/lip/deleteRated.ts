import { mutate } from "swr";
import { getRateMoviesSWRKey } from "@/utils/getRateMoviesSWRKey";

export const deleteRating = async (movieId: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const guestSession = localStorage.getItem("guest_session_id");

  const URL = `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSession}`;

  const option = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(URL, option);

    if (!response.ok) {
      throw new Error(`Failed to delete rating: ${response.status}`);
    }

    const data = await response.json();

    mutate(getRateMoviesSWRKey);

    // ឬ ✅ ២. Revalidate រាល់ទិន្នន័យដែលពាក់ព័ន្ធនឹង guestSession
    // mutate((key) => key.includes(`guest_session_id=${guestSession}`));

    return { success: true, data };
  } catch (error) {
    console.error("Error deleting rating:", error);
    throw new Error("Failed to delete rating");
  }
};
