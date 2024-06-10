'use client'

import { Button } from "@/components/ui/button";
import { handleCreatePlaylistClick } from "@/lib/handleCreatePlaylistClick";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { loginURL } from "../../Header/SignIn";

interface CreatePlaylistItemProps {
  className?: string;
}

export const CreatePlaylistItem = ({ className }: CreatePlaylistItemProps) => {
  const token = Cookies.get('token')
  const router = useRouter()

  const handleClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }

    const data = await handleCreatePlaylistClick(token)
    router.push(`/playlists/${data.id}`)
    router.refresh()
  }

  return (
    <li className="w-full">
      <Button
        variant="ghost"
        className={`
          h-fit flex justify-start items-center rounded-lg gap-2 p-2 w-full
          bg-transparent hover:!bg-zinc-900
        `}
        onClick={handleClick}
      >
        <div className="shrink-0 size-12 rounded-lg overflow-hidden">
          <div
            className={cn("size-full aspect-square bg-zinc-600 grid place-content-center", className)}
          >
            <FaPlus size={28} className={"text-zinc-300"} />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-left max-w-44">
          <span className="text-base font-medium">
            Criar nova playlist
          </span>
        </div>
      </Button>
    </li>
  );
}
