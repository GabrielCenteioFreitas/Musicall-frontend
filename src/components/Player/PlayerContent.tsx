import { usePlayer } from "@/hooks/usePlayer";
import { useEffect } from "react";
import useSound from 'use-sound';
import { PlayerButtons } from "./PlayerButtons";
import { SongInfo } from "./SongInfo";
import { VolumeSlider } from "./VolumeSlider";

export const PlayerContent = () => {
  const { playingSong, currentSound, setCurrentSound, playNextSong, isLoopModeEnabled, volume } = usePlayer()
  const [_, { sound }] = useSound(playingSong?.song.previewUrl || '', {
    volume,
    onend: () => (isLoopModeEnabled ? {} : playNextSong()),
    loop: isLoopModeEnabled,
  })

  useEffect(() => {
    currentSound?.stop();
    sound?.play();
    setCurrentSound(sound)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [sound, setCurrentSound])

  if (!playingSong) {
    return null
  }

  return (
    <div className="w-full h-12 grid grid-cols-3 gap-4">
      <SongInfo />

      <PlayerButtons />

      <VolumeSlider />
    </div>
  );
}
