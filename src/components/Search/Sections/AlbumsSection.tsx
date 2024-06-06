import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getData } from "@/lib/getData";
import { useEffect, useState } from "react";

import { Album } from "@/types/album";
import { AlbumCard } from "../Cards/AlbumCard";

interface AlbumsSectionProps {
  term: string;
  entity: string | null;
}

export const AlbumsSection = ({ term, entity }: AlbumsSectionProps) => {
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const limit = entity ? 32 : 8

  useEffect(() => {
    if (term) {
      const handleGetData = async () => {
        try {
          const { results } = await getData(term, 'album', limit);
          setAlbums(results)
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
      <SectionsTitle title="Álbuns" dividerMargins="my-2" />

      {isLoading ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(albums && albums.length > 0) ? (
            <div className="grid grid-cols-8 -ml-3">
              {albums?.map(album => 
                <AlbumCard key={album.collectionId} album={album} />
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
