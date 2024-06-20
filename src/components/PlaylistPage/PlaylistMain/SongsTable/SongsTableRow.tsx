import { TableCell, TableRow } from "@/components/ui/table";
import { PlaylistSong } from "@/types/song";
import Image from "next/image";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AddToPlaylist";
import { SmallFavoriteSongButton } from "@/components/FavoriteButtons/SmallFavoriteSongButton";
import { usePlayer } from "@/hooks/usePlayer";
import { Playlist } from "@/types/playlist";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';
import { memo, useCallback, useMemo } from "react";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { RemoveFromPlaylist } from "../RemoveFromPlaylist";
dayjs.locale(ptBr)

interface SongsTableRowProps {
  currentSong: PlaylistSong;
  isFavorited: boolean;
  i: number;
  isUserTheCreator: boolean;
  playlist: Playlist;
  previewPlaylists: PreviewPlaylist[] | null;
  predominantColor: string;
}

const SongsTableRowComponent = ({
  currentSong,
  isFavorited,
  i,
  isUserTheCreator,
  playlist,
  previewPlaylists,
  predominantColor,
}: SongsTableRowProps) => {
  const minutes = Math.floor(currentSong.song.durationInSeconds / 60)
  const seconds = Math.ceil(currentSong.song.durationInSeconds - (minutes * 60))

  const { playingSong, isPlaying, playSongInAGroup } = usePlayer();
  const isSongPlaying = currentSong.id === playingSong?.id;

  const handleClick = () => {
    playSongInAGroup({
      group: playlist.songs,
      isSongPlaying,
      songIndex: playlist.songs.indexOf(currentSong),
    });
  };

  return (
    <TableRow
      className="hover:bg-zinc-700/20 transition-all group"
      style={{
        backgroundColor: playingSong?.id === currentSong.id
          ? `${predominantColor}20`
          : ''
      }}
      onClick={handleClick}
    >
      <TableCell className="text-sm text-zinc-400 pl-3">
        {i+1}
      </TableCell>

      <TableCell className="flex items-center gap-2">
        <div className="h-full aspect-square relative shrink-0">
          <Image
            src={currentSong.song.portrait}
            alt={currentSong.song.name}
            width={48}
            height={48}
            className="rounded-lg h-full aspect-square object-cover"
          />

          <div
            className="
              absolute inset-0 size-full rounded-md 
              flex items-center justify-center bg-black/90
              opacity-0 group-hover:opacity-100 transition-opacity 
            "
          >
            {isPlaying && playingSong?.id === currentSong.id ? (
              <IoPauseSharp className="size-6"/>
            ) : (
              <IoPlaySharp className="size-5"/>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center text-left max-w-full overflow-hidden">
          <span
            title={currentSong.song.name}
            className="text-md font-medium truncate ..."
          >
            {currentSong.song.name}
          </span>
          <Link
            href={`/artists/${currentSong.song.artist.iTunesId}`}
            title={currentSong.song.artist.name}
            className="w-fit text-xs hover:underline text-zinc-400 line-clamp-2 text-wrap truncate ..."
            onClick={(e) => e.stopPropagation()}
          >
            {currentSong.song.artist.name}
          </Link>
        </div>
      </TableCell>

      <TableCell className="text-sm text-zinc-400 truncate ... overflow-hidden" title={currentSong.song.album.name}>
        <Link
          href={`/albums/${currentSong.song.album.iTunesId}`}
          className="hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {currentSong.song.album.name}
        </Link>
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

          <SmallFavoriteSongButton
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
  return Object.is(prevProps.currentSong, nextProps.currentSong) && prevProps.i === nextProps.i
})