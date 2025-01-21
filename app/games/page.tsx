import { GamesList } from "@/components/features/games/GamesList";
import { fetchGames } from "@/lib/rawgApi";

export default async function GamesPage() {
  const initialGames = await fetchGames();

  return <GamesList initialGames={initialGames} />;
}
