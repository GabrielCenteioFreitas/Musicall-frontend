import { FixPlaylistButton } from "@/components/DefaultLayout/Aside/PlaylistsSection/FixPlaylistButton";
import { PlaylistPortrait } from "@/components/Portraits/PlaylistPortrait";
import { cn } from "@/lib/utils";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import Link from "next/link";
import { memo } from "react";
import { Button } from "./ui/button";
import { getPredominantColor } from "@/lib/getPredominantColor";

interface PlaylistCardProps {
  playlist: PreviewPlaylist;
  className?: string;
  section: 'home' | 'library' | 'profile';
}

const PlaylistCardComponent = async ({ playlist, className, section }: PlaylistCardProps) => {
  let predominantColor: string = '';
  if (playlist.portrait) {
    predominantColor = await getPredominantColor(playlist.portrait) || "#52525B"
  } else {
    predominantColor = "#52525B"
  }

  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className={cn("h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors", className)}
        asChild
      >
        <Link
          prefetch={false}
          href={`/playlists/${playlist.id}`}
          aria-label={`Acessar página da playlist "${playlist.name}"`}
        >
          <PlaylistPortrait
            playlist={playlist}
            iconClassName="size-32"
            className="rounded-md overflow-hidden"
            size={200}
            predominantColor={predominantColor}
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
        </Link>
      </Button>

      {(section === 'home' || section === 'library') && (
        <FixPlaylistButton
          className={cn("absolute", playlist.isFixed ? "top-5 right-5" : "top-4 right-4")}
          playlist={playlist}
        />
      )}
    </div>
  );
}

export const PlaylistCard = memo(PlaylistCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.playlist, nextProps.playlist)
})
