import { usePlayer } from "@/hooks/usePlayer";
import { toBase64, shimmer } from "@/lib/shimmer";
import Image from "next/image";
import Link from "next/link";

export const SongInfo = () => {
  const { playingSong } = usePlayer()

  if (!playingSong) {
    return null
  }
  
  return (
    <div className="flex gap-3 items-center">
      <Image
        src={playingSong.song.portrait}
        alt={playingSong.song.name}
        width={64}
        height={64}
        className="rounded-md size-16 aspect-square shrink-0 object-cover"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(64, 64))}`}
      />

      <div className="flex flex-col overflow-hidden">
        <span className="text-lg truncate ..." title={playingSong.song.name}>
          {playingSong.song.name}
        </span>

        <Link
          href={`/artists/${playingSong.song.artist.iTunesId}`}
          title={playingSong.song.artist.name}
          className="text-xs text-zinc-400 truncate ... hover:underline"
        >
          {playingSong.song.artist.name}
        </Link>
      </div>
    </div>
  );
}

