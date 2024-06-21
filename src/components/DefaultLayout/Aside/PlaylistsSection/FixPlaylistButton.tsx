'use client'

import { url } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

interface FixPlaylistButtonProps {
  playlist: {
    id: string;
    name: string;
    isFixed: boolean;
  };
  className: string;
}

export const FixPlaylistButton = ({ playlist, className }: FixPlaylistButtonProps) => {
  const router = useRouter();
  const token = Cookies.get('token')

  const handleFixPlaylistClick = async () => {
    const requestBody = {
      isFixed: !playlist.isFixed,
      fixedAt: !playlist.isFixed ? new Date() : null,
    }

    try {
      const response = await fetch(
        url(`/playlists/${playlist.id}`),
        {
          method: 'PUT',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()

      if (!data.playlist) {
        throw new Error()
      } else {
        router.refresh()

        const toastText = playlist.isFixed
          ? "Playlist desfixada com sucesso!"
          : "Playlist fixada com sucesso!"

        toast.success(
          toastText,
          {
            autoClose: 2500,
          }
        ) 
      }
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro!')
    }
  }

  return (
    <Button
      onClick={handleFixPlaylistClick}
      title="Fixar playlist"
      variant="none"
      size="none"
      className={cn(`
        hover:scale-110 group-hover:opacity-100 transition-all`,
        playlist.isFixed ? "opacity-100" : "opacity-0 p-1 bg-black rounded-full",
        className
      )}
      aria-label={`Fixar playlist ${playlist.name}`}
    >
      {playlist.isFixed ? (
        <BsPinAngleFill size={16} className="drop-shadow-border" />
      ) : (
        <BsPinAngle size={16} className="drop-shadow-border" />
      )}
    </Button>
  );
}
