import useSWR from "swr";

const fetcher = ([url, token]: [string, string]) =>
  fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => res.json());

export const useRated = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const GUEST_SESSION_ID = localStorage.getItem("quest_session_id");

  const URL = `${BASE_URL}/guest_session/${GUEST_SESSION_ID}/rated/movies`;

  const { data, isLoading } = useSWR([URL, TOKEN_KEY], fetcher);

  return { ratedData: data?.results || [], isLoading };
};
