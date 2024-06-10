import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getDataFromSearch } from "@/lib/getITunesData";

import { Artist } from "@/types/artist";
import { ArtistCard } from "../Cards/ArtistCard";

interface ArtistsSectionProps {
  term: string;
  entity: string | null;
}

export const ArtistsSection = async ({ term, entity }: ArtistsSectionProps) => {
  const limit = entity ? 32 : 8
  const { results: artists } = await getDataFromSearch({term, entity: 'musicArtist', limit})

  return (
    <SectionsContainer>
      <SectionsTitle title="Artistas" dividerMargins="my-2" />

      {!artists ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(artists && artists.length > 0) ? (
            <div className="grid grid-cols-8 -ml-3">
              {artists?.map((artist: Artist) => 
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
