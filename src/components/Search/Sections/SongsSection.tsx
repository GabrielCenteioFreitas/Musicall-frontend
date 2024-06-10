import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getDataFromSearch } from "@/lib/getITunesData";
import { Song } from "@/types/song";

import { getPreviewPlaylists } from "@/lib/getPlaylistsData";
import { cookies } from "next/headers";
import { SongCard } from "../Cards/SongCard";

interface SongsSectionProps {
  term: string;
  entity: string | null;
}

export const SongsSection = async ({ term, entity }: SongsSectionProps) => {
  const limit = entity ? 50 : 10
  const { results: songs } = await getDataFromSearch({term, entity: 'song', limit})

  const token = cookies().get('token')?.value
  const previewPlaylists = await getPreviewPlaylists(token || null)

  return (
    <SectionsContainer>
      <SectionsTitle title="Músicas" dividerMargins="my-2" />

      {(!songs) ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(songs && songs.length > 0) ? (
            <div className="flex gap-64 -ml-2">
              <div className="w-fit">
                {songs?.slice(0, limit/2).map((song: Song) => 
                  <SongCard
                    previewPlaylists={previewPlaylists}
                    key={song.trackId}
                    song={song}
                  />
                )}
              </div>

              <div className="w-fit">
                {songs?.slice(limit/2, limit).map((song: Song) => 
                  <SongCard
                    previewPlaylists={previewPlaylists}
                    key={song.trackId}
                    song={song}
                  />
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
