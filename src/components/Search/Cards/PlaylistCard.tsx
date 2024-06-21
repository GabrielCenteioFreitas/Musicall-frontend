import { PlaylistPortrait } from "@/components/Portraits/PlaylistPortrait";
import { Button } from "@/components/ui/button";
import { getPredominantColor } from "@/lib/getPredominantColor";
import { toBase64, shimmer } from "@/lib/shimmer";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface PlaylistCardProps {
  playlist: PreviewPlaylist;
}

const PlaylistCardComponent = async ({ playlist }: PlaylistCardProps) => {
  let predominantColor: string = '';
  if (playlist.portrait) {
    predominantColor = await getPredominantColor(playlist.portrait) || "#52525B"
  } else {
    predominantColor = "#52525B"
  }

  return (
    <Button
      variant="ghost"
      className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors group relative"
      asChild
    >
      <Link 
        href={`/playlists/${playlist.id}`}
        aria-label={`Acessar página da playlist "${playlist.name}"`}
      >
        <PlaylistPortrait
          playlist={playlist}
          iconClassName="size-32"
          className="rounded-md overflow-hidden"
          size={180}
          predominantColor={predominantColor}
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
              placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(20, 20))}`}
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
