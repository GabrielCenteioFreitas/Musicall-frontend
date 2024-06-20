import { TableCell, TableRow } from "@/components/ui/table";
import { ITunesSong } from "@/types/song";
import Link from "next/link";
import Image from "next/image";
import { AddToPlaylist } from "./AddToPlaylist";
import { usePlayer } from "@/hooks/usePlayer";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { iTunesToPlaying } from "@/lib/iTunesToPlaying";
import { toBase64, shimmer } from "@/lib/shimmer";

interface MoreSongsTableRowProps {
  song: ITunesSong;
  moreSongs: ITunesSong[];
  i: number;
}

export const MoreSongsTableRow = ({ song, moreSongs, i }: MoreSongsTableRowProps) => {
  const durationInSeconds = Math.floor(song.trackTimeMillis / 1000)
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.ceil(durationInSeconds - (minutes * 60))

  const { playingSong, isPlaying, playSongInAGroup } = usePlayer()
  const isSongPlaying = 
    song.trackId === playingSong?.song.iTunesId && 
    song.collectionId === playingSong?.song.album.iTunesId

  const handleClick = () => {
    playSongInAGroup({
      group: moreSongs.map((song) => iTunesToPlaying(song)),
      isSongPlaying,
      songIndex: moreSongs.indexOf(song),
    })
  }

  return (
    <TableRow
      className="hover:bg-zinc-700/20 transition-all group"
      style={{
        backgroundColor: isSongPlaying
          ? `#52525B20`
          : ''
      }}
      onClick={handleClick}
    >
      <TableCell className="pl-3">
        {i+1}
      </TableCell>

      <TableCell className="flex items-center gap-2">
        <div className="h-full aspect-square relative shrink-0">
          <Image
            src={song.artworkUrl100}
            alt={song.trackName}
            width={48}
            height={48}
            className="rounded-lg h-full aspect-square"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(48, 48))}`}
          />

          <div
            className="
              absolute inset-0 size-full rounded-md 
              flex items-center justify-center bg-black/90
              opacity-0 group-hover:opacity-100 transition-opacity 
            "
          >
            {isSongPlaying && isPlaying ? (
              <IoPauseSharp className="size-6"/>
            ) : (
              <IoPlaySharp className="size-5"/>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center text-left max-w-full overflow-hidden">
          <span className="text-md font-medium truncate ..." title={song.trackName}>
            {song.trackName}
          </span>
          <Link href={`/artists/${song.artistId}`} className="w-fit">
            <span className="text-xs hover:underline text-zinc-400 line-clamp-2 text-wrap truncate ..." title={song.artistName}>
              {song.artistName}
            </span>
          </Link>
        </div>
      </TableCell>

      <TableCell className="text-sm text-zinc-400 truncate ..." title={song.collectionName}>
        <Link href={`/albums/${song.collectionId}`} className="hover:underline">
          {song.collectionName}
        </Link>
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
