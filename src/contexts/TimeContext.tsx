'use client'

import { ReactNode, createContext, useState } from "react";

interface TimeContextData {
  currentTime: number;
  setCurrentTime: (timeParam: number) => void;
}

export const TimeContext = createContext<TimeContextData>({} as TimeContextData);

export function TimeProvider({ children }: { children: ReactNode }) {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <TimeContext.Provider value={{ currentTime, setCurrentTime }}>
      {children}
    </TimeContext.Provider>
  );
}