import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  // Detect url from browser
  const acceptHeader = req.headers.get("accept");
  const isHtmlRequest = acceptHeader?.includes("text/html");

  // ⛔ Block access via browser
  if (isHtmlRequest) {
    return NextResponse.redirect(new URL("/", req.url)); // Or
    // return new NextResponse("Not found", { status: 404 });
  }

  // Access API by code
  const clientApiKey = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const apiKey = process.env.API_KEY;
  const token = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  

  if (!clientApiKey || !apiKey || !token) {
    return NextResponse.json({ error: "Resource not found" }, { status: 500 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000); // 5 seconds

  // Get variable url
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  const type =
    searchParams.get("type") === "search" &&
    query.toLowerCase().trim().length > 0
      ? "search"
      : "discover";

  try {
    // get base url
    let url = `${clientApiKey}/${type}/movie?`;

    // Logical url change
    if (type === "search") {
      url += `query=${encodeURIComponent(query)}&page=${page}&api_key=${apiKey}`;
    }
    url += `page=${page}&api_key=${apiKey}`;

    const response = await fetch(`${url}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "API Response Error",
          status: response.status,
          message: "Failed to fetch data from server.",
        },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    clearTimeout(timeout);
    const isAbort = error.name === "AbortError";
    return NextResponse.json(
      {
        error: isAbort ? "Timeout Error" : "Request Failed",
        details: error.message,
      },
      { status: 500 },
    );
  }
};
