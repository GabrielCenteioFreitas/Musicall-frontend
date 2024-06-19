'use client'

import { Divider } from "@/components/Divider";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { handleCreatePlaylistClick } from "@/lib/handleCreatePlaylistClick";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { loginURL } from "./DefaultLayout/Header/SignIn";

interface CreatePlaylistProps {
  children: ReactNode
}

export const CreatePlaylist = ({ children }: CreatePlaylistProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('Sem título')
  const [error, setError] = useState(false)

  const handleClick = async (isOpenParam: boolean) => {
    if (!token) {
      router.push(loginURL)
      return
    }

    setIsOpen(isOpenParam)
  }

  const handleConfirmClick = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const description = formData.get('description')
    const privacy = formData.get('privacy')

    if (name?.toString().trim().length === 0) {
      setError(true)
      return
    }

    const newPlaylist = {
      name: name?.toString().trim() || 'Sem título',
      description: description?.toString().trim() || null,
      isPublic: privacy === 'public',
    }

    setIsLoading(true)

    await handleCreatePlaylistClick({
      token: token as string,
      playlist: newPlaylist
    }).then(data => {
      setIsLoading(false)
      setIsOpen(false)
      setError(false)
      setName('Sem título')

      router.push(`/playlists/${data.id}`)
      router.refresh()

      toast.success(
        "Playlist criada com sucesso!",
        {
          autoClose: 2500,
        }
      ) 
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClick}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar playlist</DialogTitle>
        </DialogHeader>

        <Divider className="mt-3 mb-6" />

        <form className="space-y-6" onSubmit={handleConfirmClick}>
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
                defaultValue="Sem título"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full max-w-[360px] text-zinc-200 py-2 px-3
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

            <div className="flex flex-col items-start gap-1.5 mb-4">
              <Label htmlFor="description" className="text-lg">
                Descrição
              </Label>
              <textarea
                id="description"
                name="description"
                maxLength={150}
                placeholder="Descrição da playlist"
                defaultValue=""
                className="
                  w-full !h-32 text-zinc-200 py-2 px-3 text-start resize-none
                  bg-zinc-950 rounded-xl placeholder:text-zinc-600
                  outline outline-1 outline-zinc-800 hover:outline-zinc-600
                  focus:outline-2 focus:outline-zinc-600
                "
              />
            </div>

            <div className="flex flex-col items-start gap-1.5">
              <span className="text-lg font-medium">
                Privacidade
              </span>

              <RadioGroup
                className="flex gap-4 justify-between"
                defaultValue="public"
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
                  <span>Criando...</span>
                </div>
              ) : (
                <span>Criar</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
