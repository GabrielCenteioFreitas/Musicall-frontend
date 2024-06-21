'use client'

import { url } from "@/lib/api";
import { getDataFromLookup } from "@/lib/getITunesData";
import { cn } from "@/lib/utils";
import { ITunesAlbum } from "@/types/album";
import { ITunesSong } from "@/types/song";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { toast } from "react-toastify";
import { loginURL } from "../DefaultLayout/Header/SignIn";
import { LoadingIcon } from "../LoadingIcon";
import { Button } from "../ui/button";

interface SmallFavoriteAlbumButtonProps {
  album: {
    collectionName: string;
    collectionId: number;
  }
  isFavorited: boolean;
  className?: string;
  size?: number;
}

export const SmallFavoriteAlbumButton = ({ album, isFavorited, className, size=20 }: SmallFavoriteAlbumButtonProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteAlbumClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    const { collectionId } = album
    
    const { results: albumResults } = await getDataFromLookup({
      id: collectionId
    })
    const { results: songResults, resultCount } = await getDataFromLookup({
      id: collectionId,
      entity: 'song',
      limit: 201,
      })
    const albumData: ITunesAlbum = albumResults[0]
    const songData: ITunesSong[] = songResults.slice(1, resultCount)

    const requestBody = {
      albumToBeFavorited: {
        name: albumData.collectionName,
        portrait: albumData.artworkUrl100,
        iTunesId: albumData.collectionId,
        iTunesViewUrl: albumData.collectionViewUrl,
        releaseDate: albumData.releaseDate,
        genre: albumData.primaryGenreName,
        artist: {
          name: albumData.artistName,
          iTunesId: albumData.artistId,
          iTunesViewUrl: albumData.artistViewUrl,
          genre: albumData.primaryGenreName,
        },
        songs: songData.map((song) => {
          return {
            name: song.trackName,
            portrait: song.artworkUrl100,
            iTunesId: song.trackId,
            iTunesViewUrl: song.trackViewUrl,
            previewUrl: song.previewUrl,
            releaseDate: song.releaseDate,
            durationInSeconds: song.trackTimeMillis / 1000,
            genre: song.primaryGenreName,
          }
        })
      }
    };

    try {
      const response = await fetch(
        url(`/favorites/album`),
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()

      if (!data.favoritedAlbum) {
        throw new Error()
      } else {
        toast.success(
          (
            <span>
              Álbum adicionado aos favoritos<br/>com sucesso!
            </span>
          ),
          {
            autoClose: 2500,
          }
        ) 

        router.refresh()
      }
    } catch(error) {
      console.error(error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnfavoriteAlbumClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    const requestBody = {
      albumToBeUnfavorited: {
        iTunesId: album.collectionId,
      }
    }

    try {
      const response = await fetch(
        url(`/favorites/album`),
        {
          method: 'DELETE',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json()

      if (!data.unfavoritedAlbum) {
        throw new Error()
      } else {
        toast.success(
          (
            <span>
              Álbum removido dos favoritos<br/>com sucesso!
            </span>
          ),
          {
            autoClose: 2500,
          }
        ) 

        router.refresh()
      }
    } catch(error) {
      console.error(error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = async () => {
    if (isFavorited) {
      await handleUnfavoriteAlbumClick()
    } else {
      await handleFavoriteAlbumClick()
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="none"
      className={cn("size-fit p-0 text-gray-400", className)}
      aria-label={`Marcar álbum "${album.collectionName}" como favorito`}
    >
      {!isLoading ? (
        <>
          {isFavorited ? (
            <VscHeartFilled 
              size={size}
              title="Remover dos favoritos"
            />
          ) : (
            <VscHeart 
              size={size}
              title="Adicionar aos favoritos"
            />
          )}
        </>
      ) : (
        <LoadingIcon
          size={size}
        />
      )}
    </Button>
  );
}
