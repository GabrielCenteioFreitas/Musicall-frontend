import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Song } from "@/types/song";
import Image from 'next/image';
import { memo } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { VscHeart } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";

interface SongCardProps {
  song: Pick<Song,
    'trackId' |
    'trackName' |
    'artistName' |
    'artworkUrl100' |
    'trackTimeMillis'
  >
}

const SongCardComponent = ({ song }: SongCardProps) => {
  const durationInMinutes = Math.floor(song.trackTimeMillis / 10000 / 60)
  const durationInSeconds = Math.ceil((song.trackTimeMillis / 10000) - (durationInMinutes * 60))

  return (
    <Button
      variant="ghost"
      className="w-full !pl-2 !pr-4 !h-auto flex items-center justify-start max-w-[572px] group/song"
    >
      <div className="size-fit relative">
        <Image
          src={song.artworkUrl100}
          alt={song.trackName}
          className="size-16 rounded-xl"
          width={100}
          height={100}
        />
        <div className="
          absolute inset-0 z-10 grid place-content-center rounded-xl bg-black/80
          opacity-0 group-hover/song:opacity-100 transition-opacity ease-in-out delay-150 duration-200
        ">
          <FaPlay size={24} />
        </div>
      </div>

      <div className="ml-3 flex flex-col gap-1 text-left w-96">
        <span className="text-lg font-medium leading-tight truncate" title={song.trackName}>
          {song.trackName}
        </span>
        <span className="text-sm text-zinc-400 leading-tight line-clamp-2 text-wrap truncate">
          {song.artistName}
        </span>
      </div>

      <div className="flex gap-3 items-center">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="group/tooltip">
              <LuPlusCircle
                size={20}
                className="text-gray-300 group-hover/tooltip:scale-110 group-hover/tooltip:text-gray-50 transition-all"
              />
            </TooltipTrigger>
            <TooltipContent className="!bg-zinc-900 !border-zinc-600 !py-1 !px-2">
              <p>Adicionar à playlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger className="group/tooltip">
              <VscHeart
                size={20}
                className="text-gray-300 group-hover/tooltip:scale-110 group-hover/tooltip:text-gray-50 transition-all"
              />
            </TooltipTrigger>
            <TooltipContent className="!bg-zinc-900 !border-zinc-600 !py-1 !px-2">
              <p>Adicionar aos favoritos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <time className="font-medium text-sm text-zinc-600 ml-6">
        {durationInMinutes}:{durationInSeconds.toString().padStart(2, '0')}
      </time>
    </Button>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
