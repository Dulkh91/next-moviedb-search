
import { NextResponse } from "next/server"
export const GET = async ()=>{

    const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_WEB_URL
    const apiKey = process.env.API_KEY
    const token = process.env.TOKEN_KEY

    if(!clientApiKey || !apiKey || !token){
        return NextResponse.json({'error': "Resource not found"},{status: 500})
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds

try {
  const response = await fetch(`${clientApiKey}${apiKey}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    signal: controller.signal
  });
  clearTimeout(timeout);

  if (!response.ok) {
    return NextResponse.json({ 
      error: "API Response Error", 
      status: response.status,
      message: "Failed to fetch data from server." 
    }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);

} catch (err: unknown) {
    const error = err as Error
  clearTimeout(timeout);
  const isAbort = error.name === 'AbortError';
  return NextResponse.json({ 
    error: isAbort ? "Timeout Error" : "Request Failed", 
    details: error.message 
  }, { status: 500 });
}



}