import { PlaylistPortrait } from "@/components/PlaylistPortrait";
import { Playlist } from "@/types/playlist";
import { MediaInput } from "./MediaInput";

interface PortraitAsideSectionProps {
  playlist: Playlist;
  isUserTheCreator: boolean;
}

export const PortraitAsideSection = ({ playlist, isUserTheCreator }: PortraitAsideSectionProps) => {
  return (
    <div className="relative w-full aspect-square border-2 border-neutral-800 rounded-xl overflow-hidden group">
      <PlaylistPortrait
        className="w-full aspect-square"
        iconClassName="size-44"
        playlist={playlist}
        size={320}
      />

      <MediaInput playlist={playlist} isUserTheCreator={isUserTheCreator} />
    </div>
  );
}
