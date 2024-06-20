import { FavoriteArtist } from "@/types/favorites";
import { ArtistCard } from "../ArtistCard";
import { SectionsTitle } from "../SectionsTitle";

interface ArtistsSectionProps {
  favoriteArtists: FavoriteArtist[] | undefined;
}

export const ArtistsSection = ({ favoriteArtists }: ArtistsSectionProps) => {
  return (
    <section>
      <SectionsTitle title="Artistas favoritos" dividerMargins="my-2" />

      {favoriteArtists && favoriteArtists.length > 0 ? (
        <div className="grid grid-cols-8 -ml-3">
          {favoriteArtists.map((favoritedArtist) => {
            const iTunesArtist = {
              artistName: favoritedArtist.artist.name,
              artistId: favoritedArtist.artist.iTunesId,
              artistLinkUrl: favoritedArtist.artist.iTunesViewUrl,
            }

            return (
              <ArtistCard
                key={favoritedArtist.id}
                artist={iTunesArtist}
                isFavorited
              />
            )
          })}
        </div>
      ) : (
        <span>
          Você não possui nenhum artista marcado como favorito.
        </span>
      )}
    </section>
  );
}
