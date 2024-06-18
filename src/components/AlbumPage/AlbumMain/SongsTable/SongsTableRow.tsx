import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";

import { AddToPlaylist } from "@/components/AddToPlaylist";
import { SmallFavoriteSongButton } from "@/components/FavoriteButtons/SmallFavoriteSongButton";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { ITunesSong } from "@/types/song";
import { memo } from "react";
import { iTunesToPlaying } from "@/lib/iTunesToPlaying";
import { usePlayer } from "@/hooks/usePlayer";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface SongsTableRowProps {
  song: ITunesSong;
  albumSongs: ITunesSong[];
  isFavorited: boolean;
  previewPlaylists: PreviewPlaylist[] | null;
  predominantColor: string;
  i: number;
}

const SongsTableRowComponent = ({
  song,
  albumSongs,
  isFavorited,
  previewPlaylists,
  predominantColor,
  i,
}: SongsTableRowProps) => {
  const durationInSeconds = song.trackTimeMillis / 1000
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.ceil(durationInSeconds - (minutes * 60))

  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isSongPlaying = 
    song.trackId === playingSong?.song.iTunesId && 
    song.collectionId === playingSong?.song.album.iTunesId

  const handleClick = () => {
    if (isSongPlaying) {
      if (isPlaying) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        currentSound?.play()
      }
    } else {
      const songIndex = albumSongs.indexOf(song)
      currentSound?.stop()
      addCurrentToPrev()
      setPlayingSong(iTunesToPlaying(song))
      setNextSongs([
        ...albumSongs
          .slice(songIndex+1, albumSongs.length)
          .map(song => iTunesToPlaying(song)),
        ...albumSongs
          .slice(0, songIndex)
          .map(song => iTunesToPlaying(song)),
      ])
      setIsPlaying(true)
    }
  }

  return (
    <TableRow
      className="hover:bg-zinc-700/20 transition-all group"
      style={{
        backgroundColor: isSongPlaying
          ? `${predominantColor}20`
          : ''
      }}
      onClick={handleClick}
    >
      <TableCell className="text-base text-zinc-400 pl-3">
        <div className="flex items-center">
          <span className="group-hover:size-0 group-hover:opacity-0">
            {i+1}
          </span>
          
          <div className="opacity-0 size-0 -mb-1.5
            group-hover:size-6 group-hover:opacity-100
          ">
            {isSongPlaying && isPlaying ? (
              <IoPauseSharp className="size-6 -ml-0.5 -mt-1"/>
            ) : (
              <IoPlaySharp className="size-5"/>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="max-w-[360px] py-2.5 px-2 flex flex-col justify-center text-left overflow-hidden">
        <span className="text-base font-medium truncate ..." title={song.trackName}>
          {song.trackName}
        </span>
        <Link href={`/artists/${song.artistId}`} className="w-fit">
          <span className="text-sm hover:underline text-zinc-400 text-wrap truncate ..." title={song.artistName}>
            {song.artistName}
          </span>
        </Link>
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </TableCell>

      <TableCell className="pr-3" onClick={(e) => e.stopPropagation()}>
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