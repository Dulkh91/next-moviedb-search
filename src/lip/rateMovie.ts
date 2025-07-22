export const rateMovie = async (movieId: string, rating: number) => {
  const sessionId = localStorage.getItem("quest_session_id") //ឬ guest session

  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY


  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${sessionId}`,
    {
      method: "POST",
      headers: { 'Authorization': `Bearer ${TOKEN_KEY}`,
        "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating }),
    },
  );
   const data = await response.json();
   return data
};
