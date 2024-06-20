import { FavoriteAlbum } from "@/types/favorites";
import { AlbumCard } from "../AlbumCard";
import { SectionsTitle } from "../SectionsTitle";

interface AlbumsSectionProps {
  favoriteAlbums: FavoriteAlbum[] | undefined;
}

export const AlbumsSection = ({ favoriteAlbums }: AlbumsSectionProps) => {
  return (
    <section>
      <SectionsTitle title="Álbuns favoritos" dividerMargins="my-2" />

      {favoriteAlbums && favoriteAlbums.length ? (
        <div className="grid grid-cols-8 -ml-3">
          {favoriteAlbums.map((favoritedAlbum) => {
            const iTunesAlbum = {
              collectionName: favoritedAlbum.album.name,
              artistName: favoritedAlbum.album.artist.name,
              collectionId: favoritedAlbum.album.iTunesId,
              artworkUrl100: favoritedAlbum.album.portrait,
              collectionViewUrl: favoritedAlbum.album.iTunesViewUrl,
            }

            return (
              <AlbumCard
                key={favoritedAlbum.id}
                album={iTunesAlbum}
                isFavorited
              />
            )
          })}
        </div>
      ) : (
        <span className="block mb-10">
          Você não possui nenhum álbum marcado como favorito.
        </span>
      )}
    </section>
  );
}
