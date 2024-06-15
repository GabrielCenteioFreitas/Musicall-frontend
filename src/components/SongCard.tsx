import { FavoriteSongButton } from "@/components/FavoriteButtons/FavoriteSongButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITunesSong } from "@/types/song";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface SongCardProps {
  song: {
    trackName: string;
    trackId: number;
    artistName: string;
    artistId: number;
    collectionId?: number;
    artworkUrl100: string;
  }
  isFavorited?: boolean;
  className?: string;
}

const SongCardComponent = ({ song, isFavorited, className }: SongCardProps) => {
  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className={cn("h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors", className)}
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

          <div className="flex flex-col gap-1 self-start text-left max-w-full">
            <span className="text-lg font-medium leading-tight truncate ..." title={song.trackName}>
              {song.trackName}
            </span>
            <Link
              href={`/artists/${song.artistId}`}
              title={song.artistName}
              className="text-xs text-zinc-400 hover:underline leading-tight truncate ..."
            >
              {song.artistName}
            </Link>
          </div>
        </div>
      </Button>

      {isFavorited !== undefined && song.collectionId && (
        <FavoriteSongButton
          isFavorited={isFavorited}
          song={{
            artistId: song.artistId,
            collectionId: song.collectionId,
            trackId: song.trackId
          }}
          className={cn("absolute right-4 bg-zinc-950 text-gray-50 transition-all duration-200",
            isFavorited ? "top-4" : "top-0 group-hover:top-4 opacity-0 group-hover:opacity-100"
          )}
        />
      )}
    </div>
  );
}

export const SongCard = memo(SongCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song)
})
