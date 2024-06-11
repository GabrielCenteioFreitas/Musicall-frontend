import { PlaylistPortrait } from "@/components//PlaylistPortrait";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FixPlaylistButton } from "@/components/DefaultLayout/Aside/PlaylistsSection/FixPlaylistButton";
import { memo } from "react";

interface PlaylistCardProps {
  playlist: PreviewPlaylist;
  className?: string;
}

const PlaylistCardComponent = ({ playlist, className }: PlaylistCardProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("w-52 h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors relative group", className)}
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
          <span className="text-lg font-medium leading-none truncate ..." title={playlist.name}>
            {playlist.name}
          </span>
          <span className="text-xs text-zinc-400 leading-none truncate ..." title={playlist.songs.length.toString()}>
            {playlist.songs.length === 1
              ? "1 item"
              : playlist.songs.length > 1
                ? `${playlist.songs.length} itens`
                : null
            }
          </span>
        </div>

        <FixPlaylistButton className="absolute top-5 right-5" playlist={playlist} />
      </Link>
    </Button>
  );
}

export const PlaylistCard = memo(PlaylistCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
