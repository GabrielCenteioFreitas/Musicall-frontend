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
      variant="none"
      size="none"
      className="
        absolute inset-0 size-full bg-black/90
        flex items-center justify-center
        opacity-0 group-hover:opacity-100 transition-opacity 
      "
      title="Ouvir playlist"
      onClick={handleClick}
    >
      {isPlaying ? (
        <IoPauseSharp
          className="size-6"
        />
      ) : (
        <IoPlaySharp
          className="size-6"
        />
      )}
    </Button>
  );
}
