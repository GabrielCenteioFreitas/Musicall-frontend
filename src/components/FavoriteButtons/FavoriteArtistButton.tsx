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
import { ITunesArtist } from "@/types/artist";

interface FavoriteArtistButtonProps {
  artist: {
    artistName: string;
    artistId: number;
  }
  isFavorited: boolean;
  className?: string;
  size?: number;
}

export const FavoriteArtistButton = ({ artist, isFavorited, className, size=20 }: FavoriteArtistButtonProps) => {
  const router = useRouter()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const handleFavoriteArtistClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    try {
      const { artistId } = artist
    
      const { results: artistResults } = await getDataFromLookup({
        id: artistId
      })
      const artistData: ITunesArtist = artistResults[0]
  
      const { results: albumResults, resultCount: albumCount } = await getDataFromLookup({
        amgArtistId: artistData.amgArtistId,
        entity: 'album',
        limit: 201,
      })
      const albumData: ITunesAlbum[] = albumResults.slice(1, albumCount)
  
      const { results: songResults, resultCount: songCount } = await getDataFromLookup({
        amgArtistId: artistData.amgArtistId,
        entity: 'song',
        limit: 201,
      })
      const songData: ITunesSong[] = songResults.slice(1, songCount)
  
      const requestBody = {
        artistToBeFavorited: {
          name: artistData.artistName,
          iTunesId: artistData.artistId,
          iTunesViewUrl: artistData.artistLinkUrl,
          genre: artistData.primaryGenreName,
          albums: albumData.map((album) => {
            return {
              name: album.collectionName,
              portrait: album.artworkUrl100,
              iTunesId: album.collectionId,
              iTunesViewUrl: album.collectionViewUrl,
              releaseDate: album.releaseDate,
              genre: album.primaryGenreName,
            }
          }),
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
              album: {
                name: song.collectionName,
                portrait: song.artworkUrl100,
                iTunesId: song.collectionId,
                iTunesViewUrl: song.collectionViewUrl,
                releaseDate: song.releaseDate,
                genre: song.primaryGenreName,
              },
            }
          })
        }
      };
  
      try {
        const response = await fetch(
          url(`/favorites/artist`),
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
  
        if (!data.favoritedArtist) {
          throw new Error()
        } else {
          toast.success(
            (
              <span>
                Artista adicionado aos favoritos<br/>com sucesso!
              </span>
            ),
            {
              autoClose: 2500,
            }
          ) 
  
          router.refresh()
        }
      } catch(error) {
        console.error("Error adding artist to favorites:", error)
        toast.error("Ocorreu um erro!")
      }
    } catch (error) {
      console.error("Error adding artist to favorites:", error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnfavoriteArtistClick = async () => {
    if (!token) {
      router.push(loginURL)
      return
    }
    setIsLoading(true)

    const requestBody = {
      artistToBeUnfavorited: {
        iTunesId: artist.artistId,
      }
    }

    try {
      const response = await fetch(
        url(`/favorites/artist`),
        {
          method: 'DELETE',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response) {
        toast.success(
          (
            <span>
              Artista removido dos favoritos<br/>com sucesso!
            </span>
          ),
          {
            autoClose: 2500,
          }
        ) 

        router.refresh()
      }
    } catch(error) {
      console.error("Error removing artist from favorites:", error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = async () => {
    if (isFavorited) {
      await handleUnfavoriteArtistClick()
    } else {
      await handleFavoriteArtistClick()
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="none"
      size="icon"
      className={cn(`
        text-gray-400 p-1.5 rounded-full hover:scale-110 hover:text-gray-50 transition-all
      `, className, isLoading && "!top-5 !opacity-100")}
      aria-label={`Marcar artista "${artist.artistName}" como favorito`}
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
          size={size-2}
        />
      )}
    </Button>
  );
}
