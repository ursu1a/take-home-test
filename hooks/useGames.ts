import { useState } from "react";

import { IGame } from "@/types";
import { siteConfig as strings } from "@/config/site";

/**
 * A custom hook for managing and loading games.
 *
 * This hook provides functionality to load games, manage loading state,
 * handle errors, and paginate through game data.
 *
 * @param initialGames - An array of Game objects to initialize the games state.
 * @returns An object containing:
 *   - games: The current array of Game objects.
 *   - loading: A boolean indicating whether games are currently being loaded.
 *   - error: A string containing any error message, or null if no error.
 *   - loadGames: An async function to load more games.
 */
export const useGames = (initialGames: IGame[]) => {
  const [games, setGames] = useState<IGame[]>(initialGames);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialGames ? 2 : 1);

  const loadGames = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/games?page=${page}`);
      const newGames = await res.json();

      setGames((prevGames) => [...prevGames, ...newGames]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(`${strings.games.failed_games_error}: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { games, loading, error, loadGames };
};
