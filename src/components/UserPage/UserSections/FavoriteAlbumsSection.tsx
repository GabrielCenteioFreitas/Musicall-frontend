import { AlbumCard } from "@/components/AlbumCard";
import { FavoriteAlbum } from "@/types/favorites";
import { UserSectionsTitle } from "./UserSectionsTitle";
import { UserSectionsItemsContainer } from "./UserSectionsItemsContainer";

interface FavoriteAlbumsSectionProps {
  favoriteAlbums: FavoriteAlbum[]
}

export const FavoriteAlbumsSection = ({ favoriteAlbums }: FavoriteAlbumsSectionProps) => {
  return (
    <section>
      <UserSectionsTitle title="Álbuns favoritos" />

      {favoriteAlbums.length > 0 ? (
        <UserSectionsItemsContainer>
          {favoriteAlbums.map(favoriteAlbum => 
            <AlbumCard
              key={favoriteAlbum.id}
              album={{
                collectionName: favoriteAlbum.album.name,
                artworkUrl100: favoriteAlbum.album.portrait,
                collectionId: favoriteAlbum.album.iTunesId,
                collectionViewUrl: favoriteAlbum.album.iTunesViewUrl,
                artistName: favoriteAlbum.album.artist.name,
              }}
              className="w-44"
            />
          )}
        </UserSectionsItemsContainer>
      ) : (
        <span className="block mb-5 text-zinc-200">
          Este usuário não possui nenhum álbum marcado como favorito.
        </span>
      )}
    </section>
  );
}
