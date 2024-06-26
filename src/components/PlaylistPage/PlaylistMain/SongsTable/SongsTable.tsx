'use client'

import {
  Table,
  TableBody,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FavoriteSong } from "@/types/favorites";
import { PlaylistSong } from "@/types/song";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { LuClock } from "react-icons/lu";
import { TableHead } from "@/components/TableHead";
import { SongsTableRow } from "./SongsTableRow";
import { Playlist } from "@/types/playlist";

interface SongsTableProps {
  playlist: Playlist;
  songs: PlaylistSong[];
  favoriteSongs: FavoriteSong[] | null;
  previewPlaylists: PreviewPlaylist[] | null;
  isUserTheCreator: boolean;
  predominantColor: string;
}

export const SongsTable = ({ playlist, songs, favoriteSongs, previewPlaylists, isUserTheCreator, predominantColor }: SongsTableProps) => {
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
          <TableHead className="w-9 pl-3">#</TableHead>
          <TableHead className="w-1/2">Título</TableHead>
          <TableHead className="w-1/2">Álbum</TableHead>
          <TableHead className="w-16"><LuClock size={20} aria-label="Duração da música" /></TableHead>
          <TableHead className="w-44">Adicionada em</TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((currentSong, i) => 
          <SongsTableRow
            key={currentSong.id}
            i={i}
            currentSong={currentSong}
            isFavorited={favoriteSongs?.some(
              favoritedSong => favoritedSong.song.iTunesId === currentSong.song.iTunesId
            ) || false}
            playlist={playlist}
            previewPlaylists={previewPlaylists}
            isUserTheCreator={isUserTheCreator}
            predominantColor={predominantColor}
          />
        )}
      </TableBody>
    </Table>
  );
}
