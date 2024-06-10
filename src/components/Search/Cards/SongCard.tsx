import { AddToPlaylist } from "@/components/AddToPlaylist";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { Song } from "@/types/song";
import Image from 'next/image';
import Link from "next/link";
import { memo } from "react";
import { FaPlay } from "react-icons/fa";
import { VscHeart } from "react-icons/vsc";

interface SongCardProps {
  previewPlaylists: PreviewPlaylist[] | null;
  song: Pick<Song,
    'trackId' |
    'trackName' |
    'artistId' |
    'artistName' |
    'collectionId' |
    'artworkUrl100' |
    'trackTimeMillis'
  >
}

const SongCardComponent = ({ previewPlaylists, song }: SongCardProps) => {
  const durationInMinutes = Math.floor(song.trackTimeMillis / 10000 / 60)
  const durationInSeconds = Math.ceil((song.trackTimeMillis / 10000) - (durationInMinutes * 60))

  return (
    <Button
      variant="ghost"
      className="w-full !pl-2 !pr-4 !h-auto flex items-center justify-start max-w-[572px] group/song"
      asChild
    >
      <Link href={`/songs/${song.trackId}`}>
        <div className="shrink-0 size-fit relative">
          <Image
            src={song.artworkUrl100}
            alt={song.trackName}
            className="size-16 object-cover rounded-xl"
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

        <div className="ml-3 flex flex-col gap-1 text-left w-[340px]">
          <span className="text-lg font-medium leading-tight truncate" title={song.trackName}>
            {song.trackName}
          </span>
          <span className="text-sm text-zinc-400 leading-tight line-clamp-2 text-wrap truncate">
            {song.artistName}
          </span>
        </div>

        <div className="ml-3 flex gap-3 items-center">
          <AddToPlaylist previewPlaylists={previewPlaylists} song={song} />
          
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <VscHeart
                  size={20}
                  className="text-gray-300 hover:scale-110 group-hover/tooltip:text-gray-50 transition-all"
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
      </Link>
    </Button>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
