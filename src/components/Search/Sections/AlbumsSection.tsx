import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getDataFromSearch } from "@/lib/getITunesData";

import { getFavorites } from "@/lib/getFavoritesData";
import { ITunesAlbum } from "@/types/album";
import { cookies } from "next/headers";
import { AlbumCard } from "../../AlbumCard";

interface AlbumsSectionProps {
  term: string;
  entity: string | null;
}

export const AlbumsSection = async ({ term, entity }: AlbumsSectionProps) => {
  const limit = entity ? 32 : 8
  const { results: albums } = await getDataFromSearch({term, entity: 'album', limit})
  
  const token = cookies().get('token')?.value
  const favorites = await getFavorites(token || null)

  return (
    <SectionsContainer>
      <SectionsTitle title="Álbuns" dividerMargins="my-2" />

      {!albums ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(albums && albums.length > 0) ? (
            <div className="grid grid-cols-8 -ml-3">
              {albums?.map((album: ITunesAlbum) => 
                <AlbumCard
                  key={album.collectionId}
                  album={album}
                  isFavorited={favorites?.favoriteAlbums?.some(
                    (favoritedAlbum) => favoritedAlbum.album.iTunesId === album.collectionId
                  ) || false}
                />
              )}
            </div>
          ) : (
            <span>
              Não foram encontrados álbuns relacionados a sua pesquisa.
            </span>
          )}
        </>
      )}
    </SectionsContainer>
  );
}
