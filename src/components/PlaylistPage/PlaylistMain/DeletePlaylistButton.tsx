'use client'

import { LoadingIcon } from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { url } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { toast } from "react-toastify";

interface DeletePlaylistButtonProps {
  playlist: {
    name: string;
    id: string;
  }
}

export const DeletePlaylistButton = ({ playlist }: DeletePlaylistButtonProps) => {
  const token = Cookies.get('token')
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const handleDeletePlaylistClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        url(`/playlists/${playlist.id}`),
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()

      if (!data.deletedPlaylist) {
        throw new Error()
      } else {
        toast.success(
          "Playlist deletada com sucesso!",
          {
            autoClose: 2500,
          }
        ) 

        router.push('/')
        router.refresh()
      }
    } catch(error) {
      console.error('Error deleting playlist:', error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsOpen(false)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <IoTrashSharp
          size={22}
          title="Deletar playlist"
          className="text-zinc-400 hover:text-zinc-50 transition-colors"
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja mesmo deletar a playlist?</DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              disabled={isLoading}
              type="button"
              variant="outline"
              className="!w-32"
              aria-label="Cancelar ação"
            >
              Cancelar
            </Button>
          </DialogClose>

          <Button
            onClick={handleDeletePlaylistClick}
            disabled={isLoading}
            variant="destructive"
            className="!w-32"
            aria-label={`Deletar playlist ${playlist.name}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-1.5">
                <LoadingIcon size={16} />
                <span>Deletando...</span>
              </div>
            ) : (
              <span>Deletar</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
