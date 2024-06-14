import { Playlist } from "@/types/playlist";
import { getTotalDuration } from "@/utils/getPlaylistDurantion";
import Image from "next/image";

interface PlaylistInfoProps {
  playlist: Pick<Playlist,
   'name' |
   'isPublic' |
   'songs' |
   'user'
  >;
}

export const PlaylistInfo = ({ playlist }: PlaylistInfoProps) => {
  const playlistDurationInSeconds = playlist.songs?.reduce((acc, cur) => {
    return acc + cur.song.durationInSeconds
  }, 0)

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[2.5rem] leading-none font-semibold">{playlist.name}</h2>

      <div className="flex gap-2 items-center text-md text-zinc-400 leading-none">
        <div className="flex items-center gap-2">
          <Image
            src={playlist.user?.avatarUrl}
            alt={playlist.user?.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          {playlist.user?.name} 
        </div>
        •
        <span>
          Playlist
          {playlist?.isPublic ? " pública" : " privada"}
        </span>
        {playlist.songs?.length > 0 && (
          <>
            •
            <span className="">
              {playlist.songs?.length > 1
                ? `${playlist.songs?.length} itens`
                : "1 item"
              }
            </span>
            •
            <span>
              {getTotalDuration(Math.floor(playlistDurationInSeconds))}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
