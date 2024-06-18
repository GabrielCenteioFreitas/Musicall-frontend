import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { Playlist } from "@/types/playlist";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  playlist: Playlist;
}

export const PlayButton = ({ playlist }: PlayButtonProps) => {
  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isPlayingSongInPlaylist = playlist.songs.some(song => song.id === playingSong?.id)

  const handleClick = () => {
    const playFirstPlaylistSong = () => {
      addCurrentToPrev()
      setPlayingSong(playlist.songs[0])
      setNextSongs(playlist.songs.slice(1, playlist.songs.length).map(song => song))
      setIsPlaying(true)
    }

    if (isPlaying) {
      if (isPlayingSongInPlaylist) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        currentSound?.stop()
        playFirstPlaylistSong()
      }
    } else {
      if (playingSong && isPlayingSongInPlaylist) {
        currentSound?.play()
        setIsPlaying(true)
      } else {
        playFirstPlaylistSong()
      }
    }
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
