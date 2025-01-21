import { NextResponse } from "next/server";

import { fetchGames } from "@/lib/rawgApi";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  try {
    const games = await fetchGames(Number(page));

    return NextResponse.json(games);
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to fetch games: ${err}` },
      { status: 500 },
    );
  }
}
