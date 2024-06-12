import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Song } from "@/types/song";
import { LuClock } from "react-icons/lu";
import { MoreSongsTableRow } from "./MoreSongsTableRow";

interface MoreSongsTableProps {
  songs: Song[];
  page: number;
}

export const MoreSongsTable = ({ songs, page }: MoreSongsTableProps) => {
  return (
    <Table className="w-full table-fixed">
      <TableHeader className="text-md text-zinc-200/40">
        <TableRow className="border-b border-b-zinc-200/40 text-left">
        <TableHead className="w-9 font-normal pl-3">#</TableHead>
          <TableHead className="w-1/2 font-normal">Título</TableHead>
          <TableHead className="w-1/2 font-normal">Álbum</TableHead>
          <TableHead className="w-16 font-normal"><LuClock size={20} /></TableHead>
          <TableHead className="w-28 font-normal"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>        
        {songs && songs.map((song, i) => 
          <MoreSongsTableRow
            key={song.trackId}
            i={i+(10*(page-1))}
            song={song}
          />
        )}
      </TableBody>
    </Table>
  );
}
