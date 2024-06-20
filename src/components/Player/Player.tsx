'use client'

import { usePlayer } from "@/hooks/usePlayer";
import { PlayerContent } from "./PlayerContent";

export const Player = () => {
  const { playingSong, isLoopModeEnabled } = usePlayer()

  if (!playingSong) {
    return null
  }

  return (
    <div
      className="
        fixed bottom-0 right-0 left-0 bg-zinc-950 border-t border-t-zinc-800 shadow-sm
        px-16 py-3 flex justify-center items-center
      "
    >
      <PlayerContent key={`${playingSong.id}-${isLoopModeEnabled}`} />
    </div>
  );
}
