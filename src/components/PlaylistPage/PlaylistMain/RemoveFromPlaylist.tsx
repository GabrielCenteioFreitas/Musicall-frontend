'use client'

import { LoadingIcon } from "@/components/LoadingIcon";
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
      await fetch(
        url(`/playlists/${playlist.id}/songs`),
        {
          method: 'DELETE',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      ).then(() => {
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
      })
    } catch(error) {
      console.error(error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleRemoveFromPlaylistClick}
      title="Remover música da playlist"
    >
      {!isLoading ? (
        <IoTrashOutline
          size={20}
          className="text-zinc-400 hover:scale-110 transition-all cursor-pointer"
        />
      ) : (
        <LoadingIcon
          size={18}
          className="text-zinc-400"
        />
      )}
    </button>
  );
}
