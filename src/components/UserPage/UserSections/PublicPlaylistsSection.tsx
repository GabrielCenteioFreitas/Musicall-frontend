import { PlaylistCard } from "@/components/PlaylistCard";
import { PreviewPlaylist } from "@/types/previewPlaylist";
import { UserSectionsTitle } from "./UserSectionsTitle";
import { UserSectionsItemsContainer } from "./UserSectionsItemsContainer";

interface PublicPlaylistsSectionProps {
  playlists: PreviewPlaylist[]
}

export const PublicPlaylistsSection = ({ playlists }: PublicPlaylistsSectionProps) => {
  return (
    <section>
      <UserSectionsTitle title="Playlists públicas" />

      {playlists.length > 0 ? (
        <UserSectionsItemsContainer>
          {playlists.map(playlist => 
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              section="profile"
              className="w-44"
            />
          )}
        </UserSectionsItemsContainer>
      ) : (
        <span className="block mb-5 text-zinc-200">
          Este usuário não possui nenhuma playlist pública.
        </span>
      )}
    </section>
  );
}
