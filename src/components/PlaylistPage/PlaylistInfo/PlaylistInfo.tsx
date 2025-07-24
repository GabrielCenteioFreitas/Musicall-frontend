import { shimmer, toBase64 } from "@/lib/shimmer";
import { Playlist } from "@/types/playlist";
import { getTotalDuration } from "@/utils/getTotalDuration";
import Image from "next/image";
import Link from "next/link";

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
    <section className="flex flex-col gap-3">
      <h2 className="text-[2.5rem] leading-none font-semibold">{playlist.name}</h2>

      <div className="flex gap-2 items-center text-md text-zinc-400 leading-none">
        <Link
          prefetch={false}
          href={`/users/${playlist.user.id}`}
          className="flex items-center gap-2 hover:underline"
          aria-label={`Acessar página de perfil do usuário ${playlist.user.name}`}
        >
          <Image
            src={playlist.user.avatarUrl}
            alt={playlist.user.name}
            aria-hidden
            width={32}
            height={32}
            className="size-8 flex-0 rounded-full object-cover object-top"
          />
          {playlist.user.name}
        </Link>
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
    </section>
  );
}
