export const fetcherMovie = async (url:string) => {

  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
  });
  if(!response.ok){
    throw new Error(`Failed to fetch: ${response.statusText} (${response.status})`);
  }

  return response.json()

};