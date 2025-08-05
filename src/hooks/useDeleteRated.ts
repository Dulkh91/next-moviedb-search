import useSWRMutation from "swr/mutation";

interface DeleteMovieRatingArgs {
  movieId: string | number; // Assuming movieId can be a string or number
  guestSession: string;
}

const fetcher = async (
  url: string,
  { arg }: { arg: DeleteMovieRatingArgs },
) => {
  const { movieId, guestSession } = arg;

  if (!guestSession) {
    throw new Error("guestSession are required for deletion.");
  }

  const cleanUrl = url.replace(/\/+$/, ""); // Remove trailing slashes
  const endpointUrl = `${cleanUrl}/${movieId}`;

  /*
  នេះអាចកាត់បញ្ហា / ជាប់ពី url ពេញ
  endpointUrl = url + "/" + movieId ស្មើ undefined/ ប្រសិនមិនផ្ញើ arg
  */
  try {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guest_session_id: guestSession }),
    };

    const response = await fetch(endpointUrl, option);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: errorData.status_message || "Failed to delete rated movie.",
      };
    }

    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error("Rate movie error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export function useDeleteRated() {
  const { trigger: deleteRate, isMutating: isDeleting } = useSWRMutation(
    `/api/rated/`,
    fetcher,
    {
      populateCache: false,
      revalidate: true,
    },
  );

  return { deleteRate, isDeleting };
}
