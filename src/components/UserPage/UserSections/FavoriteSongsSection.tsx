import { SongCard } from "@/components/SongCard";
import { FavoriteSong } from "@/types/favorites";
import { UserSectionsTitle } from "./UserSectionsTitle";
import { UserSectionsItemsContainer } from "./UserSectionsItemsContainer";

interface FavoriteSongsSectionProps {
  favoriteSongs: FavoriteSong[]
}

export const FavoriteSongsSection = ({ favoriteSongs }: FavoriteSongsSectionProps) => {
  return (
    <section>
      <UserSectionsTitle title="Músicas favoritas" />

      {favoriteSongs.length > 0 ? (
        <UserSectionsItemsContainer>
          {favoriteSongs.map(favoriteSong => 
            <SongCard
              key={favoriteSong.id}
              song={{
                trackName: favoriteSong.song.name,
                artworkUrl100: favoriteSong.song.portrait,
                trackId: favoriteSong.song.iTunesId,
                artistName: favoriteSong.song.artist.name,
                artistId: favoriteSong.song.artist.iTunesId,
              }}
              className="w-44"
            />
          )}
        </UserSectionsItemsContainer>
      ) : (
        <span className="block mb-5 text-zinc-200">
          Este usuário não possui nenhuma música marcada como favorita.
        </span>
      )}
    </section>
  );
}
