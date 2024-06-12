import { cache } from "react";
import { url } from "./api";
import { Favorites } from "@/types/favorites";

export const getFavorites = cache(async (
  token: string | null
): Promise<Favorites | null> => {
  try {
    const response = await fetch(
      url(`/favorites`),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json()

    return data;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    return null;
  }
})