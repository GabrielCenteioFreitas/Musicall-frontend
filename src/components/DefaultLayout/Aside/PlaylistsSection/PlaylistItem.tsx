import { Button } from "@/components/ui/button";
import { getRandomColor } from "@/utils/getRandomColor";
import Image from "next/image";

interface PlaylistItemProps {
  playlist: {
    name: string;
    portrait?: string;
    creator: string;
  };
  active?: boolean;
}

export const PlaylistItem = ({ playlist, active=false }: PlaylistItemProps) => {
  return (
      <li className="w-full">
        <Button
          variant="ghost"
          className={`
            h-fit flex justify-start items-center rounded-lg gap-2 p-2 w-full
            ${active ? "bg-zinc-800 hover:bg-zinc-800" : "bg-transparent hover:!bg-zinc-900"}
          `}
        >
          <div className="shrink-0 size-12 rounded-lg overflow-hidden">
            {playlist.portrait ? (
              <Image className="size-full object-cover" src={playlist.portrait} alt={playlist.name} />
            ) : (
              <div className="size-full" style={{ backgroundColor: getRandomColor() }} />
            )}
          </div>

          <div className="flex flex-col gap-1 text-left max-w-44">
            <span className="text-sm truncate ...">{playlist.name}</span>
            <p className="text-zinc-400 truncate ...">Playlist • {playlist.creator}</p>
          </div>
        </Button>
      </li>
  );
}
