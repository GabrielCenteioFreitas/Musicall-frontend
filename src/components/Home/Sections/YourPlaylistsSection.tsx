import { PlaylistCard } from "../Cards/PlaylistCard";
import { SectionsContainer } from "../SectionsContainer";
import { SectionsItemsContainer } from "../SectionsItemsContainer";
import { SectionsTitle } from "../SectionsTitle";

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
