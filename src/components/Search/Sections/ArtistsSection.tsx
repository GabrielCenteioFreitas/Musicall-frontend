import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getDataFromSearch } from "@/lib/getITunesData";

import { getFavorites } from "@/lib/getFavoritesData";
import { ITunesArtist } from "@/types/artist";
import { cookies } from "next/headers";
import { ArtistCard } from "../../ArtistCard";

interface ArtistsSectionProps {
  term: string;
  entity: string | null;
}

export const ArtistsSection = async ({ term, entity }: ArtistsSectionProps) => {
  const limit = entity ? 32 : 8
  const { results: artists } = await getDataFromSearch({term, entity: 'musicArtist', limit})

  const token = cookies().get('token')?.value
  const favorites = await getFavorites(token || null)

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
              {artists?.map((artist: ITunesArtist) => 
                <ArtistCard
                  key={artist.artistId}
                  artist={artist}
                  isFavorited={favorites?.favoriteArtists?.some(
                    (favoriteArtists) => favoriteArtists.artist.iTunesId === artist.artistId
                  ) || false}
                />
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
