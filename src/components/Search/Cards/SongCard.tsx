'use client'

import { AddToPlaylist } from "@/components/AddToPlaylist";
import { SmallFavoriteSongButton } from "@/components/FavoriteButtons/SmallFavoriteSongButton";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { iTunesToPlaying } from "@/lib/iTunesToPlaying";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import Image from 'next/image';
import Link from "next/link";
import { memo } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface SongCardProps {
  previewPlaylists: PreviewPlaylist[] | null;
  song: ITunesSong;
  songs: ITunesSong[];
  isFavorited: boolean;
}

const SongCardComponent = ({ previewPlaylists, song, songs, isFavorited }: SongCardProps) => {
  const durationInMinutes = Math.floor(song.trackTimeMillis / 1000 / 60)
  const durationInSeconds = Math.ceil((song.trackTimeMillis / 1000) - (durationInMinutes * 60))

  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isSongPlaying = 
    song.trackId === playingSong?.song.iTunesId && 
    song.collectionId === playingSong?.song.album.iTunesId

  const handleClick = () => {
    if (isSongPlaying) {
      if (isPlaying) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        currentSound?.play()
      }
    } else {
      const songIndex = songs.indexOf(song)
      currentSound?.stop()
      addCurrentToPrev()
      setPlayingSong(iTunesToPlaying(song))
      setNextSongs([
        ...songs
          .slice(songIndex+1, songs.length)
          .map(song => iTunesToPlaying(song)),
        ...songs
          .slice(0, songIndex)
          .map(song => iTunesToPlaying(song)),
      ])
      setIsPlaying(true)
    }
  }

  return (
    <Button
      variant="ghost"
      className="!pl-2 !pr-4 !h-auto grid grid-cols-[4rem_20rem_3.33rem_3rem] gap-3 items-center justify-start group"
      style={{
        backgroundColor: isSongPlaying
          ? `#A1A1AA25`
          : ''
      }}
      onClick={handleClick}
      asChild
    >
      <div>
        <div className="size-16 relative shrink-0">
          <Image
            src={song.artworkUrl100}
            alt={song.trackName}
            className="size-16 object-cover rounded-xl"
            width={100}
            height={100}
          />

          <div
            className="
              absolute inset-0 size-full rounded-md 
              flex items-center justify-center bg-black/90
              opacity-0 group-hover:opacity-100 transition-opacity 
            "
          >
            {isSongPlaying && isPlaying ? (
              <IoPauseSharp className="size-7"/>
            ) : (
              <IoPlaySharp className="size-6"/>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1 text-left w-[20rem]">
          <span className="text-lg font-medium leading-tight truncate" title={song.trackName}>
            {song.trackName}
          </span>
          <Link
            href={`/artists/${song.artistId}`}
            title={song.artistName}
            className="text-sm text-zinc-400 leading-tight line-clamp-2 text-wrap truncate hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            {song.artistName}
          </Link>
        </div>

        <div className="flex gap-2.5 items-center">
          <AddToPlaylist previewPlaylists={previewPlaylists} song={song} />
          
          <SmallFavoriteSongButton song={song} isFavorited={isFavorited} className="text-gray-300" />
        </div>

        <time className="font-medium text-sm text-zinc-600 ml-3">
          {durationInMinutes}:{durationInSeconds.toString().padStart(2, '0')}
        </time>
      </div>
    </Button>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
