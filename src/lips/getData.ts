export const getData = async ()=>{
    const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_WEB_URL
    const apiKey = process.env.API_KEY
    const token = process.env.TOKEN_KEY
   
      if (!clientApiKey || !apiKey || !token) {
        console.error("Missing environment variables for client-side fetch.");
        return null;
    }

   try {
     const res = await fetch(`${clientApiKey}${apiKey}`,{
        headers:{'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    },)
    if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const datas = await res.json()
    return datas
   } catch (error) {
        console.error("Failed to fetch data:", error);
        return null;
   }
}