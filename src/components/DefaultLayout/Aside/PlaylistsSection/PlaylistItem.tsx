import { Button } from "@/components/ui/button";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { memo } from "react";
import { PlaylistPortrait } from "../../../PlaylistPortrait";
import Link from "next/link";
import { FixPlaylistButton } from "./FixPlaylistButton";

interface PlaylistItemProps {
  playlist: PreviewPlaylist;
}

const PlaylistItemComponent = ({ playlist }: PlaylistItemProps) => {
  return (
    <li className="w-full relative group">
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

          <div className="flex-1 flex flex-col gap-1 text-left max-w-[155px]">
            <span className="text-sm truncate ..." title={playlist.name}>
              {playlist.name}
            </span>
            <p className="text-zinc-400 truncate ..." title={playlist.user.name}>
              Playlist • {playlist.user.name}
            </p>
          </div>
        </Link>
      </Button>
      
      <FixPlaylistButton playlist={playlist} className="absolute top-3 right-2" />
    </li>
  );
}

export const PlaylistItem = memo(PlaylistItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
