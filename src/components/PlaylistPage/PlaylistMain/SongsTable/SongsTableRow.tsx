import { TableCell, TableRow } from "@/components/ui/table";
import { PlaylistSong } from "@/types/playlistSong";
import Image from "next/image";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AddToPlaylist";
import { FavoriteSongButton } from "@/components/FavoriteSongButton";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { memo } from "react";
import { RemoveFromPlaylist } from "../RemoveFromPlaylist";
dayjs.locale(ptBr)

interface SongsTableRowProps {
  currentSong: PlaylistSong;
  isFavorited: boolean;
  i: number;
  isUserTheCreator: boolean;
  playlist: {
    name: string;
    id: string;
    userId: string;
  }
  previewPlaylists: PreviewPlaylist[] | null;
}

const SongsTableRowComponent = ({
  currentSong,
  isFavorited,
  i,
  isUserTheCreator,
  playlist,
  previewPlaylists
}: SongsTableRowProps) => {
  const minutes = Math.floor(currentSong.song.durationInSeconds / 60)
  const seconds = Math.ceil(currentSong.song.durationInSeconds - (minutes * 60))

  return (
    <TableRow key={`${currentSong.id}`} className="hover:bg-zinc-700/20 transition-all">
      <TableCell className="text-sm text-zinc-400 pl-3">
        {i+1}
      </TableCell>

      <TableCell className="py-2">
        <Link href="#" className="flex items-center gap-2">
          <Image
            src={currentSong.song.portrait}
            alt={currentSong.song.name}
            width={48}
            height={48}
            className="rounded-lg h-full aspect-square"
          />

          <div className="flex flex-col justify-center text-left max-w-[360px] overflow-hidden">
            <span className="text-md font-medium truncate ..." title={currentSong.song.name}>
              {currentSong.song.name}
            </span>
            <span className="text-xs text-zinc-400 line-clamp-2 text-wrap truncate ..." title={currentSong.song.artist.name}>
              {currentSong.song.artist.name}
            </span>
          </div>
        </Link>
      </TableCell>

      <TableCell className="text-sm text-zinc-400 truncate ... overflow-hidden" title={currentSong.song.album.name}>
        {currentSong.song.album.name}
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {dayjs(currentSong.addedAt).format("D[ de ]MMM[. de ]YYYY")}
      </TableCell>

      <TableCell className="pr-3">
        <div className="flex gap-1.5">
          <AddToPlaylist
            previewPlaylists={previewPlaylists}
            song={{
              trackId: currentSong.song.iTunesId,
              artistId: currentSong.song.artist.iTunesId,
              collectionId: currentSong.song.album.iTunesId,
            }}
            className="text-zinc-400"
          />

          <FavoriteSongButton
            isFavorited={isFavorited}
            song={{
              trackId: currentSong.song.iTunesId,
              collectionId: currentSong.song.album.iTunesId,
              artistId: currentSong.song.artist.iTunesId,
            }}
          />

          {isUserTheCreator && (
            <RemoveFromPlaylist
              playlist={playlist}
              songId={currentSong.id}
            />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export const SongsTableRow = memo(SongsTableRowComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.currentSong, nextProps.currentSong)
})