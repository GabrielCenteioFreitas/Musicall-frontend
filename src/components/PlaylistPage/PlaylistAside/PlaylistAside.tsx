import { Playlist } from "@/types/playlist";
import { PortraitAsideSection } from "./PortraitSection/PortraitAsideSection";
import { ArtistsAsideSection } from "./ArtistsSection/ArtistsAsideSection";

interface PlaylistAsideProps {
  playlist: Playlist;
}

export const PlaylistAside = ({ playlist }: PlaylistAsideProps) => {
  return (
    <aside className="w-80 flex flex-col items-center">
      <PortraitAsideSection playlist={playlist} />

      <ArtistsAsideSection playlist={playlist} />
    </aside>
  );
}
