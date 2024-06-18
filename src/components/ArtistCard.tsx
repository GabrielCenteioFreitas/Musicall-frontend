import { FavoriteArtistButton } from "@/components/FavoriteButtons/FavoriteArtistButton";
import { cn } from "@/lib/utils";
import { ITunesArtist } from "@/types/artist";
import Link from "next/link";
import { memo } from "react";
import { ArtistPortrait } from "./Portraits/ArtistPortrait";
import { Button } from "./ui/button";

interface ArtistCardProps {
  artist: Pick<ITunesArtist,
    'artistId' |
    'artistName'
  >;
  isFavorited?: boolean;
  className?: string;
}

const ArtistCardComponent = ({ artist, isFavorited, className }: ArtistCardProps) => {
  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className={cn("h-fit p-3 flex flex-col gap-3 shrink-0 rounded-2xl transition-colors group", className)}
        asChild
      >
        <Link href={`/artists/${artist.artistId}`}>
          <ArtistPortrait name={artist.artistName} className="w-full aspect-square text-5xl" />

          <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
            <span className="text-lg font-medium leading-none truncate ..." title={artist.artistName}>
              {artist.artistName}
            </span>
            <span className="text-xs text-zinc-400 leading-none truncate ...">
              Artista
            </span>
          </div>
        </Link>
      </Button>

      {isFavorited !== undefined && (
        <FavoriteArtistButton
          artist={artist}
          isFavorited={isFavorited}
          className={cn("absolute left-4 bg-zinc-950 text-gray-50 transition-all duration-200",
            isFavorited ? "top-4" : "top-0 group-hover:top-4 opacity-0 group-hover:opacity-100"
          )}
        />
      )}
    </div>
  );
}

export const ArtistCard = memo(ArtistCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.artist, nextProps.artist)
})
