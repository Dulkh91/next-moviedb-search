import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ movieId: string }> }
) {
  

  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const API_KEY = process.env.API_KEY;
  const { movieId } = await context.params;

  if (!BASE_URL || !TOKEN || !API_KEY) {
    throw new Error("Missing required environment variables");
  }
  const body = await req.json();
  const guestSession = body.guest_session_id;
  console.log("route:::",movieId);
  if (!guestSession) {
    return NextResponse.json(
      { error: "guest_session_id: not found!" },
      { status: 400 }
    );
  }
  if (!TOKEN || !BASE_URL) {
    return NextResponse.json(
      { error: "No Token or base url found" },
      { status: 400 }
    );
  }
  if (!API_KEY) {
    return NextResponse.json({ error: "No api key found!" });
  }
  if (!movieId) {
    return NextResponse.json(
      { error: "The id movie request" },
      { status: 400 }
    );
  }

  const URL = `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSession}`;

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    const response = await fetch(URL, options);
    let data;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Rated delete failed",
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      ratingResponse: data,
    });
  } catch (error) {
    console.error("Delete rated failed", error);
    return NextResponse.json(
      { error: "Failed to delete rated" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ movieId: string }> }
) {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const API_KEY = process.env.API_KEY;
  const guestSession = req.nextUrl.searchParams.get("guest_session_id");
  const body = await req.json();
  const valueRate = body.value;

  if (!BASE_URL || !TOKEN || !API_KEY) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 400 }
    );
  }
  const { movieId } = await context.params;
  if (!movieId) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );
  }
  if (!guestSession) {
    return NextResponse.json(
      { error: "guest_session_id is required" },
      { status: 400 }
    );
  }
  if (valueRate < 0.5 || valueRate > 10 || valueRate % 0.5 !== 0) {
    return NextResponse.json(
      { error: "Rating must be between 0.5 and 10 (step 0.5)" },
      { status: 400 }
    );
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds

  //api_key=${API_KEY}&
  const endpointUrl = `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSession}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8'",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ value: valueRate }), // Assuming you want to set a default rating value
    signal: controller.signal,
  };

  try {
    const response = await fetch(endpointUrl, options);
    clearTimeout(timeout);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to create rating", details: data },
        { status: response.status }
      );
    }
    console.log(data);
    return NextResponse.json({
      success: true,
      ratingResponse: data,
    });
  } catch (error) {
    console.error("Failed to create rating", error);
    return NextResponse.json(
      { error: "Failed to create rating" },
      { status: 500 }
    );
  }
}
