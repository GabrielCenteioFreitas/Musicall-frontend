import { getRandomColor } from "@/utils/getRandomColor";
import { Button } from "../../ui/button";

interface PlaylistCardProps {
  playlist: {
    name: string;
    portrait?: string;
    creator?: string;
  };
  className?: string;
}

export const PlaylistCard = ({ playlist, className }: PlaylistCardProps) => {
  return (
    <Button variant="ghost" className="w-52 h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors">
      {playlist.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="size-full rounded-md"
          src={playlist.portrait}
          alt={playlist.name}
        />
      ) : (
        <div
          className="w-full aspect-square rounded-md"
          style={{ backgroundColor: getRandomColor() }}
        />
      )}

      <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
          <span className="text-lg font-medium leading-none truncate ...">
            {playlist.name}
          </span>
        {playlist.creator && (
          <span className="text-xs text-zinc-400 leading-none truncate ...">
            De {playlist.creator}
          </span>
        )}
      </div>
    </Button>
  );
}
