import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getData } from "@/lib/getData";
import { Song } from "@/types/song";
import { useEffect, useState } from "react";

import { SongCard } from "../Cards/SongCard";

interface SongsSectionProps {
  term: string;
  entity: string | null;
}

export const SongsSection = ({ term, entity }: SongsSectionProps) => {
  const [songs, setSongs] = useState<Song[] | null>(null)
  const [isLoading, setIsLoading] = useState(true);
  const limit = entity ? 50 : 10

  useEffect(() => {
    if (term) {
      const handleGetData = async () => {
        try {
          const { results } = await getData(term, 'song', limit);
          setSongs(results)
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
      <SectionsTitle title="Músicas" dividerMargins="my-2" />

      {isLoading ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(songs && songs.length > 0) ? (
            <div className="flex gap-64 -ml-2">
              <div className="w-fit">
                {songs?.slice(0, limit/2).map(song => 
                  <SongCard key={song.trackId} song={song} />
                )}
              </div>

              <div className="w-fit">
                {songs?.slice(limit/2, limit).map(song => 
                  <SongCard key={song.trackId} song={song} />
                )}
              </div>
            </div>
          ) : (
            <span>
              Não foram encontradas músicas relacionadas a sua pesquisa.
            </span>
          )}
        </>
      )}
    </SectionsContainer>
  );
}
