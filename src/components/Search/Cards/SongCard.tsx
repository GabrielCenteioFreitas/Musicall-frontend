import { AddToPlaylist } from "@/components/AddToPlaylist";
import { FavoriteSongButton } from "@/components/FavoriteSongButton";
import { Button } from "@/components/ui/button";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import Image from 'next/image';
import { memo } from "react";
import { FaPlay } from "react-icons/fa";

interface SongCardProps {
  previewPlaylists: PreviewPlaylist[] | null;
  song: Pick<ITunesSong,
    'trackId' |
    'trackName' |
    'artistId' |
    'artistName' |
    'collectionId' |
    'artworkUrl100' |
    'trackTimeMillis'
  >;
  isFavorited: boolean;
}

const SongCardComponent = ({ previewPlaylists, song, isFavorited }: SongCardProps) => {
  const durationInMinutes = Math.floor(song.trackTimeMillis / 1000 / 60)
  const durationInSeconds = Math.ceil((song.trackTimeMillis / 1000) - (durationInMinutes * 60))

  return (
    <Button
      variant="ghost"
      className="!pl-2 !pr-4 !h-auto grid grid-cols-[4rem_20rem_3.33rem_3rem] gap-3 items-center justify-start group/song"
      asChild
    >
      <div>
        <div className="shrink-0 size-16 relative">
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

        <div className="flex-1 flex flex-col gap-1 text-left w-[20rem]">
          <span className="text-lg font-medium leading-tight truncate" title={song.trackName}>
            {song.trackName}
          </span>
          <span className="text-sm text-zinc-400 leading-tight line-clamp-2 text-wrap truncate" title={song.artistName}>
            {song.artistName}
          </span>
        </div>

        <div className="flex gap-2.5 items-center">
          <AddToPlaylist previewPlaylists={previewPlaylists} song={song} />
          
          <FavoriteSongButton song={song} isFavorited={isFavorited} className="text-gray-300" />
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
