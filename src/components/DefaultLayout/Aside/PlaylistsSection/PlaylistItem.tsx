import { Button } from "@/components/ui/button";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { memo } from "react";
import { PlaylistPortrait } from "../../../PlaylistPortrait";
import Link from "next/link";

interface PlaylistItemProps {
  playlist: PreviewPlaylist;
}

const PlaylistItemComponent = ({ playlist }: PlaylistItemProps) => {
  return (
    <li className="w-full">
      <Button
        variant="ghost"
        className={`
          h-fit flex justify-start items-center rounded-lg gap-2 p-2 w-full
          bg-transparent hover:!bg-zinc-900
        `}
        asChild
      >
        <Link href={`/playlists/${playlist.id}`}>
          <div className="shrink-0 size-12 rounded-lg overflow-hidden">
            <PlaylistPortrait playlist={playlist} size={100} />
          </div>

          <div className="flex flex-col gap-1 text-left max-w-44">
            <span className="text-sm truncate ...">{playlist.name}</span>
            <p className="text-zinc-400 truncate ...">Playlist • {playlist.user.name}</p>
          </div>
        </Link>
      </Button>
    </li>
  );
}

export const PlaylistItem = memo(PlaylistItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
