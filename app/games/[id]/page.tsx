import { GameDetails } from "@/components/features/games/GameDetails";
import { siteConfig as strings } from "@/config/site";
import { fetchGameDetails } from "@/lib/rawgApi";

interface GameDetailsProps {
  params: { id: string };
}

export default async function GameDetailsPage({ params }: GameDetailsProps) {
  const { id } = params;
  try {
    const game = await fetchGameDetails(Number(id));

    return <GameDetails game={game} />;
  } catch (err) {
    return <p>{strings.games.details.failed_game_details}</p>;
  }
}
