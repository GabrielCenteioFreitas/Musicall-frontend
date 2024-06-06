import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { PlaylistCard } from "../Cards/PlaylistCard";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface YourPlaylistsSectionProps {
  className?: string;
}

export const YourPlaylistsSection = ({ className, ...rest }: YourPlaylistsSectionProps) => {
  const yourPlaylists = Array.from({ length: 14 }).map((_, i) => {
    return {
      id: i,
      name: `Playlist ${i+1}`,
      creator: 'Gabriel Centeio Freitas'
    }
  }) // temporário
  
  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Suas Playlists"
        dividerMargins="my-2"
      />

      <SectionsItemsContainer>
        {yourPlaylists.map(playlist => 
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
