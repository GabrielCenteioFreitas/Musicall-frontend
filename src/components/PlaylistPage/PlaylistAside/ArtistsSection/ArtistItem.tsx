import { ArtistPortrait } from "@/components/Portraits/ArtistPortrait";
import { Button } from "@/components/ui/button";
import { DBArtist } from "@/types/artist";
import Link from "next/link";
import { memo } from "react";

interface ArtistItemProps {
  artist: Pick<DBArtist,
    "name" |
    "iTunesId"
  >
}

const ArtistItemComponent = ({ artist }: ArtistItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="ghost"
        className="w-full h-fit p-2 !pr-4 flex items-center justify-start gap-3 rounded-2xl transition-colors group"
        asChild
      >
        <Link href={`/artists/${artist.iTunesId}`}>
          <ArtistPortrait name={artist.name} className="size-14 text-lg" />

          <div className="flex flex-col gap-0 justify-center text-left max-w-60">
            <span className="text-lg font-medium truncate ..." title={artist.name}>
              {artist.name}
            </span>
            <span className="text-xs text-zinc-400 truncate ...">
              Artista
            </span>
          </div>
        </Link>
      </Button>
    </li>
  );
}

export const ArtistItem = memo(ArtistItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.artist, nextProps.artist)
})
