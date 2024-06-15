import { loginURL } from "@/components/DefaultLayout/Header/SignIn";
import { LoadingIcon } from "@/components/LoadingIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { url } from "@/lib/api";
import { getDataFromLookup } from "@/lib/getITunesData";
import { cn } from "@/lib/utils";
import { ITunesAlbum } from "@/types/album";
import { ITunesArtist } from "@/types/artist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { toast } from 'react-toastify';

interface AddToPlaylistProps {
  previewPlaylists: PreviewPlaylist[] | null;
  album?: ITunesAlbum;
  songs?: ITunesSong[];
  className?: string;
  size?: number;
}

export const AddToPlaylist = ({ previewPlaylists, album, songs, className, size=20 }: AddToPlaylistProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PreviewPlaylist | null>(null);
  const [songsToBeAdded, setSongsToBeAdded] = useState<ITunesSong[]>([] as ITunesSong[])
  
  const token = Cookies.get('token')

  const handleOpen = (isOpenParam: boolean) => {
    if (!token && isOpenParam) {
      setIsOpen(false)
      router.push(loginURL);
    } else {
      setIsOpen(isOpenParam)
    }
  };

  const handleAddToPlaylistClick = async (e: MouseEvent<HTMLButtonElement>, previewPlaylist: PreviewPlaylist) => {
    e.preventDefault()
    setSelectedPlaylist(previewPlaylist)

    try {
      for (const song of songsToBeAdded) {
        const { trackId, collectionId, artistId } = song
  
        const { results: songResults } = await getDataFromLookup({ id: trackId })
        const songData: ITunesSong = songResults[0]
        const { results: artistResults } = await getDataFromLookup({ id: artistId })
        const artistData: ITunesArtist = artistResults[0]
        const { results: albumResults } = await getDataFromLookup({ id: collectionId })
        const albumData: ITunesAlbum = albumResults[0]
  
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
            durationInSeconds: songData.trackTimeMillis / 1000,
            genre: songData.primaryGenreName
          }
        };
  
        const response = await fetch(
          url(`/playlists/${previewPlaylist?.id}/songs`),
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

        if (!data.addedSong) {
          throw new Error()
        }
      }
    } catch (error) {
      console.error(error)
      toast.error("Ocorreu um erro!")
      setIsOpen(false)
      setSelectedPlaylist(null)
      return
    }

    setIsOpen(false)
    setSelectedPlaylist(null)

    toast.success(
      (
        <div className="max-w-full relative">
          Álbum adicionado à playlist<br/>
          <span className="font-bold truncate ...">
            {previewPlaylist?.name}
          </span>
        </div>
      ),
      {
        autoClose: 2500,
      }
    ) 

    router.refresh()
  }

  const doesPlaylistHaveAllSongs = (
    playlistSongs: {
      song: {
        iTunesId: number;
      }
    }[],
    albumSongs: {
      trackId: number;
    }[],
  ) => {
    if (!albumSongs) {
      return false;
    }

    return albumSongs.every(
      (albumSong) => playlistSongs.some(
        (playlistSong) => playlistSong.song.iTunesId === albumSong.trackId
      )
    )
  }

  useEffect(() => {
    if (songs) {
      setSongsToBeAdded(songs)
    } else {
      const getData = async () => {
        const { results, resultCount } = await getDataFromLookup({
          id: album?.collectionId,
          entity: 'song',
          limit: 200
        })

        if (results.length === 1) {
          setSongsToBeAdded([] as ITunesSong[])
        }

        setSongsToBeAdded(results.slice(1, resultCount))
      }

      getData()
    }
  }, [songs, album])

  return (
    <DropdownMenu onOpenChange={handleOpen} open={isOpen}>
      <DropdownMenuTrigger>
        <LuPlusCircle
          title="Adicionar à playlist"
          size={size}
          className={cn(`
            text-gray-400 hover:text-gray-50 transition-colors`,
            className
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Adicionar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {previewPlaylists?.map((previewPlaylist) => 
          <DropdownMenuItem key={previewPlaylist.id} asChild>
            <button
              className="w-full max-w-36 flex gap-4 justify-between"
              onClick={(e) => handleAddToPlaylistClick(e, previewPlaylist)}
              disabled={selectedPlaylist !== null}
            >
              <span className="flex-1 text-left truncate">
                {previewPlaylist.name}
              </span>
              {
                previewPlaylist.id === selectedPlaylist?.id 
                  ? <LoadingIcon size={12} />
                  : doesPlaylistHaveAllSongs(previewPlaylist.songs, songsToBeAdded)
                    && <FaCheckCircle size={12} />
              }
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
