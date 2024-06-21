import { CreatePlaylist } from "@/components/CreatePlaylist";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaPlus } from "react-icons/fa";

interface CreatePlaylistItemProps {
  className?: string;
}

export const CreatePlaylistItem = ({ className }: CreatePlaylistItemProps) => {
  return (
    <li className="w-full">
      <CreatePlaylist>
        <Button
          variant="ghost"
          className={`
            h-fit flex justify-start items-center rounded-lg gap-2 p-2 w-full
            bg-transparent hover:!bg-zinc-900
          `}
          title="Criar nova playlist"
          aria-label="Criar playlist"
        >
          <div className="shrink-0 size-12 rounded-lg overflow-hidden">
            <div
              className={cn("size-full aspect-square bg-zinc-600 grid place-content-center", className)}
            >
              <FaPlus size={28} className={"text-zinc-300"} />
            </div>
          </div>

          <div className="flex flex-col gap-1 text-left max-w-44">
            <span className="text-base font-medium">
              Criar nova playlist
            </span>
          </div>
        </Button>
      </CreatePlaylist>
    </li>
  );
}
