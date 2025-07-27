import { NextResponse } from "next/server";

export const GET = async () => {
  const USER_API_KEY = process.env.API_KEY;

  const res = await fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${USER_API_KEY}`,
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to create guest session" },
      { status: 500 },
    );
  }

  const data = await res.json();
  console.log("Guest session created:", data);
  return NextResponse.json(data); // includes guest_session_id
};
