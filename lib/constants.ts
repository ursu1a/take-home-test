export const RAWG_BASE_URL = "https://api.rawg.io/api";

export const DEFAULT_PAGE_SIZE = 24;

export const API_ROUTES = {
  GAMES: "/games",
  GAME_DETAILS: (id: number) => `/games/${id}`,
};
