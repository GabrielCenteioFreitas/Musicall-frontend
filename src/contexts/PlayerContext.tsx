'use client'

import { PlayingSong } from "@/types/song";
import { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
  volume: number;
  setVolume: (volumeParam: number) => void;
  nextSongs: PlayingSong[] | null;
  setNextSongs: (nextSongs: PlayingSong[] | null) => void;
  prevSongs: PlayingSong[] | null;
  setPrevSongs: (prevSongs: PlayingSong[] | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlayingParam: boolean) => void;
  isRandomModeEnabled: boolean;
  setIsRandomModeEnabled: (isRandomModeEnabledParam: boolean) => void;
  isLoopModeEnabled: boolean;
  setIsLoopModeEnabled: (isLoopModeEnabledParam: boolean) => void;
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
  const [volume, setVolume] = useState(0.25)
  const [prevSongs, setPrevSongs] = useState<PlayingSong[] | null>(null)
  const [nextSongs, setNextSongs] = useState<PlayingSong[] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRandomModeEnabled, setIsRandomModeEnabled] = useState(false)
  const [isLoopModeEnabled, setIsLoopModeEnabled] = useState(false)
  const token = Cookies.get('token')

  useEffect(() => {
    if (playingSong) {
      document.querySelector("#container")?.classList.remove("h-full")
      document.querySelector("#container")?.classList.add(`h-[calc(100%-72px)]`)
    } else {
      document.querySelector("#container")?.classList.remove(`h-[calc(100%-72px)]`)
      document.querySelector("#container")?.classList.add("h-full")
    }
  }, [playingSong])

  useEffect(() => {
    if (!playingSong || !playingGroup) {
      return
    }    

    const index = playingGroup?.indexOf(playingSong)
    if (isRandomModeEnabled) {
      const groupToBeShuffled = [
        ...playingGroup.slice(index+1, playingGroup.length),
        ...playingGroup.slice(0, index)
      ]
      const shuffledGroup = groupToBeShuffled.sort(() => Math.random() - 0.5)

      setNextSongs(shuffledGroup)
    } else {
      const nextSongsToSet = [
        ...playingGroup.slice(index+1, playingGroup.length),
        ...playingGroup.slice(0, index)
      ]

      setNextSongs(nextSongsToSet)
    }
  }, [isRandomModeEnabled, playingSong, playingGroup])

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('playingSong')
      localStorage.removeItem('playingGroup')
      localStorage.removeItem('nextSongs')
      localStorage.removeItem('prevSongs')
      localStorage.removeItem('recentSongs')
      localStorage.removeItem('isRandomModeEnabled')
      localStorage.removeItem('isLoopModeEnabled')
    }

    const playingSongToSet = localStorage.getItem('playingSong')
    const playingGroupToSet = localStorage.getItem('playingGroup')
    const nextSongsToSet = localStorage.getItem('nextSongs')
    const prevSongsToSet = localStorage.getItem('prevSongs')
    const isRandomModeEnabledToSet = localStorage.getItem('isRandomModeEnabled')
    const isLoopModeEnabledToSet = localStorage.getItem('isLoopModeEnabled')

    playingSongToSet && setPlayingSong(JSON.parse(playingSongToSet))
    playingGroupToSet && setPlayingGroup(JSON.parse(playingGroupToSet))
    nextSongsToSet && setNextSongs(JSON.parse(nextSongsToSet))
    prevSongsToSet && setPrevSongs(JSON.parse(prevSongsToSet))
    isRandomModeEnabledToSet && setIsRandomModeEnabled(JSON.parse(isRandomModeEnabledToSet))
    isLoopModeEnabledToSet && setIsLoopModeEnabled(JSON.parse(isLoopModeEnabledToSet))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }

    isRandomModeEnabled
      ? localStorage.setItem('isRandomModeEnabled', JSON.stringify(isRandomModeEnabled))
      : localStorage.removeItem('isRandomModeEnabled')

    isLoopModeEnabled
    ? localStorage.setItem('isLoopModeEnabled', JSON.stringify(isLoopModeEnabled))
    : localStorage.removeItem('isLoopModeEnabled')

    playingSong
      ? localStorage.setItem('playingSong', JSON.stringify(playingSong))
      : localStorage.removeItem('playingSong')

    playingGroup
      ? localStorage.setItem('playingGroup', JSON.stringify(playingGroup))
      : localStorage.removeItem('playingGroup')

    nextSongs
      ? localStorage.setItem('nextSongs', JSON.stringify(nextSongs))
      : localStorage.removeItem('nextSongs')

    if (prevSongs) {
      localStorage.setItem('prevSongs', JSON.stringify(prevSongs))

      const recentSongs = localStorage.getItem('recentSongs')

      const addSongToRecent = (recentSongs: PlayingSong[], prevSongs: PlayingSong[]): PlayingSong[] => {
        prevSongs.forEach(prevSong => {
          const index = recentSongs.findIndex(
            recentSong => recentSong.song.iTunesId === prevSong.song.iTunesId
          );

          if (index !== -1) {
            recentSongs = recentSongs.filter((_, i) => i !== index);
          }

          recentSongs.unshift(prevSong);
      });

      return recentSongs;
      }

      const newRecentSongs = addSongToRecent(
        JSON.parse(recentSongs || "[]"),
        prevSongs || []
      )

      localStorage.setItem('recentSongs', JSON.stringify(
        newRecentSongs
      ))
    } else {
      localStorage.removeItem('prevSongs')
    }
  }, [playingSong, playingGroup, nextSongs, prevSongs, token, isRandomModeEnabled, isLoopModeEnabled]);

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
    setIsPlaying(true)
    setPlayingSong(group[songIndex])
    setNextSongs([
      ...group.slice(songIndex+1, group.length),
      ...group.slice(0, songIndex)
    ])
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
        setIsPlaying(true)
        currentSound?.play()
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
      setIsPlaying(true)
      setPlayingSong(nextSongs[0])
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
      setIsPlaying(true)
      setPlayingSong(prevSongs[prevSongsLength-1])
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
      volume, setVolume,
      nextSongs, setNextSongs,
      prevSongs, setPrevSongs,
      isPlaying, setIsPlaying,
      isRandomModeEnabled, setIsRandomModeEnabled,
      isLoopModeEnabled, setIsLoopModeEnabled,
      playNextSong, playPrevSong,
      addCurrentToPrev,
      playGroup, playSongInAGroup,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}