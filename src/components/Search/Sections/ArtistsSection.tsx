import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

import { Artist } from "@/types/artist";
import { ArtistCard } from "../Cards/ArtistCard";

interface ArtistsSectionProps {
  term: string;
  entity: string | null;
}

export const ArtistsSection = ({ term, entity }: ArtistsSectionProps) => {
  const [artists, setArtists] = useState<Artist[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const limit = entity ? 32 : 8

  useEffect(() => {
    if (term) {
      const handleGetData = async () => {
        try {
          const { results } = await getData(term, 'musicArtist', limit);
          setArtists(results)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setIsLoading(false)
        }
      };

      handleGetData();
    }
  }, [term, entity, limit]);

  return (
    <SectionsContainer>
      <SectionsTitle title="Artistas" dividerMargins="my-2" />

      {isLoading ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(artists && artists.length > 0) ? (
            <div className="grid grid-cols-8 -ml-3">
              {artists?.map(artist => 
                <ArtistCard key={artist.artistId} artist={artist} />
              )}
            </div>
          ) : (
            <span>
              Não foram encontrados artistas relacionados a sua pesquisa.
            </span>
          )}
        </>
      )}
    </SectionsContainer>
  );
}
