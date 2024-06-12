'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { PlaylistSong } from "@/types/playlistSong";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { LuClock } from "react-icons/lu";
import { SongsTableRow } from "./SongsTableRow";
import { SongsTableHead } from "./SongsTableHead";


interface SongsTableProps {
  playlist: {
    name: string;
    id: string;
    userId: string;
  }
  songs: PlaylistSong[];
  previewPlaylists: PreviewPlaylist[] | null;
  isUserTheCreator: boolean;
}

export const SongsTable = ({ playlist, songs, previewPlaylists, isUserTheCreator }: SongsTableProps) => {
  if (!songs?.length) {
    const url = new URL(window.location.toString());
    const searchParam = url.searchParams.get('search');
  
    if (searchParam) {
      return <span>Sua playlist não possui nenhuma música relacionada a sua pesquisa.</span>
    } else {
      return <span>Sua playlist não possui nenhuma música.</span>
    }
  }

  return (
    <Table className="w-full table-fixed">
      <TableHeader className="text-md text-zinc-200/40">
        <TableRow className="border-b border-b-zinc-200/40 text-left">
          <SongsTableHead className="w-9 pl-3">#</SongsTableHead>
          <SongsTableHead className="w-1/2">Título</SongsTableHead>
          <SongsTableHead className="w-1/2">Álbum</SongsTableHead>
          <SongsTableHead className="w-16"><LuClock size={20} /></SongsTableHead>
          <SongsTableHead className="w-44">Adicionada em</SongsTableHead>
          <SongsTableHead className="w-28"></SongsTableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((currentSong, i) => 
          <SongsTableRow
            key={currentSong.id}
            i={i}
            currentSong={currentSong}
            playlist={playlist}
            previewPlaylists={previewPlaylists}
            isUserTheCreator={isUserTheCreator}
          />
        )}
      </TableBody>
    </Table>
  );
}
