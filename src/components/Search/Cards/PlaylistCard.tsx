import { PlaylistPortrait } from "@/components/Portraits/PlaylistPortrait";
import { Button } from "@/components/ui/button";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface PlaylistCardProps {
  playlist: PreviewPlaylist;
}

const PlaylistCardComponent = ({ playlist }: PlaylistCardProps) => {
  return (
    <Button
      variant="ghost"
      className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors group relative"
      asChild
    >
      <Link href={`/playlists/${playlist.id}`}>
        <PlaylistPortrait
          playlist={playlist}
          iconClassName="size-32"
          className="rounded-md overflow-hidden"
          size={180}
        />

        <div className="flex flex-col gap-2.5 self-start text-left w-full">
          <span className="text-lg font-medium leading-none truncate ..." title={playlist.name}>
            {playlist.name}
          </span>
          <div className="flex items-center gap-1" title={playlist.user.name}>
            <Image
              src={playlist.user?.avatarUrl}
              alt={playlist.user?.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="text-xs text-zinc-400 leading-none truncate ...">
              {playlist.user.name}
            </span>
          </div>
        </div>
      </Link>
    </Button>
  );
}

export const PlaylistCard = memo(PlaylistCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
