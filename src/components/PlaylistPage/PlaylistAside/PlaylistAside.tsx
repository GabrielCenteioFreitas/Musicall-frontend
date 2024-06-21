import { Playlist } from "@/types/playlist";
import { PortraitAsideSection } from "./PortraitSection/PortraitAsideSection";
import { ArtistsAsideSection } from "./ArtistsSection/ArtistsAsideSection";
import { DescriptionAsideSection } from "./DescriptionAsideSection/DescriptionAsideSection";

interface PlaylistAsideProps {
  playlist: Playlist;
  isUserTheCreator: boolean;
  predominantColor: string;
}

export const PlaylistAside = ({ playlist, isUserTheCreator, predominantColor }: PlaylistAsideProps) => {
  return (
    <aside className="w-80 flex flex-col items-center" aria-label="Foto, descrição e artistas da playlist">
      <PortraitAsideSection
        playlist={playlist}
        isUserTheCreator={isUserTheCreator}
        predominantColor={predominantColor}
      />

      {playlist.description && (
        <DescriptionAsideSection playlist={playlist} />
      )}

      <ArtistsAsideSection playlist={playlist} />
    </aside>
  );
}
