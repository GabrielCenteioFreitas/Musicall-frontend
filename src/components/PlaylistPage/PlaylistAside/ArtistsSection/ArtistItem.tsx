import { Button } from "@/components/ui/button";
import { getInitialLetters } from "@/utils/getInitalLetters";

interface ArtistItemProps {
  artist: {
    id: string;
    name: string;
  }
}

export const ArtistItem = ({ artist }: ArtistItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="ghost"
        className="w-full h-fit p-2 !pr-4 flex items-center justify-start gap-3 rounded-2xl transition-colors group"
      >
        <div
          className="
          size-14 rounded-full flex items-center justify-center shrink-0
          bg-zinc-900 border-4 border-zinc-800 group-hover:border-zinc-500
          text-zinc-400 group-hover:text-zinc-200 font-semibold text-lg transition-colors
        ">
          {getInitialLetters(artist.name)}
        </div>

        <div className="flex flex-col gap-0 justify-center text-left max-w-60">
          <span className="text-lg font-medium truncate ...">
            {artist.name}
          </span>
          <span className="text-xs text-zinc-400 truncate ...">
            Artista
          </span>
        </div>
      </Button>
    </li>
  );
}
