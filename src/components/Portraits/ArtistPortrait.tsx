import { cn } from "@/lib/utils";
import { getInitialLetters } from "@/utils/getInitalLetters";

interface ArtistPortraitProps {
  name: string;
  className?: string;
}

export const ArtistPortrait = ({ name, className }: ArtistPortraitProps) => {
  return (
    <div className={cn(`
        grid place-content-center shrink-0 rounded-full
        bg-zinc-900 border-4 border-zinc-800 transition-colors
        text-zinc-400 font-semibold
        group-hover:text-zinc-200 group-hover:border-zinc-500
      `, className)}
    >
      {getInitialLetters(name)}
    </div>
  );
}
