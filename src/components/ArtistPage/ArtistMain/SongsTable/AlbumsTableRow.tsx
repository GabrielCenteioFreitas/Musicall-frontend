import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AlbumPage/AlbumMain/AddToPlaylist";
import { SmallFavoriteAlbumButton } from "@/components/FavoriteButtons/SmallFavoriteAlbumButton";
import { ITunesAlbum } from "@/types/album";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toBase64, shimmer } from "@/lib/shimmer";

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
  const router = useRouter()

  return (
    <TableRow
      className="hover:bg-zinc-700/20 transition-all cursor-pointer"
      onClick={() => router.push(`/albums/${album.collectionId}`)}
    >
      <TableCell className="text-base text-zinc-400 pl-3">
        {i+1}
      </TableCell>

      <TableCell className="flex items-center gap-2 px-2 py-2.5">
        <Image
          src={album.artworkUrl100}
          alt={album.collectionName}
          width={48}
          height={48}
          className="rounded-lg h-full aspect-square"
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(48, 48))}`}
        />

        <div className="flex flex-col justify-center text-left max-w-full overflow-hidden">
          <span
            title={album.collectionName}
            className="w-fit text-base font-medium truncate ..."
          >
            {album.collectionName}
          </span>

          <Link
            href={`/artists/${album.artistId}`}
            title={album.artistName}
            className="w-fit text-sm hover:underline text-zinc-400 text-wrap truncate ..."
            onClick={(e) => e.stopPropagation()}
            aria-label={`Acessar página do álbum ${album.collectionName}`}
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

      <TableCell className="pr-3" onClick={(e) => e.stopPropagation()}>
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