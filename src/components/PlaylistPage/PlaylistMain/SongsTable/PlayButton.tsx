import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { Playlist } from "@/types/playlist";
import { PlaylistSong } from "@/types/song";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  playlist: Playlist;
  song: PlaylistSong;
}

export const PlayButton = ({ playlist, song }: PlayButtonProps) => {
  const { playingSong, isPlaying, playSongInAGroup } = usePlayer()
  const isSongPlaying =  song.id === playingSong?.id

  const handleClick = () => {
    playSongInAGroup({
      group: playlist.songs,
      isSongPlaying,
      songIndex: playlist.songs.indexOf(song),
    })
  }

  return (
    <Button
      onClick={handleClick}
      variant="none"
      size="none"
      className="
        absolute inset-0 size-full bg-black/90
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity 
      "
      aria-label={
        isPlaying
          ? "Pausar música"
          : "Tocar música"
      }
    >
      {isPlaying ? (
        <IoPauseSharp
          title="Pausar música"
          className="size-6"
        />
      ) : (
        <IoPlaySharp
          title="Tocar música"
          className="size-6"
        />
      )}
    </Button>
  );
}
