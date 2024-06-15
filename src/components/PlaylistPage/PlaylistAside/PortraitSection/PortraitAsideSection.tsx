import { PlaylistPortrait } from "@/components/Portraits/PlaylistPortrait";
import { Playlist } from "@/types/playlist";
import { MediaInput } from "./MediaInput";

interface PortraitAsideSectionProps {
  playlist: Playlist;
  isUserTheCreator: boolean;
  predominantColor: string;
}

export const PortraitAsideSection = ({ playlist, isUserTheCreator, predominantColor }: PortraitAsideSectionProps) => {
  return (
    <div className="relative w-full aspect-square border-2 border-neutral-800 rounded-xl overflow-hidden group">
      <PlaylistPortrait
        className="w-full aspect-square"
        predominantColor={predominantColor}
        iconClassName="size-44"
        playlist={playlist}
        size={320}
      />

      {isUserTheCreator && (
        <MediaInput playlist={playlist} />
      )}
    </div>
  );
}
