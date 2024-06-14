import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AddToPlaylist";
import { SmallFavoriteSongButton } from "@/components/FavoriteButtons/SmallFavoriteSongButton";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import { memo } from "react";

interface SongsTableRowProps {
  song: ITunesSong;
  isFavorited: boolean;
  i: number;
  previewPlaylists: PreviewPlaylist[] | null;
}

const SongsTableRowComponent = ({
  song,
  isFavorited,
  i,
  previewPlaylists
}: SongsTableRowProps) => {
  const durationInSeconds = song.trackTimeMillis / 1000
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.ceil(durationInSeconds - (minutes * 60))

  return (
    <TableRow className="hover:bg-zinc-700/20 transition-all">
      <TableCell className="text-base text-zinc-400 pl-3">
        {i+1}
      </TableCell>

      <TableCell className="py-2.5 px-2">
        <Link
          href="#"
          className="flex flex-col justify-center text-left max-w-[360px] overflow-hidden"
        >
          <span className="text-base font-medium truncate ..." title={song.trackName}>
            {song.trackName}
          </span>
          <span className="text-sm text-zinc-400 text-wrap truncate ..." title={song.artistName}>
            {song.artistName}
          </span>
        </Link>
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </TableCell>

      <TableCell className="pr-3">
        <div className="flex gap-1.5">
          <AddToPlaylist
            previewPlaylists={previewPlaylists}
            song={song}
            className="text-zinc-400"
          />

          <SmallFavoriteSongButton
            isFavorited={isFavorited}
            song={song}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export const SongsTableRow = memo(SongsTableRowComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.song, nextProps.song) && prevProps.i === nextProps.i
})