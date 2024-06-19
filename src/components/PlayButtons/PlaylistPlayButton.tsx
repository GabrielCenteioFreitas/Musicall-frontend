import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { Playlist } from "@/types/playlist";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  playlist: Playlist;
}

export const PlayButton = ({ playlist }: PlayButtonProps) => {
  const { playingSong, isPlaying, playGroup } = usePlayer()
  const isPlayingSongInPlaylist = playlist.songs.some(song => song.id === playingSong?.id)
  
  const handleClick = () => {
    playGroup({
      group: playlist.songs,
      isPlayingSongInGroup: isPlayingSongInPlaylist,
    })
  }

  return (
    <Button
      variant="secondary"
      size="none"
      className="rounded-full size-11 transition-colors"
      title="Ouvir playlist"
      onClick={handleClick}
    >
      {isPlaying && isPlayingSongInPlaylist ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}
