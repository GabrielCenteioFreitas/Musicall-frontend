import { getRandomColor } from "@/utils/getRandomColor";
import { Button } from "../../ui/button";

interface SongCardProps {
  song: {
    name: string;
    portrait?: string;
    artists: string;
  };
  className?: string;
}

export const SongCard = ({ song, className }: SongCardProps) => {
  return (
    <Button variant="ghost" className="w-52 h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors">
      {song.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="size-full rounded-md"
          src={song.portrait}
          alt={song.name}
        />
      ) : (
        <div
          className="w-full aspect-square rounded-md"
          style={{ backgroundColor: getRandomColor() }}
        />
      )}

      <div className="flex flex-col gap-2 self-start text-left max-w-full">
        <span className="text-lg font-medium leading-tight truncate ...">
          {song.name}
        </span>
        <span className="text-xs text-zinc-400 leading-snug line-clamp-2 text-wrap truncate ...">
          {song.artists}
        </span>
      </div>
    </Button>
  );
}
