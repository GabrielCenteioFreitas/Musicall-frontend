import { SectionsContainer } from "../../SectionsContainer";
import { SectionsTitle } from "../../SectionsTitle";
import { FakeSongCard } from "../Cards/FakeSongCard";
import { SectionsItemsContainer } from "../SectionsItemsContainer";

interface RecentSongsSectionProps {
  className?: string;
}

export const RecentSongsSection = ({ className, ...rest }: RecentSongsSectionProps) => {
  return (
    <SectionsContainer className={className} {...rest}>
      <SectionsTitle
        title="Músicas recentes"
        dividerMargins="my-2"
      />

      <SectionsItemsContainer>
        {Array.from({ length: 7 }).map((_, i) => 
          <FakeSongCard key={i} i={i+1} />
        )}
      </SectionsItemsContainer>
    </SectionsContainer>
  );
}
