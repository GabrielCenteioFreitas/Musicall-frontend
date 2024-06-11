import { Artist } from "@/types/artist";
import { Button } from "../../ui/button";
import { getInitialLetters } from "@/utils/getInitalLetters";
import { memo } from "react";

interface ArtistCardProps {
  artist: Pick<Artist,
    'artistId' |
    'artistName' |
    'artistLinkUrl'
  >
}

const ArtistCardComponent = ({ artist }: ArtistCardProps) => {
  return (
    <Button
      variant="ghost"
      className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-2xl transition-colors group"
      asChild
    >
      <a href={artist.artistLinkUrl} target="_blank">
        <div
          className="
          w-full aspect-square grid place-content-center
          rounded-full bg-zinc-900 border-4 border-zinc-800 group-hover:border-zinc-500
          text-zinc-400 font-semibold text-5xl group-hover:text-zinc-200 transition-colors
        ">
          {getInitialLetters(artist.artistName)}
        </div>

        <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
          <span className="text-lg font-medium leading-none truncate ...">
            {artist.artistName}
          </span>
          <span className="text-xs text-zinc-400 leading-none truncate ...">
            Artista
          </span>
        </div>
      </a>
    </Button>
  );
}

export const ArtistCard = memo(ArtistCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.artist, nextProps.artist)
})
