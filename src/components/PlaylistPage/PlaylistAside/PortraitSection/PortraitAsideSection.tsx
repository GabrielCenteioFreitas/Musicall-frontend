import { PlaylistPortrait } from "@/components/PlaylistPortrait";
import { Playlist } from "@/types/playlist";
import { MediaInput } from "./MediaInput";

interface PortraitAsideSectionProps {
  playlist: Playlist;
}

export const PortraitAsideSection = ({ playlist }: PortraitAsideSectionProps) => {
  return (
    <div className="relative w-full aspect-square border-2 border-neutral-800 rounded-xl overflow-hidden group">
      <PlaylistPortrait
        className="size-full"
        iconClassName="size-44"
        playlist={playlist}
        size={320}
      />

      <MediaInput playlist={playlist} />
    </div>
  );
}