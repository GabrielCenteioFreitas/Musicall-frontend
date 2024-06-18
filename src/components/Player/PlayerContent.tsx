import { usePlayer } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { PlayerButtons } from "./PlayerButtons";
import { SongInfo } from "./SongInfo";
import { VolumeSlider } from "./VolumeSlider";

export const PlayerContent = () => {
  const { playingSong, setCurrentSound, playNextSong } = usePlayer()
  const [volume, setVolume] = useState(0.25);
  const [_, { sound }] = useSound(playingSong?.song.previewUrl || '', {
    volume,
    onend: () => playNextSong()
  })

  useEffect(() => {
    sound?.play();
    setCurrentSound(sound)
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
