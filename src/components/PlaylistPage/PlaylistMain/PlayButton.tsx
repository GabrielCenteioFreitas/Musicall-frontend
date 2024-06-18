import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { Playlist } from "@/types/playlist";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  playlist: Playlist;
}

export const PlayButton = ({ playlist }: PlayButtonProps) => {
  const { currentSong, setCurrentSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isCurrentSongInPlaylist = playlist.songs.some(song => song.id === currentSong?.id)

  const handleClick = () => {
    const playFirstPlaylistSong = () => {
      addCurrentToPrev()
      setCurrentSong(playlist.songs[0])
      setNextSongs(playlist.songs.slice(1, playlist.songs.length).map(song => song))
      setIsPlaying(true)
    }

    if (isPlaying) {
      if (isCurrentSongInPlaylist) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        currentSound?.stop()
        playFirstPlaylistSong()
      }
    } else {
      if (currentSong && isCurrentSongInPlaylist) {
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
      {isPlaying && isCurrentSongInPlaylist ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}
