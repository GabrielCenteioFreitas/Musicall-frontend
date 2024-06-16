import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { SongsSection } from "./SongsSection";
import { Favorites } from "@/types/favorites";
import { genres } from "@/lib/genres";

interface GenresSectionProps {
  favorites: Favorites | null;
}

export const GenresSection = ({ favorites }: GenresSectionProps) => {
  return (
    <SectionsContainer>
      <SectionsTitle
        title={'Gêneros'}
        dividerMargins="mt-2 mb-4"
      />

      {genres.map(genre => 
        <SongsSection
          key={genre.name}
          genre={genre.name}
          sectionTitle={genre.sectionTitle}
          limit={genre.limit}
          favoriteSongs={favorites?.favoriteSongs}
        />
      )}
    </SectionsContainer>
  );
}
