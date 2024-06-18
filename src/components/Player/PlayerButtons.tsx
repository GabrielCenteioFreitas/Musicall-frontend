import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { Button } from "../ui/button";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerButton } from "./PlayerButton";

export const PlayerButtons = () => {
  const { currentSound, isPlaying, setIsPlaying, playNextSong, playPrevSong } = usePlayer()
  
  const handlePlayPauseClick = () => {
    if (isPlaying) {
      currentSound?.pause()
      setIsPlaying(false)
    } else {
      currentSound?.play()
      setIsPlaying(true)
    }
  }

  const handleNextSongClick = () => {
    currentSound?.stop()
    playNextSong()
  }

  const handlePrevSongClick = () => {
    currentSound?.stop()
    playPrevSong()
  }

  return (
    <div className="flex justify-center gap-4">
      <PlayerButton
        icon={IoIosSkipBackward}
        title="Música anterior"
        onClick={handlePrevSongClick}
      />

      <Button
        variant="secondary"
        size="none"
        className="rounded-full p-0 size-11 transition-colors"
        title="Ouvir playlist"
        onClick={handlePlayPauseClick}
      >
        {isPlaying ? (
          <IoPauseSharp
            className="size-6 text-zinc-50"
          />
        ) : (
          <IoPlaySharp
            className="-mr-1 size-6 text-zinc-50"
          />
        )}
      </Button>
      
      <PlayerButton
        icon={IoIosSkipForward}
        title="Próxima música"
        onClick={handleNextSongClick}
      />
    </div>
  );
}
