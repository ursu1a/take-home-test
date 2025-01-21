import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { siteConfig as strings } from "@/config/site";

const storage = createStorage({
  driver: typeof window !== "undefined" ? localStorageDriver({}) : undefined,
});

const STORAGE_KEY = "diamonds";

/**
 * A custom hook for managing the buying funnel of diamond items.
 * It handles the state of items, user session, and provides utility functions for managing diamonds.
 *
 * @param maxCount - The maximum number of diamond items to display in the funnel.
 * @param itemPrice - The base price of a single diamond item.
 * @returns An object containing:
 *   - items: An array of numbers representing the available diamond quantities.
 *   - status: The current session status.
 *   - getItemLabel: A function to generate a label for a given number of diamonds.
 *   - saveDiamonds: A function to save the selected number of diamonds.
 *   - getDiamonds: A function to retrieve the saved number of diamonds.
 *   - clearDiamonds: A function to clear the saved diamonds data.
 */
export const useBuyingFunnel = (maxCount: number, itemPrice: number) => {
  const { status } = useSession();
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const initialItems = Array.from({ length: maxCount }, (_, i) => i + 1);

    setItems(initialItems);
  }, []);

  const getItemPrice = (num: number, itemPrice: number): number =>
    num * itemPrice;

  const getItemLabel = (num: number): string => {
    const { diamond, units } = strings.buyingFunnel;
    const price = getItemPrice(num, itemPrice);

    return `${num} ${diamond} - ${units.usd}${price}`;
  };

  const saveDiamonds = async (v: number): Promise<boolean> => {
    await storage.setItem(STORAGE_KEY, v);

    return true;
  };

  const getDiamonds = async (): Promise<string | null> => {
    const savedValue = await storage.getItem<string>(STORAGE_KEY);

    return savedValue || "";
  };

  const clearDiamonds = async (): Promise<boolean> => {
    await storage.removeItem(STORAGE_KEY);

    return true;
  };

  return {
    items,
    status,
    getItemLabel,
    saveDiamonds,
    getDiamonds,
    clearDiamonds,
  };
};
