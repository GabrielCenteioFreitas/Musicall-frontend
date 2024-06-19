'use client'

import { PlayingSong } from "@/types/song";
import { ReactNode, createContext, useEffect, useState } from "react";

interface PlayAndSetGroupProps {
  group: PlayingSong[];
  songIndex: number;
}

interface PlayGroupProps {
  group: PlayingSong[];
  isPlayingSongInGroup: boolean;
}

interface PlaySongInAGroupProps {
  group: PlayingSong[];
  songIndex: number;
  isSongPlaying: boolean;
}

interface PlayerContextData {
  playingSong: PlayingSong | null;
  setPlayingSong: (song: PlayingSong | null) => void;
  playingGroup: PlayingSong[] | null;
  setPlayingGroup: (songs: PlayingSong[] | null) => void;
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
  playGroup: ({}: PlayGroupProps) => void;
  playSongInAGroup: ({}: PlaySongInAGroupProps) => void;
}

export const PlayerContext = createContext<PlayerContextData>(
  {} as PlayerContextData
)

export function PlayerProvider({ children }: { children: ReactNode; }) {
  const [playingSong, setPlayingSong] = useState<PlayingSong | null>(null)
  const [playingGroup, setPlayingGroup] = useState<PlayingSong[] | null>(null)
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
  
  const playAndSetGroup = ({
    group, songIndex
  }: PlayAndSetGroupProps) => {  
    currentSound?.stop()
    addCurrentToPrev()
    setPlayingSong(group[songIndex])
    setNextSongs([
      ...group
        .slice(songIndex+1, group.length)
        .map(song => song),
      ...group
        .slice(0, songIndex)
        .map(song => song),
    ])
    setIsPlaying(true)
    setPlayingGroup(group)
  }

  const playGroup = ({
    group, isPlayingSongInGroup,
  }: PlayGroupProps) => {
    if (isPlaying) {
      if (isPlayingSongInGroup) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        playAndSetGroup({
          group,
          songIndex: 0,
        })
      }
    } else {
      if (playingSong && isPlayingSongInGroup) {
        currentSound?.play()
        setIsPlaying(true)
      } else {
        playAndSetGroup({
          group,
          songIndex: 0,
        })
      }
    }
  }

  const playSongInAGroup = ({
    group, songIndex, isSongPlaying
  }: PlaySongInAGroupProps) => {
    if (isSongPlaying) {
      if (isPlaying) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        currentSound?.play()
      }
    } else {
      playAndSetGroup({
        group,
        songIndex,
      })
    }
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
      playingGroup, setPlayingGroup,
      currentSound, setCurrentSound,
      nextSongs, setNextSongs,
      prevSongs, setPrevSongs,
      isPlaying, setIsPlaying,
      playNextSong, playPrevSong,
      addCurrentToPrev,
      playGroup, playSongInAGroup,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}