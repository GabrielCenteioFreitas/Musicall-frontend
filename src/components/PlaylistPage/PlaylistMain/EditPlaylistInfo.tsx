'use client'

import { Button } from "@/components/ui/button";
import { LuPencil } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormEvent, useRef, useState } from "react";
import { Divider } from "@/components/Divider";
import { useRouter } from "next/navigation";
import { url } from "@/lib/api";
import Cookies from "js-cookie";
import { LoadingIcon } from "@/components/LoadingIcon";

interface EditPlaylistInfoProps {
  playlist: {
    id: string;
    name: string;
    isPublic: boolean;
  }
}

export const EditPlaylistInfo = ({ playlist }: EditPlaylistInfoProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(playlist.name)
  const [error, setError] = useState(false)

  const handleSaveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const privacy = formData.get('privacy')

    if (name?.toString().trim().length === 0) {
      setError(true)
      return
    }

    const requestBody = {
      name: name?.toString().trim(),
      isPublic: privacy === 'public',
    }

    setIsLoading(true)
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
      setIsLoading(false)
      setIsOpen(false)
      setError(false)
      setName(name?.toString().trim() || '')
      router.refresh()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <LuPencil size={20} title="Editar informações" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar playlist</DialogTitle>
        </DialogHeader>

        <Divider className="mt-3 mb-6" />

        <form className="space-y-6" onSubmit={handleSaveChanges}>
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-1.5 mb-4">
              <Label htmlFor="name" className="text-lg">
                Nome
              </Label>
              <input
                type="text"
                id="name"
                name="name"
                maxLength={45}
                required
                placeholder="Nome da playlist"
                defaultValue={playlist.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full max-w-[360px] flex items-center gap-2 py-2 px-3 text-zinc-200
                  bg-zinc-950 rounded-xl placeholder:text-zinc-600
                  outline outline-1 outline-zinc-800 hover:outline-zinc-600
                  focus:outline-2 focus:outline-zinc-600
                "
              />
              {error
                ? <span className="text-xs text-red-400">
                    O nome deve possuir no mínimo 1 caractere
                  </span>
                : null
              }
            </div>

            <div className="flex flex-col items-start gap-1.5">
              <span className="text-lg font-medium">
                Privacidade
              </span>

              <RadioGroup
                className="flex gap-4 justify-between"
                defaultValue={playlist.isPublic ? "public" : "private"}
                name="privacy"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="public"
                    id="public"
                  />
                  <Label
                    htmlFor="public"
                    className="font-normal"
                  >
                    Pública
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="private"
                    id="private"
                  />
                  <Label
                    htmlFor="private"
                    className="font-normal"
                  >
                    Privada
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        
          <DialogFooter className="">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="!w-32" disabled={isLoading}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" className="!w-32" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-1.5">
                  <LoadingIcon size={16} />
                  <span>Salvando...</span>
                </div>
              ) : (
                <span>Salvar</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
