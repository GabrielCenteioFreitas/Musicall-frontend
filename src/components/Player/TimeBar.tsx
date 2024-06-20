import { usePlayer } from "@/hooks/usePlayer";
import { useTime } from "@/hooks/useTime";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useEffect } from "react";

interface TimeBarProps {
  duration: number;
  isSongLoaded: boolean;
}

export const TimeBar = ({ duration, isSongLoaded }: TimeBarProps) => {
  const { isPlaying, playingSong, currentSound } = usePlayer()
  const { currentTime, setCurrentTime } = useTime()
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && isSongLoaded) {
        setCurrentTime(currentTime + 0.1);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentTime, isPlaying, isSongLoaded, setCurrentTime]);

  useEffect(() => {
    setCurrentTime(0)
  } , [playingSong, setCurrentTime])

  const updateTime = (value: number) => {
    currentSound?.seek(value)
    setCurrentTime(value)
  }

  const formatTime = (durationInSeconds: number) => {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = Math.floor(durationInSeconds - minutes)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
 
  return (
    <div className="grid grid-cols-[1fr_18rem_1fr] items-center gap-2">
      <time className="text-sm text-zinc-400">
        {formatTime(currentTime)}
      </time>

      <SliderPrimitive.Root
        max={duration/1000}
        value={[currentTime]} 
        step={0.1}
        onValueChange={(value) => updateTime(value[0])}
        className="relative flex w-72 touch-none select-none items-center group"
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <SliderPrimitive.Range className="
            absolute h-full rounded-full
            bg-zinc-50 group-hover:bg-zinc-300 transition-colors
          "/>
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="
          block size-3 rounded-full cursor-pointer
          opacity-0 group-hover:opacity-100 bg-zinc-50
        ring-offset-zinc-950 focus-visible:outline-none 
          focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-300
        "/>
      </SliderPrimitive.Root>

      <time className="text-sm text-zinc-400">
        {formatTime(duration/1000)}
      </time>
    </div>
  );
}
