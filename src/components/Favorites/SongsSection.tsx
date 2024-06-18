import { FavoriteSong } from "@/types/favorites";
import { SectionsTitle } from "../SectionsTitle";
import { SongCard } from "../SongCard";

interface SongsSectionProps {
  favoriteSongs: FavoriteSong[] | undefined;
}

export const SongsSection = ({ favoriteSongs }: SongsSectionProps) => {
  return (
    <div>
      <SectionsTitle title="Músicas favoritas" dividerMargins="my-2" />

      {favoriteSongs && favoriteSongs.length > 0 ? (
        <div className="grid grid-cols-8 -ml-3">
          {favoriteSongs.map((favoritedSong) => {
            return (
              <SongCard
                key={favoritedSong.song.iTunesId}
                song={favoritedSong}
                groupSongs={favoriteSongs}
                isFavorited
              />
            )
          })}
        </div>
      ) : (
        <span className="block mb-10">
          Você não possui nenhuma música marcada como favorita.
        </span>
      )}
    </div>
  );
}
