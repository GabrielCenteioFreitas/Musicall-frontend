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
import { url } from "@/lib/api";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { toast } from "react-toastify";

interface EditUserInfoProps {
  user: {
    name: string;
  };
  id: string;
  className?: string;
  size?: number
}

export const EditUserInfo = ({ user, id, className, size=22 }: EditUserInfoProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState(user.name)
  const [error, setError] = useState(false)

  const handleSaveChanges = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')

    if (name?.toString().trim().length === 0) {
      setError(true)
      return
    }

    const requestBody = {
      name: name?.toString().trim(),
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        url(`/users/${id}`),
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

      if (!data.token) {
        throw new Error()
      } else {
        Cookies.set('token', data.token)
        router.refresh()
      }
    } catch (error) {
      console.error(error)
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
      <DialogTrigger className="h-fit">
        <LuPencil
          size={size}
          title="Editar informações do usuário"
          className={cn("text-zinc-400 hover:text-zinc-50 transition-all", className)}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>

        <Divider className="mt-3 mb-6" />

        <form className="space-y-6" onSubmit={handleSaveChanges}>
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
              placeholder="Nome"
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
