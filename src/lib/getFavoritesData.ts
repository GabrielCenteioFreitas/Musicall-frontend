import { cache } from "react";
import { url } from "./api";
import { Favorites } from "@/types/favorites";

export const getFavorites = cache(async (
  token: string | null
): Promise<Favorites | null> => {
  if (!token) return null;

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
    console.error('Error fetching favorites data:', error);
    return null;
  }
})