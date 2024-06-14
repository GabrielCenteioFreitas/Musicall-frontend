'use client'

import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useState } from "react";
import { LoadingIcon } from "../LoadingIcon";
import { useRouter } from "next/navigation";
import { loginURL } from "../DefaultLayout/Header/SignIn";
import { getDataFromLookup } from "@/lib/getITunesData";
import { ITunesSong } from "@/types/song";
import { ITunesArtist } from "@/types/artist";
import { ITunesAlbum } from "@/types/album";
import { url } from "@/lib/api";
import { toast } from "react-toastify";

interface SmallFavoriteSongButtonProps {
  song: {
    trackId: number;
    collectionId: number;
    artistId: number;
  }
  isFavorited: boolean;
  className?: string;
  size?: number;
}

export const SmallFavoriteSongButton = ({ song, isFavorited, className, size=20 }: SmallFavoriteSongButtonProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteSongClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    const { trackId, collectionId, artistId } = song
    
    const { results: songResults } = await getDataFromLookup({ id: trackId })
    const songData: ITunesSong = songResults[0]
    const { results: artistResults } = await getDataFromLookup({ id: artistId })
    const artistData: ITunesArtist = artistResults[0]
    const { results: albumResults } = await getDataFromLookup({ id: collectionId })
    const albumData: ITunesAlbum = albumResults[0]

    const requestBody = {
      songToBeFavorited: {
        name: songData.trackName,
        portrait: songData.artworkUrl100,
        iTunesId: songData.trackId,
        iTunesViewUrl: songData.trackViewUrl,
        previewUrl: songData.previewUrl,
        releaseDate: songData.releaseDate,
        durationInSeconds: songData.trackTimeMillis / 1000,
        genre: songData.primaryGenreName,
        artist: {
          name: artistData.artistName,
          iTunesId: artistData.artistId,
          iTunesViewUrl: artistData.artistLinkUrl,
          genre: artistData.primaryGenreName,
        },
        album: {
          name: albumData.collectionName,
          portrait: albumData.artworkUrl100,
          iTunesId: albumData.collectionId,
          iTunesViewUrl: albumData.collectionViewUrl,
          releaseDate: albumData.releaseDate,
          genre: albumData.primaryGenreName,
        },
      }
    };

    try {
      const response = await fetch(
        url(`/favorites/song`),
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

      if (!data.favoritedSong) {
        throw new Error()
      } else {
        toast.success(
          (
            <span>
              Música adicionada aos favoritos<br/>com sucesso!
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

  const handleUnfavoriteSongClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    const requestBody = {
      songToBeUnfavorited: {
        iTunesId: song.trackId,
      }
    }

    try {
      const response = await fetch(
        url(`/favorites/song`),
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

      if (!data.unfavoritedSong) {
        throw new Error()
      } else {
        toast.success(
          (
            <span>
              Música removida dos favoritos<br/>com sucesso!
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
      await handleUnfavoriteSongClick()
    } else {
      await handleFavoriteSongClick()
    }
  }

  return (
    <Button
      variant="none"
      className={cn("size-fit p-0 text-gray-400", className)}
      disabled={isLoading}
      onClick={handleClick}
    >
      {!isLoading ? (
        <>
          {isFavorited ? (
            <VscHeartFilled 
              size={size}
              title="Remover dos favoritos"
              className="hover:scale-110 transition-all"
            />
          ) : (
            <VscHeart 
              size={size}
              title="Adicionar aos favoritos"
              className="hover:scale-110 transition-all"
            />
          )}
        </>
      ) : (
        <LoadingIcon
          className="!text-gray-200"
          size={size}
        />
      )}
    </Button>
  );
}
