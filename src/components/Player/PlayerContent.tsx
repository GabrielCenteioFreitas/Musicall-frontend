import { usePlayer } from "@/hooks/usePlayer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { 
  IoPauseSharp,
  IoPlaySharp,
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";
import useSound from 'use-sound';
import { Button } from "../ui/button";
import * as SliderPrimitive from "@radix-ui/react-slider"

export const PlayerContent = () => {
  const { playingSong, setCurrentSound, isPlaying, setIsPlaying, playNextSong, playPrevSong } = usePlayer()
  const [volume, setVolume] = useState(0.25);
  const [play, { sound }] = useSound(playingSong?.song.previewUrl || '', {
    volume,
    onend: () => playNextSong()
  })

  useEffect(() => {
    sound?.play();
    setCurrentSound(sound)
  } , [sound, setCurrentSound])

  if (!playingSong) {
    return null
  }

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      sound?.pause()
      setIsPlaying(false)
    } else {
      play()
      setIsPlaying(true)
    }
  }

  const handleNextSongClick = () => {
    sound?.stop()
    playNextSong()
  }

  const handlePrevSongClick = () => {
    sound?.stop()
    playPrevSong()
  }

  const handleVolumeClick = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(0.25)
    }
  }

  return (
    <div className="w-full h-12 grid grid-cols-3 gap-4">
      <div className="flex gap-3 items-center">
        <Image
          src={playingSong.song.portrait}
          alt={playingSong.song.name}
          width={48}
          height={48}
          className="rounded-md h-full aspect-square"
        />

        <div className="flex flex-col overflow-hidden">
          <span className="text-md truncate ...">
            {playingSong.song.name}
          </span>

          <span className="text-xs text-zinc-400 truncate ...">
            {playingSong.song.artist.name}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="none"
          size="none"
          title="Música anterior"
          onClick={handlePrevSongClick}
        >
          <IoIosSkipBackward
            className="size-6 text-zinc-400 hover:text-zinc-50 transition-colors"
          />
        </Button>

        <Button
          variant="secondary"
          size="none"
          className="rounded-full p-0 size-11 transition-colors"
          title="Ouvir playlist"
          onClick={handlePlayPauseClick}
        >
          {isPlaying ? (
            <IoPauseSharp
              className="size-6 text-zinc-50"
            />
          ) : (
            <IoPlaySharp
              className="-mr-1 size-6 text-zinc-50"
            />
          )}
        </Button>

        <Button
          variant="none"
          size="none"
          title="Próxima música"
          onClick={handleNextSongClick}
        >
          <IoIosSkipForward
            className="size-6 text-zinc-400 hover:text-zinc-50 transition-colors"
          />
        </Button>
      </div>

      <div className="flex justify-end">
        <div className="flex items-center gap-1">
          <Button
            variant="none"
            size="none"
            className="size-fit"
            onClick={handleVolumeClick}
          >
            {volume > 0.66
              ? <IoVolumeHigh size={24} />
              : volume > 0.33
                ? <IoVolumeMedium size={24} />
                : volume > 0
                  ? <IoVolumeLow size={24} />
                  : <IoVolumeMute size={24} />
            }
          </Button>

          <SliderPrimitive.Root
            max={1}
            value={[volume]}
            step={0.05}
            onValueChange={(value) => setVolume(value[0])}
            className="relative flex w-44 touch-none select-none items-center group/volume"
          >
            <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <SliderPrimitive.Range className="
                absolute h-full rounded-full
                bg-zinc-50 group-hover/volume:bg-zinc-300 transition-colors
              "/>
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb className="
              block size-3 rounded-full cursor-pointer
              opacity-0 group-hover/volume:opacity-100 transition-all
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              bg-zinc-50 ring-offset-zinc-950 focus-visible:ring-zinc-300
            "/>
          </SliderPrimitive.Root>
        </div>
        
      </div>
    </div>
  );
}
