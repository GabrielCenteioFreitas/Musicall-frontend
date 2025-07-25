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
import { toast } from "react-toastify";

interface EditPlaylistInfoProps {
  playlist: {
    id: string;
    name: string;
    description: string | null;
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
    const description = formData.get('description')
    const privacy = formData.get('privacy')

    if (name?.toString().trim().length === 0) {
      setError(true)
      return
    }

    const requestBody = {
      name: name?.toString().trim(),
      description: description?.toString().trim(),
      isPublic: privacy === 'public',
    }

    setIsLoading(true)
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
      }
    } catch (error) {
      console.error('Error editing playlist info:', error)
      toast.error('Ocorreu um erro!')
    } finally {
      setIsLoading(false)
      setIsOpen(false)
      setError(false)
      setName(name?.toString().trim() || '')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <LuPencil
          size={22}
          title="Editar informações da playlist"
          className="text-zinc-400 hover:text-zinc-50 transition-colors"
        />
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
                  w-full max-w-[360px] text-zinc-200 py-2 px-3
                  bg-zinc-950 rounded-xl placeholder:text-zinc-600
                  outline outline-1 outline-zinc-800 hover:outline-zinc-600
                  focus:outline-2 focus:outline-zinc-600
                "
                aria-label="Nome da playlist"
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
                defaultValue={playlist.description || ''}
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
              type="submit"
              className="!w-32"
              disabled={isLoading}
              aria-label="Salvar alterações feitas"
            >
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
