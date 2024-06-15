'use client'

import { TableHead } from "@/components/TableHead";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ITunesAlbum } from "@/types/album";
import { FavoriteAlbum } from "@/types/favorites";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { AlbumsTableRow } from "./AlbumsTableRow";


interface AlbumsTableProps {
  albums: ITunesAlbum[];
  favoriteAlbums: FavoriteAlbum[] | null;
  previewPlaylists: PreviewPlaylist[] | null;
}

export const AlbumsTable = ({ albums, favoriteAlbums, previewPlaylists }: AlbumsTableProps) => {
  if (!albums?.length) {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search');
  
    if (searchParam) {
      return <span>Esse artista não possui nenhum álbum relacionada a sua pesquisa.</span>
    } else {
      return <span>Esse artista não possui nenhum álbum.</span>
    }
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader className="text-md text-zinc-200/40">
        <TableRow className="border-b border-b-zinc-200/40 text-left">
          <TableHead className="w-10 pl-3">#</TableHead>
          <TableHead className="w-full px-2">Álbum</TableHead>
          <TableHead className="w-48">Músicas</TableHead>
          <TableHead className="w-52">Gênero</TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {albums.map((album, i) => 
          <AlbumsTableRow
            key={album.collectionId}
            i={i}
            album={album}
            isFavorited={favoriteAlbums?.some(
              favoritedAlbum => favoritedAlbum.album.iTunesId === album.collectionId
            ) || false}
            previewPlaylists={previewPlaylists}
          />
        )}
      </TableBody>
    </Table>
  );
}
