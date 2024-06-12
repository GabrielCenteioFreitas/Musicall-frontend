import { LoadingIcon } from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { url } from "@/lib/api";
import { getDataFromLookup } from "@/lib/getITunesData";
import { cn } from "@/lib/utils";
import { Album } from "@/types/album";
import { Artist } from "@/types/artist";
import { Song } from "@/types/song";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { MouseEvent, useState } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { toast } from "react-toastify";

interface AddToPlaylistProps {
  song: {
    trackId: number;
    collectionId: number;
    artistId: number;
  };
  className?: string;
  size?: number;
}

export const AddToPlaylist = ({ song, className, size=20 }: AddToPlaylistProps) => {
  const router = useRouter()
  const params = useParams()
  const token = Cookies.get('token')
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToPlaylistClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const { trackId, collectionId, artistId } = song
    const { id } = params

    const { results: songResults } = await getDataFromLookup({ id: trackId })
    const songData: Song = songResults[0]
    const { results: artistResults } = await getDataFromLookup({ id: artistId })
    const artistData: Artist = artistResults[0]
    const { results: albumResults } = await getDataFromLookup({ id: collectionId })
    const albumData: Album = albumResults[0]

    const requestBody = {
      newSong: {
        name: songData.trackName,
        portrait: songData.artworkUrl100,
        iTunesId: songData.trackId,
        iTunesViewUrl: songData.trackViewUrl,
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
        previewUrl: songData.previewUrl,
        releaseDate: songData.releaseDate,
        durationInSeconds: songData.trackTimeMillis / 10000,
        genre: songData.primaryGenreName
      }
    };

    try {
      await fetch(
        url(`/playlists/${id}/songs`),
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      ).then(() => {
        toast.success(
          (
            <span>Música adicionada à playlist<br/>com sucesso!</span>
          ),
          {
            autoClose: 2500,
          }
        ) 

        router.refresh()
      })
    } catch(error) {
      console.error(error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="none" onClick={handleAddToPlaylistClick}>
      {!isLoading ? (
        <LuPlusCircle
          title="Adicionar à playlist"
          size={size}
          className={cn(`
            text-gray-300 hover:scale-110 group-hover/tooltip:text-gray-50 transition-all`,
            className
          )}
        />
      ) : (
        <LoadingIcon size={size} />
      )}
    </Button>
  )
}
