import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AlbumPage/AlbumMain/AddToPlaylist";
import { SmallFavoriteAlbumButton } from "@/components/FavoriteButtons/SmallFavoriteAlbumButton";
import { ITunesAlbum } from "@/types/album";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { memo } from "react";
import Image from "next/image";

interface AlbumsTableRowProps {
  album: ITunesAlbum;
  isFavorited: boolean;
  i: number;
  previewPlaylists: PreviewPlaylist[] | null;
}

const AlbumsTableRowComponent = ({
  album,
  isFavorited,
  i,
  previewPlaylists
}: AlbumsTableRowProps) => {
  return (
    <TableRow className="hover:bg-zinc-700/20 transition-all">
      <TableCell className="text-base text-zinc-400 pl-3">
        {i+1}
      </TableCell>

      <TableCell className="flex items-center gap-2 px-2 py-2.5">
        <Link href={`/albums/${album.collectionId}`}>
          <Image
            src={album.artworkUrl100}
            alt={album.collectionName}
            width={48}
            height={48}
            className="rounded-lg h-full aspect-square"
          />
        </Link>

        <div className="flex flex-col justify-center text-left max-w-full overflow-hidden">
          <Link
            href={`/albums/${album.collectionId}`}
            title={album.collectionName}
            className="w-fit text-base font-medium truncate ..."
          >
            {album.collectionName}
          </Link>

          <Link
            href={`/artists/${album.artistId}`}
            title={album.artistName}
            className="w-fit text-sm hover:underline text-zinc-400 text-wrap truncate ..."
          >
            {album.artistName}
          </Link>
        </div>
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {album.trackCount === 0
          ? ""
          : album.trackCount === 1
            ? "1 música"
            : `${album.trackCount} músicas`
        } 
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {album.primaryGenreName}
      </TableCell>

      <TableCell className="pr-3">
        <div className="flex gap-1.5">
          <AddToPlaylist
            previewPlaylists={previewPlaylists}
            album={album}
            className="text-zinc-400"
          />

          <SmallFavoriteAlbumButton
            isFavorited={isFavorited}
            album={album}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export const AlbumsTableRow = memo(AlbumsTableRowComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.album, nextProps.album) && prevProps.i === nextProps.i
})