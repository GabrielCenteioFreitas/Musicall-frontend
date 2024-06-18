import { usePlayer } from "@/hooks/usePlayer";
import Image from "next/image";

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
        width={48}
        height={48}
        className="rounded-md h-full aspect-square"
      />

      <div className="flex flex-col overflow-hidden">
        <span className="text-md truncate ...">
          {playingSong.song.name}
        </span>

        <span className="text-xs text-zinc-400 truncate ...">
          {playingSong.song.artist.name}
        </span>
      </div>
    </div>
  );
}

