'use client'

import { PlayerContext } from "@/contexts/PlayerContext";
import { useContext } from "react";

export function usePlayer() {
  const context = useContext(PlayerContext);

  return context;
}