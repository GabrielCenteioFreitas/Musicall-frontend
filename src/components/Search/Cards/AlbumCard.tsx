import { Button } from "@/components/ui/button";
import { Album } from "@/types/album";
import Image from "next/image";
import { memo } from "react";

interface AlbumCardProps {
  album: Pick<Album,
    'collectionId' |
    'collectionName' |
    'collectionViewUrl' |
    'artistName' |
    'artworkUrl100'
  >
}

const AlbumCardComponent = ({ album }: AlbumCardProps) => {
  return (
    <Button
      variant="ghost"
      className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors"
      asChild
    >
      <a href={album.collectionViewUrl} target="_blank">
        <Image
          className="size-full rounded-md"
          src={album.artworkUrl100}
          alt={album.collectionName}
          width={100}
          height={100}
        />

        <div className="flex flex-col gap-2.5 self-start text-left max-w-full">
          <span className="text-lg font-medium leading-none truncate ..." title={album.collectionName}>
            {album.collectionName}
          </span>
          <span className="text-xs text-zinc-400 leading-none truncate ..." title={album.artistName}>
            De {album.artistName}
          </span>
        </div>
      </a>
    </Button>
  );
}

export const AlbumCard = memo(AlbumCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.album, nextProps.album)
})
