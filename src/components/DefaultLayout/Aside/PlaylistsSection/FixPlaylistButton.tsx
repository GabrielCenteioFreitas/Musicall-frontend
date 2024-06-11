'use client'

import { url } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { BsPinAngle, BsPinAngleFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

interface FixPlaylistButtonProps {
  playlist: {
    id: string;
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

    await fetch(
      url(`/playlists/${playlist.id}`),
      {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(() => {
      router.refresh()
      toast.success(
        "Playlist fixada com sucesso!",
        {
          autoClose: 2500,
        }
      ) 
    })
  }

  return (
    <button
      className={cn(`
        hover:scale-110 group-hover:opacity-100 transition-all`,
        playlist.isFixed ? "opacity-100" : "opacity-0",
        className
      )}
      onClick={handleFixPlaylistClick}
      title="Fixar playlist"
    >
      {playlist.isFixed ? (
        <BsPinAngleFill size={16} className="drop-shadow-border" />
      ) : (
        <BsPinAngle size={16} className="drop-shadow-border" />
      )}
    </button>
  );
}
