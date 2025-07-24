import { Button } from "@/components/ui/button";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import Link from "next/link";
import { memo } from "react";
import { PlaylistPortrait } from "../../../Portraits/PlaylistPortrait";
import { FixPlaylistButton } from "./FixPlaylistButton";
import { getPredominantColor } from "@/lib/getPredominantColor";

interface PlaylistItemProps {
  playlist: PreviewPlaylist;
}

const PlaylistItemComponent = async ({ playlist }: PlaylistItemProps) => {
  let predominantColor: string = '';
  if (playlist.portrait) {
    predominantColor = await getPredominantColor(playlist.portrait) || "#52525B"
  } else {
    predominantColor = "#52525B"
  }

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
        <Link
          prefetch={false}
          href={`/playlists/${playlist.id}`}
          aria-label={`Acessar página da playlist ${playlist.name}`}
        >
          <div className="shrink-0 size-12 rounded-lg overflow-hidden">
            <PlaylistPortrait
              playlist={playlist}
              size={100}
              predominantColor={predominantColor}
            />
          </div>

          <div className="flex-1 flex flex-col gap-1 text-left max-w-[155px]">
            <span className="text-sm truncate ..." title={playlist.name}>
              {playlist.name}
            </span>
            <p className="text-zinc-400 truncate ..." title={playlist.user.name}>
              {playlist.songs.length === 1
                ? "1 item • "
                : playlist.songs.length > 1
                  ? `${playlist.songs.length} itens • `
                  : null
              }
              {playlist.user.name}
            </p>
          </div>
        </Link>
      </Button>
      
      <FixPlaylistButton
        playlist={playlist}
        className="absolute top-3 right-2 !bg-transparent !p-0"
      />
    </li>
  );
}

export const PlaylistItem = memo(PlaylistItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
