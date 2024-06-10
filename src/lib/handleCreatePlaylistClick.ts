import { url } from "./api"
import { getUserFromClient } from "./getUserFromClient"

interface HandleCreatePlaylistClickProps {
  token: string;
  playlist: {
    name: string,
    description: string | null,
    isPublic: boolean,
  }
}

export const handleCreatePlaylistClick = async ({ token, playlist }: HandleCreatePlaylistClickProps) => {
  const user = getUserFromClient()
  
  const response = await fetch(
    url('/playlists'), 
    {
      method: 'POST',
      body: JSON.stringify({
        userId: user?.sub,
        name: playlist.name,
        description: playlist.description,
        isPublic: playlist.isPublic,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
  const data = await response.json()
  
  return data
}