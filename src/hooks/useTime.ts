'use client'

import { TimeContext } from "@/contexts/TimeContext";
import { useContext } from "react";

export function useTime() {
  const context = useContext(TimeContext);

  return context;
}