import { PlaylistPortrait } from "@/components//PlaylistPortrait";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { Button } from "../../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PlaylistCardProps {
  playlist: PreviewPlaylist;
  className?: string;
}

export const PlaylistCard = ({ playlist, className }: PlaylistCardProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("w-52 h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors", className)}
      asChild
    >
      <Link href={`/playlists/${playlist.id}`}>
        <PlaylistPortrait
          playlist={playlist}
          iconClassName="size-32"
          className="rounded-md overflow-hidden"
          size={180}
        />

        <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
          <span className="text-lg font-medium leading-none truncate ...">
            {playlist.name}
          </span>
          <span className="text-xs text-zinc-400 leading-none truncate ...">
            De {playlist.user?.name}
          </span>
        </div>
      </Link>
    </Button>
  );
}
