import { LoadingIcon } from "@/components/LoadingIcon";
import { SectionsContainer } from "@/components/SectionsContainer";
import { SectionsTitle } from "@/components/SectionsTitle";
import { getPlaylists } from "@/lib/getPlaylistsData";
import { PlaylistCard } from "../Cards/PlaylistCard";

interface PlaylistsSectionProps {
  term: string;
}

export const PlaylistsSection = async ({ term }: PlaylistsSectionProps) => {
  const playlists = await getPlaylists()

  const filteredPlaylists = playlists?.filter(playlist => {
    return playlist.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
  })

  return (
    <SectionsContainer>
      <SectionsTitle title="Playlists" dividerMargins="my-2" />

      {!playlists ? (
        <div className="mt-3">
          <LoadingIcon size={50} />
        </div>
      ) : (
        <>
          {(filteredPlaylists && filteredPlaylists.length > 0) ? (
            <div className="grid grid-cols-7 -ml-3">
              {filteredPlaylists?.map(playlist => 
                <PlaylistCard key={playlist.id} playlist={playlist} />
              )}
            </div>
          ) : (
            <span>
              Não foram encontradas playlists públicas relacionadas a sua pesquisa.
            </span>
          )}
        </>
      )}
    </SectionsContainer>
  );
}