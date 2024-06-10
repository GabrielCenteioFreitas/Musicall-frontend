"use client"

import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
import { LoadingIcon } from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { handleCreatePlaylistClick } from "@/lib/handleCreatePlaylistClick";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface CreatePlaylistCardProps {
  className?: string;
}

export const CreatePlaylistCard = ({ className }: CreatePlaylistCardProps) => {
  const token = Cookies.get('token')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }

    setIsLoading(true)
    const data = await handleCreatePlaylistClick(token)
    
    router.push(`/playlists/${data.id}`)
    router.refresh()
    
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <Button
      variant="ghost"
      className={cn("h-fit p-3 flex gap-3 items-center shrink-0 rounded-md transition-colors", className)}
      onClick={handleClick}
    >
      <div
        className={cn("shrink-0 size-44 aspect-square bg-zinc-600 grid place-content-center rounded-2xl", className)}
      >
        {!isLoading ? (
          <FaPlus size={120} className="text-zinc-300" />
        ) : (
          <LoadingIcon size={120} className="text-zinc-300" />
        )}
      </div>

      <div className="flex flex-col gap-2.5 text-left max-w-full">
        <span className="text-2xl font-medium leading-snug">
          Crie sua primeira playlist!
        </span>
      </div>
    </Button>
  );
}
