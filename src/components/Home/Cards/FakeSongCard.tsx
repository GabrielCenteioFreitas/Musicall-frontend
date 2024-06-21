import { cn } from "@/lib/utils";
import { getRandomColor } from "@/utils/getRandomColor";
import { Button } from "../../ui/button";

interface FakeSongCardProps {
  i: number;
  className?: string;
}

export const FakeSongCard = ({ i, className }: FakeSongCardProps) => {
  return (
    <Button
      variant="ghost"
      className={cn("h-fit p-3 flex flex-col gap-3 shrink-0 rounded-md transition-colors", className)}
      asChild
    >
      <div>
        <div
          className="w-full aspect-square rounded-md"
          style={{ backgroundColor: getRandomColor() }}
        />

        <div className="flex flex-col gap-2 self-start text-left max-w-full">
          <span
            title={`Música ${i}`}
            className="text-lg font-medium leading-tight truncate ..."
          >
            Música {i}
          </span>
          <span
            title="Gabriel Centeio Freitas"
            className="text-xs text-zinc-400 leading-snug line-clamp-2 text-wrap truncate ..."
          >
            Gabriel Centeio Freitas
          </span>
        </div>
      </div>
    </Button>
  );
}
