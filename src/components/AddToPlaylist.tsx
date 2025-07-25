'use client'

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
import { MouseEvent, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuPlusCircle } from "react-icons/lu";
import { toast } from 'react-toastify';
import { loginURL } from "./DefaultLayout/Header/SignIn";
import { LoadingIcon } from "./LoadingIcon";
import { Button } from "./ui/button";

interface AddToPlaylistProps {
  previewPlaylists: PreviewPlaylist[] | null;
  song: {
    trackId: number;
    collectionId: number;
    artistId: number;
  }
  className?: string;
  size?: number;
}

export const AddToPlaylist = ({ previewPlaylists, song, className, size=20 }: AddToPlaylistProps) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PreviewPlaylist | null>(null);
  
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

      try {
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
        } else {
          toast.success(
            (
              <div className="max-w-full relative">
                Música adicionada à playlist<br/>
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
      } catch(error) {
        console.error('Error adding song to playlist:', error)
        toast.error("Ocorreu um erro!")
      }
    } catch(error) {
      console.error('Error fetching iTunes data for playlist:', error)
      toast.error("Ocorreu um erro!")
    } finally {
      setIsOpen(false)
      setSelectedPlaylist(null)
    }
  }

  return (
    <DropdownMenu onOpenChange={handleOpen} open={isOpen}>
      <DropdownMenuTrigger>
        <LuPlusCircle
          title="Adicionar à playlist"
          size={size}
          className={cn(`
            text-gray-300 hover:scale-110 group-hover/tooltip:text-gray-50 transition-all`,
            className
          )}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Adicionar</DropdownMenuLabel>
        
        <DropdownMenuSeparator />

        <div className="max-h-44 overflow-y-scroll no-scrollbar">
          {previewPlaylists?.map((previewPlaylist) => 
            <DropdownMenuItem key={previewPlaylist.id} asChild>
              <Button
                variant="none"
                size="none"
                className="w-full max-w-36 flex gap-4 justify-between"
                onClick={(e) => handleAddToPlaylistClick(e, previewPlaylist)}
                disabled={selectedPlaylist !== null}
                aria-label={`Adicionar à playlist "${previewPlaylist.name}"`}
              >
                <span className="flex-1 text-left truncate">
                  {previewPlaylist.name}
                </span>
                {
                  previewPlaylist.id === selectedPlaylist?.id 
                    ? <LoadingIcon size={12} />
                    : previewPlaylist.songs.some(curSong => curSong.song.iTunesId === song.trackId)
                      && <FaCheckCircle size={12} />
                }
              </Button>
            </DropdownMenuItem>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
