import { FavoriteAlbumButton } from "@/components/FavoriteButtons/FavoriteAlbumButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ITunesAlbum } from "@/types/album";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

interface AlbumCardProps {
  album: Pick<ITunesAlbum,
    'collectionId' |
    'collectionName' |
    'collectionViewUrl' |
    'artistName' |
    'artworkUrl100'
  >
  isFavorited: boolean;
}

const AlbumCardComponent = ({ album, isFavorited }: AlbumCardProps) => {
  return (
    <div className="group relative">
      <Button
        variant="ghost"
        className="h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors"
        asChild
      >
        <Link href={`/albums/${album.collectionId}`}>
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
        </Link>
      </Button>

      <FavoriteAlbumButton
        isFavorited={isFavorited}
        album={album}
        className={cn("absolute right-4 bg-zinc-950 text-gray-50 transition-all duration-200",
          isFavorited ? "top-4" : "top-0 group-hover:top-4 opacity-0 group-hover:opacity-100"
        )}
      />
    </div>
  );
}

export const AlbumCard = memo(AlbumCardComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.album, nextProps.album)
})
