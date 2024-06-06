import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { PlaylistCard } from "../Cards/PlaylistCard";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface RecentPlaylistsSectionProps {
  className?: string;
}

export const RecentPlaylistsSection = ({ className, ...rest }: RecentPlaylistsSectionProps) => {
  const recentPlaylists = Array.from({ length: 15 }).map((_, i) => {
    return {
      id: i,
      name: `Playlist ${i+1}`,
      creator: 'Gabriel Centeio Freitas'
    }
  }) // temporário
  
  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Playlists recentes"
        dividerMargins="my-2"
      />

      <SectionsItemsContainer>
        {recentPlaylists.map(playlist => 
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
