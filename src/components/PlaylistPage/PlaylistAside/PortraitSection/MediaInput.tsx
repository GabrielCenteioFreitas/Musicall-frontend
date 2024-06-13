'use client'

import { LoadingIcon } from "@/components/LoadingIcon";
import { url } from "@/lib/api";
import { getUserFromClient } from "@/lib/getUserFromClient";
import { uploadImage } from "@/lib/uploadImage";
import { Playlist } from "@/types/playlist";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { toast } from "react-toastify";

interface MediaInputProps {
  playlist: {
    id: string;
  };
  isUserTheCreator: boolean;
}

export const MediaInput = ({ playlist, isUserTheCreator }: MediaInputProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    setIsLoading(true)

    const portraitURL = await uploadImage(files[0])

    const requestBody = {
      portrait: portraitURL,
    }

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
  
        setTimeout(() => {
          setIsLoading(false)
        }, 2500)
      }
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro!')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isUserTheCreator) {
    return null
  }

  return (
    <>
      {!isLoading ? (
        <>
          <label
            htmlFor="media"
            className="
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer
              absolute inset-0 bg-black/90 flex flex-col gap-3 items-center justify-center
            "
          >
            <IoCameraOutline size={128} />
            <span className="text-2xl font-semibold">
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
        <div
          className="absolute inset-0 bg-black/90 flex items-center justify-center"
        >
          <LoadingIcon size={128} />
        </div>
      )}
    </>
  );
}
