import { ArtistCard } from "@/components/ArtistCard";
import { FavoriteArtist } from "@/types/favorites";
import { UserSectionsTitle } from "./UserSectionsTitle";
import { UserSectionsItemsContainer } from "./UserSectionsItemsContainer";

interface FavoriteArtistsSectionProps {
  favoriteArtists: FavoriteArtist[]
}

export const FavoriteArtistsSection = ({ favoriteArtists }: FavoriteArtistsSectionProps) => {
  return (
    <section>
      <UserSectionsTitle title="Artistas favoritos" />

      {favoriteArtists.length > 0 ? (
        <UserSectionsItemsContainer>
          {favoriteArtists.map(favoriteArtist => 
            <ArtistCard
              key={favoriteArtist.id}
              artist={{
                artistName: favoriteArtist.artist.name,
                artistId: favoriteArtist.artist.iTunesId,
              }}
              className="w-44"
            />
          )}
        </UserSectionsItemsContainer>
      ) : (
        <span className="block mb-5 text-zinc-200">
          Este usuário não possui nenhum artista marcado como favorito.
        </span>
      )}
    </section>
  );
}
