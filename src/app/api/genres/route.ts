import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Detect url from browser
  const acceptHeader = req.headers.get("accept");
  const isHtmlRequest = acceptHeader?.includes("text/html");

  // ⛔ Block access via browser
  if (isHtmlRequest) {
    return new NextResponse("Not found", { status: 404 });
  }

  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY}`,
      },
    },
  );

  const data = await res.json();

  return NextResponse.json(data);
}
