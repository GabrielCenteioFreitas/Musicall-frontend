import Image from "next/image";
import { ITunesAlbum } from "@/types/album";
import { ITunesSong } from "@/types/song";
import { getTotalDuration } from "@/utils/getPlaylistDurantion";
import dayjs from "dayjs";
import ptBr from 'dayjs/locale/pt-br';
dayjs.locale(ptBr)

interface AlbumInfoProps {
  album: Pick<ITunesAlbum,
    "collectionName" | 
    "artworkUrl100" | 
    "artistName" | 
    "releaseDate"
  >;
  songs: ITunesSong[];
}

export const AlbumInfo = ({ album, songs }: AlbumInfoProps) => {
  const albumDurationInSeconds = songs.reduce((acc, cur) => {
    return acc + (cur.trackTimeMillis / 1000)
  }, 0)

  return (
    <div className="flex items-center gap-4 w-full h-fit">
      <Image
        src={album.artworkUrl100}
        alt={album.collectionName}
        width={180}
        height={180}
        className="size-42 rounded-lg shrink-0"
      />

      <div className="flex flex-col gap-0 overflow-hidden py-1">
        <h2 className="text-[2.5rem] font-bold truncate ...">
          {album.collectionName}
        </h2>

        <div className="flex gap-2 items-center text-md text-zinc-400 leading-none">
          <span>{album.artistName}</span>
          •
          <span>
            {dayjs(album.releaseDate).format("YYYY")}
          </span>

          {songs.length > 0 && (
            <>
              •
              <span className="">
                {songs.length > 1
                  ? `${songs.length} músicas`
                  : "1 música"
                }
              </span>
              •
              <span>
                {getTotalDuration(Math.floor(albumDurationInSeconds))}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
