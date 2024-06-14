import { FavoriteSongButton } from "@/components/FavoriteButtons/FavoriteSongButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITunesSong } from "@/types/song";
import Image from "next/image";
import { memo } from "react";

interface SongCardProps {
  song: Pick<ITunesSong,
    'trackName' |
    'trackId' |
    'artistName' |
    'artistId' |
    'collectionId' |
    'artworkUrl100'
  >
  isFavorited: boolean;
}

const SongCardComponent = ({ song, isFavorited }: SongCardProps) => {
  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors"
        asChild
      >
        <div>
          <Image
            className="size-full rounded-md"
            src={song.artworkUrl100}
            alt={song.trackName}
            width={100}
            height={100}
          />

          <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
            <span className="text-lg font-medium leading-none truncate ..." title={song.trackName}>
              {song.trackName}
            </span>
            <span className="text-xs text-zinc-400 leading-none truncate ..." title={song.artistName}>
              {song.artistName}
            </span>
          </div>
        </div>
      </Button>

      <FavoriteSongButton
        isFavorited={isFavorited}
        song={song}
        className={cn("absolute right-4 bg-zinc-950 text-gray-50 transition-all duration-200",
          isFavorited ? "top-4" : "top-0 group-hover:top-4 opacity-0 group-hover:opacity-100"
        )}
      />
    </div>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
