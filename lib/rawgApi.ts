import apiClient from "@/lib/apiClient";
import { API_ROUTES, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { IGame, IGameDetails } from "@/types";

export const fetchGames = async (
  page: number = 1,
  pageSize?: number,
): Promise<IGame[]> => {
  const response = await apiClient.get(API_ROUTES.GAMES, {
    params: { page, page_size: pageSize ?? DEFAULT_PAGE_SIZE },
  });

  return response.data.results;
};

export const fetchGameDetails = async (id: number): Promise<IGameDetails> => {
  const response = await apiClient.get(API_ROUTES.GAME_DETAILS(id));

  return response.data;
};
