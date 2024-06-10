import { url } from "./api"
import { getUserFromClient } from "./getUserFromClient"

export const handleCreatePlaylistClick = async (token: string) => {
  const user = getUserFromClient()
  
  const response = await fetch(
    url('/playlists'), 
    {
      method: 'POST',
      body: JSON.stringify({
        userId: user?.sub,
        name: "Sem título",
        isPublic: true,
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