'use client'

import { LoadingIcon } from "@/components/LoadingIcon";
import { url } from "@/lib/api";
import { uploadImage } from "@/lib/uploadImage";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface MediaInputProps {
  user: {
    id: string;
  };
}

export const MediaInput = ({ user }: MediaInputProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    setIsLoading(true)

    let portraitURL = ''
    try {
      const response = await uploadImage(files[0])
      if (!response) {
        throw new Error()
      }
      portraitURL = response
    } catch {
      toast.error('Ocorreu um erro!')
      return
    } finally {
      setIsLoading(false)
    }

    const requestBody = {
      avatarUrl: portraitURL,
    }

    try {
      const response = await fetch(
        url(`/users/${user.id}`),
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
        toast.success(
          'Foto atualizada com sucesso!',
          {
            autoClose: 2500,
          }
        )
        Cookies.set('token', data.token)
        router.refresh()
  
        setTimeout(() => {
          setIsLoading(false)
        }, 2500)
      }
    } catch (error) {
      console.error('Error updating user avatar:', error)
      toast.error('Ocorreu um erro!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          <label
            htmlFor="media"
            className="
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer
              absolute inset-0 bg-black/90 flex flex-col items-center justify-center
              rounded-lg
            "
          >
            <IoCameraOutline size={100} />
            <span className="text-xl font-semibold">
              Escolher foto
            </span>
          </label>

          <input
            onChange={onFileSelected}
            name="media"
            type="file"
            id="media"
            accept="image/*"
            className="invisible size-0"
          />
        </>
      ) : (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
          <LoadingIcon size={100} />
        </div>
      )}
    </>
  );
}
