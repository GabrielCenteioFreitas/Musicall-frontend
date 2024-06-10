import { url } from "@/lib/api";
import { Playlist } from "@/types/playlist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { cache } from "react";

export const getPreviewPlaylists = cache(async (token: string | null): Promise<PreviewPlaylist[] | null> => {
  try {
    const response = await fetch(
      url('/playlists/user'),
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json()
    
    if (!data.playlists) {
      throw new Error()
    }

    const previewPlaylists = data.playlists
    return previewPlaylists;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    return null;
  }
})

export const getPlaylist = cache(async (id: string, token: string | null): Promise<Playlist | null> => {
  try {
    const response = await fetch(
      url(`/playlists/${id}`),
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

export const getPlaylists = async (): Promise<PreviewPlaylist[] | null> => {
  try {
    const response = await fetch(
      url(`/playlists`),
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    const data = await response.json()

    if (!data.playlists) {
      throw new Error()
    }

    const { playlists } = data
    return playlists;
  } catch (error) {
    console.error('Ocorreu um erro:', error);
    return null;
  }
}