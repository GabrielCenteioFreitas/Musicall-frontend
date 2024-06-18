import {
  Table,
  TableBody,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ITunesSong } from "@/types/song";
import { LuClock } from "react-icons/lu";
import { MoreSongsTableRow } from "./MoreSongsTableRow";
import { TableHead } from "@/components/TableHead";

interface MoreSongsTableProps {
  songs: ITunesSong[];
  page: number;
}

export const MoreSongsTable = ({ songs, page }: MoreSongsTableProps) => {
  return (
    <Table className="w-full table-fixed">
      <TableHeader className="text-md text-zinc-200/40">
        <TableRow className="border-b border-b-zinc-200/40 text-left">
          <TableHead className="w-9 pl-3">#</TableHead>
          <TableHead className="w-1/2">Título</TableHead>
          <TableHead className="w-1/2">Álbum</TableHead>
          <TableHead className="w-16"><LuClock size={20} /></TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>        
        {songs && songs.map((song, i) => 
          <MoreSongsTableRow
            key={song.trackId}
            i={i+(10*(page-1))}
            song={song}
            moreSongs={songs}
          />
        )}
      </TableBody>
    </Table>
  );
}
