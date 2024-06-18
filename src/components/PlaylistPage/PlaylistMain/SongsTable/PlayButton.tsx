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
  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()

  const handleClick = () => {
    if (song.id === playingSong?.id) {
      if (isPlaying) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
        currentSound?.play()
      }
    } else {
      const songIndex = playlist.songs.indexOf(song)
      currentSound?.stop()
      addCurrentToPrev()
      setPlayingSong(song)
      setNextSongs([
        ...playlist.songs
          .slice(songIndex+1, playlist.songs.length)
          .map(song => song),
        ...playlist.songs
          .slice(0, songIndex)
          .map(song => song),
      ])
      setIsPlaying(true)
    }
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
