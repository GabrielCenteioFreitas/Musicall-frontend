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
}

export const FixPlaylistButton = ({ playlist }: FixPlaylistButtonProps) => {
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
        absolute top-3 right-2 hover:scale-110
        group-hover:opacity-100 transition-all`,
        playlist.isFixed ? "opacity-100" : "opacity-0"
      )}
      onClick={handleFixPlaylistClick}
    >
      {playlist.isFixed ? (
        <BsPinAngleFill size={16} />
      ) : (
        <BsPinAngle size={16} />
      )}
    </button>
  );
}
