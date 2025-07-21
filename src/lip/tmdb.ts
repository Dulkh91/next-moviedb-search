export const rateMovie = async (movieId:string, rating:number) => {
  const sessionId = localStorage.getItem("tmdb_session_id") || '22c14cc00990e43207dddd77fbbe488c'  // ឬ guest session
 
  const BASEURL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const USER_API_KEY = process.env.API_KEY;
//   const token = process.env.TOKEN_KEY; 
  
  const response = await fetch(
    `${BASEURL}/movie/${movieId}/rating?api_key=${USER_API_KEY}&session_id=${sessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating }),
    }
  );
  return await response.json();
};