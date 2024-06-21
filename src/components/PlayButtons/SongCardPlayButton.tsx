'use client'

import { usePlayer } from "@/hooks/usePlayer";
import { cn } from "@/lib/utils";
import { PlayingSong } from "@/types/song";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { Button } from "../ui/button";

interface SongCardPlayButtonProps {
  song: PlayingSong;
  songsGroup: PlayingSong[];
  songIndex: number;
  className?: string;
}

export const SongCardPlayButton = ({ song, songsGroup, songIndex, className }: SongCardPlayButtonProps) => {
  const { playingSong, isPlaying, playSongInAGroup } = usePlayer()
  const isSongPlaying = 
    playingSong?.song.id
      ? song.song.id === playingSong?.song.id
      : song.song.iTunesId === playingSong?.song.iTunesId

  const handleClick = () => {
    playSongInAGroup({
      group: songsGroup,
      isSongPlaying,
      songIndex,
    })
  }

  const defaultPosition = 'bottom-12 group-hover:bottom-[68px] opacity-0 group-hover:opacity-100'
  const playingPosition = 'bottom-[68px] opacity-100'

  return (
    <Button
      onClick={handleClick}
      title="Ouvir música"
      variant="none"
      size="none"
      className={cn(`
        absolute right-4 transition-all duration-200
        size-11 bg-zinc-900 hover:bg-zinc-800 text-gray-50 rounded-full
      `, isSongPlaying ? playingPosition : defaultPosition,
      className)}
      aria-label={
        (isPlaying && isSongPlaying)
          ? "Pausar música"
          : "Tocar música"
      }
    >
      {isPlaying && isSongPlaying ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}
