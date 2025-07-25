'use client'

import { LoadingIcon } from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { url } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface RemoveFromPlaylistProps {
  playlist: {
    name: string;
    id: string;
  };
  songId: string;
}

export const RemoveFromPlaylist = ({ playlist, songId }: RemoveFromPlaylistProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleRemoveFromPlaylistClick = async () => {
    setIsLoading(true)
    const requestBody = {
      songToRemove: {
        id: songId
      }
    }

    try {
      const response = await fetch(
        url(`/playlists/${playlist.id}/songs`),
        {
          method: 'DELETE',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()

      if (!data.removedSong) {
        throw new Error()
      } else {
        toast.success(
          (
            <div className="max-w-full relative">
              Música removida da playlist<br/>
              <span className="font-bold truncate ...">
                {playlist.name}
              </span>
            </div>
          ),
          {
            autoClose: 2500,
          }
        ) 
        router.refresh()
      }
    } catch(error) {
      console.error('Error removing song from playlist:', error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleRemoveFromPlaylistClick}
      variant="none"
      size="none"
      aria-label="Remover música da playlist"
    >
      {!isLoading ? (
        <IoTrashOutline
          size={20}
          title="Remover música da playlist"
          className="text-zinc-400 hover:scale-110 transition-all cursor-pointer"
        />
      ) : (
        <LoadingIcon
          size={18}
          className="text-zinc-400"
        />
      )}
    </Button>
  );
}
