import { CreatePlaylist } from "@/components/CreatePlaylist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";

interface CreatePlaylistCardProps {
  className?: string;
}

export const CreatePlaylistCard = ({ className }: CreatePlaylistCardProps) => {
  return (
    <CreatePlaylist>
      <Button
        variant="ghost"
        className={cn("h-fit p-3 pr-5 flex gap-3 items-center shrink-0 rounded-2xl transition-colors", className)}
        title="Crie sua primeira playlist!"
      >
        <div
          className={cn("shrink-0 size-32 aspect-square bg-zinc-600 grid place-content-center rounded-xl", className)}
        >
          <FaPlus size={92} className="text-zinc-300" />
        </div>

        <div className="flex flex-col gap-2.5 text-left max-w-full">
          <span className="text-xl font-medium leading-snug">
            Crie sua primeira playlist!
          </span>
        </div>
      </Button>
    </CreatePlaylist>
  );
}
