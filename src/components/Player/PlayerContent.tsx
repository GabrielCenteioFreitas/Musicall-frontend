import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { PlayerButtons } from "./PlayerButtons";
import { SongInfo } from "./SongInfo";
import { TimeBar } from "./TimeBar";
import { VolumeSlider } from "./VolumeSlider";
import { useTime } from "@/hooks/useTime";

export const PlayerContent = () => {
  const { playingSong, currentSound, setCurrentSound, isPlaying, playNextSong, isLoopModeEnabled, volume } = usePlayer()
  const { setCurrentTime } = useTime();
  const [isSongLoaded, setIsSongLoaded] = useState(false)
  const [_, { sound, duration }] = useSound(playingSong?.song.previewUrl || '', {
    volume,
    loop: isLoopModeEnabled,
    autoplay: false,
    onend: () => (isLoopModeEnabled ? setCurrentTime(0) : playNextSong()),
    onload: () => setIsSongLoaded(true),
  })

  useEffect(() => {
    if (!isPlaying) {
      setCurrentSound(sound)
      return
    }
    currentSound?.stop();
    sound?.play();
    setCurrentSound(sound)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [sound, setCurrentSound])

  if (!playingSong) {
    return null
  }

  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <SongInfo />

      <div className="flex items-center flex-col gap-2">
        <PlayerButtons />

        <TimeBar duration={duration || 0} isSongLoaded={isSongLoaded} />
      </div>

      <VolumeSlider />
    </div>
  );
}
