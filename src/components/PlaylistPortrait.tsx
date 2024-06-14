import { cn } from "@/lib/utils";
import { Playlist } from "@/types/playlist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import Image from "next/image";
import { ImHeadphones } from "react-icons/im";

interface PlaylistPortraitProps {
  playlist: PreviewPlaylist | Playlist;
  size: number;
  className?: string;
  iconClassName?: string;
}

export const PlaylistPortrait = ({ playlist, size=50, className, iconClassName }: PlaylistPortraitProps) => {
  const differentPortraits = Array.from(
    new Set(playlist.songs?.map(
      curSong => curSong.song.portrait
    ))
  );

  const ImageComponent = ({ className, i }: { className?: string, i?: number }) => {
    return (
      <Image
        className={cn("w-full aspect-square object-cover bg-zinc-600", className)}
        src={i !== undefined ? differentPortraits[i] : playlist.portrait}
        alt={playlist.name}
        width={size}
        height={size}
        priority
      />
    )
  }
  
  if (playlist.portrait) {
    return (
      <ImageComponent className={className} />
    )
  }

  if (differentPortraits) {
    switch(differentPortraits.length) {
      case 0:
        return (
          <div
            className={cn("size-full aspect-square bg-zinc-600 grid place-content-center", className)}
          >
            <ImHeadphones size={32} className={cn("text-zinc-300 size-8", iconClassName)} />
          </div>
        )
      case 1:
        return <ImageComponent i={0} className={className} />
      case 2:
      case 3:
        return (
          <div
            className={cn(
              "w-full aspect-square grid",
              className
            )}
            style={{
              gridTemplateColumns: `repeat(${differentPortraits.length}, 1fr)`
            }}
          >
            {differentPortraits.map((_, i) => (
              <div className="" key={i}>
                <ImageComponent i={i} className="!h-full !w-auto" />
              </div>
            ))}
          </div>
        )
      default: 
        return (
          <div className={cn("size-full aspect-square grid grid-cols-2 grid-rows-2", className)}>
            {differentPortraits.slice(0, 4).map((_, i) => 
              <ImageComponent key={i} i={i} className={`
                ${i < 2 ? 'top-0' : 'bottom-0'}
                ${i % 2 === 0 ? 'left-0' : 'right-0'}`}
              />
            )}
          </div>
        )
    }
  }
}
