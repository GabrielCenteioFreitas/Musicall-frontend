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
          {favoriteSongs.map((favoritedSong) => {
            return (
              <SongCard
                key={favoritedSong.song.iTunesId}
                song={favoritedSong}
                groupSongs={favoriteSongs}
                className="w-44"
              />
            )
          })}
        </UserSectionsItemsContainer>
      ) : (
        <span className="block mb-5 text-zinc-200">
          Este usuário não possui nenhuma música marcada como favorita.
        </span>
      )}
    </section>
  );
}
