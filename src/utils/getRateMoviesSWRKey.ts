export function getRateMoviesSWRKey() {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const guestSessionId =
    typeof window !== "undefined"
      ? localStorage.getItem("guest_session_id")
      : null;
  const URL =
    guestSessionId && BASE_URL
      ? `${BASE_URL}/guest_session/${guestSessionId}/rated/movies`
      : null;

  return URL && TOKEN_KEY ? [URL, TOKEN_KEY] : null;
}
