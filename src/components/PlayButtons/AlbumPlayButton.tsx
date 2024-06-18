import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { iTunesToPlaying } from "@/lib/iTunesToPlaying";
import { ITunesAlbum } from "@/types/album";
import { ITunesSong } from "@/types/song";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  album: Pick<ITunesAlbum,
    "collectionName" | 
    "artworkUrl100" | 
    "artistName" | 
    "releaseDate" |
    "collectionId" | 
    "collectionViewUrl"
  >;
  songs: ITunesSong[];
}

export const PlayButton = ({ album, songs }: PlayButtonProps) => {
  const { playingSong, setPlayingSong, currentSound, isPlaying, setIsPlaying, setNextSongs, addCurrentToPrev } = usePlayer()
  const isPlayingSongInAlbum = songs.some(song => song.trackId === playingSong?.song.iTunesId)

  const handleClick = () => {
    const playFirstAlbumSong = () => {
      addCurrentToPrev()
      setPlayingSong(iTunesToPlaying(songs[0]))
      setNextSongs(
        songs
          .slice(1, songs.length)
          .map(song => iTunesToPlaying(song))
      )
      setIsPlaying(true)
    }

    if (isPlaying) {
      if (isPlayingSongInAlbum) {
        currentSound?.pause()
        setIsPlaying(false)
      } else {
        currentSound?.stop()
        playFirstAlbumSong()
      }
    } else {
      if (playingSong && isPlayingSongInAlbum) {
        currentSound?.play()
        setIsPlaying(true)
      } else {
        playFirstAlbumSong()
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
      {isPlaying && isPlayingSongInAlbum ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}
