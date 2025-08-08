import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Detect URL from browser
  const acceptHeader = req.headers.get("accept");
  const isHtmlRequest = acceptHeader?.includes("text/html");

  // ⛔ Block access via browser
  if (isHtmlRequest) {
    return NextResponse.redirect(new URL("/", req.url)); // Or
    // return new NextResponse("Not found", { status: 404 });
  }

  // Access API by code

  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const API_KEY = process.env.API_KEY;
  const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;

  const guestSession = req.nextUrl.searchParams.get("guest_session_id");
  const page = req.nextUrl.searchParams.get("page") || 1;
  if (!guestSession) {
    return NextResponse.json({ error: "No guest session id." });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "No API Key." });
  }

  const endpointUrl = BASE_URL
    ? `${BASE_URL}/guest_session/${guestSession}/rated/movies?api_key=${API_KEY}&page=${page}`
    : null;

  //  console.log("endpointUrl" ,endpointUrl); // Log the guest session ID for debugging

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  if (!endpointUrl) {
    return NextResponse.json(
      { error: "Base URL is not defined" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(endpointUrl, options);
    
     const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch rated movies", status: response.status },
        { status: response.status },
      );
    }
   
    
    if(data.results && data.results.length === 0){
      return NextResponse.json({success: true,results:[], message: "No rated movie found"}, {status:404})
    }

    return NextResponse.json(data,{status: 200});
  } catch (error) {
    console.error("Error fetching rated movies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// https://api.themoviedb.org/3/guest_session/4b47d785cf961a9600279f70e7b1eaa3/rated/movies?api_key=ac6fdc42385441f9e1bfc89bc8ec693f
