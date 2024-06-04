import { getRandomColor } from "@/utils/getRandomColor";
import { Button } from "../../ui/button";

interface ArtistCardProps {
  artist: {
    name: string;
    portrait?: string;
  };
  className?: string;
}

export const ArtistCard = ({ artist, className }: ArtistCardProps) => {
  return (
    <Button variant="ghost" className="w-52 h-fit p-3 flex flex-col gap-3 shrink-0 rounded-lg transition-colors">
      {artist.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="size-full rounded-full"
          src={artist.portrait}
          alt={artist.name}
        />
      ) : (
        <div
          className="w-full aspect-square rounded-full"
          style={{ backgroundColor: getRandomColor() }}
        />
      )}

      <div className="flex flex-col gap-2 self-start text-left max-w-full">
        <span className="text-lg font-medium leading-tight truncate ...">
          {artist.name}
        </span>
        <span className="text-xs text-zinc-400 leading-snug line-clamp-2 text-wrap truncate ...">
          Artista
        </span>
      </div>
    </Button>
  );
}
