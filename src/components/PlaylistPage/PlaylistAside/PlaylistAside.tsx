import { Playlist } from "@/types/playlist";
import { PortraitAsideSection } from "./PortraitSection/PortraitAsideSection";
import { ArtistsAsideSection } from "./ArtistsSection/ArtistsAsideSection";
import { DescriptionAsideSection } from "./DescriptionAsideSection/DescriptionAsideSection";

interface PlaylistAsideProps {
  playlist: Playlist;
  isUserTheCreator: boolean;
}

export const PlaylistAside = ({ playlist, isUserTheCreator }: PlaylistAsideProps) => {
  return (
    <aside className="w-80 flex flex-col items-center">
      <PortraitAsideSection playlist={playlist} isUserTheCreator={isUserTheCreator} />

      {playlist.description && (
        <DescriptionAsideSection playlist={playlist} />
      )}

      <ArtistsAsideSection playlist={playlist} />
    </aside>
  );
}
