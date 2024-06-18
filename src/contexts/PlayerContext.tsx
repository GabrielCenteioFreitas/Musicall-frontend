'use client'

import { PlayingSong } from "@/types/song";
import { ReactNode, createContext, useEffect, useState } from "react";

interface PlayerContextData {
  playingSong: PlayingSong | null;
  setPlayingSong: (song: PlayingSong | null) => void;
  currentSound: Howl | null;
  setCurrentSound: (sound: Howl | null) => void;
  nextSongs: PlayingSong[] | null;
  setNextSongs: (nextSongs: PlayingSong[] | null) => void;
  prevSongs: PlayingSong[] | null;
  setPrevSongs: (prevSongs: PlayingSong[] | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlayingParam: boolean) => void;
  playNextSong: () => void;
  playPrevSong: () => void;
  addCurrentToPrev: () => void;
}

export const PlayerContext = createContext<PlayerContextData>(
  {} as PlayerContextData
)

export function PlayerProvider({ children }: { children: ReactNode; }) {
  const [playingSong, setPlayingSong] = useState<PlayingSong | null>(null)
  const [currentSound, setCurrentSound] = useState<Howl | null>(null)
  const [prevSongs, setPrevSongs] = useState<PlayingSong[] | null>(null)
  const [nextSongs, setNextSongs] = useState<PlayingSong[] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (playingSong) {
      document.querySelector("#container")?.classList.remove("h-full")
      document.querySelector("#container")?.classList.add(`h-[calc(100%-72px)]`)
    } else {
      document.querySelector("#container")?.classList.remove(`h-[calc(100%-72px)]`)
      document.querySelector("#container")?.classList.add("h-full")
    }
  }, [playingSong])

  const addCurrentToPrev = () => {
    setPrevSongs(cur => {
      if (cur) {
        return playingSong
          ? [...cur, playingSong]
          : cur
      } else {
        return playingSong
          ? [playingSong]
          : null
      }
    })
  }

  const playNextSong = () => {
    addCurrentToPrev()

    if (nextSongs?.[0]) {
      setPlayingSong(nextSongs[0])
      setIsPlaying(true)
      setNextSongs(cur => cur?.slice(1, cur.length) || null)
    } else {
      currentSound?.stop()
      setPlayingSong(null)
      setIsPlaying(false)
      setNextSongs(null)
    }

  }

  const playPrevSong = () => {
    const prevSongsLength = prevSongs?.length || 0
    setNextSongs(cur => 
      cur && playingSong
        ? [playingSong, ...cur]
        : cur
    )

    if (prevSongs && prevSongs.length > 0) {
      setPlayingSong(prevSongs[prevSongsLength-1])
      setIsPlaying(true)
      setPrevSongs(cur => 
        cur?.slice(0, prevSongsLength-1) || null
      )
    } else {
      currentSound?.stop()
      setPlayingSong(null)
      setIsPlaying(false)
      setPrevSongs(null)
    }

  }

  return (
    <PlayerContext.Provider value={{
      playingSong, setPlayingSong,
      currentSound, setCurrentSound,
      nextSongs, setNextSongs,
      prevSongs, setPrevSongs,
      isPlaying, setIsPlaying,
      playNextSong, playPrevSong,
      addCurrentToPrev
    }}>
      {children}
    </PlayerContext.Provider>
  )
}