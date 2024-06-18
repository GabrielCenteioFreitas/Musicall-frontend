import { DBSong } from "@/types/song"
import { url } from "./api"
import { cache } from "react";

interface GetSongsByGenreProps {
  genre: string;
  limit?: number;
}

export const getSongsByGenre = (cache(async ({ genre, limit }: GetSongsByGenreProps): Promise<DBSong[]> => {
  let fetchURL = url(`/songs/${genre}`);
  if (limit) {
    fetchURL += `?limit=${limit}`;
  }

  const response = await fetch(
    fetchURL,
    {
      method: 'GET'
    }
  )
  const data = await response.json()

  return data.songs || []
}))