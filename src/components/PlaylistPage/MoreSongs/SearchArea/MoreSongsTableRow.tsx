import { TableCell, TableRow } from "@/components/ui/table";
import { ITunesSong } from "@/types/song";
import Link from "next/link";
import Image from "next/image";
import { AddToPlaylist } from "./AddToPlaylist";

interface MoreSongsTableRowProps {
  song: ITunesSong;
  i: number;
}

export const MoreSongsTableRow = ({ song, i }: MoreSongsTableRowProps) => {
  const durationInSeconds = Math.floor(song.trackTimeMillis / 1000)
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.ceil(durationInSeconds - (minutes * 60))

  return (
    <TableRow className="hover:bg-zinc-700/20 transition-all">
      <TableCell className="pl-3">
        {i+1}
      </TableCell>

      <TableCell className="py-2">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src={song.artworkUrl100}
            alt={song.trackName}
            width={48}
            height={48}
            className="rounded-lg h-full aspect-square"
          />

          <div className="flex flex-col justify-center text-left max-w-[360px]">
            <span className="text-md font-medium truncate ..." title={song.trackName}>
              {song.trackName}
            </span>
            <span className="text-xs text-zinc-400 line-clamp-2 text-wrap truncate ..." title={song.artistName}>
              {song.artistName}
            </span>
          </div>
        </Link>
      </TableCell>

      <TableCell className="text-sm text-zinc-400 truncate ..." title={song.collectionName}>
        {song.collectionName}
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </TableCell>

      <TableCell className="pr-3">
        <AddToPlaylist song={song} />
      </TableCell>
    </TableRow>
  );
}
