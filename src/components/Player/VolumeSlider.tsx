
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Button } from "../ui/button";
import {
  IoVolumeHigh,
  IoVolumeMedium,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5";

interface VolumeSliderProps {
  volume: number;
  setVolume: (volumeParam: number) => void;
}

export const VolumeSlider = ({ volume, setVolume }: VolumeSliderProps) => {
  const handleVolumeClick = () => {
    if (volume > 0) {
      setVolume(0)
    } else {
      setVolume(0.25)
    }
  }

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-1">
        <Button
          variant="none"
          size="none"
          className="size-fit"
          onClick={handleVolumeClick}
        >
          {volume > 0.66
            ? <IoVolumeHigh size={24} />
            : volume > 0.33
              ? <IoVolumeMedium size={24} />
              : volume > 0
                ? <IoVolumeLow size={24} />
                : <IoVolumeMute size={24} />
          }
        </Button>

        <SliderPrimitive.Root
          max={1}
          value={[volume]}
          step={0.05}
          onValueChange={(value) => setVolume(value[0])}
          className="relative flex w-44 touch-none select-none items-center group/volume"
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <SliderPrimitive.Range className="
              absolute h-full rounded-full
              bg-zinc-50 group-hover/volume:bg-zinc-300 transition-colors
            "/>
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="
            block size-3 rounded-full cursor-pointer
            opacity-0 group-hover/volume:opacity-100 transition-all
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            bg-zinc-50 ring-offset-zinc-950 focus-visible:ring-zinc-300
          "/>
        </SliderPrimitive.Root>
      </div>
      
    </div>
  );
}
