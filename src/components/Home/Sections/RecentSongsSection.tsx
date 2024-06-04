import { SongCard } from "../Cards/SongCard";
import { SectionsContainer } from "../SectionsContainer";
import { SectionsItemsContainer } from "../SectionsItemsContainer";
import { SectionsTitle } from "../SectionsTitle";

interface RecentSongsSectionProps {
  className?: string;
}

export const RecentSongsSection = ({ className, ...rest }: RecentSongsSectionProps) => {
  const recentSongs = Array.from({ length: 15 }).map((_, i) => {
    return {
      id: i,
      name: `Música ${i+1}`,
      artists: 'Gabriel Centeio Freitas, Gabriel Centeio Freitas e Gabriel Centeio Freitas'
    }
  }) // temporário

  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Músicas recentes"
        dividerMargins="my-2"
      />

      <SectionsItemsContainer>
        {recentSongs.map(song => 
          <SongCard
            key={song.id}
            song={song}
          />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
