import { Button } from "@/components/ui/button";
import { usePlayer } from "@/hooks/usePlayer";
import { iTunesToPlaying } from "@/lib/iTunesToPlaying";
import { ITunesSong } from "@/types/song";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

interface PlayButtonProps {
  albumSongs: ITunesSong[];
}

export const PlayButton = ({ albumSongs }: PlayButtonProps) => {
  const { playingSong, isPlaying, playGroup } = usePlayer()
  const isPlayingSongInAlbum = albumSongs.some(song => song.trackId === playingSong?.song.iTunesId)
  const convertedAlbumSongs = albumSongs.map(song => iTunesToPlaying(song))

  const handleClick = () => {
    playGroup({
      group: convertedAlbumSongs,
      isPlayingSongInGroup: isPlayingSongInAlbum,
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
      {isPlaying && isPlayingSongInAlbum ? (
        <IoPauseSharp className="size-6"/>
      ) : (
        <IoPlaySharp className="size-5 -mr-1"/>
      )}
    </Button>
  );
}
