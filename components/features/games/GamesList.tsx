"use client";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";

import { GameItem } from "./GameItem";

import { title } from "@/components/shared/primitives";
import { useGames } from "@/hooks/useGames";
import { siteConfig as strings } from "@/config/site";
import { IGame } from "@/types";

interface GamesListProps {
  initialGames: IGame[];
}

export const GamesList = ({ initialGames }: GamesListProps) => {
  const { games, loading, error, loadGames } = useGames(initialGames ?? []);

  return (
    <div className="flex flex-col items-stretch gap-y-5">
      <h1 className={title({ size: "md", className: "font-semibold" })}>
        {strings.games.games_list}
      </h1>
      {games ? (
        <div className="grid lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <div key={`games-list-${game.id}`}>
              <GameItem game={game} />
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>{strings.games.no_games}</p>
      )}
      <div className="flex flex-col items-center">
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full lg:max-w-sm lg:px-3">
            <Button
              fullWidth
              isDisabled={loading}
              radius="sm"
              onPress={loadGames}
            >
              {strings.games.load_more}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
