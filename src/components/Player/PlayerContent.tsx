import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { PlayerButtons } from "./PlayerButtons";
import { SongInfo } from "./SongInfo";
import { VolumeSlider } from "./VolumeSlider";

export const PlayerContent = () => {
  const { playingSong, currentSound, setCurrentSound, playNextSong } = usePlayer()
  const [volume, setVolume] = useState(0.25);
  const [_, { sound }] = useSound(playingSong?.song.previewUrl || '', {
    volume,
    onend: () => playNextSong()
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

      <VolumeSlider volume={volume} setVolume={setVolume} />
    </div>
  );
}
